//Christian Freilinger
package entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "available_clients", schema = "sms_data")
public class Available_Clients implements Serializable {
    @Id
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "Mac_Address", referencedColumnName = "Mac_Address")
    private Baseclient macAddress;
    @Column(name="Name", length = 45, nullable = false)
    private String name;
    @Column(name="IP", length = 16, nullable = false)
    private String ip;
}
