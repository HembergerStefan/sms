//Christian Freilinger
package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.ClientView;
import entity.jsonview.ScriptView;
import entity.jsonview.TaskView;
import entity.jsonview.UserView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "script", schema = "sms_data")
public class Script implements Serializable {
    @Id
    @Column(name="ID", length = 36, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String id;
    @Column(name="Name", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String name;
    @Column(name="Description", length = 500, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String description;
    @Column(name="Script_Value", length = 5000, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String script_value;
    @Column(name="Interpreter", length = 20, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String interpreter;
    @Column(name="FileExtension", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, ScriptView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String fileExtension;
    @ManyToMany(mappedBy = "script")
    @JsonView(ScriptView.Always.class)
    private List<Client> clients;


    @OneToMany(mappedBy = "script", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Tasks> tasks;
}
