package model;

import entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOInsertUser {
    private String id;
    private String username;
    private String password;
    private Role role;
}
