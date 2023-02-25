//Christian Freilinger
package websockets;

import annotations.Login;
import com.google.gson.Gson;
import controller.WebpageControllerUser;
import data.SMSStore;
import entity.*;
import entity.Package;
import io.quarkus.logging.Log;
import io.quarkus.scheduler.Scheduled;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.*;
import org.jboss.logging.Logger;
import token.TokenInfos;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.List;

@ServerEndpoint("/webpage/{id}/{token}")
@Login(roles = {"User", "Admin"})
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class WebSocket {
    @Inject
    protected SMSStore smsStore;

    @Inject
    Logger log;
    private Login anno = null;

    private ArrayList<DTOUserSession> userSessions = new ArrayList<>();

    @PostConstruct
    public void init() {
        anno = WebpageControllerUser.class.getAnnotation(Login.class);
    }


    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token, @PathParam("id") String id) {
        var userSession = new DTOUserSession(id, session, token, "");
        userSessions.add(userSession);
    }

    @OnClose
    public void onClose(Session session, @PathParam("token") String token, @PathParam("id") String id) {
        var clone = (List<DTOUserSession>) userSessions.clone();
        for (var userSession : clone) {
            if (userSession.getSession().toString().equals(session.toString())) {
                userSessions.remove(userSession);
            }
        }
    }

    @OnError
    public void onError(Session session, @PathParam("token") String token, @PathParam("id") String id, Throwable throwable) {
        var clone = (List<DTOUserSession>) userSessions.clone();
        for (var userSession : clone) {
            if (userSession.getSession().toString().equals(session.toString())) {
                userSessions.remove(userSession);
            }
        }
    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("token") String token, @PathParam("id") String id) {
        System.err.println(message);
    }

    @Transactional
    @Scheduled(every="5s")
    public void sendMessage() {
        for (DTOUserSession userSession : userSessions) {
            Log.info( "sending...");
            String token = userSession.getToken();
            String replacedToken = token.replaceAll("汉", "/");
            replacedToken = replacedToken.replaceAll("%E6%B1%89", "/");
            if (smsStore.isAllowed(replacedToken, userSession.getUser_id(), anno)) {
            var user = smsStore.getUserByID(userSession.getUser_id());
            var json = bulidJson(user);
            if(!userSession.getLastJson().equals(json)){
                userSession.getSession().getAsyncRemote().sendText(json);
                userSession.setLastJson(json);
            }
            Log.info(json);
            }else{
                var clone = (List<DTOUserSession>) userSessions.clone();
                for(var userSessionClone : clone){
                    if(userSessionClone.getSession().toString().equals(userSession.getSession())){
                        userSessions.remove(userSession);
                    }
                }
            }
        }
    }

    public String bulidJson(User user) {
        var role = user.getRole();
        var dtoRole = new DTORole(role.getId(), role.getName());
        var dtoUser = new DTOResponseUser(user.getId(), user.getUsername(), new ArrayList<>(), dtoRole);
        var groups = user.getGroups();
        var dtoGroups = new ArrayList<DTOSmsGroup>();
        for (var group : groups) {
            var clients = group.getClients();
            var dtoClients = new ArrayList<DTOClient>();
            for (Client client : clients) {
                var packages = client.getPackages();
                var dtoPackages = new ArrayList<DTOPackage>();
                var scripts =  client.getScript();
                var dtoScripts = new ArrayList<DTOScript>();
                for (var package_ : packages) {
                    var dtoPackage = new DTOPackage(package_.getId(), package_.getName(), package_.getVersion(), package_.getDate(), package_.getDownloadlink(), package_.getSilentSwitch());
                    dtoPackages.add(dtoPackage);
                }
                for (var script : scripts) {
                    var dtoScript = new DTOScript(script.getId(), script.getName(), script.getDescription(), script.getScript_value(), script.getInterpreter(), script.getFileExtension());
                    dtoScripts.add(dtoScript);
                }
                var dtoBaseclient = new DTOBaseclient(client.getMacAddress().getMacAddress());
                var dtoClient = new DTOClient(dtoBaseclient, client.getName(), client.getIp(), client.getLastOnline(), client.getUsedDiskspace(), client.getCpuUsage(), dtoPackages, dtoScripts);
                dtoClients.add(dtoClient);
            }
            var dtoSmsGroup = new DTOSmsGroup(group.getId(), group.getName(), dtoClients);
            dtoGroups.add(dtoSmsGroup);
        }
        dtoUser.getGroups().addAll(dtoGroups);
        var gson = new Gson();
        var json = gson.toJson(dtoUser);
        return json;
    }
}
