//Christian Freilinger
package data;

import annotations.Adding;
import annotations.Login;
import entity.Package;
import entity.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.DTOInsertUser;
import org.jetbrains.annotations.NotNull;
import repository.*;

import thread.TokenCleanerThread;
import token.Token;
import token.TokenInfos;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;
import javax.transaction.UserTransaction;
import java.io.Serializable;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.*;


@Named
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class SMSStore implements ISMSStore, Serializable {


    @Resource
    @Inject//Transaktion
    protected UserTransaction userTransaction;
    private final TokenCleanerThread cleaner = new TokenCleanerThread(this);//Thread zu löschen abgelaufener Token
    private final ClientRepository clientRepository;//Repository
    private final GroupRepository groupRepository;//Repository
    private final PackageRepository packageRepository;//Repository
    private final ScriptRepository scriptRepository;//Repository
    private final TasksRepository tasksRepository;//Repository
    private final UserRepository userRepository;//Repository
    private final Available_ClientsRepository available_clientsRepository;//Repository
    private final RoleRepository roleRepository;//Repository
    private final Base_ClientRepository baseClientRepository;//Repository
    private final Client_GroupRepository client_groupRepository;//Repository
    private final Client_ScriptRepository client_scriptRepository;//Repository
    private final Client_PackageRepository client_packageRepository;//Repository
    private final User_GroupRepository user_groupRepository;//Repository

    private final Task_Protocol_Repository task_protocol_repository;
    private final ArrayList<TokenInfos> tokens = new ArrayList<>();//Liste mit allen gültigen Token

    @Override
    public ArrayList<Client> getClients() {
        return (ArrayList<Client>) clientRepository.findAll().list();
    }//holt alle Clients


    @PostConstruct//Post Constructor
    public void init() {
        cleaner.start();//startet den Thread
    }

    @Override
    public Client getClientByID(String mac_Address) {
        return clientRepository.findById(mac_Address);
    }//holt einen Client durch seine ID

    @Override
    public void deleteToken(TokenInfos tokenInfo) {
        tokens.remove(tokenInfo);
    }//löscht einen Token aus der Liste

    @Override
    public boolean isAllowed(String token, String id, @NotNull Login anno) {//überprüft, ob ein Zugriff mit diesem Token erlaubt ist
        if (getIdByToken(token).equals(id)) {
            String[] roles = anno.roles();
            for (String role : roles) {
                if (role.equals(getRole(token))) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public boolean isAllowed(String token, @NotNull Login anno) {//überprüft, ob ein Zugriff mit diesem Token erlaubt ist
        String[] roles = anno.roles();
        for (String role : roles) {
            if (role.equals(getRole(token))) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean isAllowed(String token, @NotNull Adding anno) {//überprüft, ob ein Zugriff mit diesem Token erlaubt ist
        String[] roles = anno.roles();
        for (String role : roles) {
            if (role.equals(getRole(token))) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String getRole(String token) {//holt alle Rollen
        try {
            String decodedToken = decodeToken(token);
            String[] infos = decodedToken.split("/");
            return infos[1];
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return null;
    }

    @Override
    public List<Client_Script> getClientScriptsByClient(String client_ID){
        try{
            return client_scriptRepository.findById(client_ID);
        }catch(Exception e){
            System.err.println(e.getMessage());
        }
        return null;
    }

    @Override
    public boolean clientIsAvailable(String id) {//schaut, ob ein Client verfügbar ist
        ArrayList<Client> clients = (ArrayList<Client>) clientRepository.findAll().list();
        for (Client client : clients) {
            if (client.getMacAddress().getMacAddress().equals(id)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean availableclientIsAvailable(String id) {//schaut, ob ein Available_Client verfügbar ist
        ArrayList<Available_Clients> clients = (ArrayList<Available_Clients>) available_clientsRepository.findAll().list();
        for (Available_Clients client : clients) {
            if (client.getMacAddress().getMacAddress().equals(id)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String loginUser(String name, String password) {//einloggen eines Benutzers
        String token = "";
        User user = getUserByName(name);
        if (user != null) {
            String salt = user.getSalt();
            String hashedPassword = hashPassword(password + salt);
            if (user.getHash().equals(hashedPassword)) {
                token = generateToken(user);
            } else {
                token = "";
            }
        } else {
            token = "";
        }
        return token;
    }

    @Override
    public String hashPassword(String password) {//hashen des Passwortes zum Speichern in der Datenbank
        String ret = "";
        try {
            MessageDigest messagedigest = MessageDigest.getInstance("SHA-1");
            messagedigest.reset();
            messagedigest.update(password.getBytes("utf8"));
            ret = String.format("%040x", new BigInteger(1, messagedigest.digest()));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return ret;
    }

    @Override
    public String getIdByToken(String token) {//holt die ID aus einem Token
        try {
            String id = "";
            String replacedToken = token.replaceAll("汉", "/");
            replacedToken = replacedToken.replaceAll("%E6%B1%89", "/");
            String decodedToken = decodeToken(replacedToken);
            if (decodedToken != null) {
                String[] infos = decodedToken.split("/");
                if (infos.length != 0) {
                    id = infos[0];
                }
            }
            return id;
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return "";
    }

    @Override
    public String decodeToken(String token) {//dekodiert einen Token
        String replacedToken = token.replaceAll("汉", "/");
        SecretKeySpec sk = null;
        for (TokenInfos tokenInfo : tokens) {
            if (tokenInfo.getToken().equals(replacedToken)) {
                tokenInfo.setExpireDate(LocalDateTime.now().plusMinutes(20));
                sk = tokenInfo.getSecretKeySpec();
            }
        }
        if (sk != null) {
            Cipher cipher;
            try {
                cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
                cipher.init(Cipher.DECRYPT_MODE, sk);
                return new String(cipher.doFinal(Base64.getDecoder().decode(replacedToken)));
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        return null;
    }

    @Override
    public String generateToken(User user) {//generriert einen Token
        Token t = null;
        try {
            t = new Token();
            t.setUserID(user.getId());
            t.setRole(user.getRole().getName());
            SecretKeySpec sk = generateKey();
            t.setSecretKeySpec(sk);
            TokenInfos tokenInfos = new TokenInfos();
            tokenInfos.setSecretKeySpec(sk);
            tokenInfos.setToken(t.toString());
            tokens.add(tokenInfos);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        assert t != null;
        return t.toString();
    }

    @Override
    public SecretKeySpec generateKey() {//generriert einen Schlüssel
        SecretKeySpec secretKeySpec = null;
        MessageDigest sha = null;
        try {
            String keyStr = UUID.randomUUID().toString();
            byte[] key = keyStr.getBytes("UTF-8");
            sha = MessageDigest.getInstance("SHA-1");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKeySpec = new SecretKeySpec(key, "AES");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return secretKeySpec;
    }

    @Override
    public ArrayList<Package> getPackagesByIDs(ArrayList<String> ids) {//holt packages durch IDs
        ArrayList<Package> packages = new ArrayList<>();
        for (String id : ids) {
            packages.add(packageRepository.findById(id));
        }
        return packages;
    }

    @Override
    public ArrayList<Script> getScriptsByIDs(ArrayList<String> ids) {//hold scripts durch IDs
        ArrayList<Script> packages = new ArrayList<>();
        for (String id : ids) {
            packages.add(scriptRepository.findById(id));
        }
        return packages;
    }

    @Override
    public ArrayList<Role> getRoles() {
        return (ArrayList<Role>) roleRepository.findAll().list();
    }//holt alle Rollen

    @Override
    public Available_Clients getAvailableClientById(String mac_Address) {//holt einen Available_Client durch eine ID
        return available_clientsRepository.findById(mac_Address);
    }

    public ArrayList<Available_Clients> getAvailableClients() {
        return (ArrayList<Available_Clients>) available_clientsRepository.findAll().list();
    }

    @Override
    public ArrayList<SmsGroup> getGroups() {
        return (ArrayList<SmsGroup>) groupRepository.findAll().list();
    }//holt alle Gruppen

    @Override
    public ArrayList<Package> getPackages() {
        return (ArrayList<Package>) packageRepository.findAll().list();
    }//holt alle Packages

    @Override
    public ArrayList<Script> getScripts() {
        return (ArrayList<Script>) scriptRepository.findAll().list();
    }//holt alle Scripts

    @Override
    public ArrayList<User> getUsers() {
        return (ArrayList<User>) userRepository.findAll().list();
    }//holt alle Benutzer

    @Override
    public User getUserByName(String name) {
        return userRepository.findByName(name);
    }//holt einen Benutzer durch seinen Namen

    @Override
    public User getUserByID(String id) {
        return userRepository.findByID(id);
    }//holt einen Benutzer durch seine ID

    @Override
    public Baseclient getBaseClientByID(String id) {
        return baseClientRepository.findById(id);
    }//holt einen BaseClient durch eine ID

    @Override
    @Transactional
    public ArrayList<Tasks> getTasks() {
        return (ArrayList<Tasks>) tasksRepository.findAll().list();
    }//holt alle Tasks


    @Override
    @Transactional
    public ArrayList<Task_Protocol> getTaskProtocols() {
        return (ArrayList<Task_Protocol>) task_protocol_repository.findAll().list();
    }

    @Override
    public void removeClient(@NotNull String id) {//löscht einen Client
        tasksRepository.deleteTasksByClient_ID(id);
        task_protocol_repository.deleteTasksByClient_ID(id);
        client_packageRepository.deleteByClientID(id);
        client_scriptRepository.deleteByClientID(id);
        client_groupRepository.deleteByClientID(id);
        clientRepository.deleteClientById(id);
        baseClientRepository.deleteByClientID(id);
    }

    @Override
    public void removeGroup(@NotNull UUID id) {//löscht eine Gruppe
        user_groupRepository.deleteByGroupID(id.toString());
        client_groupRepository.deleteByGroupID(id.toString());
        groupRepository.deleteGroupById(id.toString());
    }


    @Override
    @Transactional
    public void insertClient_Script(Client_Script client_script) {
        client_scriptRepository.persist(client_script);
    }

    @Override
    @Transactional
    public void insertClient_Package(Client_Package client_package) {
        client_packageRepository.persist(client_package);
    }


    @Override
    @Transactional
    public void removePackage(@NotNull UUID id) {//löscht ein Package
        tasksRepository.deleteTasksByPackage_ID(id.toString());
        task_protocol_repository.deleteTasksByPackage_ID(id.toString());
        client_packageRepository.deleteByPackageID(id.toString());
        packageRepository.deletePackageById(id.toString());
    }

    @Override
    public void removeScript(@NotNull UUID id) {//löscht ein Script
        tasksRepository.deleteTasksByScript_ID(id.toString());
        task_protocol_repository.deleteTasksByScript_ID(id.toString());
        client_scriptRepository.deleteByScriptID(id.toString());
        scriptRepository.deleteScriptById(id.toString());
    }

    @Override
    public void removeUser(@NotNull UUID id) {//löscht einen Benutzer
        user_groupRepository.deleteByUserID(id.toString());
        userRepository.deleteUserById(id.toString());
    }

    @Override
    public void removeAvailableClient(String mac_Address) {//löscht einen AvailableClient
        available_clientsRepository.deleteAvailableClientById(mac_Address);
    }

    @Override
    @Transactional
    public void insertAvailable_Client(Available_Clients availableClient) {//fügt einen AvailableClient hinzu
        available_clientsRepository.persist(availableClient);
    }

    @Override
    @Transactional
    public void insertBase_Client(Baseclient baseclient) {
        baseClientRepository.persist(baseclient);
    }//fügt einen BaseClient hinzu

    @Override
    @Transactional
    public void insertClient(Client client) {
        clientRepository.persist(client);
    }//fügt einen Client hinzu

    @Override
    @Transactional
    public void insertPackage(Package packages) {//fügt ein Package hinzu
        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (Package package_ : getPackages()) {
            if (package_.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            packages.setId(uuid.toString());
            packageRepository.persist(packages);
        } else {
            insertPackage(packages);
        }
    }

    @Override
    @Transactional
    public void insertScript(Script script) {//fügt ein Script hinzu
        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (Script script_ : getScripts()) {
            if (script_.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            script.setId(uuid.toString());
            scriptRepository.persist(script);
        } else {
            insertScript(script);
        }
    }

    @Override
    @Transactional
    public void insertSmsGroup(SmsGroup smsGroup) {//fügt eine Gruppe hinzu
        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (SmsGroup group_ : getGroups()) {
            if (group_.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            smsGroup.setId(uuid.toString());
            groupRepository.persist(smsGroup);
        } else {
            insertSmsGroup(smsGroup);
        }
    }

    @Override
    @Transactional
    public void insertUser(DTOInsertUser user) {//fügt einen Benutzer hinzu

        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (User user_ : getUsers()) {
            if (user_.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            String salt = generateSalt();
            String password = hashPassword(user.getPassword() + salt);
            User user_ = new User(uuid.toString(), user.getUsername(), password, salt, new ArrayList<>(), user.getRole());
            userRepository.persist(user_);
        } else {
            insertUser(user);
        }
    }

    @Override
    public String generateSalt() {//generiert ein Salt
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int length = 4;
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(alphabet.length());
            char randomChar = alphabet.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    @Override
    @Transactional
    public void updateClient(@NotNull Client client) {//updated einen Client
        Client realClient = clientRepository.findById(client.getMacAddress().getMacAddress());
        realClient.setName(client.getName());
        realClient.setIp(client.getIp());
        realClient.setLastOnline(client.getLastOnline());
        realClient.setCpuUsage(client.getCpuUsage());
        realClient.setUsedDiskspace(client.getUsedDiskspace());
       /* realClient.setPackages(client.getPackages());
        realClient.setScript(client.getScript());*/
        clientRepository.getEntityManager().merge(realClient);
    }

    public boolean isInstalled(String client_id, String package_id) {
        Client_Package client_package = client_packageRepository.findById(client_id, package_id);
        if (client_package == null) {
            return false;
        }
        return true;
    }

    @Override
    @Transactional
    public void updateAvailableClient(Available_Clients client) {//updated einen AvailableClient
        Available_Clients realClient = available_clientsRepository.findById(client.getMacAddress().getMacAddress());
        realClient.setName(client.getName());
        realClient.setIp(client.getIp());
        available_clientsRepository.getEntityManager().merge(realClient);
    }

    @Override
    @Transactional
    public void updatePackage(Package packages) {//updated ein Package
        Package package_ = packageRepository.findById(packages.getId());
        package_.setName(packages.getName());
        package_.setVersion(packages.getVersion());
        package_.setDate(packages.getDate());
        package_.setDownloadLink(packages.getDownloadLink());
        package_.setSilentSwitch(packages.getSilentSwitch());
        packageRepository.getEntityManager().merge(package_);
    }

    @Override
    @Transactional
    public void updateScript(Script script) {//updated ein Script
        Script script_ = scriptRepository.findById(script.getId());
        script_.setName(script.getName());
        script_.setDescription(script.getDescription());
        script_.setFileExtension(script.getFileExtension());
        script_.setInterpreter(script.getInterpreter());
        script_.setScriptValue(script.getScriptValue());
        scriptRepository.getEntityManager().merge(script_);
    }

    @Override
    @Transactional
    public void updateGroup(SmsGroup group) {//updated eine Gruppe
        SmsGroup group_ = groupRepository.findById(group.getId());
        group_.setName(group.getName());
        groupRepository.getEntityManager().merge(group_);
    }

    @Override
    @Transactional
    public void updateUser(DTOInsertUser user) {//updadted einen User
        User user_ = userRepository.findByID(user.getId());
        String password = hashPassword(user.getPassword() + user_.getSalt());
        user_.setUsername(user.getUsername());
        if (user.getPassword() != null && user.getPassword() != "") {
            user_.setHash(password);
        }
        userRepository.getEntityManager().merge(user_);
    }

    @Override
    @Transactional
    public ArrayList<Tasks> getTasksByClientID(String id) {
        return tasksRepository.getTastksByClientId(id);
    }//holt Tasks durch eine Client-ID

    @Override
    public boolean isAllowedToAdd(String token, String user_id, String client_id) {//überprüft ob der Token für das hinzufügen gültig ist
        if (getIdByToken(token).contains(user_id)) {
            ArrayList<Client> clients = new ArrayList<>();
            User user = userRepository.findByID(user_id);
            for (SmsGroup group : user.getGroups()) {
                clients.addAll(group.getClients());
            }
            for (Client client : clients) {
                System.out.println(client.getMacAddress());
                if (client.getMacAddress().getMacAddress().equals(client_id)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    @Transactional
    public void insertTaskWithScript(String client_id, String script_id, String user_id, Adding add, String token) {//erstellt einen Task
        if (isAllowed(token, add) || isAllowedToAdd(token, user_id, client_id)) {
            UUID uuid = UUID.randomUUID();
            boolean isUnique = true;
            for (Tasks task_ : getTasks()) {
                if (task_.getId().equals(uuid.toString())) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                Client client = clientRepository.findById(client_id);
                Script script = scriptRepository.findById(script_id);
                Tasks task = new Tasks(uuid.toString(), client, null, script);
                tasksRepository.persist(task);
            } else {
                insertTaskWithScript(client_id, script_id, user_id, add, token);
            }
        }
    }

    @Override
    @Transactional
    public void insertTaskWithPackage(String client_id, String package_id, String user_id, Adding add, String token) {//erstellt einen Task
        if (isAllowed(token, add) || isAllowedToAdd(token, user_id, client_id)) {
            UUID uuid = UUID.randomUUID();
            boolean isUnique = true;
            for (Tasks task_ : getTasks()) {
                if (task_.getId().equals(uuid.toString())) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                Client client = clientRepository.findById(client_id);
                Package package_ = packageRepository.findById(package_id);
                Tasks task = new Tasks(uuid.toString(), client, package_, null);
                tasksRepository.persist(task);
            } else {
                insertTaskWithPackage(client_id, package_id, user_id, add, token);
            }
        }
    }


    @Override
    @Transactional
    public void insertTaskProtocolWithScript(String client_id, String script_id) {//erstellt einen Task
        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (Task_Protocol task_protocol : getTaskProtocols()) {
            if (task_protocol.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            Client client = clientRepository.findById(client_id);
            Script script = scriptRepository.findById(script_id);
            Task_Protocol task_protocol = new Task_Protocol(uuid.toString(), client, null, script);
            task_protocol_repository.persist(task_protocol);
        } else {
            insertTaskProtocolWithScript(client_id, script_id);
        }
    }

    @Override
    @Transactional
    public void insertTaskProtocolWithPackage(String client_id, String package_id) {//erstellt einen Task
        UUID uuid = UUID.randomUUID();
        boolean isUnique = true;
        for (Task_Protocol task_protocol : getTaskProtocols()) {
            if (task_protocol.getId().equals(uuid.toString())) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            Client client = clientRepository.findById(client_id);
            Package package_ = packageRepository.findById(package_id);
            Task_Protocol task_protocol = new Task_Protocol(uuid.toString(), client, package_, null);
            task_protocol_repository.persist(task_protocol);
        } else {
            insertTaskProtocolWithPackage(client_id, package_id);
        }
    }


    @Override
    @Transactional
    public void removeTaskByPackageID(String id, String client_id) {//löscht einen Task
        tasksRepository.deleteTasksByPackage_ID(id, client_id);
    }

    @Override
    @Transactional
    public void removeTaskByScriptID(String id, String client_id) {//löscht einen Task
        tasksRepository.deleteTasksByScript_ID(id, client_id);
    }

    @Override
    public Tasks getTaskByPackageID(String id) {
        return tasksRepository.findByPackage_ID(id);
    }//löscht einen Task

    @Override
    public Tasks getTaskByScriptID(String id) {
        return tasksRepository.findByScript_ID(id);
    }//löscht einen Task

    @Override
    @Transactional
    public void addUserToGroup(UUID user_ID, UUID group_ID) {//fügt einen Benutzer in eine Gruppe hinzu
        User_Group user_group = new User_Group(user_ID.toString(), group_ID.toString());
        user_groupRepository.persist(user_group);
    }

    @Override
    @Transactional
    public void addClientToGroup(String client_ID, UUID group_ID) {//füügt einen Client in eine Gruppe hinzu
        Client_Group client_group = new Client_Group(client_ID, group_ID.toString());
        client_groupRepository.persist(client_group);
    }

    @Override
    @Transactional
    public void removeUserToGroup(UUID user_ID, UUID group_ID) {//löscht einen Benutzer aus einer Gruppe
        user_groupRepository.deleteByGroupIDAndUserID(group_ID.toString(), user_ID.toString());
    }

    @Override
    @Transactional
    public void removeClientToGroup(String client_ID, UUID group_ID) {//löscht einen Client aus einer Gruppe
        client_groupRepository.deleteByGroupIDAndClientID(group_ID.toString(), client_ID);
    }

    @Override
    @Transactional
    public void changeRole(String user_ID, Role role) {//ändert die Rolle eines Benutzers
        User user_ = userRepository.findByID(user_ID);
        user_.setRole(role);
        userRepository.getEntityManager().merge(user_);
    }

}
