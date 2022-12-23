//Christian Freilinger
package model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOLoginResponse {//Datenübertragungsklasse
    private String token;
    private String user_ID;
}
