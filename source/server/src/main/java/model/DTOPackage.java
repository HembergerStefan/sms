package model;

import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.ClientView;
import entity.jsonview.PackageView;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOPackage implements Serializable {
    private String id;
    private String name;
    private String version;
    private Timestamp date;
    private String downloadlink;
    private String silentSwitch;
}
