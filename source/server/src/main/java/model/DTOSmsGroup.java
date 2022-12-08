//Christian Freilinger
package model;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOSmsGroup {//Datenübertragungsklasse
    private String id;
    private String name;
    private ArrayList<DTOClient> clients;
}
