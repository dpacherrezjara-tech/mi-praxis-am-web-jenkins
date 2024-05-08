package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class A4496Filter extends A4496{
    private String DESC_PROCTYPE,DESC_TARJ,TICKET;
    private String PROCDATE,PAYDATE,CHARGEBACK;
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
}
