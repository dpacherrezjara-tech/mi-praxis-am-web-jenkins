/*
 * UserDAO.java
 *
 */
package net.miatech.praxis.dao.program;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400SecurityException;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.beans.PropertyVetoException;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.beans.spring.ServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.dao.implement.IBaseDAO;
import net.miatech.dao.implement.IUserDAO;
import net.miatech.praxis.A2149;
import static net.miatech.praxis.dao.panel.PanelDAO.pasarGarbageCollector;
//import net.miatech.praxis.INF001;
//import net.miatech.praxis.INF020;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.provider.ConnectionIBMDB2Server;
//import net.miatech.provider.Connection;
import net.miatech.utils.AS400Map;
import net.miatech.utils.spring.Application;
import net.miatech.utils.Functions;
import net.miatech.utils.implement.IApp;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

/**
 *
 * @author rmayta
 */
public class UserDAO  {

    //private static final Logger logError = Logger.getLogger("errorLog");
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private static final String CSV_PATH = "\\\\px\\PRAXISAM\\PERMITS.txt";
    private static final String SECRET = "1234567890123456"; // 16 chars mínimo para AES-128
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int IV_LENGTH = 12;
    private static final int TAG_LENGTH = 128;

    //private ServerSession serverSession;
    private Application application;
    /**
     * Creates a new instance of UserDAO
     */
    public UserDAO() {
    }

    public UserDAO(IServerSession ss) {
        session = ss;
        application = new Application(session.getPropertySession());
        
    }
    
