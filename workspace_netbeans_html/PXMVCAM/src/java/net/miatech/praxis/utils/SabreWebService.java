package net.miatech.praxis.utils;

import java.net.MalformedURLException;
import java.net.URL;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.classes.SSLDisabler;
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

    private CurrentSession session;
    private final SSLDisabler disabler;

    @Autowired
    public SabreWebService(CurrentSession session,SSLDisabler disabler) {
        this.session = session;
        this.disabler = disabler;
    }

    private static final String WSDLURL = "https://52.200.160.42/SabreRecloc/SabreReclocRetriever.asmx";

    private static SabreRecordLocatorSoap getSabreWS () throws MalformedURLException{
        URL url = new URL(WSDLURL);
        SabreRecordLocator sabre = new SabreRecordLocator(url);
        SabreRecordLocatorSoap soap = sabre.getSabreRecordLocatorSoap();
        return soap;
    }
    
    public TicketRES getTicketInfo(String ticket) throws Exception {
        //String wsdlUrl = session.getServerSession().getPropertySession().get("SABRE_WS").toString();
        disabler.disableSSLVerification();
        SabreRecordLocatorSoap soap = getSabreWS();
        TicketREQ ticketREQ = new TicketREQ();
        ticketREQ.setTicketNumber(ticket);
        return soap.getTicket(ticketREQ);
    }

    public ReclocRES getReclocInfo(String PNR) throws Exception {
        //String wsdlUrl = session.getServerSession().getPropertySession().get("SABRE_WS").toString();
        disabler.disableSSLVerification();
        SabreRecordLocatorSoap soap = getSabreWS();
        ReclocREQ reclocREQ = new ReclocREQ();
        reclocREQ.setRecloc(PNR);
        return soap.getRecloc(reclocREQ);
    }
}
