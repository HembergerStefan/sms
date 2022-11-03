package model;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOResponse {
    private ArrayList<DTOPackage> dtopackages;
    private ArrayList<DTOScript> dtoScripts;
}
