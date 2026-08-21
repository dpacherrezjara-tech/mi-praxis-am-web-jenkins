package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class SQP05052Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR;
    private A4331BPOFilter response;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PRDA() {
        return IN_PRDA;
    }

    public void setIN_PRDA(String IN_PRDA) {
        this.IN_PRDA = IN_PRDA;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public A4331BPOFilter getResponse() {
        return response;
    }

    public void setResponse(A4331BPOFilter response) {
        this.response = response;
    }
    
}
