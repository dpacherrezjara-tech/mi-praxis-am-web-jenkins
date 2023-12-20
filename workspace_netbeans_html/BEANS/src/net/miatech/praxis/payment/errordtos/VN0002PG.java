package net.miatech.praxis.payment.errordtos;

import net.miatech.praxis.payment.entities.A4453;

/**
 *
 * @author Dvicente
 */
public class VN0002PG extends A4453{
    private String IN_TKT;
    private String IN_IDREF;
    private String IN_CCUST;
    private String IN_PROCTYPE;

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
    }

    public String getIN_IDREF() {
        return IN_IDREF;
    }

    public void setIN_IDREF(String IN_IDREF) {
        this.IN_IDREF = IN_IDREF;
    }

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }
}
