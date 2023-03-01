//Christian Freilinger
package websockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import data.SMSStore;
import entity.*;
import entity.Package;
import io.quarkus.logging.Log;
import io.quarkus.scheduler.Scheduled;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.DTOClientSession;
import model.DTOPackage;
import model.DTOResponse;
import model.DTOScript;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.sql.Timestamp;
import java.util.*;


@ServerEndpoint("/client/{mac_address}")//Pfad
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class ClientSocket {

    @Inject//Dependency Injection des SMSStores
    protected SMSStore smsStore;

    @Inject
    Logger log;
    private final ArrayList<DTOClientSession> clientSessions = new ArrayList<DTOClientSession>();//Liste mit allen Sessions zu den Clients

    @OnOpen
    public void onOpen(Session session, @PathParam("mac_address") String mac_address) {//öffnen einer Verbindung
        if (!smsStore.clientIsAvailable(mac_address)) {
            if (!smsStore.availableclientIsAvailable(mac_address)) {//wenn es noch keinen Client oder Available_Client gibt, wird ein neuer erstellt
                var baseclient = new Baseclient(mac_address);
                var available_client = new Available_Clients(new Baseclient(mac_address), "unkowen", "0.0.0.0");
                smsStore.insertBase_Client(baseclient);
                smsStore.insertAvailable_Client(available_client);
            }
        } else {
            var clientSession = new DTOClientSession(mac_address, session);//Client und dazugehörige Session wird gespeichert
            clientSessions.add(clientSession);
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("mac_address") String mac_address) {//wird die Verbindung geschlossen wird der Client und die Session entfernt
        var clone = (List<DTOClientSession>) clientSessions.clone();
        for (var clientSession : clone) {
            if (clientSession.getSession().toString().equals(session.toString())) {
                clientSessions.remove(clientSession);
            }
        }
    }

    @OnError
    public void onError(Session session, @PathParam("mac_address") String mac_address, Throwable throwable) {//gibt es einen Fehler wird der Client und die Session entfernt
        var clone = (List<DTOClientSession>) clientSessions.clone();
        for (var clientSession : clone) {
            if (clientSession.getSession().toString().equals(session.toString())) {
                clientSessions.remove(clientSession);
            }
        }
    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("mac_address") String mac_address) {//beim Erhalten einer Nachricht
        var mapper = new ObjectMapper();
        try {
            Map<String, Object> map = mapper.readValue(message, Map.class);
            if (smsStore.clientIsAvailable(mac_address)) {//infos werden dem Client zugeordnet
                var client = smsStore.getClientByID(mac_address);
                client.setName((String) map.get("hostname"));
                client.setIp((String) map.get("ip"));
                var timestamp = new Timestamp(System.currentTimeMillis());
                client.setLastOnline(timestamp);
                client.setCpuUsage((Integer) map.get("cpuUsage"));
                client.setUsedDiskspace((Integer) map.get("diskUsage"));
                var packagesIDs = (ArrayList<String>) map.get("installed");
                var scriptsIDs = (ArrayList<String>) map.get("executedScripts");
                var packages = smsStore.getPackagesByIDs(packagesIDs);
                var scripts = smsStore.getScriptsByIDs(scriptsIDs);
                client.setPackages(packages);
                client.setScript(scripts);
                smsStore.updateClient(client);
                for (var id : packagesIDs) {//löscht Tasks
                    if (smsStore.getTaskByPackageID(id) != null) {
                        smsStore.insertTaskProtocolWithPackage(mac_address, id);
                        smsStore.removeTaskByPackageID(id, mac_address);
                    }
                }
                for (var id : scriptsIDs) {//löscht Tasks
                    if (smsStore.getTaskByScriptID(id) != null) {
                        smsStore.insertTaskProtocolWithScript(mac_address, id);
                        smsStore.removeTaskByScriptID(id, mac_address);
                    }
                }
            } else if (smsStore.availableclientIsAvailable(mac_address)) {//infos werden dem Available_Client zugeordnet
                var client = smsStore.getAvailableClientById(mac_address);
                client.setName((String) map.get("hostname"));
                client.setIp((String) map.get("ip"));
                smsStore.updateAvailableClient(client);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @Scheduled(every = "15s")
    public void sendMessage() {//sendet eine Nachricht
        try {
            if (clientSessions != null && clientSessions.size() != 0) {
                for (var clientSession : clientSessions) {
                    var allTasks = smsStore.getTasks();
                    boolean hasNoTask = true;
                    for (var task : allTasks) {
                        if (task.getClient().getMacAddress().getMacAddress().equals(clientSession.getMac_address())) {
                            hasNoTask = false;
                            break;
                        }
                    }
                    if (!hasNoTask) {
                        var gson = new Gson();
                        var mac_address = clientSession.getMac_address();
                        var session = clientSession.getSession();
                        var tasks = smsStore.getTasksByClientID(mac_address);
                        var dtopackages = new ArrayList<DTOPackage>();
                        var dtoscripts = new ArrayList<DTOScript>();
                        for (var task : tasks) {
                            if (task.getPackages() != null) {
                                var package_ = task.getPackages();
                                var dtopackage = new DTOPackage(package_.getId(), package_.getName(), package_.getVersion(), package_.getDate(), package_.getDownloadlink(), package_.getSilentSwitch());
                                dtopackages.add(dtopackage);
                            }
                            if (task.getScript() != null) {
                                var script_ = task.getScript();
                                DTOScript dtoScript = new DTOScript(script_.getId(), script_.getName(), script_.getDescription(), script_.getScript_value(), script_.getInterpreter(), script_.getFileExtension());
                                dtoscripts.add(dtoScript);
                            }
                        }
                        var response = new DTOResponse(dtopackages, dtoscripts);
                        var json = gson.toJson(response);
                        Log.info(json);
                        session.getAsyncRemote().sendText(json);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }


}
