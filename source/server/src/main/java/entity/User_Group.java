//Christian Freilinger
package entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "user_group", schema = "sms_data")
public class User_Group implements Serializable {
    @Id
    @Column(name="User_ID", length = 36, nullable = false)
    private String user_id;
    @Id
    @Column(name="Group_ID", length = 36, nullable = false)
    private String group_id;
}
