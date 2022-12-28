//Christian Freilinger
package thread;

import data.SMSStore;
import lombok.*;
import token.TokenInfos;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.ArrayList;

@ApplicationScoped
@AllArgsConstructor
public class TokenCleanerThread extends Thread {
    private SMSStore smsStore;

    public void run(){
        while(true){//läuft dauerhaft, wenn er gestartet wurde
            try{
                Thread.sleep(10000);//wartet 10 Sekunden
                if(smsStore != null){
                    var token = smsStore.getTokens();
                    for(var tokenInfo : token){//löscht alle abgelaufenen Token
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
