package repository;

import entity.SmsGroup;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class GroupRepository implements PanacheRepository<SmsGroup> {
    @Transactional
    public void deleteGroupById(String id){
        delete("ID = ?1", id);
    }

    public SmsGroup findById(String id) {
        return find("ID", id).firstResult();
    }
}