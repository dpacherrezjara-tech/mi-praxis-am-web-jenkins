package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4511;

/**
 *
 * @author Dvicente
 */
public class A4511Filter extends A4511{
    private String DESC_PROCTYPE,DESC_SMERCHID,DESC_PMERCHID;
    private Integer ALERTS;

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }

    public String getDESC_SMERCHID() {
        return DESC_SMERCHID;
    }

    public void setDESC_SMERCHID(String DESC_SMERCHID) {
        this.DESC_SMERCHID = DESC_SMERCHID;
    }

    public Integer getALERTS() {
        return ALERTS;
    }

    public void setALERTS(Integer ALERTS) {
        this.ALERTS = ALERTS;
    }

    public String getDESC_PMERCHID() {
        return DESC_PMERCHID;
    }

    public void setDESC_PMERCHID(String DESC_PMERCHID) {
        this.DESC_PMERCHID = DESC_PMERCHID;
    }
    
}
