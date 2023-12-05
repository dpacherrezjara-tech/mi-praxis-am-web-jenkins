package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05206Filter extends CustomPageImpl{
    private String IN_CCUST,IN_FROM,IN_TO,IN_PROCTYPE,IN_SCOUNTRY,IN_SCARDN;
    
    private List<CreditCardFilter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_FROM() {
        return IN_FROM;
    }

    public void setIN_FROM(String IN_FROM) {
        this.IN_FROM = IN_FROM;
    }

    public String getIN_TO() {
        return IN_TO;
    }

    public void setIN_TO(String IN_TO) {
        this.IN_TO = IN_TO;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }

    public List<CreditCardFilter> getResponse() {
        return response;
    }

    public void setResponse(List<CreditCardFilter> response) {
        this.response = response;
    }
}
