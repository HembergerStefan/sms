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
    private String token;
    private SecretKeySpec secretKeySpec;
    private LocalDateTime expireDate = LocalDateTime.now().plusMinutes(1511);
}
