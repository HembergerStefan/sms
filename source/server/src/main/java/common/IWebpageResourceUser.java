//Christian Freilinger
package common;

import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.PackageView;
import entity.jsonview.ScriptView;
import entity.jsonview.UserView;
import model.DTOInsertUser;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/webpageUser")//Pfad
public interface IWebpageResourceUser {

    @GET
    @Path("/UserById/{ID}/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(UserView.Always.class)
    Response getUserByID(@PathParam("ID") String id, @PathParam("token") String token);//holt einen Benutzer durch seine ID


    @GET
    @Path("/roles/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    Response getRoles(@PathParam("token") String token);//holt alle Rollen
    @GET
    @Path("/RoleByUser/{ID}/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(UserView.Always.class)
    Response getRoleByUser(@PathParam("ID") String id, @PathParam("token") String token);

    @GET
    @Path("/programs/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(PackageView.Always.class)
    Response getPackages(@PathParam("token") String token);//holt alle Packages


    @GET
    @Path("/scripts/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(ScriptView.Always.class)
    Response getScripts(@PathParam("token") String token);//holt alle Scripts

    @GET
    @Path("/clientScripts/{token}/{mac_Address}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(ScriptView.Always.class)
    Response getClientScriptsByClientID(@PathParam("token") String token, @PathParam("mac_Address") String client_ID);

    @POST
    @Path("/updateUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateUser(DTOInsertUser user, @PathParam("token") String token);//holt alle Benutzer



    @PUT
    @Path("/scripts/{token}/{user_id}/{mac_Address}/{script_id}")//erstellt einen Task
    void addScriptToTask(@PathParam("token") String token, @PathParam("user_id") UUID user_id, @PathParam("mac_Address") String mac_Address, @PathParam("script_id") String script_id);

    @PUT
    @Path("/package/{token}/{user_id}/{mac_Address}/{package_id}")//erstellt einen Task
    void addPackageToTask(@PathParam("token") String token, @PathParam("user_id") UUID user_id, @PathParam("mac_Address") String mac_Address, @PathParam("package_id") String package_id);
}
