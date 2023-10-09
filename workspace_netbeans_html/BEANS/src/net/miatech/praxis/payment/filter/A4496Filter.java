package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.A4496;

/**
 *
 * @author Dvicente
 */
public class A4496Filter extends A4496{
    private String DESC_PROCTYPE;
    private String PROCDATE;

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
}
