package controller;

import annotations.Login;
import com.fasterxml.jackson.annotation.JsonView;
import common.IWebpageResourceAdmin;
import data.SMSStore;
import entity.*;
import entity.Package;
import entity.jsonview.ClientView;
import entity.jsonview.GroupView;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.Path;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@Login(roles = {"Admin"})
@Path("/webpageAdmin")
public class WebpageControllerAdmin implements IWebpageResourceAdmin {

    @Inject
    protected SMSStore smsStore;

    private Login anno = null;

    @PostConstruct
    public void init(){
        anno = WebpageControllerAdmin.class.getAnnotation(Login.class);
    }


    @Override
    @JsonView(ClientView.Always.class)
    public ArrayList<Client> getClients(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getClients();
        }
        return null;
    }

    @Override
    public ArrayList<Role> getRoles(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getRoles();
        }
        return null;
    }


    @Override
    @JsonView(GroupView.Always.class)
    public ArrayList<SmsGroup> getGroups(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getGroups();
        }
        return null;
    }



    @Override
    public ArrayList<User> getUsers(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getUsers();
        }
        return null;
    }


    @Override
    public void removeClient(String id, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeClient(id);
        }

    }

    @Override
    public void removeGroup(UUID id, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeGroup(id);
        }

    }

    @Override
    public void removeProgram(UUID id, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removePackage(id);
        }

    }

    @Override
    public void removeScript(UUID id, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeScript(id);
        }

    }

    @Override
    public void removeUser(UUID id, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeUser(id);
        }

    }

    @Override
    public void insertPackage(Package packages, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertPackage(packages);
        }

    }

    @Override
    public void insertScript(Script script, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertScript(script);
        }

    }

    @Override
    public void insertGroup(SmsGroup group, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertSmsGroup(group);
        }

    }

    @Override
    public void insertUser(User user, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertUser(user);
        }

    }

    @Override
    public void updatePackage(Package packages, String token) {
        if (smsStore.isAllowed(token, anno)) {
        }

    }


    @Override
    public void updateScript(Script script, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateScript(script.getId());
        }

    }

    @Override
    public void updateGroup(SmsGroup Group, String token) {
        if (smsStore.isAllowed(token, anno)) {
        }

    }

    @Override
    public void updateUser(User user, String token) {
        if (smsStore.isAllowed(token, anno)) {
        }

    }

    @Override
    public void activateClient(String mac_Address, String token) {
        if (smsStore.isAllowed(token, anno)) {
            if (smsStore.availableclientIsAvailable(mac_Address)) {
                Available_Clients available_Client = smsStore.getAvailableClientById(mac_Address);
                Timestamp time = new Timestamp(System.currentTimeMillis());
                Baseclient baseclient = smsStore.getBaseClientByID(mac_Address);
                Client client = new Client(baseclient, available_Client.getName(), available_Client.getIp(), time, 0, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
                try {
                    smsStore.getUserTransaction().begin();
                    smsStore.insertClient(client);
                    smsStore.removeAvailableClient(mac_Address);
                    smsStore.getUserTransaction().commit();
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }


            }
        }

    }

    @Override
    public void updateClient(Client Client, String token) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateClient(Client);
        }
    }


    @Override
    public ArrayList<Tasks> getTasks(String token) {
        return smsStore.getTasks();
    }
}
