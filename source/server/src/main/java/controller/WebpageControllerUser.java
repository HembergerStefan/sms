package controller;

import annotations.Adding;
import annotations.Login;
import com.fasterxml.jackson.annotation.JsonView;
import common.IWebpageResourceUser;
import data.SMSStore;
import entity.Package;
import entity.Script;
import entity.Tasks;
import entity.User;
import entity.jsonview.PackageView;
import entity.jsonview.ScriptView;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Login(roles = {"User", "Admin"})
@Adding(roles = {"Admin"})
@Path("/webpageUser")
public class WebpageControllerUser implements IWebpageResourceUser {
    @Inject
    protected SMSStore smsStore;


    private Login anno = null;
    private Adding add = null;


    @PostConstruct
    public void init() {
        anno = WebpageControllerUser.class.getAnnotation(Login.class);
        add = WebpageControllerUser.class.getAnnotation(Adding.class);
    }


    @Override
    public User getUserByID(String id, String token) {
        if (smsStore.isAllowed(token, id, anno)) {
            return smsStore.getUserByID(id);
        }
        return null;
    }


    @Override
    @JsonView(PackageView.Always.class)
    public ArrayList<Package> getPrograms(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getPackages();
        }
        return null;
    }


    @Override
    @JsonView(ScriptView.Always.class)
    public ArrayList<Script> getScripts(String token) {
        if (smsStore.isAllowed(token, anno)) {
            return smsStore.getScripts();
        }
        return null;
    }

    @Override
    public void addScriptToTask(String token, UUID user_id, String mac_Address, String script_id) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertTaskWithScript(mac_Address, script_id, user_id.toString(), add, token);
        }
    }

    @Override
    public void addPackageToTask(String token, UUID user_id, String mac_Address, String package_id) {
        if (smsStore.isAllowed(token, anno)) {
            smsStore.insertTaskWithPackage(mac_Address, package_id, user_id.toString(), add, token);
        }
    }
}
