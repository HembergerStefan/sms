//Christian Freilinger
package model;


import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOScript {//Datenübertragungsklasse
    private String id;
    private String name;
    private String description;
    private String script_value;
    private String interpreter;
    private String fileExtension;
}
