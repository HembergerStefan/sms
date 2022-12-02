package repository;


import entity.Client_Package;
import entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Client_PackageRepository implements PanacheRepository<Client_Package> {

    @Transactional
    public void deleteByPackageID(String id){
        delete("Package_ID = ?1", id);
    }

    @Transactional
    public void deleteByClientID(String id){
        delete("Client_ID = ?1", id);
    }
}
