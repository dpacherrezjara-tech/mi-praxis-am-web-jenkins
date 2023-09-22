package net.miatech.praxis.payment.filter;

import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05047Filter{
    private String IN_CCUST,IN_PNR;
    private List<PNRFilter> response;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }
    
    public List<PNRFilter> getResponse() {
        return response;
    }

    public void setResponse(List<PNRFilter> response) {
        this.response = response;
    }
    
}
