package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP04983Filter extends CustomPageImpl{
    private String IN_CCUST;
    private String IN_DATE;
    private String IN_DATEFROM;
    private String IN_DATETO;
    private String IN_FAMEX;
    private String IN_STCON;

    private String IN_PNR;
    private String IN_SCARDN;
    private String IN_SAUTHOC;
    private String IN_MERCHID;
    private String IN_OPERATNBR;
    private String IN_COUNTRY;
    private String IN_TCARD;
    
    transient List<A4775Filter> result = new ArrayList<>();
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

    public String getIN_FAMEX() {
        return IN_FAMEX;
    }

    public void setIN_FAMEX(String IN_FAMEX) {
        this.IN_FAMEX = IN_FAMEX;
    }

    public String getIN_STCON() {
        return IN_STCON;
    }

    public void setIN_STCON(String IN_STCON) {
        this.IN_STCON = IN_STCON;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
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

    public String getIN_MERCHID() {
        return IN_MERCHID;
    }

    public void setIN_MERCHID(String IN_MERCHID) {
        this.IN_MERCHID = IN_MERCHID;
    }

    public String getIN_OPERATNBR() {
        return IN_OPERATNBR;
    }

    public void setIN_OPERATNBR(String IN_OPERATNBR) {
        this.IN_OPERATNBR = IN_OPERATNBR;
    }

    public List<A4775Filter> getResult() {
        return result;
    }

    public void setResult(List<A4775Filter> result) {
        this.result = result;
    }

    public String getIN_COUNTRY() {
        return IN_COUNTRY;
    }

    public void setIN_COUNTRY(String IN_COUNTRY) {
        this.IN_COUNTRY = IN_COUNTRY;
    }

    public String getIN_TCARD() {
        return IN_TCARD;
    }

    public void setIN_TCARD(String IN_TCARD) {
        this.IN_TCARD = IN_TCARD;
    }
    
}
