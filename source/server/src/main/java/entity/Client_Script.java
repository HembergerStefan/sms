//Christian Freilinger
package entity;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "client_script", schema = "sms_data")
public class Client_Script implements Serializable {
    @Id
    @Column(name="Script_ID", length = 36, nullable = false)
    private String script_id;
    @Id
    @Column(name="Client_ID", length = 36, nullable = false)
    private String client_id;
    @Column(name="Last_Execute")
    private Timestamp last_execute;
}
