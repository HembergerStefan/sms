package model;

import entity.User;
import lombok.*;

import javax.websocket.Session;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOUserSession {
    private String user_id;
    private Session session;
}
