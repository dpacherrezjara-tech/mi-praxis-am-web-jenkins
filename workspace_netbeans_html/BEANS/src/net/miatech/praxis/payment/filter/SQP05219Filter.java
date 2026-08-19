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
public class SQP05219Filter {
    private String IN_A4496CCUST,IN_A4496CIA,IN_A4496FORMA,IN_A4496SERIE,IN_A4496SEQ,
            IN_A4496TDOC,IN_A4496FECVT,IN_A4496PAIS,IN_A4496TRNCU,
            IN_A4496AGENT,IN_A4496TIPOD,IN_A4496PNR,IN_A4496CODAG,IN_A4496TKVOI,
            IN_A4496MDA,IN_A4496PAX;
    private Double IN_A4496TARIF;
    List<SQP05220Filter> fops = new ArrayList<>();

    public String getIN_A4496CCUST() {
        return IN_A4496CCUST;
    }

    public void setIN_A4496CCUST(String IN_A4496CCUST) {
        this.IN_A4496CCUST = IN_A4496CCUST;
    }

    public String getIN_A4496CIA() {
        return IN_A4496CIA;
    }

    public void setIN_A4496CIA(String IN_A4496CIA) {
        this.IN_A4496CIA = IN_A4496CIA;
    }

    public String getIN_A4496FORMA() {
        return IN_A4496FORMA;
    }

    public void setIN_A4496FORMA(String IN_A4496FORMA) {
        this.IN_A4496FORMA = IN_A4496FORMA;
    }

    public String getIN_A4496SERIE() {
        return IN_A4496SERIE;
    }

    public void setIN_A4496SERIE(String IN_A4496SERIE) {
        this.IN_A4496SERIE = IN_A4496SERIE;
    }

    public String getIN_A4496SEQ() {
        return IN_A4496SEQ;
    }

    public void setIN_A4496SEQ(String IN_A4496SEQ) {
        this.IN_A4496SEQ = IN_A4496SEQ;
    }

    public String getIN_A4496TDOC() {
        return IN_A4496TDOC;
    }

    public void setIN_A4496TDOC(String IN_A4496TDOC) {
        this.IN_A4496TDOC = IN_A4496TDOC;
    }

    public String getIN_A4496FECVT() {
        return IN_A4496FECVT;
    }

    public void setIN_A4496FECVT(String IN_A4496FECVT) {
        this.IN_A4496FECVT = IN_A4496FECVT;
    }

    public String getIN_A4496PAIS() {
        return IN_A4496PAIS;
    }

    public void setIN_A4496PAIS(String IN_A4496PAIS) {
        this.IN_A4496PAIS = IN_A4496PAIS;
    }

    public String getIN_A4496TRNCU() {
        return IN_A4496TRNCU;
    }

    public void setIN_A4496TRNCU(String IN_A4496TRNCU) {
        this.IN_A4496TRNCU = IN_A4496TRNCU;
    }

    public String getIN_A4496AGENT() {
        return IN_A4496AGENT;
    }

    public void setIN_A4496AGENT(String IN_A4496AGENT) {
        this.IN_A4496AGENT = IN_A4496AGENT;
    }

    public String getIN_A4496TIPOD() {
        return IN_A4496TIPOD;
    }

    public void setIN_A4496TIPOD(String IN_A4496TIPOD) {
        this.IN_A4496TIPOD = IN_A4496TIPOD;
    }

    public String getIN_A4496PNR() {
        return IN_A4496PNR;
    }

    public void setIN_A4496PNR(String IN_A4496PNR) {
        this.IN_A4496PNR = IN_A4496PNR;
    }

    public String getIN_A4496CODAG() {
        return IN_A4496CODAG;
    }

    public void setIN_A4496CODAG(String IN_A4496CODAG) {
        this.IN_A4496CODAG = IN_A4496CODAG;
    }

    public String getIN_A4496TKVOI() {
        return IN_A4496TKVOI;
    }

    public void setIN_A4496TKVOI(String IN_A4496TKVOI) {
        this.IN_A4496TKVOI = IN_A4496TKVOI;
    }

    public String getIN_A4496MDA() {
        return IN_A4496MDA;
    }

    public void setIN_A4496MDA(String IN_A4496MDA) {
        this.IN_A4496MDA = IN_A4496MDA;
    }

    public String getIN_A4496PAX() {
        return IN_A4496PAX;
    }

    public void setIN_A4496PAX(String IN_A4496PAX) {
        this.IN_A4496PAX = IN_A4496PAX;
    }

    public Double getIN_A4496TARIF() {
        return IN_A4496TARIF;
    }

    public void setIN_A4496TARIF(Double IN_A4496TARIF) {
        this.IN_A4496TARIF = IN_A4496TARIF;
    }

    public List<SQP05220Filter> getFops() {
        return fops;
    }

    public void setFops(List<SQP05220Filter> fops) {
        this.fops = fops;
    }
}
