package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.GroupView;
import entity.jsonview.UserView;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "user", schema = "sms_data")
public class User{
    @Id
    @Column(name="ID", length = 36, nullable = false)
    @JsonView(value = {UserView.Always.class, GroupView.Always.class})
    private String id;
    @Column(name="Username", length = 45, nullable = false)
    @JsonView(value = {UserView.Always.class, GroupView.Always.class})
    private String username;
    @Column(name="Hash", length = 255, nullable = false)
    @JsonIgnore
    private String hash;
    @Column(name="Salt", length = 4, nullable = false)
    @JsonIgnore
    private String salt;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    @JsonView(UserView.Always.class)
    private List<SmsGroup> groups;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Role")
    @JsonView(UserView.Always.class)
    private Role role;
   }
