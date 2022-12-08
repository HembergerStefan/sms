//Christian Freilinger
package websockets;

import annotations.Login;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import controller.WebpageControllerUser;
import data.SMSStore;
import entity.*;
import entity.Package;
import entity.jsonview.UserView;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.*;
import thread.UserResponseThread;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ServerEndpoint("/webpage/{id}/{token}")
@Login(roles = {"User", "Admin"})
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class WebSocket {
    @Inject
    protected SMSStore smsStore;
    private Login anno = null;

    private ArrayList<DTOUserSession> userSessions = new ArrayList<>();

    private UserResponseThread userResponseThread = new UserResponseThread(this);
    private boolean isAllowedToRun = true;

    @PostConstruct
    public void init() {
        getUserResponseThread().start();
        anno = WebpageControllerUser.class.getAnnotation(Login.class);
    }


    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token, @PathParam("id") String id) {
        /* if (smsStore.isAllowed(token, id, anno)) {*/
        DTOUserSession userSession = new DTOUserSession(id, session, token);
        userSessions.add(userSession);
        /* }*/
    }

    @OnClose
    public void onClose(Session session, @PathParam("token") String token, @PathParam("id") String id) {
        List<DTOUserSession> clone = (List<DTOUserSession>) userSessions.clone();
        for (DTOUserSession userSession : clone) {
            if (userSession.getSession().toString().equals(session.toString())) {
                userSessions.remove(userSession);
            }
        }
        if (userSessions.size() > 0) {
            isAllowedToRun = true;
        } else {
            isAllowedToRun = false;
        }
    }

    @OnError
    public void onError(Session session, @PathParam("token") String token, @PathParam("id") String id, Throwable throwable) {
        List<DTOUserSession> clone = (List<DTOUserSession>) userSessions.clone();
        for (DTOUserSession userSession : clone) {
            if (userSession.getSession().toString().equals(session.toString())) {
                userSessions.remove(userSession);
            }
        }
        if (userSessions.size() > 0) {
            isAllowedToRun = true;
        } else {
            isAllowedToRun = false;
        }
    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("token") String token, @PathParam("id") String id) {
        System.err.println(message);
    }

    @Transactional
    @JsonView(UserView.Always.class)
    public void sendMessage() {
        for (DTOUserSession userSession : userSessions) {
            //if (smsStore.isAllowed(userSession.getToken(), userSession.getUser_id(), anno)) {
            String user = smsStore.getUserByID(userSession.getUser_id()).getUsername();
            String json = bulidJson(userSession.getUser_id());
            userSession.getSession().getAsyncRemote().sendText(json);
            /*}else{
                List<DTOUserSession> clone = (List<DTOUserSession>) userSessions.clone();
                for(DTOUserSession userSessionClone : clone){
                    if(userSessionClone.getSession().toString().equals(userSession.getSession())){
                        userSessions.remove(userSession);
                    }
                }
                if(userSessions.size() > 0){
                    isAllowedToRun = true;
                }else{
                    isAllowedToRun = false;
                }
            }*/
        }
    }

    public String bulidJson(String userSession) {
        Role role = smsStore.getUserByID(userSession).getRole();
        DTORole dtoRole = new DTORole(role.getId(), role.getName());
        DTOResponseUser dtoUser = new DTOResponseUser(smsStore.getUserByID(userSession).getId(), smsStore.getUserByID(userSession).getUsername(), new ArrayList<>(), dtoRole);
        ArrayList<SmsGroup> groups = (ArrayList<SmsGroup>) smsStore.getUserByID(userSession).getGroups();
        ArrayList<DTOSmsGroup> dtoGroups = new ArrayList<>();
        for (SmsGroup group : groups) {
            ArrayList<Client> clients = (ArrayList<Client>) group.getClients();
            ArrayList<DTOClient> dtoClients = new ArrayList<>();
            for (Client client : clients) {
                ArrayList<Package> packages = (ArrayList<Package>) client.getPackages();
                ArrayList<DTOPackage> dtoPackages = new ArrayList<>();
                ArrayList<Script> scripts = (ArrayList<Script>) client.getScript();
                ArrayList<DTOScript> dtoScripts = new ArrayList<>();
                for (Package package_ : packages) {
                    DTOPackage dtoPackage = new DTOPackage(package_.getId(), package_.getName(), package_.getVersion(), package_.getDate(), package_.getDownloadlink(), package_.getSilentSwitch());
                    dtoPackages.add(dtoPackage);
                }
                for (Script script : scripts) {
                    DTOScript dtoScript = new DTOScript(script.getId(), script.getName(), script.getDescription(), script.getScript_value(), script.getInterpreter(), script.getFileExtension());
                    dtoScripts.add(dtoScript);
                }
                DTOBaseclient dtoBaseclient = new DTOBaseclient(client.getMacAddress().getMacAddress());
                DTOClient dtoClient = new DTOClient(dtoBaseclient, client.getName(), client.getIp(), client.getLastOnline(), client.getUsedDiskspace(), client.getCpuUsage(), dtoPackages, dtoScripts);
                dtoClients.add(dtoClient);
            }
            DTOSmsGroup dtoSmsGroup = new DTOSmsGroup(group.getId(), group.getName(), dtoClients);
            dtoGroups.add(dtoSmsGroup);
        }
        dtoUser.getGroups().addAll(dtoGroups);
        Gson gson = new Gson();
        String json = gson.toJson(dtoUser);
        return json;
    }
}
