//Christian Freilinger
package common;

import model.DTOLoginResponse;
import model.DTOUser;
import token.TokenInfos;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

@Path("/webpage")//Pfad für API
public interface IWebpageResource {


    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    DTOLoginResponse loginUser(DTOUser user);//Methode zum Einloggen eines Benutzers

    @GET
    @Path("/tokens")
    @Produces(MediaType.APPLICATION_JSON)
    ArrayList<TokenInfos> getToken();



}
