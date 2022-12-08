//Christian Freilinger
package repository;

import entity.Role;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;

@Repository
@ApplicationScoped
public class RoleRepository implements PanacheRepository<Role> {//Repository einer Rolle
}
