//Christian Freilinger
package model;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOPackage implements Serializable {//Datenübertragungsklasse
    private String id;
    private String name;
    private String version;
    private Timestamp date;
    private String downloadlink;
    private String silentSwitch;
}
