//Christian Freilinger
package model;

import lombok.*;
import java.sql.Timestamp;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOClient {//Datenübertragungsklasse
    private DTOBaseclient macAddress;
    private String name;
    private String ip;
    private Timestamp lastOnline;
    private int usedDiskspace;
    private int cpuUsage;
    private int ramUsage;
    private String os;
    private ArrayList<DTOPackage> packages;
    private ArrayList<DTOScript> scripts;
}
