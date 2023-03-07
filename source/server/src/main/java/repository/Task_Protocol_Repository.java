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
}
