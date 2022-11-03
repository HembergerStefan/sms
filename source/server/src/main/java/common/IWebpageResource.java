package common;

import com.fasterxml.jackson.annotation.JsonView;
import entity.Package;
import entity.*;
import entity.jsonview.*;
import model.DTOLoginResponse;
import model.DTOUser;
import token.TokenInfos;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.UUID;

@Path("/webpage")
public interface IWebpageResource {


    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    DTOLoginResponse loginUser(DTOUser user);

    @GET
    @Path("/token")
    @Produces(MediaType.APPLICATION_JSON)
    ArrayList<TokenInfos> getToken();


}
