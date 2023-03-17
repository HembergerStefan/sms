//Christian Freilinger
package repository;


import entity.Client_Group;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Client_GroupRepository implements PanacheRepository<Client_Group> {//Repository einer Client_Group
    @Transactional
    public void deleteByClientID(String id){
        delete("Client_ID = ?1", id);
    }//löscht eine Client_Group

    @Transactional
    public void deleteByGroupID(String id){
        delete("Group_ID = ?1", id);
    }//löscht eine Client_Group

    @Transactional
    public void deleteByGroupIDAndClientID(String group_ID, String client_ID){//löscht eine Client_Group
        delete("Group_ID = ?1 and Client_ID = ?2", group_ID, client_ID);
    }
}
