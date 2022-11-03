package data;

import annotations.Adding;
import annotations.Login;
import controller.WebpageControllerAdmin;
import entity.Package;
import entity.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
import java.math.BigInteger;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.*;


@Named
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class SMSStore implements ISMSStore {


    @Resource
    @Inject
    private UserTransaction userTransaction;

    private TokenCleanerThread cleaner = new TokenCleanerThread(this);
    private final ClientRepository clientRepository;
    private final GroupRepository groupRepository;
    private final PackageRepository packageRepository;
    private final ScriptRepository scriptRepository;
    private final TasksRepository tasksRepository;
    private final UserRepository userRepository;
    private final Available_ClientsRepository available_clientsRepository;
    private final RoleRepository roleRepository;
    private final Base_ClientRepository baseClientRepository;
    private ArrayList<TokenInfos> tokens = new ArrayList<>();
    public ArrayList<Client> getClients() {
        return (ArrayList<Client>) clientRepository.findAll().list();
    }


    @PostConstruct
    public void init(){
        cleaner.start();
    }

    public Client getClientByID(String mac_Address) {
        return clientRepository.findById(mac_Address);
    }

    public void insertNewClient(String id, String name) {

    }

    public void deleteToken(TokenInfos tokenInfo){
        tokens.remove(tokenInfo);
    }

    public boolean isAllowed(String token, String id, @NotNull Login anno) {
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

    public boolean isAllowed(String token, @NotNull Login anno) {
        String[] roles = anno.roles();
        for (String role : roles) {
            if (role.equals(getRole(token))) {
                return true;
            }
        }
        return false;
    }

    public boolean isAllowed(String token, @NotNull Adding anno) {
        String[] roles = anno.roles();
        for (String role : roles) {
            if (role.equals(getRole(token))) {
                return true;
            }
        }
        return false;
    }

    public String getRole(String token) {
        String decodedToken = decodeToken(token);
        String[] infos = decodedToken.split("/");
        return infos[1];
    }


    public boolean clientIsAvailable(String id) {
        ArrayList<Client> clients = (ArrayList<Client>) clientRepository.findAll().list();
        for (Client client : clients) {
            if (client.getMacAddress().getMacAddress().equals(id)) {
                return true;
            }
        }
        return false;
    }

    public boolean availableclientIsAvailable(String id) {
        ArrayList<Available_Clients> clients = (ArrayList<Available_Clients>) available_clientsRepository.findAll().list();
        for (Available_Clients client : clients) {
            if (client.getMac_Adress().getMacAddress().equals(id)) {
                return true;
            }
        }
        return false;
    }


    public String loginUser(String name, String password) {
        String token = "";
        User user = getUserByName(name);
        if (user != null) {
            String salt = user.getSalt();
            String hashedPassword = hashPassword(password + salt);
            if (user.getHash().equals(hashedPassword)) {
                token = generateToken(user);
            } else {
                token = "Wrong Username or Password!";
            }
        } else {
            token = "Wrong Username or Password!";
        }
        return token;
    }

    public String hashPassword(String password) {
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


    public String getIdByToken(String token) {
        try {
            String id = "";
            String decodedToken = decodeToken(token);
            if (decodedToken != null) {
                String[] infos = decodedToken.split("/");
                if (infos != null) {
                    id = infos[0];
                }
            }
            return id;
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return "";
    }

    public String decodeToken(String token) {
        SecretKeySpec sk = null;
        for(TokenInfos tokenInfo : tokens){
            if(tokenInfo.getToken().equals(token)){
                tokenInfo.setExpireDate(LocalDateTime.now().plusMinutes(15));
                sk = tokenInfo.getSecretKeySpec();
            }
        }
        Cipher cipher;
        try {
            cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, sk);
            return new String(cipher.doFinal(Base64.getDecoder().decode(token)));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return null;
    }

    public String generateToken(User user) {
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
        return t.toString();
    }

    public SecretKeySpec generateKey() {
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

    public UUID generateUUID(String table) {
        boolean isAvailable = true;
        UUID id = null;
        while (isAvailable) {
            id = UUID.randomUUID();
            switch (table) {
                case "task":
                    if (tasksRepository.findById(id.toString()) == null) {
                        isAvailable = false;
                    }
                    break;
            }
        }
        return id;
    }

    public ArrayList<Package> getPackagesByIDs(ArrayList<String> ids) {
        ArrayList<Package> packages = new ArrayList<>();
        for (String id : ids) {
            packages.add(packageRepository.findById(id));
        }
        return packages;
    }

    public ArrayList<Script> getScriptsByIDs(ArrayList<String> ids) {
        ArrayList<Script> packages = new ArrayList<>();
        for (String id : ids) {
            packages.add(scriptRepository.findById(id));
        }
        return packages;
    }

    public ArrayList<Role> getRoles() {
        return (ArrayList<Role>) roleRepository.findAll().list();
    }

    public Available_Clients getAvailableClientById(String mac_Address) {
        return available_clientsRepository.findById(mac_Address);
    }

    public ArrayList<SmsGroup> getGroups() {
        return (ArrayList<SmsGroup>) groupRepository.findAll().list();
    }

    public ArrayList<Package> getPackages() {
        return (ArrayList<Package>) packageRepository.findAll().list();
    }

    public ArrayList<Script> getScripts() {
        return (ArrayList<Script>) scriptRepository.findAll().list();
    }


    public ArrayList<User> getUsers() {
        return (ArrayList<User>) userRepository.findAll().list();
    }

    public User getUserByName(String name) {
        return userRepository.findByName(name);
    }

    public User getUserByID(String id) {
        return userRepository.findByID(id);
    }

    public Baseclient getBaseClientByID(String id) {
        return baseClientRepository.findById(id);
    }

    public ArrayList<Tasks> getTasks() {
        return (ArrayList<Tasks>) tasksRepository.findAll().list();
    }

    public void removeClient(@NotNull String id) {
        clientRepository.deleteClientById(id);
    }


    public void removeGroup(@NotNull UUID id) {
        groupRepository.deleteGroupById(id.toString());
    }


    public void removePackage(@NotNull UUID id) {
        packageRepository.deletePackageById(id.toString());
    }


    public void removeScript(@NotNull UUID id) {
        scriptRepository.deleteScriptById(id.toString());
    }


    public void removeUser(@NotNull UUID id) {
        userRepository.deleteUserById(id.toString());
    }

    public void removeAvailableClient(String mac_Address) {
        available_clientsRepository.deleteAvailableClientById(mac_Address);
    }

    @Transactional
    public void insertAvailable_Client(Available_Clients availableClient) {
        available_clientsRepository.persist(availableClient);
    }

    @Transactional
    public void insertBase_Client(Baseclient baseclient) {
        baseClientRepository.persist(baseclient);
    }

    @Transactional
    public void insertClient(Client client) {
        clientRepository.persist(client);
    }

    @Transactional
    public void insertPackage(Package packages) {
        packageRepository.persist(packages);
    }

    @Transactional
    public void insertScript(Script script) {
        scriptRepository.persist(script);
    }

    @Transactional
    public void insertSmsGroup(SmsGroup smsGroup) {
        groupRepository.persist(smsGroup);
    }

    @Transactional
    public void insertTask(Tasks task) {
        tasksRepository.persist(task);
    }

    @Transactional
    public void insertUser(User user) {
        userRepository.persist(user);
    }

    @Transactional
    public void updateClient(@NotNull Client client) {
        Client realClient = clientRepository.findById(client.getMacAddress().getMacAddress());
        realClient.setName(client.getName());
        realClient.setIp(client.getIp());
        realClient.setLastOnline(client.getLastOnline());
        realClient.setCpuUsage(client.getCpuUsage());
        realClient.setUsedDiskspace(client.getUsedDiskspace());
        realClient.setPackages(client.getPackages());
        realClient.setScript(client.getScript());
        clientRepository.getEntityManager().merge(realClient);
    }

    @Transactional
    public void updateAvailableClient(Available_Clients client) {
        Available_Clients realClient = available_clientsRepository.findById(client.getMac_Adress().getMacAddress());
        realClient.setName(client.getName());
        realClient.setIp(client.getIp());
        available_clientsRepository.getEntityManager().merge(realClient);
    }

    @Transactional
    public void updatePackage(Package packages) {
    }

    @Transactional
    public void updateScript(String id) {
        Script script = scriptRepository.findById(id);
        script.setName("Success1");
        scriptRepository.getEntityManager().merge(script);
        //scriptRepository.persist(script);
    }

    @Transactional
    public void updateGroup(SmsGroup Group) {

    }

    @Transactional
    public void updateUser(User user) {

    }

    @Transactional
    public ArrayList<Tasks> getTasksByClientID(String id) {
        return tasksRepository.getTastksByClientId(id);
    }


    public boolean isAllowedToAdd(String token, String user_id, String client_id) {
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

    @Transactional
    public void insertTaskWithScript(String client_id, String script_id, String user_id, Adding add, String token) {
        if (isAllowed(token, add) || isAllowedToAdd(token, user_id, client_id)) {
            UUID id = generateUUID("task");
            Client client = clientRepository.findById(client_id);
            Script script = scriptRepository.findById(script_id);
            Tasks task = new Tasks(id.toString(), client, null, script);
            tasksRepository.persist(task);
        }
    }

    @Transactional
    public void insertTaskWithPackage(String client_id, String package_id, String user_id, Adding add, String token) {
        if (isAllowed(token, add) || isAllowedToAdd(token, user_id, client_id)) {
            UUID id = generateUUID("task");
            Client client = clientRepository.findById(client_id);
            Package package_ = packageRepository.findById(package_id);
            Tasks task = new Tasks(id.toString(), client, package_, null);
            tasksRepository.persist(task);
        }
    }


    @Transactional
    public void removeTaskByPackageID(String id){
        tasksRepository.deleteTasksByPackage_ID(id);
    }

    @Transactional
    public void removeTaskByScriptID(String id){
         tasksRepository.deleteTasksByScript_ID(id);
    }


    public Tasks getTaskByPackageID(String id){
        return tasksRepository.findByPackage_ID(id);
    }

    public Tasks getTaskByScriptID(String id){
        return tasksRepository.findByScript_ID(id);
    }
}
