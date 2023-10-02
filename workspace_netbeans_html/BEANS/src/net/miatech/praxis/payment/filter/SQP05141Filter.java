package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05141Filter {
    private String IN_CCUST,IN_DATEFROM,IN_DATETO,IN_PROCTYPE;
    private List<A4332Filter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_DATEFROM() {
        return IN_DATEFROM;
    }

    public void setIN_DATEFROM(String IN_DATEFROM) {
        this.IN_DATEFROM = IN_DATEFROM;
    }

    public String getIN_DATETO() {
        return IN_DATETO;
    }

    public void setIN_DATETO(String IN_DATETO) {
        this.IN_DATETO = IN_DATETO;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public List<A4332Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4332Filter> response) {
        this.response = response;
    }
}
