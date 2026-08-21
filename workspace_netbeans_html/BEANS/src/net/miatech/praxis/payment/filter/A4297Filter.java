package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4297;

/**
 *
 * @author Dvicente
 */
public class A4297Filter extends A4297{
    private String RN;
    private String A4451DESC1;
    private String A4480DES;

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

    public String getA4480DES() {
        return A4480DES;
    }

    public void setA4480DES(String A4480DES) {
        this.A4480DES = A4480DES;
    }
}
