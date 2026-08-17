package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4451MP;

/**
 *
 * @author Dvicente
 */
public class SQP05275Filter {
    private String IN_A4451KEY1,IN_A4451KEY2,IN_A4451KEY3;
    private A4451MP response;

    public String getIN_A4451KEY1() {
        return IN_A4451KEY1;
    }

    public void setIN_A4451KEY1(String IN_A4451KEY1) {
        this.IN_A4451KEY1 = IN_A4451KEY1;
    }

    public String getIN_A4451KEY2() {
        return IN_A4451KEY2;
    }

    public void setIN_A4451KEY2(String IN_A4451KEY2) {
        this.IN_A4451KEY2 = IN_A4451KEY2;
    }

    public String getIN_A4451KEY3() {
        return IN_A4451KEY3;
    }

    public void setIN_A4451KEY3(String IN_A4451KEY3) {
        this.IN_A4451KEY3 = IN_A4451KEY3;
    }

    public A4451MP getResponse() {
        return response;
    }

    public void setResponse(A4451MP response) {
        this.response = response;
    }
}
