//Christian Freilinger
package repository;


import entity.Baseclient;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Base_ClientRepository implements PanacheRepository<Baseclient> {//Repository für den Base_Client

    public Baseclient findById(String id) {
        return find("Mac_Address", id).firstResult();
    }//findet einen Base_Client durch seine ID

    @Transactional
    public void deleteByClientID(String id){
        delete("Mac_Address = ?1", id);
    }//löscht einen Base_Client
}
