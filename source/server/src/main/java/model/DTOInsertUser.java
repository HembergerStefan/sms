package model;

import entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOInsertUser {//Datenübertragungsklasse
    private String id;
    private String username;
    private String password;
    private Role role;
}
