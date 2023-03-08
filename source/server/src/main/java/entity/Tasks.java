//Christian Freilinger
package entity;

import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.TaskView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task", schema = "sms_data")
public class Tasks implements Serializable {
    @Id
    @Column(name="ID",length = 36, nullable = false)
    @JsonView(TaskView.Always.class)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Client_ID",nullable = false)
    @JsonView(TaskView.Always.class)
    private Client client;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Package_ID")
    @JsonView(TaskView.Always.class)
    private Package packages;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Script_ID")
    @JsonView(TaskView.Always.class)
    private Script script;
}
