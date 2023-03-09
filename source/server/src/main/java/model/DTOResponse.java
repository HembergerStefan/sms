//Christian Freilinger
package model;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOResponse {//Datenübertragungsklasse
    private ArrayList<DTOPackage> dtoPackages;
    private ArrayList<DTOScript> dtoScripts;
}
