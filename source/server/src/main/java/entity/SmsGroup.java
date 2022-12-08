//Christian Freilinger
package entity;

import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.ClientView;
import entity.jsonview.GroupView;
import entity.jsonview.UserView;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "smsgroup", schema = "sms_data")
public class SmsGroup {
    @Id
    @Column(name="ID", length = 36, nullable = false)
    @JsonView(value = {ClientView.Always.class, GroupView.Always.class, UserView.Always.class})
    private String id;
    @Column(name="Name", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, GroupView.Always.class, UserView.Always.class})
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "client_group", joinColumns = @JoinColumn(name = "Group_ID"), inverseJoinColumns = @JoinColumn(name = "Client_ID"))
    @JsonView({GroupView.Always.class, UserView.Always.class})
    private List<Client> clients;

    @ManyToMany
    @JoinTable(name = "user_group", joinColumns = @JoinColumn(name = "Group_ID"), inverseJoinColumns = @JoinColumn(name = "User_ID"))
    @JsonView({GroupView.Always.class})
    private List<User> users;
}
