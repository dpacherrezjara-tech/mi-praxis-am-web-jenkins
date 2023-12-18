package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05026Filter extends CustomPageImpl{
    private String DATE_FROM;
    private String ARCHIVO;
    private String CERROR;
    private List<A4297Filter> lst = new ArrayList<>();

    public String getDATE_FROM() {
        return DATE_FROM;
    }

    public void setDATE_FROM(String DATE_FROM) {
        this.DATE_FROM = DATE_FROM;
    }

    public String getARCHIVO() {
        return ARCHIVO;
    }

    public void setARCHIVO(String ARCHIVO) {
        this.ARCHIVO = ARCHIVO;
    }

    public String getCERROR() {
        return CERROR;
    }

    public void setCERROR(String CERROR) {
        this.CERROR = CERROR;
    }

    public List<A4297Filter> getLst() {
        return lst;
    }

    public void setLst(List<A4297Filter> lst) {
        this.lst = lst;
    }
    
}
