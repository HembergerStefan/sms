//Christian Freilinger
package repository;

import entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {//Repository eines Users
    @Transactional
    public void deleteUserById(String id){
        delete("ID = ?1", id);
    }//löschen eines Users

    public User findByName(String name) {
        return find("Username", name).firstResult();
    }//finden eines Users durch seinen Namen

    public User findByID(String id) {
        return find("ID", id).firstResult();
    }//finden eines Users durch seine ID
}
