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
public class SQP05261Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR;
    private Double IN_TGROSAMOUN,IN_HTGROSAMOUN;

    private List<SQP05260Filter> childs = new ArrayList<>();
    
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

    public List<SQP05260Filter> getChilds() {
        return childs;
    }

    public void setChilds(List<SQP05260Filter> childs) {
        this.childs = childs;
    }
}
