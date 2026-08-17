package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4183;

/**
 *
 * @author Dvicente
 */
public class A4183Filter extends A4183{
    private Integer RN;
    private String ACCOUNT;

    public Integer getRN() {
        return RN;
    }

    public void setRN(Integer RN) {
        this.RN = RN;
    }

    public String getACCOUNT() {
        return ACCOUNT;
    }

    public void setACCOUNT(String ACCOUNT) {
        this.ACCOUNT = ACCOUNT;
    }
    
}
