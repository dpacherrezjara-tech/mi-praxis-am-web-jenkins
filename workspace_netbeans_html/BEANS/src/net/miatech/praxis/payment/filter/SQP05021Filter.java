package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05021Filter extends CustomPageImpl{
    private String DATE_FROM;
    private String ARCHIVO;
    private String CERROR;
    private String STS_ERROR;
    private String TIPO_CORRECCION;
    private List<A4481Filter> lst = new ArrayList<>();

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

    public String getSTS_ERROR() {
        return STS_ERROR;
    }

    public void setSTS_ERROR(String STS_ERROR) {
        this.STS_ERROR = STS_ERROR;
    }

    public String getTIPO_CORRECCION() {
        return TIPO_CORRECCION;
    }

    public void setTIPO_CORRECCION(String TIPO_CORRECCION) {
        this.TIPO_CORRECCION = TIPO_CORRECCION;
    }

    public List<A4481Filter> getLst() {
        return lst;
    }

    public void setLst(List<A4481Filter> lst) {
        this.lst = lst;
    }
    
}
