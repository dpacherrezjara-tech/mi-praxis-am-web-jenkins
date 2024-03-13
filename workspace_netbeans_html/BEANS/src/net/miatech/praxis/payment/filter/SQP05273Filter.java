package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4451MP;

/**
 *
 * @author Dvicente
 */
public class SQP05273Filter {
    private String IN_A4451KEY1,IN_A4451KEY2,IN_A4451KEY3,IN_A4451COMEN,IN_A4451STS;
    
    private List<A4451MP> response = new ArrayList<>();

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

    public String getIN_A4451COMEN() {
        return IN_A4451COMEN;
    }

    public void setIN_A4451COMEN(String IN_A4451COMEN) {
        this.IN_A4451COMEN = IN_A4451COMEN;
    }

    public String getIN_A4451STS() {
        return IN_A4451STS;
    }

    public void setIN_A4451STS(String IN_A4451STS) {
        this.IN_A4451STS = IN_A4451STS;
    }

    public List<A4451MP> getResponse() {
        return response;
    }

    public void setResponse(List<A4451MP> response) {
        this.response = response;
    }
}
