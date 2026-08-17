package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05126Filter {
    private String IN_CCUST,
            IN_CIA,IN_FORMA,IN_SERIE,IN_SEQ,IN_TDOC,IN_CORRL;
    
    private ByTicketFilter response;
    private List<A4335Filter> desglose = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_CIA() {
        return IN_CIA;
    }

    public void setIN_CIA(String IN_CIA) {
        this.IN_CIA = IN_CIA;
    }

    public String getIN_FORMA() {
        return IN_FORMA;
    }

    public void setIN_FORMA(String IN_FORMA) {
        this.IN_FORMA = IN_FORMA;
    }

    public String getIN_SERIE() {
        return IN_SERIE;
    }

    public void setIN_SERIE(String IN_SERIE) {
        this.IN_SERIE = IN_SERIE;
    }

    public String getIN_SEQ() {
        return IN_SEQ;
    }

    public void setIN_SEQ(String IN_SEQ) {
        this.IN_SEQ = IN_SEQ;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_CORRL() {
        return IN_CORRL;
    }

    public void setIN_CORRL(String IN_CORRL) {
        this.IN_CORRL = IN_CORRL;
    }

    public ByTicketFilter getResponse() {
        return response;
    }

    public void setResponse(ByTicketFilter response) {
        this.response = response;
    }

    public List<A4335Filter> getDesglose() {
        return desglose;
    }

    public void setDesglose(List<A4335Filter> desglose) {
        this.desglose = desglose;
    }
}
