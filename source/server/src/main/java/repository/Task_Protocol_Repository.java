package repository;


import entity.Task_Protocol;
import entity.Tasks;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Repository
@ApplicationScoped
public class Task_Protocol_Repository implements PanacheRepository<Task_Protocol> {

    @Transactional
    public void deleteTasksByScript_ID(String id){
        delete("Script_ID = ?1", id);
    }//löscht einen Task


    @Transactional
    public void deleteTasksByPackage_ID(String id){//löscht einen Task
        delete("Package_ID = ?1", id);
    }

    @Transactional
    public void deleteTasksByClient_ID(String id){
        delete("Client_ID = ?1", id);
    }//löscht einen Task
}
