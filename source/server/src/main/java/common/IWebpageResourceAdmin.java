package common;

import com.fasterxml.jackson.annotation.JsonView;
import entity.*;
import entity.Package;
import entity.jsonview.*;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.UUID;

@Path("/webpageAdmin")
public interface IWebpageResourceAdmin {
    @GET
    @Path("/clients/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(ClientView.Always.class)
    ArrayList<Client> getClients(@PathParam("token") String token);


    @GET
    @Path("/roles/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    ArrayList<Role> getRoles(@PathParam("token") String token);

    @GET
    @Path("/groups/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(GroupView.Always.class)
    ArrayList<SmsGroup> getGroups(@PathParam("token") String token);



    @GET
    @Path("/users/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(UserView.Always.class)
    ArrayList<User> getUsers(@PathParam("token") String token);


    @DELETE
    @Path("/removeClient/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeClient(@PathParam("id") String id, @PathParam("token") String token);

    @DELETE
    @Path("/removeGroup/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeGroup(@PathParam("id") UUID id, @PathParam("token") String token);

    @DELETE
    @Path("/removeProgram/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeProgram(@PathParam("id") UUID id, @PathParam("token") String token);


    @DELETE
    @Path("/removeScript/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeScript(@PathParam("id") UUID id, @PathParam("token") String token);


    @DELETE
    @Path("/removeUser/{id}/{token}")
    @Consumes(MediaType.APPLICATION_JSON)
    void removeUser(@PathParam("id") UUID id, @PathParam("token") String token);

    @POST
    @Path("/insertPackage/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertPackage(Package packages, @PathParam("token") String token);

    @POST
    @Path("/insertScript/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertScript(Script script, @PathParam("token") String token);

    @POST
    @Path("/insertGroup/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertGroup(SmsGroup group, @PathParam("token") String token);

    @POST
    @Path("/insertUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void insertUser(User user, @PathParam("token") String token);


    @POST
    @Path("/updatePackage/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updatePackage(Package packages, @PathParam("token") String token);


    @POST
    @Path("/updateScript/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateScript(Script script, @PathParam("token") String token);

    @POST
    @Path("/updateGroup/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateGroup(SmsGroup Group, @PathParam("token") String token);

    @POST
    @Path("/updateUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateUser(User user, @PathParam("token") String token);

    @PUT
    @Path("/activateClient/{mac_Address}/{token}")
    void activateClient(@PathParam("mac_Address") String mac_Address, @PathParam("token") String token);



    @GET
    @Path("/tasks/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(TaskView.Always.class)
    ArrayList<Tasks> getTasks(@PathParam("token") String token);


    @POST
    @Path("/updateClient/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateClient(Client Client, @PathParam("token") String token);
}





