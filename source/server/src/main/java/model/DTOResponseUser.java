//Christian Freilinger
package model;


import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOResponseUser {//Datenübertragungsklasse
    private String id;
    private String username;
    private ArrayList<DTOSmsGroup> groups;
    private DTORole role;
}
