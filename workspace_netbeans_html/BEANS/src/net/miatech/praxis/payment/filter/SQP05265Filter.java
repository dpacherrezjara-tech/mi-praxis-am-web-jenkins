package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4559;

/**
 *
 * @author Dvicente
 */
public class SQP05265Filter {
    private String IN_CCUST,IN_CODE;
    private A4559 response;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_CODE() {
        return IN_CODE;
    }

    public void setIN_CODE(String IN_CODE) {
        this.IN_CODE = IN_CODE;
    }

    public A4559 getResponse() {
        return response;
    }

    public void setResponse(A4559 response) {
        this.response = response;
    }
}
