//Christian Freilinger
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
import model.DTOInsertUser;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@Login(roles = {"Admin"})//Rolle die auf Endpoints zugreifen darf
@Path("/webpageAdmin")//Pfad
public class WebpageControllerAdmin implements IWebpageResourceAdmin {

    @Inject//Dependency Injection des SMSStores
    protected SMSStore smsStore;

    private Login anno = null;

    @PostConstruct//Post Construktor wird nach Initialisieren der globalen Variable automatisch aufgerufen
    public void init() {
        anno = WebpageControllerAdmin.class.getAnnotation(Login.class);
    }


    @Override
    @JsonView(ClientView.Always.class)
    public Response getClients(String token) {//holt alle Clients
        if (smsStore.isAllowed(token, anno)) {
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getClients())
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }




    @Override
    @JsonView(GroupView.Always.class)
    public Response getGroups(String token) {//holt alle Gruppen
        if (smsStore.isAllowed(token, anno)) {
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getGroups())
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }


    @Override
    public Response getUsers(String token) {//holt alle Benutzer
        if (smsStore.isAllowed(token, anno)) {
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getUsers())
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }

    @Override
    public Response getAvailable_Clients(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getAvailableClients())
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }


    @Override
    public void removeClient(String id, String token) {//löscht einen Client
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeClient(id);
        }

    }

    @Override
    public void removeGroup(UUID id, String token) {//löscht eine Gruppe
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeGroup(id);
        }

    }

    @Override
    public void removePackage(UUID id, String token) {//löscht ein Package
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removePackage(id);
        }

    }

    @Override
    public void removeScript(UUID id, String token) {//löscht ein Script
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeScript(id);
        }

    }

    @Override
    public void removeUser(UUID id, String token) {//löscht einen Benutzer
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeUser(id);
        }

    }

    @Override
    public void insertPackage(Package packages, String token) {//erstellt ein Package
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertPackage(packages);
        }

    }

    @Override
    public void insertScript(Script script, String token) {//erstellt ein Script
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertScript(script);
        }

    }

    @Override
    public void insertGroup(SmsGroup group, String token) {//erstellt eine Gruppe
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertSmsGroup(group);
        }

    }

    @Override
    public void insertUser(DTOInsertUser user, String token) {//erstellt einen Benutzer
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertUser(user);
        }

    }

    @Override
    public void updatePackage(Package packages, String token) {//updated ein Package
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updatePackage(packages);
        }

    }


    @Override
    public void updateScript(Script script, String token) {//updated ein Script
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateScript(script);
        }

    }

    @Override
    public void updateGroup(SmsGroup group, String token) {//updated eine Gruppe
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateGroup(group);
        }

    }

    @Override
    public void updateUser(DTOInsertUser user, String token) {//updated einen Benutzer
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateUser(user);
        }
    }

    @Override
    public void activateClient(String mac_Address, String token) {//aktiviert einen Client
        if (smsStore.isAllowed(token, anno)) {
            if (smsStore.availableclientIsAvailable(mac_Address)) {
                Available_Clients available_Client = smsStore.getAvailableClientById(mac_Address);
                Timestamp time = new Timestamp(System.currentTimeMillis());
                Baseclient baseclient = smsStore.getBaseClientByID(mac_Address);
                Client client = new Client(baseclient, available_Client.getName(), available_Client.getIp(), time, 0, 0, 0, "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
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
    public void updateClient(Client Client, String token) {//updated einen Client
        if (smsStore.isAllowed(token, anno)) {
            smsStore.updateClient(Client);
        }
    }

    @Override
    public void addClientToGroup(String token, UUID group_ID, String client_ID) {//fügt einen Client zu einer Gruppe hinzu
        if (smsStore.isAllowed(token, anno)) {
            smsStore.addClientToGroup(client_ID, group_ID);
        }
    }

    @Override
    public void addUserToGroup(String token, UUID group_ID, UUID user_ID) {//fügt einen Benutzer zu einer Gruppe hinzu
        if (smsStore.isAllowed(token, anno)) {
            smsStore.addUserToGroup(user_ID, group_ID);
        }
    }

    @Override
    public void removeClientToGroup(String token, UUID group_ID, String client_ID) {//löscht einen Client aus einer Gruppe
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeClientToGroup(client_ID, group_ID);
        }
    }

    @Override
    public void removeUserToGroup(String token, UUID group_ID, UUID user_ID) {//löscht einen Benutzer aus einer Gruppe
        if (smsStore.isAllowed(token, anno)) {
            smsStore.removeUserToGroup(user_ID, group_ID);
        }
    }

    @Override
    public Response changeUserRole(Role role, String token, String user_ID) {//ändert die Rolle eines Benutzers
        if (smsStore.isAllowed(token, anno)) {
            smsStore.changeRole(user_ID, role);
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(role)
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token, User_ID or Role")
                .build();
    }


    @Override
    public Response getTasks(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return javax.ws.rs.core.Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getTasks())
                    .build();
        }
        return javax.ws.rs.core.Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }//holt alle Tasks
}
