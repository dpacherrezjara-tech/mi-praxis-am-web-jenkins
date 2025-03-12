package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05060Filter extends CustomPageImpl{
    private String IN_CCUST,IN_DATE,IN_MONTH,IN_DATEFROM,IN_DATETO,IN_PROCTYPE,IN_PROCTYPESQ,
            IN_SMERCHID,IN_TRANSTYPE,IN_SCOUNTRY,IN_FVOID,IN_TICKET,IN_SCARDN,IN_SAUTHOC,IN_SPNR,
            IN_TYPE,IN_STVAL,IN_CERROR,IN_CODADJU,IN_AREFNBR,IN_SCURRENCY,IN_NBRINSTA;
    private Double IN_AMOUNT;
    
    private List<A4331Filter> response = new ArrayList<>();

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

    public String getIN_MONTH() {
        return IN_MONTH;
    }

    public void setIN_MONTH(String IN_MONTH) {
        this.IN_MONTH = IN_MONTH;
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

    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
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

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_TYPE() {
        return IN_TYPE;
    }

    public void setIN_TYPE(String IN_TYPE) {
        this.IN_TYPE = IN_TYPE;
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

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public List<A4331Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331Filter> response) {
        this.response = response;
    }

    public Double getIN_AMOUNT() {
        return IN_AMOUNT;
    }

    public void setIN_AMOUNT(Double IN_AMOUNT) {
        this.IN_AMOUNT = IN_AMOUNT;
    }

    public String getIN_SCURRENCY() {
        return IN_SCURRENCY;
    }

    public void setIN_SCURRENCY(String IN_SCURRENCY) {
        this.IN_SCURRENCY = IN_SCURRENCY;
    }

    public String getIN_NBRINSTA() {
        return IN_NBRINSTA;
    }

    public void setIN_NBRINSTA(String IN_NBRINSTA) {
        this.IN_NBRINSTA = IN_NBRINSTA;
    }
}
