package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05155Filter extends CustomPageImpl{
    private String IN_CCUST,IN_DATE,IN_DATEFROM,IN_DATETO,IN_TIPO,IN_PROCTYPE,IN_PAIS,IN_TTARJ;
    private List<A4508Filter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_DATE() {
        return IN_DATE;
    }

    public void setIN_DATE(String IN_DATE) {
        this.IN_DATE = IN_DATE;
    }

    public String getIN_DATEFROM() {
        return IN_DATEFROM;
    }

    public void setIN_DATEFROM(String IN_DATEFROM) {
        this.IN_DATEFROM = IN_DATEFROM;
    }

    public String getIN_DATETO() {
        return IN_DATETO;
    }

    public void setIN_DATETO(String IN_DATETO) {
        this.IN_DATETO = IN_DATETO;
    }

    public String getIN_TIPO() {
        return IN_TIPO;
    }

    public void setIN_TIPO(String IN_TIPO) {
        this.IN_TIPO = IN_TIPO;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_PAIS() {
        return IN_PAIS;
    }

    public void setIN_PAIS(String IN_PAIS) {
        this.IN_PAIS = IN_PAIS;
    }

    public String getIN_TTARJ() {
        return IN_TTARJ;
    }

    public void setIN_TTARJ(String IN_TTARJ) {
        this.IN_TTARJ = IN_TTARJ;
    }

    public List<A4508Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4508Filter> response) {
        this.response = response;
    }
}
