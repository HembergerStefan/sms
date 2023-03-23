//Christian Freilinger
package controller;

import annotations.Adding;
import annotations.Login;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.gson.Gson;
import common.IWebpageResourceUser;
import data.SMSStore;
import entity.jsonview.PackageView;
import entity.jsonview.ScriptView;
import lombok.RequiredArgsConstructor;
import model.DTOInsertUser;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Login(roles = {"User", "Admin"})//Rollen mit denen man auf Endpoints zugreifen darf
@Adding(roles = {"Admin"})
@Path("/webpageUser")//Pfad
public class WebpageControllerUser implements IWebpageResourceUser {
    @Inject//Dependency Injection des SMSStores
    protected SMSStore smsStore;
    private Login anno = null;
    private Adding add = null;


    @PostConstruct//Post Constructor
    public void init() {
        anno = WebpageControllerUser.class.getAnnotation(Login.class);
        add = WebpageControllerUser.class.getAnnotation(Adding.class);
    }


    @Override
    public Response getUserByID(String id, String token) {//holt einen Benutzer durch seine ID *
        if (smsStore.isAllowed(token, id, anno)) {
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getUserByID(id))
                    .build();
        }

        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token or ID")
                .build();
    }

    @Override
    public Response getRoleByUser(String id, String token) {//holt einen Benutzer durch seine ID *
        if (smsStore.isAllowed(token, id, anno)) {
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getUserByID(id).getRole())
                    .build();
        }
        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token or ID")
                .build();
    }

    @Override
    public Response getRoles(String token) {//holt alle Rollen *
        if (smsStore.isAllowed(token, anno)) {
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getRoles())
                    .build();
        }
        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }


    @Override
    @JsonView(PackageView.Always.class)
    public Response getPackages(String token) {//holt alle Packages *
        if (smsStore.isAllowed(token, anno)) {
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getPackages())
                    .build();
        }
        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }


    @Override
    @JsonView(ScriptView.Always.class)
    public Response getScripts(String token) {//holt alle Scripts *
        if (smsStore.isAllowed(token, anno)) {
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getScripts())
                    .build();
        }
        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }

    @Override
    @JsonView(ScriptView.Always.class)
    public Response getClientScriptsByClientID(String token, String client_ID){
        if(smsStore.isAllowed(token, anno)){
            return Response.status(200)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(smsStore.getClientScriptsByClient(client_ID))
                    .build();
        }
        return Response.status(500)
                .type(MediaType.TEXT_PLAIN_TYPE)
                .entity("Invalid Token")
                .build();
    }

    @Override
    public void updateUser(DTOInsertUser user, String token) {//holt alle Benutzer *
        if (smsStore.isAllowed(token, user.getId(), anno)) {
            smsStore.updateUser(user);
        }
    }

    @Override
    public void addScriptToTask(String token, UUID user_id, String mac_Address, String script_id) {//erstellt einen Task *
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertTaskWithScript(mac_Address, script_id, user_id.toString(), add, token);
        }
    }

    @Override
    public void addPackageToTask(String token, UUID user_id, String mac_Address, String package_id) {//erstellt einen Task *
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertTaskWithPackage(mac_Address, package_id, user_id.toString(), add, token);
        }
    }
}