    public void setApp(Application application) {
        this.application = application;
    }
    

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        List<PX041S01INF001Filter> lstAccessUser = new ArrayList<PX041S01INF001Filter>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S03INF001(?,?,?)}"; //Nueva Funcionalidad de Perfiles SQP05885 ANTES SQP05858
        //String SQLCLL01 = "{CALL LIBSAP14.SQP02783(?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString("VP_CCUST", "139");
            cstm01.setString("VP_APLICA", "PX");
            cstm01.setString("VP_USR", filter.VP_USR);
            //cstm01.setString("VP_ID_PROFILE", filter.VP_ID_PROFILE);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                while (rst.next()) {
                    PX041S01INF001Filter accessProgram = new PX041S01INF001Filter();
                    accessProgram.USR = rst.getString("USR");
                    //accessProgram.ID_PROFILE = rst.getString("ID_PROFILE");
                    accessProgram.NPROG = rst.getString("NPROG");
                    accessProgram.PERMA = rst.getString("PERMA");
                    accessProgram.PERMC = rst.getString("PERMC");
                    accessProgram.PERME = rst.getString("PERME");
                    accessProgram.PERML = rst.getString("PERML");
                    accessProgram.PERMM = rst.getString("PERMM");
                    accessProgram.PERMX = rst.getString("PERMX");

                    lstAccessUser.add(accessProgram);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstAccessUser;
    }
    
    //Activar USUARIO (INF020 de "N" a "A")
    public void SQP02743(INF001 auth, INF020 usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = auth.USR;
        String pass = auth.TOKEN;

        String SQLCLL01 = "{CALL PRAXIS.SQP02743(?,?,?)}"; //123
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, usuario.USR);
            cstmt01.setString(3, usuario.STAT);
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("SQP02743 Message: " + e.getMessage()); //ERROR
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 SIN FECHA
    public void SQP02491(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");
        
        String SQLCLL01 = "{CALL PRAXIS.SQP02491(?)}";
        Connection tmpCnx;
        //tmpCnx = application.getConnection(user, pass);
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 CON FECHA
    public void SQP03266(String usuario, String expiredDate) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");
        String strDay = expiredDate.substring(6, 8); // YYMMAA
        String strMonth = expiredDate.substring(4, 6);
        String strYear = expiredDate.substring(2, 4);
        expiredDate = strDay + strMonth + strYear; // AAMMYYYY
        String SQLCLL01 = "{CALL PRAXIS.SQP03266(?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();  //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, expiredDate);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CAMBIAR PASSWORD USUARIO AS400
    public void SQP03218(String usuario, String clave) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03218(?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();   //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CREAR USUARIO AS400
    public void SQP03219(String usuario, String clave, String desc, String checkPass) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP06081(?,?,?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();  // application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            //cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.setString(3, desc);
            cstmt01.setString(4, checkPass);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // VALIDAR EXISTE USUARIO AS400
    public boolean SQP03268(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        boolean boValida = false;
        
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03268(?)}";
        //ConnectionIBMDB2Server tmpCnx;
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection(); //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            //cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                boValida = true;
            }
            return boValida;
        } catch (Exception e) {
            logError.error("SQP03268 Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQP03268 Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    public SQP05851Filter  SQP05851( SQP05851Filter filter ) throws SQLException , Exception {        
        //MANT. LOG TABLE   
        CallableStatement cstmt = null;     
        String SQLCLL01 = "{CALL PRAXIS.SQP05851(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);      
            
            cstmt.setString(1, filter.VP_ID_OPERATOR );
            cstmt.setString(2, filter.VP_OPER );
            cstmt.setString(3, filter.VP_NPROG );
            cstmt.setString(4, filter.VP_DESC1);
            cstmt.setString(5, filter.VP_ACTIO);
            cstmt.execute();  
            
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    // 1. CREATE: Añade una nueva línea al final
    public static String create(String correo, String usuario, String contrasena) {
        // 1. Validar si ya existe el correo o el usuario
        if (exists(correo, usuario)) {
            System.err.println("❌ Error: El correo o el usuario ya están registrados.");
            return "Usuario o Correo ya existen";
        }

        // 2. Si no existen, procedemos a crear
        String nuevaLinea = String.join(",",
            encrypt(correo.trim()),
            encrypt(usuario.trim()),
            encrypt(contrasena.trim())
        );
        try (PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(CSV_PATH, true)))) {
            out.println(nuevaLinea);
            System.out.println("✅ Usuario creado con éxito.");
        } catch (Exception e) {
            System.err.println("❌ Error al crear: " + e.getMessage());
            return "Error en Block" + e.getMessage();
        }
        return "Block register successfull";
    }
    
    /**
     * Método auxiliar para verificar duplicados por correo (columna 0) o usuario (columna 1).
     */
    private static boolean exists(String correo, String usuario) {
        File file = new File(CSV_PATH);
        if (!file.exists()) return false;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length >= 2) {
                    String correoExistente = decrypt(data[0]).trim();
                    String usuarioExistente = decrypt(data[1]).trim();

                    if (correoExistente.equalsIgnoreCase(correo.trim()) || 
                        usuarioExistente.equalsIgnoreCase(usuario.trim())) {
                        return true;
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("❌ Error al validar duplicados: " + e.getMessage());
        }
        return false;
    }
    
    public static boolean processFile(String targetUser, java.util.function.Function<String, String> mapper, String accion) {
        File inputFile = new File(CSV_PATH);
        File tempFile = new File(CSV_PATH + ".tmp");
        boolean found = false;

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile))) {

            String currentLine;
            while ((currentLine = reader.readLine()) != null) {
                String[] data = currentLine.split(",");
                
                // Verificamos si la línea actual coincide con el usuario buscado
                if (data.length >= 2) {
                    String usuarioExistente = decrypt(data[1].trim());
                    if (usuarioExistente.equalsIgnoreCase(targetUser.trim())) {
                        found = true;
                        String processedLine = mapper.apply(currentLine);

                        if (processedLine != null) {
                            writer.write(processedLine + System.lineSeparator());
                        }
                    } else {
                        writer.write(currentLine + System.lineSeparator());
                    }
                    // Si es null (Delete), simplemente no se escribe nada y continúa el bucle
                } else {
                    writer.write(currentLine + System.lineSeparator());
                }
            }

            // Cerramos flujos antes de manipular los archivos
            writer.flush();
            writer.close();
            reader.close();

            // Reemplazo de archivos
            if (found) {
                if (inputFile.delete()) {
                    if (!tempFile.renameTo(inputFile)) {
                        System.err.println("❌ No se pudo renombrar el archivo temporal.");
                    } else {
                        System.out.println("✅ Usuario " + targetUser + " " + accion + " con éxito.");
                    }
                } else {
                    System.err.println("❌ No se pudo eliminar el archivo original para actualizarlo.");
                }
            } else {
                tempFile.delete(); // Limpiamos el temporal si no hubo cambios
                System.out.println("⚠️ Usuario '" + targetUser + "' no encontrado.");
            }

        } catch (IOException e) {
            System.err.println("❌ Error de E/S: " + e.getMessage());
        }
        return found;
    }
    public static String encrypt(String text) {
        try {
            byte[] iv = new byte[IV_LENGTH];
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(SECRET.getBytes(), "AES");
            GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_LENGTH, iv);

            cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmSpec);
            byte[] encrypted = cipher.doFinal(text.getBytes());

            byte[] combined = new byte[iv.length + encrypted.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(encrypted, 0, combined, iv.length, encrypted.length);

            return Base64.getEncoder().encodeToString(combined);

        } catch (Exception e) {
            throw new RuntimeException("Error cifrando dato", e);
        }
    }

    public static String decrypt(String encryptedText) {
        try {
            byte[] combined = Base64.getDecoder().decode(encryptedText);

            byte[] iv = new byte[IV_LENGTH];
            byte[] encrypted = new byte[combined.length - IV_LENGTH];

            System.arraycopy(combined, 0, iv, 0, IV_LENGTH);
            System.arraycopy(combined, IV_LENGTH, encrypted, 0, encrypted.length);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(SECRET.getBytes(), "AES");
            GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_LENGTH, iv);

            cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmSpec);
            return new String(cipher.doFinal(encrypted));

        } catch (Exception e) {
            throw new RuntimeException("Error descifrando dato", e);
        }
    }
}
