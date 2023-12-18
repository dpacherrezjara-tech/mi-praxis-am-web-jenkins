package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05220Filter {
    private String IN_A4501CCUST,IN_A4501CIA,IN_A4501FORMA,IN_A4501SERIE,IN_A4501SEQ,
            IN_A4501TDOC,IN_A4501CFOP,IN_A4501TFOP,IN_A4501TTARJ,IN_A4501MFOP,IN_A4501NREF,
            IN_A4501CAPL;
    private Double IN_A4501VFOP;

    public String getIN_A4501CCUST() {
        return IN_A4501CCUST;
    }

    public void setIN_A4501CCUST(String IN_A4501CCUST) {
        this.IN_A4501CCUST = IN_A4501CCUST;
    }

    public String getIN_A4501CIA() {
        return IN_A4501CIA;
    }

    public void setIN_A4501CIA(String IN_A4501CIA) {
        this.IN_A4501CIA = IN_A4501CIA;
    }

    public String getIN_A4501FORMA() {
        return IN_A4501FORMA;
    }

    public void setIN_A4501FORMA(String IN_A4501FORMA) {
        this.IN_A4501FORMA = IN_A4501FORMA;
    }

    public String getIN_A4501SERIE() {
        return IN_A4501SERIE;
    }

    public void setIN_A4501SERIE(String IN_A4501SERIE) {
        this.IN_A4501SERIE = IN_A4501SERIE;
    }

    public String getIN_A4501SEQ() {
        return IN_A4501SEQ;
    }

    public void setIN_A4501SEQ(String IN_A4501SEQ) {
        this.IN_A4501SEQ = IN_A4501SEQ;
    }

    public String getIN_A4501TDOC() {
        return IN_A4501TDOC;
    }

    public void setIN_A4501TDOC(String IN_A4501TDOC) {
        this.IN_A4501TDOC = IN_A4501TDOC;
    }

    public String getIN_A4501CFOP() {
        return IN_A4501CFOP;
    }

    public void setIN_A4501CFOP(String IN_A4501CFOP) {
        this.IN_A4501CFOP = IN_A4501CFOP;
    }

    public String getIN_A4501TFOP() {
        return IN_A4501TFOP;
    }

    public void setIN_A4501TFOP(String IN_A4501TFOP) {
        this.IN_A4501TFOP = IN_A4501TFOP;
    }

    public String getIN_A4501TTARJ() {
        return IN_A4501TTARJ;
    }

    public void setIN_A4501TTARJ(String IN_A4501TTARJ) {
        this.IN_A4501TTARJ = IN_A4501TTARJ;
    }

    public String getIN_A4501MFOP() {
        return IN_A4501MFOP;
    }

    public void setIN_A4501MFOP(String IN_A4501MFOP) {
        this.IN_A4501MFOP = IN_A4501MFOP;
    }

    public String getIN_A4501NREF() {
        return IN_A4501NREF;
    }

    public void setIN_A4501NREF(String IN_A4501NREF) {
        this.IN_A4501NREF = IN_A4501NREF;
    }

    public String getIN_A4501CAPL() {
        return IN_A4501CAPL;
    }

    public void setIN_A4501CAPL(String IN_A4501CAPL) {
        this.IN_A4501CAPL = IN_A4501CAPL;
    }

    public Double getIN_A4501VFOP() {
        return IN_A4501VFOP;
    }

    public void setIN_A4501VFOP(Double IN_A4501VFOP) {
        this.IN_A4501VFOP = IN_A4501VFOP;
    }
}
