package repository;


import entity.Client_Group;
import entity.Client_Script;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Client_GroupRepository implements PanacheRepository<Client_Group> {
    @Transactional
    public void deleteByClientID(String id){
        delete("Client_ID = ?1", id);
    }
}
