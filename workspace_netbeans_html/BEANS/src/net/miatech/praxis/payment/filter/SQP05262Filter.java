package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4559;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05262Filter extends CustomPageImpl{
    private String IN_CCUST,IN_NOMBRE,IN_PAIS,IN_REGION;
    
    private List<A4559> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_NOMBRE() {
        return IN_NOMBRE;
    }

    public void setIN_NOMBRE(String IN_NOMBRE) {
        this.IN_NOMBRE = IN_NOMBRE;
    }

    public String getIN_PAIS() {
        return IN_PAIS;
    }

    public void setIN_PAIS(String IN_PAIS) {
        this.IN_PAIS = IN_PAIS;
    }

    public String getIN_REGION() {
        return IN_REGION;
    }

    public void setIN_REGION(String IN_REGION) {
        this.IN_REGION = IN_REGION;
    }

    public List<A4559> getResponse() {
        return response;
    }

    public void setResponse(List<A4559> response) {
        this.response = response;
    }
}
