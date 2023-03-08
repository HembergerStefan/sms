//Christian Freilinger
package repository;


import entity.Client_Package;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class Client_PackageRepository implements PanacheRepository<Client_Package> {//Repository eines Client_Packages

    @Transactional
    public void deleteByPackageID(String id){
        delete("Package_ID = ?1", id);
    }//löscht ein Client_Package

    @Transactional
    public void deleteByClientID(String id){
        delete("Client_ID = ?1", id);
    }//löscht ein Client_Package



    public Client_Package findById(String client_id, String package_id){
        return (Client_Package) find("Client_ID = ?1 and Package_ID = ?2", client_id, package_id);
    }

}
