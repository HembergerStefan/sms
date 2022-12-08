package repository;

import entity.Tasks;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Repository
@ApplicationScoped
public class TasksRepository implements PanacheRepository<Tasks> {//Repository eines Tasks

    @Transactional
    public ArrayList<Tasks> getTastksByClientId(String client_ID){//findet einen Task über die Client-ID
        return (ArrayList<Tasks>) find("Client_ID", client_ID).list();
    }

    public Tasks findByPackage_ID(String id) {
        return find("Package_ID", id).firstResult();
    }//findet einen Task über die Package-ID

    public Tasks findByScript_ID(String id) {
        return find("Script_ID", id).firstResult();
    }//findet einen Task über die Script-ID


    @Transactional
    public void deleteTasksByPackage_ID(String id, String client_id){//löscht einen Task
        delete("Package_ID = ?1 and Client_ID = ?2", id, client_id);
    }

    @Transactional
    public void deleteTasksByPackage_ID(String id){//löscht einen Task
        delete("Package_ID = ?1", id);
    }

    @Transactional
    public void deleteTasksByClient_ID(String id){
        delete("Client_ID = ?1", id);
    }//löscht einen Task


    @Transactional
    public void deleteTasksByScript_ID(String id, String client_id){//löscht einen Task
        delete("Script_ID = ?1 and Client_ID = ?2", id, client_id);
    }

    @Transactional
    public void deleteTasksByScript_ID(String id){
        delete("Script_ID = ?1", id);
    }//löscht einen Task


}
