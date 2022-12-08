//Christian Freilinger
package common;

import com.fasterxml.jackson.annotation.JsonView;
import entity.*;
import entity.Package;
import entity.jsonview.*;
import model.DTOInsertUser;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.UUID;

@Path("/webpageAdmin")//Pfad
public interface IWebpageResourceAdmin {
    @GET
    @Path("/clients/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(ClientView.Always.class)
    ArrayList<Client> getClients(@PathParam("token") String token);//holt alle Clients


    @GET
    @Path("/roles/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    ArrayList<Role> getRoles(@PathParam("token") String token);//holt alle Rollen

    @GET
    @Path("/groups/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(GroupView.Always.class)
    ArrayList<SmsGroup> getGroups(@PathParam("token") String token);//holt alle Gruppen



    @GET
    @Path("/users/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(UserView.Always.class)
    ArrayList<User> getUsers(@PathParam("token") String token);//holt alle Benutzer


    @DELETE
    @Path("/removeClient/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeClient(@PathParam("id") String id, @PathParam("token") String token);//löscht einen Client

    @DELETE
    @Path("/removeGroup/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeGroup(@PathParam("id") UUID id, @PathParam("token") String token);//löscht eine Gruppe

    @DELETE
    @Path("/removePackage/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removePackage(@PathParam("id") UUID id, @PathParam("token") String token);//löscht ein Package


    @DELETE
    @Path("/removeScript/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeScript(@PathParam("id") UUID id, @PathParam("token") String token);//löscht ein Script


    @DELETE
    @Path("/removeUser/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeUser(@PathParam("id") UUID id, @PathParam("token") String token);//löscht einen Benutzer

    @POST
    @Path("/insertPackage/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertPackage(Package packages, @PathParam("token") String token);//erstellt ein Package

    @POST
    @Path("/insertScript/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertScript(Script script, @PathParam("token") String token);//erstellt ein Script

    @POST
    @Path("/insertGroup/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertGroup(SmsGroup group, @PathParam("token") String token);//erstellt eine Gruppe

    @POST
    @Path("/insertUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertUser(DTOInsertUser user, @PathParam("token") String token);//erstellt einen Benutzer


    @POST
    @Path("/updatePackage/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updatePackage(Package packages, @PathParam("token") String token);//updated ein Package


    @POST
    @Path("/updateScript/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateScript(Script script, @PathParam("token") String token);//updated ein Script

    @POST
    @Path("/updateGroup/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateGroup(SmsGroup Group, @PathParam("token") String token);//updated eine Gruppe

    @POST
    @Path("/updateUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateUser(DTOInsertUser user, @PathParam("token") String token);//updated einen Benutzer

    @PUT
    @Path("/activateClient/{mac_Address}/{token}")
    void activateClient(@PathParam("mac_Address") String mac_Address, @PathParam("token") String token);//aktiviert einen Client (wird vom Available_Client zum Client)



    @GET
    @Path("/tasks/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(TaskView.Always.class)
    ArrayList<Tasks> getTasks(@PathParam("token") String token);//holt alle tasks


    @POST
    @Path("/updateClient/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateClient(Client Client, @PathParam("token") String token);//updated einen Client


    @PUT
    @Path("/addClientToGroup/{token}/{group_ID}/{client_ID}")
    void addClientToGroup(@PathParam("token")String token, @PathParam("group_ID")UUID group_ID, @PathParam("client_ID")String client_ID);//fügt einen Client zu einer Gruppe hinzu

    @PUT
    @Path("/addUserToGroup/{token}/{group_ID}/{user_ID}")
    void addUserToGroup(@PathParam("token")String token, @PathParam("group_ID")UUID group_ID, @PathParam("user_ID")UUID user_ID);//fügt einen Benutzer zu einer Gruppe hinzu



    @DELETE
    @Path("/removeClientToGroup/{token}/{group_ID}/{client_ID}")
    void removeClientToGroup(@PathParam("token")String token, @PathParam("group_ID")UUID group_ID, @PathParam("client_ID")String client_ID);//löscht einen Client aus einer Gruppe

    @DELETE
    @Path("/removeUserToGroup/{token}/{group_ID}/{user_ID}")
    void removeUserToGroup(@PathParam("token")String token, @PathParam("group_ID")UUID group_ID, @PathParam("user_ID")UUID user_ID);//löscht einen Benutzer aus einer Gruppe

    @POST
    @Path("/changeUserRole/{token}/{user_ID}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Role changeUserRole(Role role, @PathParam("token") String token, @PathParam("user_ID") String user_ID);//wechselt die Rolle eines Benutzers
}






