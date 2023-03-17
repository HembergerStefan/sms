//Christian Freilinger
package common;

import model.DTOUser;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/webpage")//Pfad für API
public interface IWebpageResource {


    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Response loginUser(DTOUser user);//Methode zum Einloggen eines Benutzers




}
