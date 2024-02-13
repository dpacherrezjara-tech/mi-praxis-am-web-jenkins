package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05255Filter {
    private String IN_CCUST,IN_MERCHN;
    
    private A2354Filter response;
    private List<A4202Filter> iatas = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_MERCHN() {
        return IN_MERCHN;
    }

    public void setIN_MERCHN(String IN_MERCHN) {
        this.IN_MERCHN = IN_MERCHN;
    }

    public A2354Filter getResponse() {
        return response;
    }

    public void setResponse(A2354Filter response) {
        this.response = response;
    }

    public List<A4202Filter> getIatas() {
        return iatas;
    }

    public void setIatas(List<A4202Filter> iatas) {
        this.iatas = iatas;
    }
}
