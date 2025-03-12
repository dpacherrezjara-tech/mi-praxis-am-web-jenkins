package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4331;

/**
 *
 * @author Dvicente
 */
public class A4331Filter extends A4331{
    private String DESC_ERROR,DES_MERCHANT,DES_SMERCHANT,DES_CERROR,
            DESC_CODADJU,DESC_PROCTYPE,BPOCOMENT,ADJUCOMENT,IDFLEX,PRAXISID,STMAIN;
    private Double F_TAX,F_ADJUSMENT;

    public Double getF_ADJUSMENT() {
        return F_ADJUSMENT;
    }

    public void setF_ADJUSMENT(Double F_ADJUSMENT) {
        this.F_ADJUSMENT = F_ADJUSMENT;
    }

    public Double getF_TAX() {
        return F_TAX;
    }

    public void setF_TAX(Double F_TAX) {
        this.F_TAX = F_TAX;
    }
    private A4331SFilter summary;

    public String getDESC_ERROR() {
        return DESC_ERROR;
    }

    public void setDESC_ERROR(String DESC_ERROR) {
        this.DESC_ERROR = DESC_ERROR;
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

    public String getDES_CERROR() {
        return DES_CERROR;
    }

    public void setDES_CERROR(String DES_CERROR) {
        this.DES_CERROR = DES_CERROR;
    }

    public String getDESC_CODADJU() {
        return DESC_CODADJU;
    }

    public void setDESC_CODADJU(String DESC_CODADJU) {
        this.DESC_CODADJU = DESC_CODADJU;
    }

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }

    public A4331SFilter getSummary() {
        return summary;
    }

    public void setSummary(A4331SFilter summary) {
        this.summary = summary;
    }

    public String getBPOCOMENT() {
        return BPOCOMENT;
    }

    public void setBPOCOMENT(String BPOCOMENT) {
        this.BPOCOMENT = BPOCOMENT;
    }

    public String getADJUCOMENT() {
        return ADJUCOMENT;
    }

    public void setADJUCOMENT(String ADJUCOMENT) {
        this.ADJUCOMENT = ADJUCOMENT;
    }

    public String getIDFLEX() {
        return IDFLEX;
    }

    public void setIDFLEX(String IDFLEX) {
        this.IDFLEX = IDFLEX;
    }

    public String getPRAXISID() {
        return PRAXISID;
    }

    public void setPRAXISID(String PRAXISID) {
        this.PRAXISID = PRAXISID;
    }

    public String getSTMAIN() {
        return STMAIN;
    }

    public void setSTMAIN(String STMAIN) {
        this.STMAIN = STMAIN;
    }
}
