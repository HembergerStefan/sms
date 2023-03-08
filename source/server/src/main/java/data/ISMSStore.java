//Christian Freilinger
package data;

import annotations.Adding;
import annotations.Login;
import entity.Package;
import entity.*;
import io.smallrye.common.constraint.NotNull;
import model.DTOInsertUser;
import token.TokenInfos;

import javax.crypto.spec.SecretKeySpec;
import java.util.ArrayList;
import java.util.UUID;

public interface ISMSStore{


    ArrayList<Client> getClients();

    Client getClientByID(String mac_Address);

    void deleteToken(TokenInfos tokenInfo);

    void insertClient_Script(Client_Script client_script);
    void insertClient_Package(Client_Package client_package);
    boolean isAllowed(String token, String id, @NotNull Login anno);

    boolean isInstalled(String client_id, String package_id);
    boolean isAllowed(String token, @NotNull Login anno);

    boolean isAllowed(String token, @NotNull Adding anno);

    String getRole(String token);

    boolean clientIsAvailable(String id);

    boolean availableclientIsAvailable(String id);

    String loginUser(String name, String password);

    String hashPassword(String password);

    String getIdByToken(String token);

    String decodeToken(String token);

    String generateToken(User user);

    SecretKeySpec generateKey();

    ArrayList<Package> getPackagesByIDs(ArrayList<String> ids);

    ArrayList<Script> getScriptsByIDs(ArrayList<String> ids);

    Available_Clients getAvailableClientById(String mac_Address);

    User getUserByName(String name);

    User getUserByID(String id);

    ArrayList<Task_Protocol> getTaskProtocols();

    Baseclient getBaseClientByID(String id);

    ArrayList<Tasks> getTasks();

    void insertAvailable_Client(Available_Clients availableClient);

    void insertBase_Client(Baseclient baseclient);

    void removeAvailableClient(String mac_Address);

    String generateSalt();

    void updateClient(@NotNull Client client);

    void updateAvailableClient(Available_Clients client);

    void updatePackage(Package packages);

    void updateScript(Script script);


    void updateGroup(SmsGroup group);

    void updateUser(DTOInsertUser user);

    ArrayList<Tasks> getTasksByClientID(String id);

    boolean isAllowedToAdd(String token, String user_id, String client_id);

    void insertTaskWithScript(String client_id, String script_id, String user_id, Adding add, String token);

    void insertTaskWithPackage(String client_id, String package_id, String user_id, Adding add, String token);

    void insertTaskProtocolWithScript(String client_id, String script_id);

    void insertTaskProtocolWithPackage(String client_id, String package_id);

    void removeTaskByPackageID(String id, String client_id);

    void removeTaskByScriptID(String id, String client_id);

    Tasks getTaskByPackageID(String id);

    Tasks getTaskByScriptID(String id);

    void addUserToGroup(UUID user_ID, UUID group_ID);

    void addClientToGroup(String client_ID, UUID group_ID);

    void removeUserToGroup(UUID user_ID, UUID group_ID);

    void removeClientToGroup(String client_ID, UUID group_ID);

    void changeRole(String user_ID, Role role);


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

    void insertUser(DTOInsertUser user);
}
