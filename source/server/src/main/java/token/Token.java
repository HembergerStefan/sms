//Christian Freilinger
package token;

import lombok.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    private String userID;//speichert die ID des Benutzers
    private String role;//speichert die Rolle des Benutzers
    private SecretKeySpec secretKeySpec;//speichert den SecretKeySpec mit dem der Token dieses Nutzers verschlüsselt wurde

    @Override
    public String toString() {//verschlüssel den Token und gibt ihn als String zurück
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
