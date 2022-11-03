package repository;

import entity.Package;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Repository
@ApplicationScoped
public class PackageRepository implements PanacheRepository<Package> {
    @Transactional
    public void deletePackageById(String id){
        delete("ID = ?1", id);
    }

    public Package findById(String id) {
        return find("ID", id).firstResult();
    }
}
