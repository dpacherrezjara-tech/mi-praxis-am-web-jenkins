package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP04955Filter extends CustomPageImpl{
    private String IN_CCUST,IN_DATEF,IN_DATET,IN_DATE,IN_CERROR,IN_PNR,IN_TDOC
            ,IN_SCARDN,IN_SAUTHOC,IN_STRFND,IN_PROCTYPE,IN_MERCH,IN_TKT,IN_SCOUNTRY
            ,IN_PCURRENCY,IN_TGRID;
    
    private List<A4331Filter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_DATEF() {
        return IN_DATEF;
    }

    public void setIN_DATEF(String IN_DATEF) {
        this.IN_DATEF = IN_DATEF;
    }

    public String getIN_DATET() {
        return IN_DATET;
    }

    public void setIN_DATET(String IN_DATET) {
        this.IN_DATET = IN_DATET;
    }

    public String getIN_DATE() {
        return IN_DATE;
    }

    public void setIN_DATE(String IN_DATE) {
        this.IN_DATE = IN_DATE;
    }

    public String getIN_CERROR() {
        return IN_CERROR;
    }

    public void setIN_CERROR(String IN_CERROR) {
        this.IN_CERROR = IN_CERROR;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
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

    public String getIN_STRFND() {
        return IN_STRFND;
    }

    public void setIN_STRFND(String IN_STRFND) {
        this.IN_STRFND = IN_STRFND;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_MERCH() {
        return IN_MERCH;
    }

    public void setIN_MERCH(String IN_MERCH) {
        this.IN_MERCH = IN_MERCH;
    }

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_PCURRENCY() {
        return IN_PCURRENCY;
    }

    public void setIN_PCURRENCY(String IN_PCURRENCY) {
        this.IN_PCURRENCY = IN_PCURRENCY;
    }

    public String getIN_TGRID() {
        return IN_TGRID;
    }

    public void setIN_TGRID(String IN_TGRID) {
        this.IN_TGRID = IN_TGRID;
    }

    public List<A4331Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331Filter> response) {
        this.response = response;
    }
}
