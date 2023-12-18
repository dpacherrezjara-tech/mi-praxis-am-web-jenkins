package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4501;

/**
 *
 * @author Dvicente
 */
public class SQP05218Filter {
    private String IN_CCUST,IN_CIA,IN_FORMA,IN_SERIE,IN_SEQ;
    List<A4501> response = new ArrayList<>();

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

    public List<A4501> getResponse() {
        return response;
    }

    public void setResponse(List<A4501> response) {
        this.response = response;
    }
    
}
