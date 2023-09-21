package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05072Filter {
    private String IN_CCUST,IN_TDOC,IN_SDATE,IN_NBRLIQUID,IN_SCARDN;
    
    private List<A4482Filter> response = new ArrayList<>();

    public List<A4482Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4482Filter> response) {
        this.response = response;
    }
    
    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_SDATE() {
        return IN_SDATE;
    }

    public void setIN_SDATE(String IN_SDATE) {
        this.IN_SDATE = IN_SDATE;
    }

    public String getIN_NBRLIQUID() {
        return IN_NBRLIQUID;
    }

    public void setIN_NBRLIQUID(String IN_NBRLIQUID) {
        this.IN_NBRLIQUID = IN_NBRLIQUID;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }
    
}
