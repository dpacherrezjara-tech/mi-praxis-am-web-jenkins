package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05164Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,
            IN_RFDATE,IN_RFAUTOR,IN_RFOPERB;
    private Integer SQLRES;
    private String SQLMSG;

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

    public String getIN_RFDATE() {
        return IN_RFDATE;
    }

    public void setIN_RFDATE(String IN_RFDATE) {
        this.IN_RFDATE = IN_RFDATE;
    }

    public String getIN_RFAUTOR() {
        return IN_RFAUTOR;
    }

    public void setIN_RFAUTOR(String IN_RFAUTOR) {
        this.IN_RFAUTOR = IN_RFAUTOR;
    }

    public String getIN_RFOPERB() {
        return IN_RFOPERB;
    }

    public void setIN_RFOPERB(String IN_RFOPERB) {
        this.IN_RFOPERB = IN_RFOPERB;
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
