package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05043Filter {
    private String IN_AREFNBR;
    private List<A4335Filter> response = new ArrayList<>();

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public List<A4335Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4335Filter> response) {
        this.response = response;
    }
    
}
