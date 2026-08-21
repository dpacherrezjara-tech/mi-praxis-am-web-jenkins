package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.payment.entities.A4451;

/**
 *
 * @author Dvicente
 */
public class SQP04971Filter{
    //INPUTS
    private String TIPO;
    private String STATUS;
    
    //outputs
    private List<A4451> lstFuentes = new ArrayList<>();
    private List<A006> lstPaises = new ArrayList<>();

    public List<A4451> getLstFuentes() {
        return lstFuentes;
    }

    public void setLstFuentes(List<A4451> lstFuentes) {
        this.lstFuentes = lstFuentes;
    }

    public List<A006> getLstPaises() {
        return lstPaises;
    }

    public void setLstPaises(List<A006> lstPaises) {
        this.lstPaises = lstPaises;
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }
    
}
