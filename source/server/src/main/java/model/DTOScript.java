package model;

import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.ClientView;
import entity.jsonview.ScriptView;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOScript {
    private String id;
    private String name;
    private String description;
    private String script_value;
    private String interpreter;
    private String fileExtension;
}
