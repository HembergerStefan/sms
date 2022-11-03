package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.ClientView;
import entity.jsonview.PackageView;
import entity.jsonview.TaskView;
import entity.jsonview.UserView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "package", schema = "sms_data")
public class Package implements Serializable {
    @Id
    @Column(name="ID", length = 36, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String id;
    @Column(name="Name", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String name;
    @Column(name="Version", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String version;
    @Column(name="Date", nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private Timestamp date;
    @Column(name="URL", length = 255, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String downloadlink;
    @Column(name="SilentSwitch", length = 255, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String silentSwitch;
    @ManyToMany(mappedBy = "packages")
    @JsonView(PackageView.Always.class)
    private List<Client> clients;

    @OneToMany(mappedBy = "packages", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Tasks> tasks;
}
