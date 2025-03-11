package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class ScannerFilter {
    private String CCUST,TRNCU,SPNR,SDATE,SAGENT,FUENTE,
            SEQ,CCIA,FORMA,SERIE,CORRL,
            CARDTYPE,SCARDCOD,SCURRENCY,SCARDN,SAUTHOC,FVOID,
            CODEPR,GRUPO,CANAL,
            CIAP,FORMAP,SERIEP,
            RUTA0,RUTA1,RUTA2,RUTA3,RUTA4,
            FVLO1,FVLO2,FVLO3,FVLO4,
            TOTCUP,CPUI,PAX,FLAG,STDOC,TCORR;
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

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getCODEPR() {
        return CODEPR;
    }

    public void setCODEPR(String CODEPR) {
        this.CODEPR = CODEPR;
    }

    public String getGRUPO() {
        return GRUPO;
    }

    public void setGRUPO(String GRUPO) {
        this.GRUPO = GRUPO;
    }

    public String getCANAL() {
        return CANAL;
    }

    public void setCANAL(String CANAL) {
        this.CANAL = CANAL;
    }

    public String getCIAP() {
        return CIAP;
    }

    public void setCIAP(String CIAP) {
        this.CIAP = CIAP;
    }

    public String getFORMAP() {
        return FORMAP;
    }

    public void setFORMAP(String FORMAP) {
        this.FORMAP = FORMAP;
    }

    public String getSERIEP() {
        return SERIEP;
    }

    public void setSERIEP(String SERIEP) {
        this.SERIEP = SERIEP;
    }

    public String getRUTA0() {
        return RUTA0;
    }

    public void setRUTA0(String RUTA0) {
        this.RUTA0 = RUTA0;
    }

    public String getRUTA1() {
        return RUTA1;
    }

    public void setRUTA1(String RUTA1) {
        this.RUTA1 = RUTA1;
    }

    public String getRUTA2() {
        return RUTA2;
    }

    public void setRUTA2(String RUTA2) {
        this.RUTA2 = RUTA2;
    }

    public String getRUTA3() {
        return RUTA3;
    }

    public void setRUTA3(String RUTA3) {
        this.RUTA3 = RUTA3;
    }

    public String getRUTA4() {
        return RUTA4;
    }

    public void setRUTA4(String RUTA4) {
        this.RUTA4 = RUTA4;
    }

    public String getFVLO1() {
        return FVLO1;
    }

    public void setFVLO1(String FVLO1) {
        this.FVLO1 = FVLO1;
    }

    public String getFVLO2() {
        return FVLO2;
    }

    public void setFVLO2(String FVLO2) {
        this.FVLO2 = FVLO2;
    }

    public String getFVLO3() {
        return FVLO3;
    }

    public void setFVLO3(String FVLO3) {
        this.FVLO3 = FVLO3;
    }

    public String getFVLO4() {
        return FVLO4;
    }

    public void setFVLO4(String FVLO4) {
        this.FVLO4 = FVLO4;
    }

    public String getTOTCUP() {
        return TOTCUP;
    }

    public void setTOTCUP(String TOTCUP) {
        this.TOTCUP = TOTCUP;
    }

    public String getCPUI() {
        return CPUI;
    }

    public void setCPUI(String CPUI) {
        this.CPUI = CPUI;
    }

    public String getPAX() {
        return PAX;
    }

    public void setPAX(String PAX) {
        this.PAX = PAX;
    }

    public String getFLAG() {
        return FLAG;
    }

    public void setFLAG(String FLAG) {
        this.FLAG = FLAG;
    }

    public String getSTDOC() {
        return STDOC;
    }

    public void setSTDOC(String STDOC) {
        this.STDOC = STDOC;
    }

    public String getTCORR() {
        return TCORR;
    }

    public void setTCORR(String TCORR) {
        this.TCORR = TCORR;
    }
}
