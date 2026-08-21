package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05130Filter {
    //datos de llave
    private String IN_CCUST,IN_CIA,IN_FORMA,IN_SERIE,IN_SEQ,IN_TDOC,IN_CORRL;
    //datos de actualizacion
    private String IN_TRNCU,IN_FUENTE,IN_CANAL,IN_AGENT,IN_CURRENCY,IN_PRDA,IN_FECVTA,IN_COUNTRY,
            IN_PAX,IN_PNR,IN_CODAG,IN_CERROR,IN_OBSERV;
    private Double IN_AMOUNT;
    
    //respuesta
    private Integer SQLRES;
    private String SQLMSG;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_CIA() {
        return IN_CIA;
    }

    public void setIN_CIA(String IN_CIA) {
        this.IN_CIA = IN_CIA;
    }

    public String getIN_FORMA() {
        return IN_FORMA;
    }

    public void setIN_FORMA(String IN_FORMA) {
        this.IN_FORMA = IN_FORMA;
    }

    public String getIN_SERIE() {
        return IN_SERIE;
    }

    public void setIN_SERIE(String IN_SERIE) {
        this.IN_SERIE = IN_SERIE;
    }

    public String getIN_SEQ() {
        return IN_SEQ;
    }

    public void setIN_SEQ(String IN_SEQ) {
        this.IN_SEQ = IN_SEQ;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_CORRL() {
        return IN_CORRL;
    }

    public void setIN_CORRL(String IN_CORRL) {
        this.IN_CORRL = IN_CORRL;
    }

    public String getIN_TRNCU() {
        return IN_TRNCU;
    }

    public void setIN_TRNCU(String IN_TRNCU) {
        this.IN_TRNCU = IN_TRNCU;
    }

    public String getIN_FUENTE() {
        return IN_FUENTE;
    }

    public void setIN_FUENTE(String IN_FUENTE) {
        this.IN_FUENTE = IN_FUENTE;
    }

    public String getIN_CANAL() {
        return IN_CANAL;
    }

    public void setIN_CANAL(String IN_CANAL) {
        this.IN_CANAL = IN_CANAL;
    }

    public String getIN_AGENT() {
        return IN_AGENT;
    }

    public void setIN_AGENT(String IN_AGENT) {
        this.IN_AGENT = IN_AGENT;
    }

    public String getIN_CURRENCY() {
        return IN_CURRENCY;
    }

    public void setIN_CURRENCY(String IN_CURRENCY) {
        this.IN_CURRENCY = IN_CURRENCY;
    }

    public String getIN_FECVTA() {
        return IN_FECVTA;
    }

    public void setIN_FECVTA(String IN_FECVTA) {
        this.IN_FECVTA = IN_FECVTA;
    }

    public String getIN_COUNTRY() {
        return IN_COUNTRY;
    }

    public void setIN_COUNTRY(String IN_COUNTRY) {
        this.IN_COUNTRY = IN_COUNTRY;
    }

    public String getIN_PAX() {
        return IN_PAX;
    }

    public void setIN_PAX(String IN_PAX) {
        this.IN_PAX = IN_PAX;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public String getIN_CODAG() {
        return IN_CODAG;
    }

    public void setIN_CODAG(String IN_CODAG) {
        this.IN_CODAG = IN_CODAG;
    }

    public String getIN_CERROR() {
        return IN_CERROR;
    }

    public void setIN_CERROR(String IN_CERROR) {
        this.IN_CERROR = IN_CERROR;
    }

    public String getIN_OBSERV() {
        return IN_OBSERV;
    }

    public void setIN_OBSERV(String IN_OBSERV) {
        this.IN_OBSERV = IN_OBSERV;
    }

    public Double getIN_AMOUNT() {
        return IN_AMOUNT;
    }

    public void setIN_AMOUNT(Double IN_AMOUNT) {
        this.IN_AMOUNT = IN_AMOUNT;
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

    public String getIN_PRDA() {
        return IN_PRDA;
    }

    public void setIN_PRDA(String IN_PRDA) {
        this.IN_PRDA = IN_PRDA;
    }
}
