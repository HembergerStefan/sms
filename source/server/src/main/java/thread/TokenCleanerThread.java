package thread;

import data.SMSStore;
import lombok.*;
import org.graalvm.nativeimage.Platform;
import token.TokenInfos;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@ApplicationScoped
@AllArgsConstructor
public class TokenCleanerThread extends Thread {
    private SMSStore smsStore;

    public void run(){
        while(true){
            try{
                if(smsStore != null){
                    ArrayList<TokenInfos> token = smsStore.getTokens();
                    for(TokenInfos tokenInfo : token){
                        if(tokenInfo.getExpireDate().isBefore(LocalDateTime.now())){
                            smsStore.deleteToken(tokenInfo);
                        }
                    }
                }
            }catch(Exception e){
                System.err.println(e.getMessage());
            }
        }
    }
}
