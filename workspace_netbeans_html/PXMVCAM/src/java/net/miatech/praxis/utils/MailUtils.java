package net.miatech.praxis.utils;

import java.io.File;
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
import net.miatech.praxis.classes.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("session")
public class MailUtils {

    private class SMTPAuthenticator extends Authenticator {

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
    
    @Autowired
    private CurrentSession session;

    public boolean sendMail(
            String emisor,
            String asunto,
            List<String> receptores,
            List<String> Ccpy,
            String mensaje,
            List<String> adjuntos,
            String correoMask) throws Exception {
        boolean envioExitoso = true;
        String usuario = correoMask; //Correo con el que saldra el email enviado ("from")            

        Properties props = System.getProperties();
        //Se define el servidor de correos
        props.put("mail.smtp.host", session.getPropertySession().get("APP_SERVER_MAIL_HOST").toString());
        props.put("mail.smtp.port", session.getPropertySession().get("APP_SERVER_MAIL_PORT").toString());
        props.put("mail.smtp.starttls.enable", "true");
        //props.setProperty("mail.smtp.user", emisor);
        props.setProperty("mail.smtp.user", usuario);
        props.setProperty("mail.smtp.auth", "true");
        props.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");

        
        Authenticator auth = new SMTPAuthenticator(session.getPropertySession().get("APP_SERVER_MAIL_EMAIL").toString(),
                session.getPropertySession().get("APP_SERVER_MAIL_PASSWORD").toString());
              
        Session ss = Session.getInstance(props, auth);
        String password = session.getPropertySession().get("APP_SERVER_MAIL_PASSWORD").toString();
        //Session session = Session.getInstance(props, auth);    
        //Se obtiene sesi&amp;oacute;n desde el servidor de correos               
        ss.setDebug(true);
        MimeMessage message = new MimeMessage(ss);
        InternetAddress[] dest = new InternetAddress[receptores.size()];
        for (int i = 0; i < dest.length; i++) {
            dest[i] = new InternetAddress(receptores.get(i));
        }
        if (Ccpy != null) {
            if (!Ccpy.isEmpty()) {
                // Correo con copy To
                InternetAddress[] Ccp = new InternetAddress[Ccpy.size()];
                for (int i = 0; i < Ccp.length; i++) {
                    Ccp[i] = new InternetAddress(Ccpy.get(i));
                    message.addRecipients(Message.RecipientType.CC, Ccp);
                }
            }
        }

        //Se define qui&amp;eacute;n es el emisor del e-mail
        message.setFrom(new InternetAddress(usuario));
        InternetAddress[] replyTo = new InternetAddress[1];
        replyTo[0] = new InternetAddress(usuario);
        message.setReplyTo(replyTo);
        //Se definen el o los destinatarios
        message.addRecipients(Message.RecipientType.TO, dest);
        
        //message.addRecipients(Message.RecipientType.BCC, dest);
        //Se defina el asunto del e-mail
        message.setSubject(asunto);

        //Se seteo el mensaje del e-mail
        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(mensaje, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        //Se adjuntan los archivos al correo
        if (adjuntos != null && !adjuntos.isEmpty()) {
            for (String rutaAdjunto : adjuntos) {
                messageBodyPart = new MimeBodyPart();
                File f = new File(rutaAdjunto);
                if (f.exists()) {
                    DataSource source = new FileDataSource(rutaAdjunto);
                    messageBodyPart.setDataHandler(new DataHandler(source));
                    messageBodyPart.setFileName(f.getName().substring(22));
                    multipart.addBodyPart(messageBodyPart);
                }
            }
        }

        //Se junta el mensaje y los archivos adjuntos
        message.setContent(multipart);

        //Se env&amp;iacute;a el e-mail
        Transport.send(message);
        return envioExitoso;
    }

}
