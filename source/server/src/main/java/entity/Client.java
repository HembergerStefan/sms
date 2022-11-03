package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import entity.jsonview.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "client", schema = "sms_data")
public class Client implements Serializable {
    @Id
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "Mac_Address", referencedColumnName = "Mac_Address")
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class, TaskView.Always.class, UserView.Always.class})
    private Baseclient macAddress;
    @Column(name="Name", length = 45, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String name;
    @Column(name="IP", length = 16, nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class, TaskView.Always.class, UserView.Always.class})
    private String ip;
    @Column(name="Last_Online", nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class, TaskView.Always.class, UserView.Always.class})
    private Timestamp lastOnline;
    @Column(name="Used_Diskspace", nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class, TaskView.Always.class, UserView.Always.class})
    private int usedDiskspace;
    @Column(name="CPU_Usage", nullable = false)
    @JsonView(value = {ClientView.Always.class, PackageView.Always.class, ScriptView.Always.class, GroupView.Always.class,TaskView.Always.class, UserView.Always.class})
    private int cpuUsage;

    @ManyToMany
    @JoinTable(name = "client_package", joinColumns = @JoinColumn(name = "Client_ID"), inverseJoinColumns = @JoinColumn(name = "Package_ID"))
    @JsonView({ClientView.Always.class, UserView.Always.class})
    private List<Package> packages;

    @ManyToMany
    @JoinTable(name = "client_script", joinColumns = @JoinColumn(name = "Client_ID"), inverseJoinColumns = @JoinColumn(name = "Script_ID"))
    @JsonView({ClientView.Always.class, UserView.Always.class})
    private List<Script> script;

    @ManyToMany(mappedBy = "clients")
    @JsonView(ClientView.Always.class)
    private List<SmsGroup> groups;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Tasks> tasks;

}
