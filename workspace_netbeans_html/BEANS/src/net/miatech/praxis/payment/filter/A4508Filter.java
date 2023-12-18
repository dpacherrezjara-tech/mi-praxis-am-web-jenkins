package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4508;

/**
 *
 * @author Dvicente
 */
public class A4508Filter extends A4508{
    private String DESC_PROCTYPE;
    private Integer RN;

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }

    public Integer getRN() {
        return RN;
    }

    public void setRN(Integer RN) {
        this.RN = RN;
    }
}
