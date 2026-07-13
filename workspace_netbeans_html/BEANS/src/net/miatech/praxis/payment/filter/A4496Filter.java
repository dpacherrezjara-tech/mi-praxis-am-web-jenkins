package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class A4496Filter extends A4496  {
    private String DESC_PROCTYPE, DESC_TARJ, TICKET, CARDTYPE;
    private String PROCDATE, PAYDATE, CHARGEBACK;
    private String BPO_COMEN, BPO_COMEN2, ADM_COMEN;

    private Double RECONCILIATION_AMOUNT, DIFFERENCE_AMOUNT;

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }

    public String getPROCDATE() {
        return PROCDATE;
    }

    public void setPROCDATE(String PROCDATE) {
        this.PROCDATE = PROCDATE;
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

    public String getDESC_TARJ() {
        return DESC_TARJ;
    }

    public void setDESC_TARJ(String DESC_TARJ) {
        this.DESC_TARJ = DESC_TARJ;
    }

    public String getTICKET() {
        return TICKET;
    }

    public void setTICKET(String TICKET) {
        this.TICKET = TICKET;
    }

    public String getPAYDATE() {
        return PAYDATE;
    }

    public void setPAYDATE(String PAYDATE) {
        this.PAYDATE = PAYDATE;
    }

    public String getCHARGEBACK() {
        return CHARGEBACK;
    }

    public void setCHARGEBACK(String CHARGEBACK) {
        this.CHARGEBACK = CHARGEBACK;
    }

    public String getCARDTYPE() {
        return CARDTYPE;
    }

    public void setCARDTYPE(String CARDTYPE) {
        this.CARDTYPE = CARDTYPE;
    }

    public Double getRECONCILIATION_AMOUNT() {
        return RECONCILIATION_AMOUNT;
    }

    public void setRECONCILIATION_AMOUNT(Double RECONCILIATION_AMOUNT) {
        this.RECONCILIATION_AMOUNT = RECONCILIATION_AMOUNT;
    }

    public Double getDIFFERENCE_AMOUNT() {
        return DIFFERENCE_AMOUNT;
    }

    public void setDIFFERENCE_AMOUNT(Double DIFFERENCE_AMOUNT) {
        this.DIFFERENCE_AMOUNT = DIFFERENCE_AMOUNT;
    }

    // SQP05709
    private String STVAL_DESCRIPTION;
    private Integer DIFFERENCE_DAYS;
    private String ESTAI_CONCAT;
    private String ESTAF_CONCAT;
    private String CUPON_CONCAT;

    public String getSTVAL_DESCRIPTION() {
        return STVAL_DESCRIPTION;
    }

    public void setSTVAL_DESCRIPTION(String STVAL_DESCRIPTION) {
        this.STVAL_DESCRIPTION = STVAL_DESCRIPTION;
    }

    public Integer getDIFFERENCE_DAYS() {
        return DIFFERENCE_DAYS;
    }

    public void setDIFFERENCE_DAYS(Integer DIFFERENCE_DAYS) {
        this.DIFFERENCE_DAYS = DIFFERENCE_DAYS;
    }

    public String getESTAI_CONCAT() {
        return ESTAI_CONCAT;
    }

    public void setESTAI_CONCAT(String ESTAI_CONCAT) {
        this.ESTAI_CONCAT = ESTAI_CONCAT;
    }

    public String getESTAF_CONCAT() {
        return ESTAF_CONCAT;
    }

    public void setESTAF_CONCAT(String ESTAF_CONCAT) {
        this.ESTAF_CONCAT = ESTAF_CONCAT;
    }

    public String getCUPON_CONCAT() {
        return CUPON_CONCAT;
    }

    public void setCUPON_CONCAT(String CUPON_CONCAT) {
        this.CUPON_CONCAT = CUPON_CONCAT;
    }

}
