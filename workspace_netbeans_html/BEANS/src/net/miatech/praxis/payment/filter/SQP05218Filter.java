package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4501;

/**
 *
 * @author Dvicente
 */
public class SQP05218Filter {
    private String IN_A4496CCUST,IN_A4496CIA,IN_A4496FORMA,IN_A4496SERIE,IN_A4496SEQ;
    List<A4501> response = new ArrayList<>();

    public String getIN_A4496CCUST() {
        return IN_A4496CCUST;
    }

    public void setIN_A4496CCUST(String IN_A4496CCUST) {
        this.IN_A4496CCUST = IN_A4496CCUST;
    }

    public String getIN_A4496CIA() {
        return IN_A4496CIA;
    }

    public void setIN_A4496CIA(String IN_A4496CIA) {
        this.IN_A4496CIA = IN_A4496CIA;
    }

    public String getIN_A4496FORMA() {
        return IN_A4496FORMA;
    }

    public void setIN_A4496FORMA(String IN_A4496FORMA) {
        this.IN_A4496FORMA = IN_A4496FORMA;
    }

    public String getIN_A4496SERIE() {
        return IN_A4496SERIE;
    }

    public void setIN_A4496SERIE(String IN_A4496SERIE) {
        this.IN_A4496SERIE = IN_A4496SERIE;
    }

    public String getIN_A4496SEQ() {
        return IN_A4496SEQ;
    }

    public void setIN_A4496SEQ(String IN_A4496SEQ) {
        this.IN_A4496SEQ = IN_A4496SEQ;
    }

    public List<A4501> getResponse() {
        return response;
    }

    public void setResponse(List<A4501> response) {
        this.response = response;
    }

    
    
}
