package repository;

import entity.Available_Clients;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Available_ClientsRepository implements PanacheRepository<Available_Clients> {//Repository für Available_Clients
    @Transactional
    public void deleteAvailableClientById(String id) {
        delete("Mac_Address = ?1", id);
    }//löscht einen Available_Client

    public Available_Clients findById(String id) {
        return find("Mac_Address", id).firstResult();
    }//findet einen Available_Client durch seine ID
}
