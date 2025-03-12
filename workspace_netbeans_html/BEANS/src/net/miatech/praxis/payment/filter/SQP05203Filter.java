package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05203Filter {
    private String IN_CCUST,IN_USUP,IN_FEUP,IN_TRANSTYPE,IN_STVAL,IN_ORIG;
    private List<?> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_USUP() {
        return IN_USUP;
    }

    public void setIN_USUP(String IN_USUP) {
        this.IN_USUP = IN_USUP;
    }

    public String getIN_FEUP() {
        return IN_FEUP;
    }

    public void setIN_FEUP(String IN_FEUP) {
        this.IN_FEUP = IN_FEUP;
    }

    public String getIN_TRANSTYPE() {
        return IN_TRANSTYPE;
    }

    public void setIN_TRANSTYPE(String IN_TRANSTYPE) {
        this.IN_TRANSTYPE = IN_TRANSTYPE;
    }

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public List<?> getResponse() {
        return response;
    }

    public void setResponse(List<?> response) {
        this.response = response;
    }

    public String getIN_ORIG() {
        return IN_ORIG;
    }

    public void setIN_ORIG(String IN_ORIG) {
        this.IN_ORIG = IN_ORIG;
    }
}
