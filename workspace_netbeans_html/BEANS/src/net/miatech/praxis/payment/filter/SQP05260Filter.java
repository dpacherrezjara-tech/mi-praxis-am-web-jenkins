package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05260Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,IN_HPRDA,IN_HTDOC,IN_HAREFNBR,IN_COMEN;
    private Double IN_TGROSAMOUN,IN_HTGROSAMOUN;

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

    public String getIN_HPRDA() {
        return IN_HPRDA;
    }

    public void setIN_HPRDA(String IN_HPRDA) {
        this.IN_HPRDA = IN_HPRDA;
    }

    public String getIN_HTDOC() {
        return IN_HTDOC;
    }

    public void setIN_HTDOC(String IN_HTDOC) {
        this.IN_HTDOC = IN_HTDOC;
    }

    public String getIN_HAREFNBR() {
        return IN_HAREFNBR;
    }

    public void setIN_HAREFNBR(String IN_HAREFNBR) {
        this.IN_HAREFNBR = IN_HAREFNBR;
    }

    public String getIN_COMEN() {
        return IN_COMEN;
    }

    public void setIN_COMEN(String IN_COMEN) {
        this.IN_COMEN = IN_COMEN;
    }

    public Double getIN_TGROSAMOUN() {
        return IN_TGROSAMOUN;
    }

    public void setIN_TGROSAMOUN(Double IN_TGROSAMOUN) {
        this.IN_TGROSAMOUN = IN_TGROSAMOUN;
    }

    public Double getIN_HTGROSAMOUN() {
        return IN_HTGROSAMOUN;
    }

    public void setIN_HTGROSAMOUN(Double IN_HTGROSAMOUN) {
        this.IN_HTGROSAMOUN = IN_HTGROSAMOUN;
    }
    
}
