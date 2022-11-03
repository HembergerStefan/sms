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
@Table(name = "baseclient", schema = "sms_data")
public class Baseclient implements Serializable {
    @Id
    @Column(name="Mac_Address", length = 17, nullable = false)
    private String macAddress;
}
