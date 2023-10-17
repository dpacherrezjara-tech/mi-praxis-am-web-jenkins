package net.miatech.praxis.utils;

import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import net.miatech.praxis.classes.CurrentSession;
import net.sabre.miatech.praxis.ReclocREQ;
import net.sabre.miatech.praxis.ReclocRES;
import net.sabre.miatech.praxis.SabreRecordLocator;
import net.sabre.miatech.praxis.SabreRecordLocatorSoap;
import net.sabre.miatech.praxis.TicketREQ;
import net.sabre.miatech.praxis.TicketRES;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
@Scope("session")
public class SabreWebService {

    @Autowired
    private CurrentSession session;

    private final String wsdlUrl = "https://52.200.160.42/SabreRecloc/SabreReclocRetriever.asmx";

    public TicketRES getTicketInfo(String ticket) throws Exception {
        //String wsdlUrl = session.getServerSession().getPropertySession().get("SABRE_WS").toString();
        disableSslVerification();
        URL url = new URL(wsdlUrl);
        SabreRecordLocator sabre = new SabreRecordLocator(url);
        SabreRecordLocatorSoap soap = sabre.getSabreRecordLocatorSoap();
        TicketREQ ticketREQ = new TicketREQ();
        ticketREQ.setTicketNumber(ticket);
        return soap.getTicket(ticketREQ);
    }

    public ReclocRES getReclocInfo(String PNR) throws Exception {
        //String wsdlUrl = session.getServerSession().getPropertySession().get("SABRE_WS").toString();
        disableSslVerification();
        URL url = new URL(wsdlUrl);
        SabreRecordLocator sabre = new SabreRecordLocator(url);
        SabreRecordLocatorSoap soap = sabre.getSabreRecordLocatorSoap();
        ReclocREQ reclocREQ = new ReclocREQ();
        reclocREQ.setRecloc(PNR);
        return soap.getRecloc(reclocREQ);
    }

    //<editor-fold defaultstate="collapsed" desc="SSL">
    private static void disableSslVerification() {
        try {
            // Create a trust manager that does not validate certificate chains
            TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
                @Override
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }

                @Override
                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }

                @Override
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
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };

            // Install the all-trusting host verifier
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            System.out.println("Error in SSL: " + e.getMessage());
        }
    }
//</editor-fold>
}
