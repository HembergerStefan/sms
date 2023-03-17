//Christian Freilinger
package model;


import lombok.*;

import javax.websocket.Session;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOClientSession {//Datenübertragungsklasse
    private String macAddress;
    private Session session;
}
