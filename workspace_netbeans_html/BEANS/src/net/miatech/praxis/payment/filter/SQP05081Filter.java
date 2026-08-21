package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05081Filter {
    private String IN_CCUST,IN_SCARDN;
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
    
}
