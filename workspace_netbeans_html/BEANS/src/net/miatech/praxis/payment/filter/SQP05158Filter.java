package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class SQP05158Filter {

    private String IN_CCUST;
    private Integer IN_ID;
    
    private A4508Filter response;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public Integer getIN_ID() {
        return IN_ID;
    }

    public void setIN_ID(Integer IN_ID) {
        this.IN_ID = IN_ID;
    }

    public A4508Filter getResponse() {
        return response;
    }

    public void setResponse(A4508Filter response) {
        this.response = response;
    }
}
