package data;

import entity.Package;
import entity.*;
import model.DTOInsertUser;

import java.util.ArrayList;
import java.util.UUID;

public interface ISMSStore{


    ArrayList<Client> getClients();

    void insertNewClient(String id, String name);





    ArrayList<SmsGroup> getGroups();

    ArrayList<Package> getPackages();

    ArrayList<Script> getScripts();


    ArrayList<User> getUsers();



    ArrayList<Role> getRoles();
    void removeClient(String id);

    void removeGroup(UUID id);

    void removePackage(UUID id);

    void removeScript(UUID id);

    void removeUser(UUID id);



    void insertClient(Client client);



    void insertPackage(Package packages);

    void insertScript(Script script);


    void insertSmsGroup(SmsGroup smsGroup);

    void insertTask(Tasks task);

    void insertUser(DTOInsertUser user);
}
