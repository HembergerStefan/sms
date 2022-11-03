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
@Path("/webpage")
public class WebpageController implements IWebpageResource {
    @Inject
    protected SMSStore smsStore;



    @Override
    public DTOLoginResponse loginUser(DTOUser user) {
        String token = smsStore.loginUser(user.getName(), user.getPassword());
        String user_ID = smsStore.getIdByToken(token);
        DTOLoginResponse response = new DTOLoginResponse(token, user_ID);
        return response;
    }

    @Override
    public ArrayList<TokenInfos> getToken() {
        return smsStore.getTokens();
    }


}
