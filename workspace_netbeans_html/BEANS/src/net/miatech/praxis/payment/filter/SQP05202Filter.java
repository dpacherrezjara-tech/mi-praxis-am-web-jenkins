package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05202Filter {
    private String IN_CCUST,IN_USUP,IN_FECFROM,IN_FECTO,
            IN_TRANSTYPE,IN_STVAL,IN_ORIG;
    private List<ProductionBPFilter> response = new ArrayList<>();

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

    public String getIN_FECFROM() {
        return IN_FECFROM;
    }

    public void setIN_FECFROM(String IN_FECFROM) {
        this.IN_FECFROM = IN_FECFROM;
    }

    public String getIN_FECTO() {
        return IN_FECTO;
    }

    public void setIN_FECTO(String IN_FECTO) {
        this.IN_FECTO = IN_FECTO;
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

    public String getIN_ORIG() {
        return IN_ORIG;
    }

    public void setIN_ORIG(String IN_ORIG) {
        this.IN_ORIG = IN_ORIG;
    }
    
    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public List<ProductionBPFilter> getResponse() {
        return response;
    }

    public void setResponse(List<ProductionBPFilter> response) {
        this.response = response;
    }
    
}
