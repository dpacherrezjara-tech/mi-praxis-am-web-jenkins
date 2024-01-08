package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4481;

/**
 *
 * @author Dvicente
 */
public class A4481Filter extends A4481{
    private String RN;
    private String A4451DESC1;

    public String getRN() {
        return RN;
    }

    public void setRN(String RN) {
        this.RN = RN;
    }

    public String getA4451DESC1() {
        return A4451DESC1;
    }

    public void setA4451DESC1(String A4451DESC1) {
        this.A4451DESC1 = A4451DESC1;
    }
    
}
