package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class A4331STFilter{
    /*
    CAMPOS A TOMAR EN CUENTA PARA SETTLEMENT:
    
    LIQUIDACION
    tgrosamoun => monto liquidacion
    scurrency => moneda liquidacion
    tgrosampay => monto pago liquidacion
    pcurrency => moneda de pago liquidacion
    netopay => total pagado (monto que recibe am, restando comisiones,etc)

    COMISIONES
    discamoun => comision
    sfeeamou => comision (moneda de pago)
    discrate => % de comision
    discamouni => VAT  de comision
    ivacom12 => VAT de comision (moneda de pago)
    discratei => % VAT de comision

    MSI
    sfeerate => % de MSI
    servicefee => monto MSI
    servicfeep => monto MSI (moneda de pago)
    overcom12 => VAT msi
    overcom12p => VAT msi (moneda de pago)
    
    ADJUSTMENT
    adjustment => monto ADJ
    adjustmentp => monto ADJ (moneda de pago)
    */
    private String DESC_PROCTYPE,PAYDATE,PRDA,PCURRENCY,SCURRENCY,PROCTYPE,PROCTYPESQ,SCOUNTRY,PMERCHID;
    private Double TGROSAMOUN,TGROSAMOUN_WCA,TGROSAMPAY,TGROSAMPAY_WCA,
            NETAMOUN,NETOPAY,
            //COMISIONES
            DISCAMOUN,SFEEAMOU,DISCRATE,DISCAMOUNI,IVACOM12,DISCRATEI,
            //MSI
            SFEERATE,SERVICEFEE,SERVICFEEP,OVERCOM12,OVERCOM12P,
            //AJUSTES
            ADJUSTMENT,ADJUSTMENTP,
            TGROSAMOUN_CB,DISCAMOUN_CB,SFEEAMOU_CB,DISCAMOUNI_CB,IVACOM12_CB,
            DISCAMOUN_ADJ,SFEEAMOU_ADJ,DISCAMOUNI_ADJ,IVACOM12_ADJ;
    private Integer QTYTRN;

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }

    public String getPAYDATE() {
        return PAYDATE;
    }

    public void setPAYDATE(String PAYDATE) {
        this.PAYDATE = PAYDATE;
    }

    public String getPRDA() {
        return PRDA;
    }

    public void setPRDA(String PRDA) {
        this.PRDA = PRDA;
    }

    public String getPCURRENCY() {
        return PCURRENCY;
    }

    public void setPCURRENCY(String PCURRENCY) {
        this.PCURRENCY = PCURRENCY;
    }

    public String getSCURRENCY() {
        return SCURRENCY;
    }

    public void setSCURRENCY(String SCURRENCY) {
        this.SCURRENCY = SCURRENCY;
    }

    public String getPROCTYPE() {
        return PROCTYPE;
    }

    public void setPROCTYPE(String PROCTYPE) {
        this.PROCTYPE = PROCTYPE;
    }

    public String getPROCTYPESQ() {
        return PROCTYPESQ;
    }

    public void setPROCTYPESQ(String PROCTYPESQ) {
        this.PROCTYPESQ = PROCTYPESQ;
    }

    public String getSCOUNTRY() {
        return SCOUNTRY;
    }

    public void setSCOUNTRY(String SCOUNTRY) {
        this.SCOUNTRY = SCOUNTRY;
    }

    public String getPMERCHID() {
        return PMERCHID;
    }

    public void setPMERCHID(String PMERCHID) {
        this.PMERCHID = PMERCHID;
    }

    public Double getTGROSAMOUN() {
        return TGROSAMOUN;
    }

    public void setTGROSAMOUN(Double TGROSAMOUN) {
        this.TGROSAMOUN = TGROSAMOUN;
    }

    public Double getTGROSAMOUN_WCA() {
        return TGROSAMOUN_WCA;
    }

    public void setTGROSAMOUN_WCA(Double TGROSAMOUN_WCA) {
        this.TGROSAMOUN_WCA = TGROSAMOUN_WCA;
    }

    public Double getTGROSAMPAY() {
        return TGROSAMPAY;
    }

    public void setTGROSAMPAY(Double TGROSAMPAY) {
        this.TGROSAMPAY = TGROSAMPAY;
    }

    public Double getTGROSAMPAY_WCA() {
        return TGROSAMPAY_WCA;
    }

    public void setTGROSAMPAY_WCA(Double TGROSAMPAY_WCA) {
        this.TGROSAMPAY_WCA = TGROSAMPAY_WCA;
    }

    public Double getNETAMOUN() {
        return NETAMOUN;
    }

    public void setNETAMOUN(Double NETAMOUN) {
        this.NETAMOUN = NETAMOUN;
    }

    public Double getNETOPAY() {
        return NETOPAY;
    }

    public void setNETOPAY(Double NETOPAY) {
        this.NETOPAY = NETOPAY;
    }

    public Double getDISCAMOUN() {
        return DISCAMOUN;
    }

    public void setDISCAMOUN(Double DISCAMOUN) {
        this.DISCAMOUN = DISCAMOUN;
    }

    public Double getSFEEAMOU() {
        return SFEEAMOU;
    }

    public void setSFEEAMOU(Double SFEEAMOU) {
        this.SFEEAMOU = SFEEAMOU;
    }

    public Double getDISCRATE() {
        return DISCRATE;
    }

    public void setDISCRATE(Double DISCRATE) {
        this.DISCRATE = DISCRATE;
    }

    public Double getDISCAMOUNI() {
        return DISCAMOUNI;
    }

    public void setDISCAMOUNI(Double DISCAMOUNI) {
        this.DISCAMOUNI = DISCAMOUNI;
    }

    public Double getIVACOM12() {
        return IVACOM12;
    }

    public void setIVACOM12(Double IVACOM12) {
        this.IVACOM12 = IVACOM12;
    }

    public Double getDISCRATEI() {
        return DISCRATEI;
    }

    public void setDISCRATEI(Double DISCRATEI) {
        this.DISCRATEI = DISCRATEI;
    }

    public Double getSFEERATE() {
        return SFEERATE;
    }

    public void setSFEERATE(Double SFEERATE) {
        this.SFEERATE = SFEERATE;
    }

    public Double getSERVICEFEE() {
        return SERVICEFEE;
    }

    public void setSERVICEFEE(Double SERVICEFEE) {
        this.SERVICEFEE = SERVICEFEE;
    }

    public Double getSERVICFEEP() {
        return SERVICFEEP;
    }

    public void setSERVICFEEP(Double SERVICFEEP) {
        this.SERVICFEEP = SERVICFEEP;
    }

    public Double getOVERCOM12() {
        return OVERCOM12;
    }

    public void setOVERCOM12(Double OVERCOM12) {
        this.OVERCOM12 = OVERCOM12;
    }

    public Double getOVERCOM12P() {
        return OVERCOM12P;
    }

    public void setOVERCOM12P(Double OVERCOM12P) {
        this.OVERCOM12P = OVERCOM12P;
    }

    public Double getADJUSTMENT() {
        return ADJUSTMENT;
    }

    public void setADJUSTMENT(Double ADJUSTMENT) {
        this.ADJUSTMENT = ADJUSTMENT;
    }

    public Double getADJUSTMENTP() {
        return ADJUSTMENTP;
    }

    public void setADJUSTMENTP(Double ADJUSTMENTP) {
        this.ADJUSTMENTP = ADJUSTMENTP;
    }

    public Integer getQTYTRN() {
        return QTYTRN;
    }

    public void setQTYTRN(Integer QTYTRN) {
        this.QTYTRN = QTYTRN;
    }

    public Double getTGROSAMOUN_CB() {
        return TGROSAMOUN_CB;
    }

    public void setTGROSAMOUN_CB(Double TGROSAMOUN_CB) {
        this.TGROSAMOUN_CB = TGROSAMOUN_CB;
    }

    public Double getDISCAMOUN_CB() {
        return DISCAMOUN_CB;
    }

    public void setDISCAMOUN_CB(Double DISCAMOUN_CB) {
        this.DISCAMOUN_CB = DISCAMOUN_CB;
    }

    public Double getSFEEAMOU_CB() {
        return SFEEAMOU_CB;
    }

    public void setSFEEAMOU_CB(Double SFEEAMOU_CB) {
        this.SFEEAMOU_CB = SFEEAMOU_CB;
    }

    public Double getDISCAMOUNI_CB() {
        return DISCAMOUNI_CB;
    }

    public void setDISCAMOUNI_CB(Double DISCAMOUNI_CB) {
        this.DISCAMOUNI_CB = DISCAMOUNI_CB;
    }

    public Double getIVACOM12_CB() {
        return IVACOM12_CB;
    }

    public void setIVACOM12_CB(Double IVACOM12_CB) {
        this.IVACOM12_CB = IVACOM12_CB;
    }

    public Double getDISCAMOUN_ADJ() {
        return DISCAMOUN_ADJ;
    }

    public void setDISCAMOUN_ADJ(Double DISCAMOUN_ADJ) {
        this.DISCAMOUN_ADJ = DISCAMOUN_ADJ;
    }

    public Double getSFEEAMOU_ADJ() {
        return SFEEAMOU_ADJ;
    }

    public void setSFEEAMOU_ADJ(Double SFEEAMOU_ADJ) {
        this.SFEEAMOU_ADJ = SFEEAMOU_ADJ;
    }

    public Double getDISCAMOUNI_ADJ() {
        return DISCAMOUNI_ADJ;
    }

    public void setDISCAMOUNI_ADJ(Double DISCAMOUNI_ADJ) {
        this.DISCAMOUNI_ADJ = DISCAMOUNI_ADJ;
    }

    public Double getIVACOM12_ADJ() {
        return IVACOM12_ADJ;
    }

    public void setIVACOM12_ADJ(Double IVACOM12_ADJ) {
        this.IVACOM12_ADJ = IVACOM12_ADJ;
    }
}
