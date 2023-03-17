//Christian Freilinger
package controller;

import common.IWebpageResource;
import data.SMSStore;
import lombok.RequiredArgsConstructor;
import model.DTOLoginResponse;
import model.DTOUser;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@RestController
@RequiredArgsConstructor
@Path("/webpage")//Pfad für API
public class WebpageController implements IWebpageResource {
    @Inject//Dependency Injection für den SMSStore
    protected SMSStore smsStore;

    @Override
    public Response loginUser(DTOUser user) {//einlogen eines Benutzers
        String token = smsStore.loginUser(user.getName(), user.getPassword());//erstellt einen Token
        String user_ID = smsStore.getIdByToken(token);//holt die Benutzerid zu einem Token
        token = token.replaceAll("/", "汉");//tauscht alle "/" durch ein "汉" aus da sonst Fehler im Pfad entstehen
        DTOLoginResponse response = new DTOLoginResponse(token, user_ID);//DTO Objekt zum Übergeben wird erstellt
        if(token.equals("")){
            return Response.status(500)
                    .type(MediaType.TEXT_PLAIN_TYPE)
                    .entity("Wrong User or Password")
                    .build();
        }
        return Response.status(200)
                .type(MediaType.APPLICATION_JSON)
                .entity(response)
                .build();
    }




}
