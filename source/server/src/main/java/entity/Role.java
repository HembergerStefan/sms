package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "role", schema = "sms_data")
public class Role {
    @Id
    @Column(name = "ID", length = 36, nullable = false)
    private String id;

    @Column(name = "Name", length = 45, nullable = false)
    private String name;

  /*  @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<User> users;*/
}
