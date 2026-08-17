package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05059Filter {

    private String IN_CCUST,
            IN_DATE,
            IN_TDATE,
            IN_DATEFROM,
            IN_DATETO,
            IN_PROCTYPE,
            IN_PROCTYPESQ,
            IN_SMERCHID,
            IN_TRANSTYPE,
            IN_SCOUNTRY,
            IN_FVOID,
            IN_STVAL,
            IN_CERROR,
            IN_CODADJU,
            IN_SCURRENCY;

    private List<A4331SRFilter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_DATE() {
        return IN_DATE;
    }

    public void setIN_DATE(String IN_DATE) {
        this.IN_DATE = IN_DATE;
    }

    public String getIN_TDATE() {
        return IN_TDATE;
    }

    public void setIN_TDATE(String IN_TDATE) {
        this.IN_TDATE = IN_TDATE;
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

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }

    public String getIN_SMERCHID() {
        return IN_SMERCHID;
    }

    public void setIN_SMERCHID(String IN_SMERCHID) {
        this.IN_SMERCHID = IN_SMERCHID;
    }

    public String getIN_TRANSTYPE() {
        return IN_TRANSTYPE;
    }

    public void setIN_TRANSTYPE(String IN_TRANSTYPE) {
        this.IN_TRANSTYPE = IN_TRANSTYPE;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_FVOID() {
        return IN_FVOID;
    }

    public void setIN_FVOID(String IN_FVOID) {
        this.IN_FVOID = IN_FVOID;
    }

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public String getIN_CERROR() {
        return IN_CERROR;
    }

    public void setIN_CERROR(String IN_CERROR) {
        this.IN_CERROR = IN_CERROR;
    }

    public String getIN_CODADJU() {
        return IN_CODADJU;
    }

    public void setIN_CODADJU(String IN_CODADJU) {
        this.IN_CODADJU = IN_CODADJU;
    }

    public List<A4331SRFilter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331SRFilter> response) {
        this.response = response;
    }

    public String getIN_SCURRENCY() {
        return IN_SCURRENCY;
    }

    public void setIN_SCURRENCY(String IN_SCURRENCY) {
        this.IN_SCURRENCY = IN_SCURRENCY;
    }
}
