//Christian Freilinger
package repository;

import entity.Client_Script;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Client_ScriptRepository implements PanacheRepository<Client_Script> {//Repository eines Client_Scripts
    @Transactional
    public void deleteByScriptID(String id){
        delete("Script_ID = ?1", id);
    }//löscht ein Client_Script

    @Transactional
    public void deleteByClientID(String id){
        delete("Client_ID = ?1", id);
    }//löscht ein Client_Script
}
