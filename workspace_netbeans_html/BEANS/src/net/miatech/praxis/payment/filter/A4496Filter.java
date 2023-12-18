package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class A4496Filter extends A4496{
    private String DESC_PROCTYPE;
    private String PROCDATE;
    private String BPO_COMEN,BPO_COMEN2,ADM_COMEN;

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
}
