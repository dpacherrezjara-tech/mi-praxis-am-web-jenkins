package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05135Filter {
    private String IN_CCUST,IN_FECFROM,IN_FECTO,IN_CODIGO,IN_PROCTYPESQ,IN_COUNTRY,IN_TIPOTARJ,
            IN_RATCNAC,IN_RATEIVA;
    private Integer IN_ID,IN_CUOTAS;
    
    private Integer SQLRES;
    private String SQLMSG;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_FECFROM() {
        return IN_FECFROM;
    }

    public void setIN_FECFROM(String IN_FECFROM) {
        this.IN_FECFROM = IN_FECFROM;
    }

    public String getIN_FECTO() {
        return IN_FECTO;
    }

    public void setIN_FECTO(String IN_FECTO) {
        this.IN_FECTO = IN_FECTO;
    }

    public String getIN_CODIGO() {
        return IN_CODIGO;
    }

    public void setIN_CODIGO(String IN_CODIGO) {
        this.IN_CODIGO = IN_CODIGO;
    }

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }

    public String getIN_COUNTRY() {
        return IN_COUNTRY;
    }

    public void setIN_COUNTRY(String IN_COUNTRY) {
        this.IN_COUNTRY = IN_COUNTRY;
    }

    public String getIN_TIPOTARJ() {
        return IN_TIPOTARJ;
    }

    public void setIN_TIPOTARJ(String IN_TIPOTARJ) {
        this.IN_TIPOTARJ = IN_TIPOTARJ;
    }

    public String getIN_RATCNAC() {
        return IN_RATCNAC;
    }

    public void setIN_RATCNAC(String IN_RATCNAC) {
        this.IN_RATCNAC = IN_RATCNAC;
    }

    public String getIN_RATEIVA() {
        return IN_RATEIVA;
    }

    public void setIN_RATEIVA(String IN_RATEIVA) {
        this.IN_RATEIVA = IN_RATEIVA;
    }

    public Integer getIN_ID() {
        return IN_ID;
    }

    public void setIN_ID(Integer IN_ID) {
        this.IN_ID = IN_ID;
    }

    public Integer getIN_CUOTAS() {
        return IN_CUOTAS;
    }

    public void setIN_CUOTAS(Integer IN_CUOTAS) {
        this.IN_CUOTAS = IN_CUOTAS;
    }

    public Integer getSQLRES() {
        return SQLRES;
    }

    public void setSQLRES(Integer SQLRES) {
        this.SQLRES = SQLRES;
    }

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }
    
}
