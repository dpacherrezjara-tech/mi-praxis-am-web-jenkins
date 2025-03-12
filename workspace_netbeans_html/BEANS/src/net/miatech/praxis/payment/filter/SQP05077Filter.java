package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05077Filter {
    private String IN_CCUST,
            IN_TDOC,IN_PRDA,IN_AREFNBR,
            IN_RTDOC,IN_RPRDA,IN_RAREFNBR;
    private Integer SQLRES;
    private String SQLMSG;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_PRDA() {
        return IN_PRDA;
    }

    public void setIN_PRDA(String IN_PRDA) {
        this.IN_PRDA = IN_PRDA;
    }

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public String getIN_RTDOC() {
        return IN_RTDOC;
    }

    public void setIN_RTDOC(String IN_RTDOC) {
        this.IN_RTDOC = IN_RTDOC;
    }

    public String getIN_RPRDA() {
        return IN_RPRDA;
    }

    public void setIN_RPRDA(String IN_RPRDA) {
        this.IN_RPRDA = IN_RPRDA;
    }

    public String getIN_RAREFNBR() {
        return IN_RAREFNBR;
    }

    public void setIN_RAREFNBR(String IN_RAREFNBR) {
        this.IN_RAREFNBR = IN_RAREFNBR;
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
