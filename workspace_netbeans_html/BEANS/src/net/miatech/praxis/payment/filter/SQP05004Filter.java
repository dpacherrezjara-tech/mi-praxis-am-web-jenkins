package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4451MP;

/**
 *
 * @author Dvicente
 */
public class SQP05004Filter {
    private String KEY1;
    private String KEY2;
    private String KEY3;
    private List<A4451MP> lst = new ArrayList<>();

    public String getKEY1() {
        return KEY1;
    }

    public void setKEY1(String KEY1) {
        this.KEY1 = KEY1;
    }

    public String getKEY2() {
        return KEY2;
    }

    public void setKEY2(String KEY2) {
        this.KEY2 = KEY2;
    }

    public String getKEY3() {
        return KEY3;
    }

    public void setKEY3(String KEY3) {
        this.KEY3 = KEY3;
    }

    public List<A4451MP> getLst() {
        return lst;
    }

    public void setLst(List<A4451MP> lst) {
        this.lst = lst;
    }
    
    
}
