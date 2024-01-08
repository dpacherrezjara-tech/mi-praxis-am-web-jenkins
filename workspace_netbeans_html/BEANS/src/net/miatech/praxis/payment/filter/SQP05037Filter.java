package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05037Filter {
    private String IN_TFECHA,FECHA_FROM
            ,IN_PROCTYPE,IN_PROCTYPESQ,IN_MDA,IN_TDOC,IN_PNR,IN_IDCON;
    
    private List<A4331AT2Filter> response = new ArrayList<>();

    public String getIN_TFECHA() {
        return IN_TFECHA;
    }

    public void setIN_TFECHA(String IN_TFECHA) {
        this.IN_TFECHA = IN_TFECHA;
    }

    public String getFECHA_FROM() {
        return FECHA_FROM;
    }

    public void setFECHA_FROM(String FECHA_FROM) {
        this.FECHA_FROM = FECHA_FROM;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }

    public String getIN_MDA() {
        return IN_MDA;
    }

    public void setIN_MDA(String IN_MDA) {
        this.IN_MDA = IN_MDA;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public List<A4331AT2Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331AT2Filter> response) {
        this.response = response;
    }

    public String getIN_IDCON() {
        return IN_IDCON;
    }

    public void setIN_IDCON(String IN_IDCON) {
        this.IN_IDCON = IN_IDCON;
    }
    
}
