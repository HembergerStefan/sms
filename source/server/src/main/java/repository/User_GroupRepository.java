package repository;

import entity.Client_Group;
import entity.User_Group;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class User_GroupRepository implements PanacheRepository<User_Group> {
    @Transactional
    public void deleteByGroupID(String id){
        delete("Group_ID = ?1", id);
    }

    @Transactional
    public void deleteByGroupIDAndUserID(String group_ID, String user_ID){
        delete("Group_ID = ?1 and User_ID = ?2", group_ID, user_ID);
    }

    @Transactional
    public void deleteByUserID(String id){
        delete("User_ID = ?1", id);
    }
}
