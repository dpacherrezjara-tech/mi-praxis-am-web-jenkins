package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05054Filter {
    private String IN_CCUST,IN_SCARDN,IN_SAUTHOC,
            IN_DATE,IN_DATE_F,IN_DATE_T,IN_SMERCHID,
            IN_SPNR,IN_FCOMPL,IN_TDOC,IN_TRANSTYPE;
    
    private List<ScannerFilter> response = new ArrayList<>();

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

    public String getIN_SAUTHOC() {
        return IN_SAUTHOC;
    }

    public void setIN_SAUTHOC(String IN_SAUTHOC) {
        this.IN_SAUTHOC = IN_SAUTHOC;
    }

    public String getIN_DATE() {
        return IN_DATE;
    }

    public void setIN_DATE(String IN_DATE) {
        this.IN_DATE = IN_DATE;
    }

    public String getIN_DATE_F() {
        return IN_DATE_F;
    }

    public void setIN_DATE_F(String IN_DATE_F) {
        this.IN_DATE_F = IN_DATE_F;
    }

    public String getIN_DATE_T() {
        return IN_DATE_T;
    }

    public void setIN_DATE_T(String IN_DATE_T) {
        this.IN_DATE_T = IN_DATE_T;
    }

    public String getIN_SMERCHID() {
        return IN_SMERCHID;
    }

    public void setIN_SMERCHID(String IN_SMERCHID) {
        this.IN_SMERCHID = IN_SMERCHID;
    }

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_FCOMPL() {
        return IN_FCOMPL;
    }

    public void setIN_FCOMPL(String IN_FCOMPL) {
        this.IN_FCOMPL = IN_FCOMPL;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_TRANSTYPE() {
        return IN_TRANSTYPE;
    }

    public void setIN_TRANSTYPE(String IN_TRANSTYPE) {
        this.IN_TRANSTYPE = IN_TRANSTYPE;
    }

    public List<ScannerFilter> getResponse() {
        return response;
    }

    public void setResponse(List<ScannerFilter> response) {
        this.response = response;
    }
    
    
}
