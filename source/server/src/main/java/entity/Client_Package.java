package entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "client_package", schema = "sms_data")
public class Client_Package implements Serializable {
    @Id
    @Column(name="Client_ID", length = 17, nullable = false)
    private String client_id;
    @Id
    @Column(name="Package_ID", length = 36, nullable = false)
    private String package_id;
}
