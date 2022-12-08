//Christian Freilinger
package token;

import lombok.*;

import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TokenInfos {
    private String token;//speichert den Token als String (verschlüsselt
    private SecretKeySpec secretKeySpec;//speichert den SecretKeySpec mit dem der Token verschlüsselt wurde
    private LocalDateTime expireDate = LocalDateTime.now().plusMinutes(15);//speichert die Zeit, an dem der Token abläuft (15 min nach der letzten Verwendung des Token)
}
