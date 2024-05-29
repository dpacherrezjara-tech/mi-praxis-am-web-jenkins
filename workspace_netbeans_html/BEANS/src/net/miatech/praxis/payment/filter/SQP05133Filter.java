package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05133Filter {
    private String IN_CCUST,IN_DATEFROM,IN_DATETO,IN_DATE,IN_MERCHANT,
            IN_STVAL,IN_PNR,IN_TRANSTYPE,IN_PROCTYPE,IN_PROCTYPESQ,IN_SCOUNTRY,IN_SCURRENCY,IN_PCURRENCY,
            IN_SCARDN,IN_SAUTHOC,
            IN_PMERCHID;
    private List<A4331STFilter> response = new ArrayList<>();

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

    public String getIN_DATE() {
        return IN_DATE;
    }

    public void setIN_DATE(String IN_DATE) {
        this.IN_DATE = IN_DATE;
    }

    public String getIN_MERCHANT() {
        return IN_MERCHANT;
    }

    public void setIN_MERCHANT(String IN_MERCHANT) {
        this.IN_MERCHANT = IN_MERCHANT;
    }

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public String getIN_TRANSTYPE() {
        return IN_TRANSTYPE;
    }

    public void setIN_TRANSTYPE(String IN_TRANSTYPE) {
        this.IN_TRANSTYPE = IN_TRANSTYPE;
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

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_SCURRENCY() {
        return IN_SCURRENCY;
    }

    public void setIN_SCURRENCY(String IN_SCURRENCY) {
        this.IN_SCURRENCY = IN_SCURRENCY;
    }

    public String getIN_PCURRENCY() {
        return IN_PCURRENCY;
    }

    public void setIN_PCURRENCY(String IN_PCURRENCY) {
        this.IN_PCURRENCY = IN_PCURRENCY;
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

    public String getIN_PMERCHID() {
        return IN_PMERCHID;
    }

    public void setIN_PMERCHID(String IN_PMERCHID) {
        this.IN_PMERCHID = IN_PMERCHID;
    }

    public List<A4331STFilter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331STFilter> response) {
        this.response = response;
    }
    
}
