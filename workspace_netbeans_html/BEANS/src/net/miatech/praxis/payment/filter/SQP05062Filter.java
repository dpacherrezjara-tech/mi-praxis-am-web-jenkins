package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05062Filter {

    private String IN_CCUST, IN_TDOC, IN_TRANSTYPE, IN_SCARDN, IN_SAUTHOC,
            IN_SDATE, IN_SPNR, IN_TICKET, IN_SAGENT, IN_SMERCHID;

    private List<ScannerFilter> response = new ArrayList<>();

    public List<ScannerFilter> getResponse() {
        return response;
    }

    public void setResponse(List<ScannerFilter> response) {
        this.response = response;
    }

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_TRANSTYPE() {
        return IN_TRANSTYPE;
    }

    public void setIN_TRANSTYPE(String IN_TRANSTYPE) {
        this.IN_TRANSTYPE = IN_TRANSTYPE;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }

    public String getIN_SAUTHOC() {
        return IN_SAUTHOC;
    }

    public void setIN_SAUTHOC(String IN_SAUTHOC) {
        this.IN_SAUTHOC = IN_SAUTHOC;
    }

    public String getIN_SDATE() {
        return IN_SDATE;
    }

    public void setIN_SDATE(String IN_SDATE) {
        this.IN_SDATE = IN_SDATE;
    }

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
    }

    public String getIN_SAGENT() {
        return IN_SAGENT;
    }

    public void setIN_SAGENT(String IN_SAGENT) {
        this.IN_SAGENT = IN_SAGENT;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_SMERCHID() {
        return IN_SMERCHID;
    }

    public void setIN_SMERCHID(String IN_SMERCHID) {
        this.IN_SMERCHID = IN_SMERCHID;
    }
}
