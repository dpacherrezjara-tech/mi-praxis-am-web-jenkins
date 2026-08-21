package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05061Filter {
    private String IN_CCUST,IN_PRDA,IN_PROCTYPE,IN_PROCTYPESQ,IN_SCARDN;
    private Double IN_TGROSAMOUN;
    private List<A4331Filter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }

    public Double getIN_TGROSAMOUN() {
        return IN_TGROSAMOUN;
    }

    public void setIN_TGROSAMOUN(Double IN_TGROSAMOUN) {
        this.IN_TGROSAMOUN = IN_TGROSAMOUN;
    }

    public List<A4331Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331Filter> response) {
        this.response = response;
    }

    public String getIN_PRDA() {
        return IN_PRDA;
    }

    public void setIN_PRDA(String IN_PRDA) {
        this.IN_PRDA = IN_PRDA;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }
    
}
