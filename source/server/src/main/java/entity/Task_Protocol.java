package entity;


import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.TaskView;
import io.quarkus.arc.All;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "task_protocol", schema = "sms_data")
public class Task_Protocol implements Serializable {
    @Id
    @Column(name="ID",length = 36, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Client_ID",nullable = false)
    private Client client;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Package_ID")
    private Package packages;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Script_ID")
    private Script script;
}
