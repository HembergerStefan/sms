package model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOUser {//Datenübertragungsklasse
    private String name;
    private String password;
}
