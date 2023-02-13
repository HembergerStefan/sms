//Christian Freilinger
package controller;

import common.IWebpageResource;
import data.SMSStore;
import lombok.RequiredArgsConstructor;
import model.DTOLoginResponse;
import model.DTOUser;
import org.springframework.web.bind.annotation.RestController;
import token.TokenInfos;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.ArrayList;


@RestController
@RequiredArgsConstructor
@Path("/webpage")//Pfad für API
public class WebpageController implements IWebpageResource {
    @Inject//Dependency Injection für den SMSStore
    protected SMSStore smsStore;

    @Override
    public DTOLoginResponse loginUser(DTOUser user) {//einlogen eines Benutzers
        String token = smsStore.loginUser(user.getName(), user.getPassword());//erstellt einen Token
        String user_ID = smsStore.getIdByToken(token);//holt die Benutzerid zu einem Token
        token = token.replaceAll("/", "汉");//tauscht alle "/" durch ein "汉" aus da sonst Fehler im Pfad entstehen
        DTOLoginResponse response = new DTOLoginResponse(token, user_ID);//DTO Objekt zum Übergeben wird erstellt
        return response;
    }


}
