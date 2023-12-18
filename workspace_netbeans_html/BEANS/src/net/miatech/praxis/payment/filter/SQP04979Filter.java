package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP04979Filter extends CustomPageImpl{

    //inputs 1
    private String IN_CCUST;
    private String IN_DATE;
    private String IN_DATEFROM;
    private String IN_DATETO;
    private String IN_FAMEX;
    private String IN_STVAL;

    private String IN_TKT;
    private String IN_PNR;
    private String IN_SCARDN;
    private String IN_SAUTHOC;
    private String IN_MERCHID;
    private String IN_COUNTRY;
    private String IN_TCARD;

    transient List<A4453Filter> result = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public SQP04979Filter() {
        this.result = new ArrayList<>();
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

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
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

    public List<A4453Filter> getResult() {
        return result;
    }

    public void setResult(List<A4453Filter> result) {
        this.result = result;
    }

    public String getIN_MERCHID() {
        return IN_MERCHID;
    }

    public void setIN_MERCHID(String IN_MERCHID) {
        this.IN_MERCHID = IN_MERCHID;
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
