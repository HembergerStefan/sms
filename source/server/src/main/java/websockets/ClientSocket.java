package websockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import data.SMSStore;
import entity.*;
import entity.Package;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.DTOClientSession;
import model.DTOPackage;
import model.DTOResponse;
import model.DTOScript;
import thread.ClientResponseThread;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.sql.Timestamp;
import java.util.*;


@ServerEndpoint("/client/{mac_address}")
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class ClientSocket {

    @Inject
    protected SMSStore smsStore;

    private List<DTOClientSession> clientSessions = Collections.synchronizedList(new ArrayList<DTOClientSession>());
    private ClientResponseThread clientResponseThread = new ClientResponseThread(this);

    private boolean isAllowedToRun = false;

    @PostConstruct
    public void init(){
        System.out.println("Thread startet");
        clientResponseThread.start();
    }
    @OnOpen
    public void onOpen(Session session, @PathParam("mac_address") String mac_address) {
        if (!smsStore.clientIsAvailable(mac_address)) {
            if (!smsStore.availableclientIsAvailable(mac_address)) {
                Baseclient baseclient = new Baseclient(mac_address);
                Available_Clients available_client = new Available_Clients(new Baseclient(mac_address), "unkowen", "0.0.0.0");
                smsStore.insertBase_Client(baseclient);
                smsStore.insertAvailable_Client(available_client);
            }
        }else{
            DTOClientSession clientSession = new DTOClientSession(mac_address, session);
            clientSessions.add(clientSession);
        }
        if(clientSessions.size() > 0){
            isAllowedToRun = true;
        }else{
            isAllowedToRun = false;
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("mac_address") String mac_address) {
        for(DTOClientSession clientSession : clientSessions){
            if(clientSession.getSession().toString().equals(session.toString())){
                clientSessions.remove(clientSession);
            }
        }
    }

    @OnError
    public void onError(Session session, @PathParam("mac_address") String mac_address, Throwable throwable) {
        DTOClientSession remove = new DTOClientSession(mac_address, session);
        clientSessions.remove(remove);
       /* List<DTOClientSession> clone = clientSessions;
        for(DTOClientSession clientSession : clone){
            if(clientSession.getSession().toString().equals(session.toString())){
                clientSessions.remove(clientSession);
            }
        }*/
        System.out.println("Groesse der Liste: " + clientSessions.size());
    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("mac_address") String mac_address) {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("got Message");
        try {
            Map<String,Object> map = mapper.readValue(message, Map.class);
            if(smsStore.clientIsAvailable(mac_address)){
                Client client = smsStore.getClientByID(mac_address);
                client.setName((String) map.get("hostname"));
                client.setIp((String) map.get("ip"));
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                client.setLastOnline(timestamp);
                client.setCpuUsage((Integer) map.get("cpuUsage"));
                client.setUsedDiskspace((Integer) map.get("diskUsage"));
                ArrayList<String> packagesIDs = (ArrayList<String>) map.get("installed");
                ArrayList<String> scriptsIDs = (ArrayList<String>) map.get("executedScripts");
                ArrayList<Package> packages = smsStore.getPackagesByIDs(packagesIDs);
                ArrayList<Script> scripts = smsStore.getScriptsByIDs(scriptsIDs);
                client.setPackages(packages);
                client.setScript(scripts);
                smsStore.updateClient(client);
                for(String id : packagesIDs){
                    if(smsStore.getTaskByPackageID(id) != null){
                        smsStore.removeTaskByPackageID(id);
                    }
                }
                for(String id : scriptsIDs){
                    if(smsStore.getTaskByScriptID(id) != null){
                        smsStore.removeTaskByScriptID(id);
                    }
                }
            }else if(smsStore.availableclientIsAvailable(mac_address)){
                Available_Clients client = smsStore.getAvailableClientById(mac_address);
                client.setName((String) map.get("hostname"));
                client.setIp((String) map.get("ip"));
                smsStore.updateAvailableClient(client);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendMessage(){
        System.out.println("Message sendet");
        for(DTOClientSession clientSession : clientSessions){
            Gson gson = new Gson();
            String mac_address = clientSession.getMac_address();
            Session session = clientSession.getSession();
            ArrayList<Tasks> tasks = smsStore.getTasksByClientID(mac_address);
            ArrayList<DTOPackage> dtopackages = new ArrayList<>();
            ArrayList<DTOScript> dtoscripts = new ArrayList<>();
            for(Tasks task : tasks){
                if(task.getPackages() != null){
                    Package package_ = task.getPackages();
                    DTOPackage dtopackage = new DTOPackage(package_.getId(), package_.getName(), package_.getVersion(), package_.getDate(), package_.getDownloadlink(), package_.getSilentSwitch());
                    dtopackages.add(dtopackage);
                }
                if(task.getScript() != null){
                    Script script_ = task.getScript();
                    DTOScript dtoScript = new DTOScript(script_.getId(), script_.getName(), script_.getDescription(), script_.getScript_value());
                    dtoscripts.add(dtoScript);
                }
            }
            DTOResponse response = new DTOResponse(dtopackages, dtoscripts);
            String json = gson.toJson(response);
            session.getAsyncRemote().sendText(json);
        }
    }


}
