package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dvicente
 */
public class SQP05036Filter {
    private String IN_TFECHA;
    private String FECHA_FROM;
    private String FECHA_TO;
    private String IN_PROCESADOR;
    private String IN_MDA;
    private String IN_TDOC;
    private String IN_PNR;
    private String IN_FLEXID;
    private String IN_PRAXISID;
    private String IN_AREFNBR;
    private String IN_TICKET;
    
    private List<A4331AT1Filter> response =  new ArrayList<>();

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

    public String getFECHA_TO() {
        return FECHA_TO;
    }

    public void setFECHA_TO(String FECHA_TO) {
        this.FECHA_TO = FECHA_TO;
    }

    public String getIN_PROCESADOR() {
        return IN_PROCESADOR;
    }

    public void setIN_PROCESADOR(String IN_PROCESADOR) {
        this.IN_PROCESADOR = IN_PROCESADOR;
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

    public List<A4331AT1Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331AT1Filter> response) {
        this.response = response;
    }

    public String getIN_FLEXID() {
        return IN_FLEXID;
    }

    public void setIN_FLEXID(String IN_FLEXID) {
        this.IN_FLEXID = IN_FLEXID;
    }

    public String getIN_PRAXISID() {
        return IN_PRAXISID;
    }

    public void setIN_PRAXISID(String IN_PRAXISID) {
        this.IN_PRAXISID = IN_PRAXISID;
    }
    
    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }
    
    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
    }
    
}
