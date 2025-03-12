package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05088Filter {
    private String IN_CCUST,
            IN_DATE,IN_TDATE,IN_DATEFROM,IN_DATETO,
            IN_TRNCU,IN_SAGENT,IN_SCOUNTRY,IN_FVOID,
            IN_STVAL,IN_TCARD,IN_CCARD,IN_FUENT,IN_SFUEN,IN_SCURRENCY;
    private List<A4331SRFilter> response = new ArrayList<>();

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

    public String getIN_TDATE() {
        return IN_TDATE;
    }

    public void setIN_TDATE(String IN_TDATE) {
        this.IN_TDATE = IN_TDATE;
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

    public String getIN_TRNCU() {
        return IN_TRNCU;
    }

    public void setIN_TRNCU(String IN_TRNCU) {
        this.IN_TRNCU = IN_TRNCU;
    }

    public String getIN_SAGENT() {
        return IN_SAGENT;
    }

    public void setIN_SAGENT(String IN_SAGENT) {
        this.IN_SAGENT = IN_SAGENT;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public String getIN_FVOID() {
        return IN_FVOID;
    }

    public void setIN_FVOID(String IN_FVOID) {
        this.IN_FVOID = IN_FVOID;
    }

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public List<A4331SRFilter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331SRFilter> response) {
        this.response = response;
    }

    public String getIN_TCARD() {
        return IN_TCARD;
    }

    public void setIN_TCARD(String IN_TCARD) {
        this.IN_TCARD = IN_TCARD;
    }

    public String getIN_CCARD() {
        return IN_CCARD;
    }

    public void setIN_CCARD(String IN_CCARD) {
        this.IN_CCARD = IN_CCARD;
    }

    public String getIN_FUENT() {
        return IN_FUENT;
    }

    public void setIN_FUENT(String IN_FUENT) {
        this.IN_FUENT = IN_FUENT;
    }

    public String getIN_SFUEN() {
        return IN_SFUEN;
    }

    public void setIN_SFUEN(String IN_SFUEN) {
        this.IN_SFUEN = IN_SFUEN;
    }

    public String getIN_SCURRENCY() {
        return IN_SCURRENCY;
    }

    public void setIN_SCURRENCY(String IN_SCURRENCY) {
        this.IN_SCURRENCY = IN_SCURRENCY;
    }
}
