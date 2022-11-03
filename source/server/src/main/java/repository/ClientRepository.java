package repository;

import entity.Client;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class ClientRepository implements PanacheRepository<Client> {
    @Transactional
    public void deleteClientById(String id){
        delete("Mac_Address = ?1", id);
    }

    public Client findById(String id) {
        return find("Mac_Address", id).firstResult();
    }

}
