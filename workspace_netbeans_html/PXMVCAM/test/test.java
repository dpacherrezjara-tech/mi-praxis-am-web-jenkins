
import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.praxis.classes.ProMail;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lzambrano
 */
public class test {
    
    
    private static final Logger logError = Logger.getLogger("errorLog");
    
    private static class SMTPAuthenticator extends Authenticator {

        private String dEmail;
        private String dPassword;

        public SMTPAuthenticator(String email, String password) {
            dEmail = email;
            dPassword = password;
        }

        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(dEmail, dPassword);
        }
    }
    
    public static void mainFOB(String[] args) {
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
        String FileTXT = "RptComisionesFOB.txt";
        File fileTmp02;
        fileTmp02 = File.createTempFile("tmp", FileTXT);
        PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
        out.println("IATA;Ticket;Trans;cpn;cjn;Issue Date;Carr.;Fare Basis;Class;Origen;Dest;IT Tour Cod.;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries Amount;Ancillaries Comm.;Agr. Code;Ancillaries %;Charge Amount;Charge Comm.;Charge Agr. Code;Charge %;Lote");
        out.flush();
        out.close();
        System.out.println("Results: Total -> ");

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }
    
    public static void main(String[] args) { // mainRefund
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
            A3647Filter beanGene = new A3647Filter();
            beanGene.IN_CIA = "139"; 
            beanGene.IN_FORMA = "4405";
            beanGene.IN_SERIE = "365101";
            beanGene.IN_CORRL= "0001";
            beanGene.IN_PREME = "0000000294";
            beanGene.IN_ANIO = "2023";
            beanGene.IN_SEQ = "00";
            rfndnotifiUpdateCPN(beanGene);

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }
    
    public static boolean rfndnotifiUpdateCPN(A3647Filter beanGene) {
        String mensaje = "";
        String token = "";
        boolean success = true;
        String urlREST = "https://reembolsosespecialesam.miatech.net:8182";
        //String urlREST = "https://10.0.0.63:8182";
        
        try {
            
            /*
             Se establece tiempo límite de conexión por 60 min
             */
            Unirest.setTimeouts(3600000, 3600000);

            /*
             Preparando parámetros para enviar por body
            
             */
            disableSslVerification(); // Deshabilitamos validacion certificado
            HashMap bodyData = new HashMap<>();
            bodyData.put("ticket", beanGene.IN_CIA + "" + beanGene.IN_FORMA + "" + beanGene.IN_SERIE);
            bodyData.put("correlativo", beanGene.IN_CORRL);
            bodyData.put("prememo", beanGene.IN_PREME);
            bodyData.put("anio", beanGene.IN_ANIO);
            bodyData.put("secuencia", beanGene.IN_SEQ);
            HttpResponse<JsonNode> response = Unirest.post(urlREST + "/api/praxis/usos-sabre")
                    .header("content-type", "application/json")
                    .header("cache-control", "no-cache")
                    .header("Authorization", "Token " + token)
                    .body(new Gson().toJson(bodyData))
                    .asJson();

            success = Boolean.parseBoolean(response.getBody().getObject().get("success").toString());

        } catch (Exception e) {
            mensaje = e.getMessage();
        }

        return success;
    }
    
    private static void disableSslVerification() 
    {
        try
        {
            // Create a trust manager that does not validate certificate chains
            TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }
                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                }
            }
            };

            // Install the all-trusting trust manager
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            // Create all-trusting host name verifier
            HostnameVerifier allHostsValid = new HostnameVerifier() {
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };

            // Install the all-trusting host verifier
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }
    }
    
    public static void maineMAIL(String[] args) { //maineMAIL
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
            
        boolean iboolean;

        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<>();

        receptores.add("lzambrano@miatech.net");
        
        // Emails CC
        List<String> Ccp = new ArrayList<>();
        String strMails = "jsolano@miatech.net";

        //temporal borrar
        //strMails = "asifuentes@miatech.net;oldman_100_6@hotmail.com";
        String[] parts = strMails.split(";");
        for (int i = 0; i < parts.length; i++) {
            Ccp.add(parts[i]);
        }
        String emisor = "amaclaracionescontracargos@miatech.net"; // "notificaciones@miatech.net";
        String asunto = "Demo Email";
        String mensaje = "Mensaje Demo Email";
        List<String> archivos = new ArrayList<>();
        boolean boRpta = sendEmailMDP(emisor, asunto, receptores, Ccp, mensaje, archivos, "amaclaracionescontracargos@miatech.net");
        System.out.println("Results: Total -> ");

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }
        
    
    public static boolean sendEmailMDP(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos, String correoMask) throws IOException {
        
        //Para medios de Pago
        boolean envioExitoso = true;
        
//        ServerSession serverSession = new ServerSession();
        
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            /*props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
            props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
            props.put("mail.smtp.starttls.enable","true");*/
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable","true");
            
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");
            
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia 
            Authenticator auth;
            if(emisor.contains("amcscaclaracioncontracargousaeur")){
                auth = new SMTPAuthenticator("amcscaclaracioncontracargousaeur@miatech.net", "Amcargo365");
            }else{
                auth = new SMTPAuthenticator("amaclaracionescontracargos@miatech.net", "Am@claraciones");
            }
            
            Session session = Session.getInstance(props, auth);            
            //Se obtiene sesi&amp;oacute;n desde el servidor de correos               
            session.setDebug(true);
            MimeMessage message = new MimeMessage(session);
            InternetAddress[] dest = new InternetAddress[receptores.size()];
            for (int i = 0; i < dest.length; i++) {
                dest[i] = new InternetAddress(receptores.get(i));
            }
            // Correo con copy To
            InternetAddress[] Ccp = new InternetAddress[Ccpy.size()];
            for (int i = 0; i < Ccp.length; i++) {
                Ccp[i] = new InternetAddress(Ccpy.get(i));
            }
            
            //Se define qui&amp;eacute;n es el emisor del e-mail
            message.setFrom(new InternetAddress(usuario));
            InternetAddress[] replyTo = new InternetAddress[1];
            replyTo[0] = new InternetAddress(usuario);
            message.setReplyTo(replyTo);
            //Se definen el o los destinatarios
            message.addRecipients(Message.RecipientType.TO, dest);
            message.addRecipients(Message.RecipientType.BCC, Ccp );
            //message.addRecipients(Message.RecipientType.BCC, dest);
            //Se defina el asunto del e-mail
            message.setSubject(asunto);

            //Se seteo el mensaje del e-mail
            MimeBodyPart messageBodyPart = new MimeBodyPart();            
            messageBodyPart.setContent(mensaje, "text/html");


            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            //Se adjuntan los archivos al correo
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    messageBodyPart = new MimeBodyPart();
                    File f = new File(rutaAdjunto);
                    if (f.exists()) {
                        DataSource source = new FileDataSource(rutaAdjunto);
                        messageBodyPart.setDataHandler(new DataHandler(source));
                        messageBodyPart.setFileName(f.getName());
                        multipart.addBodyPart(messageBodyPart);
                    }
                }
            }

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            boolean oK = transportSend(message);
            while (!oK) {                
                oK = transportSend(message);
            }
       
        } catch (Exception e) {
            e.getMessage();
            e.toString();
            envioExitoso = false;
        }
        
        return envioExitoso;
    }
    
    public static boolean transportSend(MimeMessage message){
        
        boolean ennvioOk = false;
        try {
            //Se env&amp;iacute;a el e-mail
            Transport.send(message);
            ennvioOk = true;
        } catch (Exception e) {
            e.getMessage();
            ennvioOk = false;
        }

        return ennvioOk;
    
    }
}
