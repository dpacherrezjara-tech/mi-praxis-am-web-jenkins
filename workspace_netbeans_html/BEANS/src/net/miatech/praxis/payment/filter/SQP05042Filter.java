package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05042Filter {
    private String IN_AREFNBR;
    private List<A4183Filter> response = new ArrayList<>();

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public List<A4183Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4183Filter> response) {
        this.response = response;
    }
    
}
