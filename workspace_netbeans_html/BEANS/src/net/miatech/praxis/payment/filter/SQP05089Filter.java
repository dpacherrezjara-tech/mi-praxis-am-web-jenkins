package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05089Filter extends CustomPageImpl{
    private String IN_CCUST,IN_DATE,IN_DATEFROM,IN_DATETO,IN_PROCTYPE,IN_TRNCU,IN_SCOUNTRY,
            IN_FVOID,IN_TICKET,IN_SCARDN,IN_SAUTHOC,IN_SPNR,IN_TYPE,IN_STVAL,
            IN_SAGENT,IN_FUENT,IN_SFUEN,IN_TCARD,IN_CCARD,IN_SCURRENCY,IN_PAX,IN_TIPOD, IN_TFOP, IN_GCARD;
    private Double IN_AMOUNT;
    
    private List<A4496Filter> response = new ArrayList<>();

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

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_TRNCU() {
        return IN_TRNCU;
    }

    public void setIN_TRNCU(String IN_TRNCU) {
        this.IN_TRNCU = IN_TRNCU;
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

    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
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

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_TYPE() {
        return IN_TYPE;
    }

    public void setIN_TYPE(String IN_TYPE) {
        this.IN_TYPE = IN_TYPE;
    }

    public String getIN_STVAL() {
        return IN_STVAL;
    }

    public void setIN_STVAL(String IN_STVAL) {
        this.IN_STVAL = IN_STVAL;
    }

    public String getIN_SAGENT() {
        return IN_SAGENT;
    }

    public void setIN_SAGENT(String IN_SAGENT) {
        this.IN_SAGENT = IN_SAGENT;
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

    public String getIN_SCURRENCY() {
        return IN_SCURRENCY;
    }

    public void setIN_SCURRENCY(String IN_SCURRENCY) {
        this.IN_SCURRENCY = IN_SCURRENCY;
    }

    public List<A4496Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4496Filter> response) {
        this.response = response;
    }

    public Double getIN_AMOUNT() {
        return IN_AMOUNT;
    }

    public void setIN_AMOUNT(Double IN_AMOUNT) {
        this.IN_AMOUNT = IN_AMOUNT;
    }

    public String getIN_PAX() {
        return IN_PAX;
    }

    public void setIN_PAX(String IN_PAX) {
        this.IN_PAX = IN_PAX;
    }

    public String getIN_TIPOD() {
        return IN_TIPOD;
    }

    public void setIN_TIPOD(String IN_TIPOD) {
        this.IN_TIPOD = IN_TIPOD;
    }
    
    public String getIN_TFOP() {
        return IN_TFOP;
    }
    public void setIN_TFOP(String IN_TFOP) {
        this.IN_TFOP = IN_TFOP;
    }
         
    public String getIN_GCARD() {
        return IN_GCARD;
    }
    public void setIN_GCARD(String IN_GCARD) {
        this.IN_GCARD = IN_GCARD;
    }
    
}
