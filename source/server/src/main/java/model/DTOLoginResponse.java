package model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOLoginResponse {
    private String token;
    private String user_ID;
}
