package common;

import com.fasterxml.jackson.annotation.JsonView;
import entity.Package;
import entity.Script;
import entity.Tasks;
import entity.User;
import entity.jsonview.PackageView;
import entity.jsonview.ScriptView;
import entity.jsonview.UserView;
import model.DTOInsertUser;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.UUID;

@Path("/webpageUser")
public interface IWebpageResourceUser {

    @GET
    @Path("/UserById/{ID}/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(UserView.Always.class)
    User getUserByID(@PathParam("ID") String id, @PathParam("token") String token);

    @GET
    @Path("/programs/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(PackageView.Always.class)
    ArrayList<Package> getPrograms(@PathParam("token") String token);


    @GET
    @Path("/scripts/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @JsonView(ScriptView.Always.class)
    ArrayList<Script> getScripts(@PathParam("token") String token);

    @POST
    @Path("/updateUser/{token}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    void updateUser(DTOInsertUser user, @PathParam("token") String token);



    @PUT
    @Path("/scripts/{token}/{user_id}/{mac_Address}/{script_id}")
    void addScriptToTask(@PathParam("token") String token, @PathParam("user_id") UUID user_id, @PathParam("mac_Address") String mac_Address, @PathParam("script_id") String script_id);

    @PUT
    @Path("/package/{token}/{user_id}/{mac_Address}/{package_id}")
    void addPackageToTask(@PathParam("token") String token, @PathParam("user_id") UUID user_id, @PathParam("mac_Address") String mac_Address, @PathParam("package_id") String package_id);
}
