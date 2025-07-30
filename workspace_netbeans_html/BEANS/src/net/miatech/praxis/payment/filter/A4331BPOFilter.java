package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4331;

/**
 *
 * @author Dvicente
 */
public class A4331BPOFilter extends A4331{
    private String DESC_PROC,DESC_ERROR,DESC_ADJU,SMERCHIDF,DESC_PMERCHID,DESC_SMERCHID,BPOCOMENT,ADJUCOMENT,AUTOCOMENT,STPROCEDE;
    private Double F_TAX,F_TGROSAMOUN,F_TGROSAMPAY,DIFFERENCE;

     
    public Double getDIFFERENCE() {
        return DIFFERENCE;
    }

    public void setDIFFERENCE(Double DIFFERENCE) {
        this.DIFFERENCE = DIFFERENCE;
    }
    
    public Double getF_TGROSAMPAY() {
        return F_TGROSAMPAY;
    }

    public void setF_TGROSAMPAY(Double F_TGROSAMPAY) {
        this.F_TGROSAMPAY = F_TGROSAMPAY;
    }

    public Double getF_TGROSAMOUN() {
        return F_TGROSAMOUN;
    }

    public void setF_TGROSAMOUN(Double F_TGROSAMOUN) {
        this.F_TGROSAMOUN = F_TGROSAMOUN;
    }

    public Double getF_TAX() {
        return F_TAX;
    }

    public void setF_TAX(Double F_TAX) {
        this.F_TAX = F_TAX;
    }
    

    public String getDESC_PROC() {
        return DESC_PROC;
    }

    public void setDESC_PROC(String DESC_PROC) {
        this.DESC_PROC = DESC_PROC;
    }

    public String getDESC_ERROR() {
        return DESC_ERROR;
    }

    public void setDESC_ERROR(String DESC_ERROR) {
        this.DESC_ERROR = DESC_ERROR;
    }

    public String getSMERCHIDF() {
        return SMERCHIDF;
    }

    public void setSMERCHIDF(String SMERCHIDF) {
        this.SMERCHIDF = SMERCHIDF;
    }

    public String getDESC_PMERCHID() {
        return DESC_PMERCHID;
    }

    public void setDESC_PMERCHID(String DESC_PMERCHID) {
        this.DESC_PMERCHID = DESC_PMERCHID;
    }

    public String getDESC_SMERCHID() {
        return DESC_SMERCHID;
    }

    public void setDESC_SMERCHID(String DESC_SMERCHID) {
        this.DESC_SMERCHID = DESC_SMERCHID;
    }

    public String getBPOCOMENT() {
        return BPOCOMENT;
    }

    public void setBPOCOMENT(String BPOCOMENT) {
        this.BPOCOMENT = BPOCOMENT;
    }

    public String getDESC_ADJU() {
        return DESC_ADJU;
    }

    public void setDESC_ADJU(String DESC_ADJU) {
        this.DESC_ADJU = DESC_ADJU;
    }

    public String getADJUCOMENT() {
        return ADJUCOMENT;
    }

    public void setADJUCOMENT(String ADJUCOMENT) {
        this.ADJUCOMENT = ADJUCOMENT;
    }
    public String getAUTOCOMENT() {
        return AUTOCOMENT;
    }
    public void setAUTOCOMENT(String AUTOCOMENT) {
        this.AUTOCOMENT = AUTOCOMENT;
    }
    public String getSTPROCEDE() {
        return STPROCEDE;
    }
    public void setSTPROCEDE(String STPROCEDE) {
        this.STPROCEDE = STPROCEDE;
    }
}
