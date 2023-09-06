package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class ScannerFilter {
    private String TRNCU,SPNR,SDATE,SAGENT,FUENTE,
            SEQ,CCIA,FORMA,SERIE,CORRL,
            CARDTYPE,SCARDCOD,SCURRENCY,SCARDN,SAUTHOC,FVOID;
    private Double SVFOPS,TGROSAMOUN;
    private Integer DUPLICATES;

    public String getTRNCU() {
        return TRNCU;
    }

    public void setTRNCU(String TRNCU) {
        this.TRNCU = TRNCU;
    }

    public String getSPNR() {
        return SPNR;
    }

    public void setSPNR(String SPNR) {
        this.SPNR = SPNR;
    }

    public String getSDATE() {
        return SDATE;
    }

    public void setSDATE(String SDATE) {
        this.SDATE = SDATE;
    }

    public String getSAGENT() {
        return SAGENT;
    }

    public void setSAGENT(String SAGENT) {
        this.SAGENT = SAGENT;
    }

    public String getFUENTE() {
        return FUENTE;
    }

    public void setFUENTE(String FUENTE) {
        this.FUENTE = FUENTE;
    }

    public String getSEQ() {
        return SEQ;
    }

    public void setSEQ(String SEQ) {
        this.SEQ = SEQ;
    }

    public String getCCIA() {
        return CCIA;
    }

    public void setCCIA(String CCIA) {
        this.CCIA = CCIA;
    }

    public String getFORMA() {
        return FORMA;
    }

    public void setFORMA(String FORMA) {
        this.FORMA = FORMA;
    }

    public String getSERIE() {
        return SERIE;
    }

    public void setSERIE(String SERIE) {
        this.SERIE = SERIE;
    }

    public String getCARDTYPE() {
        return CARDTYPE;
    }

    public void setCARDTYPE(String CARDTYPE) {
        this.CARDTYPE = CARDTYPE;
    }

    public String getSCARDCOD() {
        return SCARDCOD;
    }

    public void setSCARDCOD(String SCARDCOD) {
        this.SCARDCOD = SCARDCOD;
    }

    public String getSCURRENCY() {
        return SCURRENCY;
    }

    public void setSCURRENCY(String SCURRENCY) {
        this.SCURRENCY = SCURRENCY;
    }

    public String getSCARDN() {
        return SCARDN;
    }

    public void setSCARDN(String SCARDN) {
        this.SCARDN = SCARDN;
    }

    public String getSAUTHOC() {
        return SAUTHOC;
    }

    public void setSAUTHOC(String SAUTHOC) {
        this.SAUTHOC = SAUTHOC;
    }

    public String getFVOID() {
        return FVOID;
    }

    public void setFVOID(String FVOID) {
        this.FVOID = FVOID;
    }

    public Double getSVFOPS() {
        return SVFOPS;
    }

    public void setSVFOPS(Double SVFOPS) {
        this.SVFOPS = SVFOPS;
    }

    public Double getTGROSAMOUN() {
        return TGROSAMOUN;
    }

    public void setTGROSAMOUN(Double TGROSAMOUN) {
        this.TGROSAMOUN = TGROSAMOUN;
    }

    public Integer getDUPLICATES() {
        return DUPLICATES;
    }

    public void setDUPLICATES(Integer DUPLICATES) {
        this.DUPLICATES = DUPLICATES;
    }

    public String getCORRL() {
        return CORRL;
    }

    public void setCORRL(String CORRL) {
        this.CORRL = CORRL;
    }
}
