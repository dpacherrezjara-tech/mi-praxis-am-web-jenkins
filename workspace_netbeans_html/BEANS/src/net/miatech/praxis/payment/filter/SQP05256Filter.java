package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05256Filter {
    private String IN_CHOPTION,IN_CCUST,IN_MERCHN,IN_DESCR,IN_RSOCIAL,
            IN_CIATA,IN_CANAL,IN_SCOUNTRY,IN_UNIOPE,IN_CODCLIT1,
            IN_DIRCLIT1,IN_CODCLIT2,IN_DIRCLIT2,IN_MERCHP,IN_STATUS,
            IN_CODAGRUP,IN_DESCAGRUP,IN_FECHAINI,IN_FECHAFIN;
    
    private List<A4202Filter> iatas = new ArrayList<>();

    public String getIN_CHOPTION() {
        return IN_CHOPTION;
    }

    public void setIN_CHOPTION(String IN_CHOPTION) {
        this.IN_CHOPTION = IN_CHOPTION;
    }

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_MERCHN() {
        return IN_MERCHN;
    }

    public void setIN_MERCHN(String IN_MERCHN) {
        this.IN_MERCHN = IN_MERCHN;
    }

    public String getIN_DESCR() {
        return IN_DESCR;
    }

    public void setIN_DESCR(String IN_DESCR) {
        this.IN_DESCR = IN_DESCR;
    }

    public String getIN_RSOCIAL() {
        return IN_RSOCIAL;
    }

    public void setIN_RSOCIAL(String IN_RSOCIAL) {
        this.IN_RSOCIAL = IN_RSOCIAL;
    }

    public String getIN_CIATA() {
        return IN_CIATA;
    }

    public void setIN_CIATA(String IN_CIATA) {
        this.IN_CIATA = IN_CIATA;
    }

    public String getIN_CANAL() {
        return IN_CANAL;
    }

    public void setIN_CANAL(String IN_CANAL) {
        this.IN_CANAL = IN_CANAL;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_UNIOPE() {
        return IN_UNIOPE;
    }

    public void setIN_UNIOPE(String IN_UNIOPE) {
        this.IN_UNIOPE = IN_UNIOPE;
    }

    public String getIN_CODCLIT1() {
        return IN_CODCLIT1;
    }

    public void setIN_CODCLIT1(String IN_CODCLIT1) {
        this.IN_CODCLIT1 = IN_CODCLIT1;
    }

    public String getIN_DIRCLIT1() {
        return IN_DIRCLIT1;
    }

    public void setIN_DIRCLIT1(String IN_DIRCLIT1) {
        this.IN_DIRCLIT1 = IN_DIRCLIT1;
    }

    public String getIN_CODCLIT2() {
        return IN_CODCLIT2;
    }

    public void setIN_CODCLIT2(String IN_CODCLIT2) {
        this.IN_CODCLIT2 = IN_CODCLIT2;
    }

    public String getIN_DIRCLIT2() {
        return IN_DIRCLIT2;
    }

    public void setIN_DIRCLIT2(String IN_DIRCLIT2) {
        this.IN_DIRCLIT2 = IN_DIRCLIT2;
    }

    public String getIN_MERCHP() {
        return IN_MERCHP;
    }

    public void setIN_MERCHP(String IN_MERCHP) {
        this.IN_MERCHP = IN_MERCHP;
    }

    public String getIN_STATUS() {
        return IN_STATUS;
    }

    public void setIN_STATUS(String IN_STATUS) {
        this.IN_STATUS = IN_STATUS;
    }

    public String getIN_CODAGRUP() {
        return IN_CODAGRUP;
    }

    public void setIN_CODAGRUP(String IN_CODAGRUP) {
        this.IN_CODAGRUP = IN_CODAGRUP;
    }

    public String getIN_DESCAGRUP() {
        return IN_DESCAGRUP;
    }

    public void setIN_DESCAGRUP(String IN_DESCAGRUP) {
        this.IN_DESCAGRUP = IN_DESCAGRUP;
    }

    public String getIN_FECHAINI() {
        return IN_FECHAINI;
    }

    public void setIN_FECHAINI(String IN_FECHAINI) {
        this.IN_FECHAINI = IN_FECHAINI;
    }

    public String getIN_FECHAFIN() {
        return IN_FECHAFIN;
    }

    public void setIN_FECHAFIN(String IN_FECHAFIN) {
        this.IN_FECHAFIN = IN_FECHAFIN;
    }

    public List<A4202Filter> getIatas() {
        return iatas;
    }

    public void setIatas(List<A4202Filter> iatas) {
        this.iatas = iatas;
    }
}
