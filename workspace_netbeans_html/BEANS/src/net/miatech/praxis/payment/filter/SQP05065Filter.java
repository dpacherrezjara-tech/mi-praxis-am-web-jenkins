package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05065Filter {
    private String IN_CCUST,IN_PRDA1,IN_TDOC1,IN_AREFNBR1,
            IN_PRDA2,IN_TDOC2,IN_AREFNBR2;
    private Integer SQLRES;
    private String SQLMSG;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PRDA1() {
        return IN_PRDA1;
    }

    public void setIN_PRDA1(String IN_PRDA1) {
        this.IN_PRDA1 = IN_PRDA1;
    }

    public String getIN_TDOC1() {
        return IN_TDOC1;
    }

    public void setIN_TDOC1(String IN_TDOC1) {
        this.IN_TDOC1 = IN_TDOC1;
    }

    public String getIN_AREFNBR1() {
        return IN_AREFNBR1;
    }

    public void setIN_AREFNBR1(String IN_AREFNBR1) {
        this.IN_AREFNBR1 = IN_AREFNBR1;
    }

    public String getIN_PRDA2() {
        return IN_PRDA2;
    }

    public void setIN_PRDA2(String IN_PRDA2) {
        this.IN_PRDA2 = IN_PRDA2;
    }

    public String getIN_TDOC2() {
        return IN_TDOC2;
    }

    public void setIN_TDOC2(String IN_TDOC2) {
        this.IN_TDOC2 = IN_TDOC2;
    }

    public String getIN_AREFNBR2() {
        return IN_AREFNBR2;
    }

    public void setIN_AREFNBR2(String IN_AREFNBR2) {
        this.IN_AREFNBR2 = IN_AREFNBR2;
    }

    public Integer getSQLRES() {
        return SQLRES;
    }

    public void setSQLRES(Integer SQLRES) {
        this.SQLRES = SQLRES;
    }

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }
    
    
}
