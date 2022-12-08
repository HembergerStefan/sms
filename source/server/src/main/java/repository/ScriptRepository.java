package repository;

import entity.Script;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class ScriptRepository implements PanacheRepository<Script> {//Repository eines Scriptes
    @Transactional
    public void deleteScriptById(String id){
        delete("ID = ?1", id);
    }//löschen eines Scripts

    public Script findById(String id) {
        return find("ID", id).firstResult();
    }//finden eines Scripts durch die ID
}
