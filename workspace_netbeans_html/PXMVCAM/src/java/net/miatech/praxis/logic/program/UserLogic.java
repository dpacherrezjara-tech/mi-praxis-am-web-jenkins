/*
 * UserLogic.java
 *
 * Created on 1 de enero de 2008, 10:40 AM
 */
package net.miatech.praxis.logic.program;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.program.UserDAO;
import net.miatech.praxis.A2149;
//import net.miatech.praxis.INF001;
//import net.miatech.praxis.INF020;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.classes.PraxisSecurityException;
import net.miatech.utils.spring.Application;
import net.miatech.utils.implement.IApp;

/**
 *
 * @author mflor
 */
public class UserLogic {

    private UserDAO userDAO = new UserDAO();

    /**
     * Creates a new instance of UserLogic
     */
    public void setSession(IServerSession ss) {
        userDAO = new UserDAO(ss);
    }

    public void setApp(Application app) {
        userDAO.setApp(app);
    }    

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        return userDAO.accessUser(filter);
    }
    
    public void SQP02743(INF001 auth, INF020 usuario) throws SQLException, Exception {
        userDAO.SQP02743(auth, usuario);
    }
    
    public void SQP02491(String usuario) throws SQLException, Exception {
        userDAO.SQP02491(usuario);
    }
    
    public void SQP03266(String usuario, String expiredDate) throws SQLException, Exception {
        userDAO.SQP03266(usuario,expiredDate);
    }
    
    public void SQP03218(String usuario, String pass) throws SQLException, Exception {
        userDAO.SQP03218(usuario, pass);
    }
    
    public void SQP03219(String usuario, String clave, String desc) throws SQLException, Exception {
        userDAO.SQP03219(usuario, clave, desc);
    }
    
    public boolean SQP03268(String usuario) throws SQLException, Exception {
        return userDAO.SQP03268(usuario);
    }
            
    public SQP05851Filter SQP05851(SQP05851Filter filter ) throws SQLException , Exception{ 
        return userDAO.SQP05851(filter);
    }
    
    public String create(String correo, String usuario, String contrasena){
        return UserDAO.create(correo, usuario, contrasena);
    }
    // 2. UPDATE: Busca por usuario y actualiza sus datos
    /**
     * @param usuarioBuscado
     * @param nuevoCorreo
     * @param nuevaContrasena
     **/
    public void update(String usuarioBuscado, String nuevoCorreo, String nuevaContrasena) {
        boolean encontrado = UserDAO.processFile(usuarioBuscado, line -> {
            String[] data = line.split(",");
            if (data.length >= 3) {
                String correoOriginal = UserDAO.decrypt(data[0].trim());
                String usuarioOriginal = UserDAO.decrypt(data[1].trim());
                
                String correoFinal = "".equals(nuevoCorreo)
                    ? correoOriginal
                    : nuevoCorreo.trim();
                // Retornamos la línea con la contraseña actualizada
                return String.join(",",
                    UserDAO.encrypt(correoFinal),
                    UserDAO.encrypt(usuarioOriginal),
                    UserDAO.encrypt(nuevaContrasena.trim())
                );
            }
            return line; // Si la línea está mal formateada, la deja igual
        }, "actualizado");
        
        if (!encontrado) {
            System.out.println("ℹ️ Usuario no encontrado. Procediendo a crear registro nuevo...");
            create(nuevoCorreo, usuarioBuscado, nuevaContrasena);
        }
    }
    
    public String decrypt(String encryptedText){
        return UserDAO.decrypt(encryptedText);
    }

    // 3. DELETE: Busca por usuario y omite su línea
    public void delete(String usuarioBuscado) {
        UserDAO.processFile(usuarioBuscado, line -> null, "eliminado");
    }
}