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
@Entity
@Table(name = "client_group", schema = "sms_data")
public class Client_Group implements Serializable {
    @Id
    @Column(name="Client_ID", length = 17, nullable = false)
    private String client_id;
    @Id
    @Column(name="Group_ID", length = 36, nullable = false)
    private String group_id;
}
