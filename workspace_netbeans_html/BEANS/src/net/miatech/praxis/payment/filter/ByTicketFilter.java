package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class ByTicketFilter extends A4496{
    
    //campos agregados
    private String AGENT_NAME,PROC_NAME,DES_MERCHANT,DES_SMERCHANT,
            DESC_CERROR,DESC_CODADJU,BPO_COMEN,BPO_COMEN2,ADM_COMEN,PROCDATE;

    public String getAGENT_NAME() {
        return AGENT_NAME;
    }

    public void setAGENT_NAME(String AGENT_NAME) {
        this.AGENT_NAME = AGENT_NAME;
    }

    public String getPROC_NAME() {
        return PROC_NAME;
    }

    public void setPROC_NAME(String PROC_NAME) {
        this.PROC_NAME = PROC_NAME;
    }

    public String getDES_MERCHANT() {
        return DES_MERCHANT;
    }

    public void setDES_MERCHANT(String DES_MERCHANT) {
        this.DES_MERCHANT = DES_MERCHANT;
    }

    public String getDES_SMERCHANT() {
        return DES_SMERCHANT;
    }

    public void setDES_SMERCHANT(String DES_SMERCHANT) {
        this.DES_SMERCHANT = DES_SMERCHANT;
    }

    public String getDESC_CERROR() {
        return DESC_CERROR;
    }

    public void setDESC_CERROR(String DESC_CERROR) {
        this.DESC_CERROR = DESC_CERROR;
    }

    public String getDESC_CODADJU() {
        return DESC_CODADJU;
    }

    public void setDESC_CODADJU(String DESC_CODADJU) {
        this.DESC_CODADJU = DESC_CODADJU;
    }

    public String getBPO_COMEN() {
        return BPO_COMEN;
    }

    public void setBPO_COMEN(String BPO_COMEN) {
        this.BPO_COMEN = BPO_COMEN;
    }

    public String getBPO_COMEN2() {
        return BPO_COMEN2;
    }

    public void setBPO_COMEN2(String BPO_COMEN2) {
        this.BPO_COMEN2 = BPO_COMEN2;
    }

    public String getADM_COMEN() {
        return ADM_COMEN;
    }

    public void setADM_COMEN(String ADM_COMEN) {
        this.ADM_COMEN = ADM_COMEN;
    }

    public String getPROCDATE() {
        return PROCDATE;
    }

    public void setPROCDATE(String PROCDATE) {
        this.PROCDATE = PROCDATE;
    }
    
    //<editor-fold defaultstate="collapsed" desc="Campos LIQUI">
    private String CCUST;

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getCCUST() {
        return CCUST;
    }

    private String PRDA;

    public void setPRDA(String PRDA) {
        this.PRDA = PRDA;
    }

    public String getPRDA() {
        return PRDA;
    }

    private String PRTIME;

    public void setPRTIME(String PRTIME) {
        this.PRTIME = PRTIME;
    }

    public String getPRTIME() {
        return PRTIME;
    }

    private String SEQNBR;

    public void setSEQNBR(String SEQNBR) {
        this.SEQNBR = SEQNBR;
    }

    public String getSEQNBR() {
        return SEQNBR;
    }

    private String SCOUNTRY;

    public void setSCOUNTRY(String SCOUNTRY) {
        this.SCOUNTRY = SCOUNTRY;
    }

    public String getSCOUNTRY() {
        return SCOUNTRY;
    }

    private String STVAL;

    public void setSTVAL(String STVAL) {
        this.STVAL = STVAL;
    }

    public String getSTVAL() {
        return STVAL;
    }

    private String STVALOLD;

    public void setSTVALOLD(String STVALOLD) {
        this.STVALOLD = STVALOLD;
    }

    public String getSTVALOLD() {
        return STVALOLD;
    }

    private String RECTYPE;

    public void setRECTYPE(String RECTYPE) {
        this.RECTYPE = RECTYPE;
    }

    public String getRECTYPE() {
        return RECTYPE;
    }

    private String PROCTYPE;

    public void setPROCTYPE(String PROCTYPE) {
        this.PROCTYPE = PROCTYPE;
    }

    public String getPROCTYPE() {
        return PROCTYPE;
    }

    private String PROCTYPESQ;

    public void setPROCTYPESQ(String PROCTYPESQ) {
        this.PROCTYPESQ = PROCTYPESQ;
    }

    public String getPROCTYPESQ() {
        return PROCTYPESQ;
    }

    private String PMERCHID;

    public void setPMERCHID(String PMERCHID) {
        this.PMERCHID = PMERCHID;
    }

    public String getPMERCHID() {
        return PMERCHID;
    }

    private String PARTEIDSE;

    public void setPARTEIDSE(String PARTEIDSE) {
        this.PARTEIDSE = PARTEIDSE;
    }

    public String getPARTEIDSE() {
        return PARTEIDSE;
    }

    private String SMERCHID;

    public void setSMERCHID(String SMERCHID) {
        this.SMERCHID = SMERCHID;
    }

    public String getSMERCHID() {
        return SMERCHID;
    }

    private String PARTEID;

    public void setPARTEID(String PARTEID) {
        this.PARTEID = PARTEID;
    }

    public String getPARTEID() {
        return PARTEID;
    }

    private String SDATE;

    public void setSDATE(String SDATE) {
        this.SDATE = SDATE;
    }

    public String getSDATE() {
        return SDATE;
    }

    private String STIME;

    public void setSTIME(String STIME) {
        this.STIME = STIME;
    }

    public String getSTIME() {
        return STIME;
    }

    private String SCARCOD;

    public void setSCARCOD(String SCARCOD) {
        this.SCARCOD = SCARCOD;
    }

    public String getSCARCOD() {
        return SCARCOD;
    }

    private String CARDTYPE;

    public void setCARDTYPE(String CARDTYPE) {
        this.CARDTYPE = CARDTYPE;
    }

    public String getCARDTYPE() {
        return CARDTYPE;
    }

    private String SCARDN;

    public void setSCARDN(String SCARDN) {
        this.SCARDN = SCARDN;
    }

    public String getSCARDN() {
        return SCARDN;
    }

    private String SAUTHOC;

    public void setSAUTHOC(String SAUTHOC) {
        this.SAUTHOC = SAUTHOC;
    }

    public String getSAUTHOC() {
        return SAUTHOC;
    }

    private Double INSTANBR;

    public void setINSTANBR(Double INSTANBR) {
        this.INSTANBR = INSTANBR;
    }

    public Double getINSTANBR() {
        return INSTANBR;
    }

    private Double NBRINSTA;

    public void setNBRINSTA(Double NBRINSTA) {
        this.NBRINSTA = NBRINSTA;
    }

    public Double getNBRINSTA() {
        return NBRINSTA;
    }

    private String PAYPLATYPE;

    public void setPAYPLATYPE(String PAYPLATYPE) {
        this.PAYPLATYPE = PAYPLATYPE;
    }

    public String getPAYPLATYPE() {
        return PAYPLATYPE;
    }

    private String SPNR;

    public void setSPNR(String SPNR) {
        this.SPNR = SPNR;
    }

    public String getSPNR() {
        return SPNR;
    }

    private String TICKET;

    public void setTICKET(String TICKET) {
        this.TICKET = TICKET;
    }

    public String getTICKET() {
        return TICKET;
    }

    private String SEQ;

    public void setSEQ(String SEQ) {
        this.SEQ = SEQ;
    }

    public String getSEQ() {
        return SEQ;
    }

    private Double QTYTKT;

    public void setQTYTKT(Double QTYTKT) {
        this.QTYTKT = QTYTKT;
    }

    public Double getQTYTKT() {
        return QTYTKT;
    }

    private String TDOC;

    public void setTDOC(String TDOC) {
        this.TDOC = TDOC;
    }

    public String getTDOC() {
        return TDOC;
    }

    private String SCURRENCY;

    public void setSCURRENCY(String SCURRENCY) {
        this.SCURRENCY = SCURRENCY;
    }

    public String getSCURRENCY() {
        return SCURRENCY;
    }

    private String SCURRDEC;

    public void setSCURRDEC(String SCURRDEC) {
        this.SCURRDEC = SCURRDEC;
    }

    public String getSCURRDEC() {
        return SCURRDEC;
    }

    private Double TGROSAMOUN;

    public void setTGROSAMOUN(Double TGROSAMOUN) {
        this.TGROSAMOUN = TGROSAMOUN;
    }

    public Double getTGROSAMOUN() {
        return TGROSAMOUN;
    }

    private String TGROSSIGN;

    public void setTGROSSIGN(String TGROSSIGN) {
        this.TGROSSIGN = TGROSSIGN;
    }

    public String getTGROSSIGN() {
        return TGROSSIGN;
    }

    private Double SVFOPS;

    public void setSVFOPS(Double SVFOPS) {
        this.SVFOPS = SVFOPS;
    }

    public Double getSVFOPS() {
        return SVFOPS;
    }

    private Double DISCRATE;

    public void setDISCRATE(Double DISCRATE) {
        this.DISCRATE = DISCRATE;
    }

    public Double getDISCRATE() {
        return DISCRATE;
    }

    private String RATESIGN;

    public void setRATESIGN(String RATESIGN) {
        this.RATESIGN = RATESIGN;
    }

    public String getRATESIGN() {
        return RATESIGN;
    }

    private Double DISCAMOUN;

    public void setDISCAMOUN(Double DISCAMOUN) {
        this.DISCAMOUN = DISCAMOUN;
    }

    public Double getDISCAMOUN() {
        return DISCAMOUN;
    }

    private String COMISIGN;

    public void setCOMISIGN(String COMISIGN) {
        this.COMISIGN = COMISIGN;
    }

    public String getCOMISIGN() {
        return COMISIGN;
    }

    private Double DISCAMOUNI;

    public void setDISCAMOUNI(Double DISCAMOUNI) {
        this.DISCAMOUNI = DISCAMOUNI;
    }

    public Double getDISCAMOUNI() {
        return DISCAMOUNI;
    }

    private String VATSIGN;

    public void setVATSIGN(String VATSIGN) {
        this.VATSIGN = VATSIGN;
    }

    public String getVATSIGN() {
        return VATSIGN;
    }

    private Double NETO;

    public void setNETO(Double NETO) {
        this.NETO = NETO;
    }

    public Double getNETO() {
        return NETO;
    }

    private String NETSIGN;

    public void setNETSIGN(String NETSIGN) {
        this.NETSIGN = NETSIGN;
    }

    public String getNETSIGN() {
        return NETSIGN;
    }

    private String PAYDATE;

    public void setPAYDATE(String PAYDATE) {
        this.PAYDATE = PAYDATE;
    }

    public String getPAYDATE() {
        return PAYDATE;
    }

    private Double EXCHRATE;

    public void setEXCHRATE(Double EXCHRATE) {
        this.EXCHRATE = EXCHRATE;
    }

    public Double getEXCHRATE() {
        return EXCHRATE;
    }

    private String PCURRENCY;

    public void setPCURRENCY(String PCURRENCY) {
        this.PCURRENCY = PCURRENCY;
    }

    public String getPCURRENCY() {
        return PCURRENCY;
    }

    private String PCURRDEC;

    public void setPCURRDEC(String PCURRDEC) {
        this.PCURRDEC = PCURRDEC;
    }

    public String getPCURRDEC() {
        return PCURRDEC;
    }

    private Double TGROSAMPAY;

    public void setTGROSAMPAY(Double TGROSAMPAY) {
        this.TGROSAMPAY = TGROSAMPAY;
    }

    public Double getTGROSAMPAY() {
        return TGROSAMPAY;
    }

    private String TGROAMPSIG;

    public void setTGROAMPSIG(String TGROAMPSIG) {
        this.TGROAMPSIG = TGROAMPSIG;
    }

    public String getTGROAMPSIG() {
        return TGROAMPSIG;
    }

    private Double SFEEAMOU;

    public void setSFEEAMOU(Double SFEEAMOU) {
        this.SFEEAMOU = SFEEAMOU;
    }

    public Double getSFEEAMOU() {
        return SFEEAMOU;
    }

    private String SFEESIGN;

    public void setSFEESIGN(String SFEESIGN) {
        this.SFEESIGN = SFEESIGN;
    }

    public String getSFEESIGN() {
        return SFEESIGN;
    }

    private Double IVACOM12;

    public void setIVACOM12(Double IVACOM12) {
        this.IVACOM12 = IVACOM12;
    }

    public Double getIVACOM12() {
        return IVACOM12;
    }

    private String IVACOSIGN;

    public void setIVACOSIGN(String IVACOSIGN) {
        this.IVACOSIGN = IVACOSIGN;
    }

    public String getIVACOSIGN() {
        return IVACOSIGN;
    }

    private Double NETOPAY;

    public void setNETOPAY(Double NETOPAY) {
        this.NETOPAY = NETOPAY;
    }

    public Double getNETOPAY() {
        return NETOPAY;
    }

    private String NETPAYSIGN;

    public void setNETPAYSIGN(String NETPAYSIGN) {
        this.NETPAYSIGN = NETPAYSIGN;
    }

    public String getNETPAYSIGN() {
        return NETPAYSIGN;
    }

    private Double DISCRATEI;

    public void setDISCRATEI(Double DISCRATEI) {
        this.DISCRATEI = DISCRATEI;
    }

    public Double getDISCRATEI() {
        return DISCRATEI;
    }

    private String RATESIGNI;

    public void setRATESIGNI(String RATESIGNI) {
        this.RATESIGNI = RATESIGNI;
    }

    public String getRATESIGNI() {
        return RATESIGNI;
    }

    private Double RATESFEE;

    public void setRATESFEE(Double RATESFEE) {
        this.RATESFEE = RATESFEE;
    }

    public Double getRATESFEE() {
        return RATESFEE;
    }

    private Double RATESFEED;

    public void setRATESFEED(Double RATESFEED) {
        this.RATESFEED = RATESFEED;
    }

    public Double getRATESFEED() {
        return RATESFEED;
    }

    private Double RATEACCE;

    public void setRATEACCE(Double RATEACCE) {
        this.RATEACCE = RATEACCE;
    }

    public Double getRATEACCE() {
        return RATEACCE;
    }

    private Double ACCEAMOU;

    public void setACCEAMOU(Double ACCEAMOU) {
        this.ACCEAMOU = ACCEAMOU;
    }

    public Double getACCEAMOU() {
        return ACCEAMOU;
    }

    private String GRUPOT;

    public void setGRUPOT(String GRUPOT) {
        this.GRUPOT = GRUPOT;
    }

    public String getGRUPOT() {
        return GRUPOT;
    }

    private String NBRLIQUID;

    public void setNBRLIQUID(String NBRLIQUID) {
        this.NBRLIQUID = NBRLIQUID;
    }

    public String getNBRLIQUID() {
        return NBRLIQUID;
    }

    private String TRANSTYPE;

    public void setTRANSTYPE(String TRANSTYPE) {
        this.TRANSTYPE = TRANSTYPE;
    }

    public String getTRANSTYPE() {
        return TRANSTYPE;
    }

    private String CODCHGBACK;

    public void setCODCHGBACK(String CODCHGBACK) {
        this.CODCHGBACK = CODCHGBACK;
    }

    public String getCODCHGBACK() {
        return CODCHGBACK;
    }

    private String FDESGLOSE;

    public void setFDESGLOSE(String FDESGLOSE) {
        this.FDESGLOSE = FDESGLOSE;
    }

    public String getFDESGLOSE() {
        return FDESGLOSE;
    }

    private String FUENTE;

    public void setFUENTE(String FUENTE) {
        this.FUENTE = FUENTE;
    }

    public String getFUENTE() {
        return FUENTE;
    }

    private Double TGROSAMOUC;

    public void setTGROSAMOUC(Double TGROSAMOUC) {
        this.TGROSAMOUC = TGROSAMOUC;
    }

    public Double getTGROSAMOUC() {
        return TGROSAMOUC;
    }

    private Double SFEEAMOUC;

    public void setSFEEAMOUC(Double SFEEAMOUC) {
        this.SFEEAMOUC = SFEEAMOUC;
    }

    public Double getSFEEAMOUC() {
        return SFEEAMOUC;
    }

    private Double DISCRATEC;

    public void setDISCRATEC(Double DISCRATEC) {
        this.DISCRATEC = DISCRATEC;
    }

    public Double getDISCRATEC() {
        return DISCRATEC;
    }

    private Double DISCAMOUNC;

    public void setDISCAMOUNC(Double DISCAMOUNC) {
        this.DISCAMOUNC = DISCAMOUNC;
    }

    public Double getDISCAMOUNC() {
        return DISCAMOUNC;
    }

    private Double DISCRATEIC;

    public void setDISCRATEIC(Double DISCRATEIC) {
        this.DISCRATEIC = DISCRATEIC;
    }

    public Double getDISCRATEIC() {
        return DISCRATEIC;
    }

    private Double DISCAMOUIC;

    public void setDISCAMOUIC(Double DISCAMOUIC) {
        this.DISCAMOUIC = DISCAMOUIC;
    }

    public Double getDISCAMOUIC() {
        return DISCAMOUIC;
    }

    private Double VATCOMMSIC;

    public void setVATCOMMSIC(Double VATCOMMSIC) {
        this.VATCOMMSIC = VATCOMMSIC;
    }

    public Double getVATCOMMSIC() {
        return VATCOMMSIC;
    }

    private Double RATESFEEC;

    public void setRATESFEEC(Double RATESFEEC) {
        this.RATESFEEC = RATESFEEC;
    }

    public Double getRATESFEEC() {
        return RATESFEEC;
    }

    private Double ACCEAMOUC;

    public void setACCEAMOUC(Double ACCEAMOUC) {
        this.ACCEAMOUC = ACCEAMOUC;
    }

    public Double getACCEAMOUC() {
        return ACCEAMOUC;
    }

    private String CERROIN;

    public void setCERROIN(String CERROIN) {
        this.CERROIN = CERROIN;
    }

    public String getCERROIN() {
        return CERROIN;
    }

    private String CERROR;

    public void setCERROR(String CERROR) {
        this.CERROR = CERROR;
    }

    public String getCERROR() {
        return CERROR;
    }

    private String CERRORHST;

    public void setCERRORHST(String CERRORHST) {
        this.CERRORHST = CERRORHST;
    }

    public String getCERRORHST() {
        return CERRORHST;
    }

    private String CODADJU;

    public void setCODADJU(String CODADJU) {
        this.CODADJU = CODADJU;
    }

    public String getCODADJU() {
        return CODADJU;
    }

    private String FREGLA;

    public void setFREGLA(String FREGLA) {
        this.FREGLA = FREGLA;
    }

    public String getFREGLA() {
        return FREGLA;
    }

    private String STCONL;

    public void setSTCONL(String STCONL) {
        this.STCONL = STCONL;
    }

    public String getSTCONL() {
        return STCONL;
    }

    private String FCONTL;

    public void setFCONTL(String FCONTL) {
        this.FCONTL = FCONTL;
    }

    public String getFCONTL() {
        return FCONTL;
    }

    private String IDCONL;

    public void setIDCONL(String IDCONL) {
        this.IDCONL = IDCONL;
    }

    public String getIDCONL() {
        return IDCONL;
    }

    private String STRFND;

    public void setSTRFND(String STRFND) {
        this.STRFND = STRFND;
    }

    public String getSTRFND() {
        return STRFND;
    }

    private String RFAUTOR;

    public void setRFAUTOR(String RFAUTOR) {
        this.RFAUTOR = RFAUTOR;
    }

    public String getRFAUTOR() {
        return RFAUTOR;
    }

    private String RFOPERB;

    public void setRFOPERB(String RFOPERB) {
        this.RFOPERB = RFOPERB;
    }

    public String getRFOPERB() {
        return RFOPERB;
    }

    private String RFDATE;

    public void setRFDATE(String RFDATE) {
        this.RFDATE = RFDATE;
    }

    public String getRFDATE() {
        return RFDATE;
    }

    private String RFAUDIT;

    public void setRFAUDIT(String RFAUDIT) {
        this.RFAUDIT = RFAUDIT;
    }

    public String getRFAUDIT() {
        return RFAUDIT;
    }

    private String FVOID;

    public void setFVOID(String FVOID) {
        this.FVOID = FVOID;
    }

    public String getFVOID() {
        return FVOID;
    }

    private String FREVERSA;

    public void setFREVERSA(String FREVERSA) {
        this.FREVERSA = FREVERSA;
    }

    public String getFREVERSA() {
        return FREVERSA;
    }

    private String FADM;

    public void setFADM(String FADM) {
        this.FADM = FADM;
    }

    public String getFADM() {
        return FADM;
    }

    private String FREVADM;

    public void setFREVADM(String FREVADM) {
        this.FREVADM = FREVADM;
    }

    public String getFREVADM() {
        return FREVADM;
    }

    private String FSELEC;

    public void setFSELEC(String FSELEC) {
        this.FSELEC = FSELEC;
    }

    public String getFSELEC() {
        return FSELEC;
    }

    private String FECSELEC;

    public void setFECSELEC(String FECSELEC) {
        this.FECSELEC = FECSELEC;
    }

    public String getFECSELEC() {
        return FECSELEC;
    }

    private String FCOMPL;

    public void setFCOMPL(String FCOMPL) {
        this.FCOMPL = FCOMPL;
    }

    public String getFCOMPL() {
        return FCOMPL;
    }

    private String OPERATNBR;

    public void setOPERATNBR(String OPERATNBR) {
        this.OPERATNBR = OPERATNBR;
    }

    public String getOPERATNBR() {
        return OPERATNBR;
    }

    private String AREFNBR;

    public void setAREFNBR(String AREFNBR) {
        this.AREFNBR = AREFNBR;
    }

    public String getAREFNBR() {
        return AREFNBR;
    }

    private String OBSERVA;

    public void setOBSERVA(String OBSERVA) {
        this.OBSERVA = OBSERVA;
    }

    public String getOBSERVA() {
        return OBSERVA;
    }

    private String INVOIRN;

    public void setINVOIRN(String INVOIRN) {
        this.INVOIRN = INVOIRN;
    }

    public String getINVOIRN() {
        return INVOIRN;
    }

    private String INDFIN;

    public void setINDFIN(String INDFIN) {
        this.INDFIN = INDFIN;
    }

    public String getINDFIN() {
        return INDFIN;
    }

    private Double IMPORI;

    public void setIMPORI(Double IMPORI) {
        this.IMPORI = IMPORI;
    }

    public Double getIMPORI() {
        return IMPORI;
    }

    private String CHGBNUM;

    public void setCHGBNUM(String CHGBNUM) {
        this.CHGBNUM = CHGBNUM;
    }

    public String getCHGBNUM() {
        return CHGBNUM;
    }

    private Double SFEERATE;

    public void setSFEERATE(Double SFEERATE) {
        this.SFEERATE = SFEERATE;
    }

    public Double getSFEERATE() {
        return SFEERATE;
    }

    private String SFEERASIGN;

    public void setSFEERASIGN(String SFEERASIGN) {
        this.SFEERASIGN = SFEERASIGN;
    }

    public String getSFEERASIGN() {
        return SFEERASIGN;
    }

    private Double SERVICEFEE;

    public void setSERVICEFEE(Double SERVICEFEE) {
        this.SERVICEFEE = SERVICEFEE;
    }

    public Double getSERVICEFEE() {
        return SERVICEFEE;
    }

    private String SERFEESIGN;

    public void setSERFEESIGN(String SERFEESIGN) {
        this.SERFEESIGN = SERFEESIGN;
    }

    public String getSERFEESIGN() {
        return SERFEESIGN;
    }

    private Double SERVICFEEP;

    public void setSERVICFEEP(Double SERVICFEEP) {
        this.SERVICFEEP = SERVICFEEP;
    }

    public Double getSERVICFEEP() {
        return SERVICFEEP;
    }

    private String SEFEEPSIGN;

    public void setSEFEEPSIGN(String SEFEEPSIGN) {
        this.SEFEEPSIGN = SEFEEPSIGN;
    }

    public String getSEFEEPSIGN() {
        return SEFEEPSIGN;
    }

    private Double ADJUSMENT;

    public void setADJUSMENT(Double ADJUSMENT) {
        this.ADJUSMENT = ADJUSMENT;
    }

    public Double getADJUSMENT() {
        return ADJUSMENT;
    }

    private String ADJSIGN;

    public void setADJSIGN(String ADJSIGN) {
        this.ADJSIGN = ADJSIGN;
    }

    public String getADJSIGN() {
        return ADJSIGN;
    }

    private Double ADJUSMENTP;

    public void setADJUSMENTP(Double ADJUSMENTP) {
        this.ADJUSMENTP = ADJUSMENTP;
    }

    public Double getADJUSMENTP() {
        return ADJUSMENTP;
    }

    private String ADJPSIGN;

    public void setADJPSIGN(String ADJPSIGN) {
        this.ADJPSIGN = ADJPSIGN;
    }

    public String getADJPSIGN() {
        return ADJPSIGN;
    }

    private Double OVERCOM12;

    public void setOVERCOM12(Double OVERCOM12) {
        this.OVERCOM12 = OVERCOM12;
    }

    public Double getOVERCOM12() {
        return OVERCOM12;
    }

    private Double OVERCOM12P;

    public void setOVERCOM12P(Double OVERCOM12P) {
        this.OVERCOM12P = OVERCOM12P;
    }

    public Double getOVERCOM12P() {
        return OVERCOM12P;
    }

    private String ISREFNBR;

    public void setISREFNBR(String ISREFNBR) {
        this.ISREFNBR = ISREFNBR;
    }

    public String getISREFNBR() {
        return ISREFNBR;
    }

    private String SCARDBIN;

    public void setSCARDBIN(String SCARDBIN) {
        this.SCARDBIN = SCARDBIN;
    }

    public String getSCARDBIN() {
        return SCARDBIN;
    }

    private String TRANSID;

    public void setTRANSID(String TRANSID) {
        this.TRANSID = TRANSID;
    }

    public String getTRANSID() {
        return TRANSID;
    }

    private String TRANSDATE;

    public void setTRANSDATE(String TRANSDATE) {
        this.TRANSDATE = TRANSDATE;
    }

    public String getTRANSDATE() {
        return TRANSDATE;
    }

    private String BSUMDATE;

    public void setBSUMDATE(String BSUMDATE) {
        this.BSUMDATE = BSUMDATE;
    }

    public String getBSUMDATE() {
        return BSUMDATE;
    }

    private String TCARDREG;

    public void setTCARDREG(String TCARDREG) {
        this.TCARDREG = TCARDREG;
    }

    public String getTCARDREG() {
        return TCARDREG;
    }

    private String ARN;

    public void setARN(String ARN) {
        this.ARN = ARN;
    }

    public String getARN() {
        return ARN;
    }

    private String PWREF;

    public void setPWREF(String PWREF) {
        this.PWREF = PWREF;
    }

    public String getPWREF() {
        return PWREF;
    }

    private String USCR;

    public void setUSCR(String USCR) {
        this.USCR = USCR;
    }

    public String getUSCR() {
        return USCR;
    }

    private String FECR;

    public void setFECR(String FECR) {
        this.FECR = FECR;
    }

    public String getFECR() {
        return FECR;
    }

    private String HOCR;

    public void setHOCR(String HOCR) {
        this.HOCR = HOCR;
    }

    public String getHOCR() {
        return HOCR;
    }

    private String PGMCR;

    public void setPGMCR(String PGMCR) {
        this.PGMCR = PGMCR;
    }

    public String getPGMCR() {
        return PGMCR;
    }

    private String USUP;

    public void setUSUP(String USUP) {
        this.USUP = USUP;
    }

    public String getUSUP() {
        return USUP;
    }

    private String FEUP;

    public void setFEUP(String FEUP) {
        this.FEUP = FEUP;
    }

    public String getFEUP() {
        return FEUP;
    }

    private String HOUP;

    public void setHOUP(String HOUP) {
        this.HOUP = HOUP;
    }

    public String getHOUP() {
        return HOUP;
    }

    private String PGMUP;

    public void setPGMUP(String PGMUP) {
        this.PGMUP = PGMUP;
    }

    public String getPGMUP() {
        return PGMUP;
    }
    //</editor-fold>
}
