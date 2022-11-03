package token;

import lombok.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.Base64;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    private String userID;
    private String role;
    private SecretKeySpec secretKeySpec;

    @Override
    public String toString(){
        String token = userID + "/" + role;
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            return Base64.getEncoder()
                    .encodeToString(cipher.doFinal(token.getBytes("UTF-8")));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return null;
    }
}
