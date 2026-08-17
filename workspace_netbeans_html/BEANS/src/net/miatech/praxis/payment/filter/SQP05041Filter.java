package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05041Filter extends CustomPageImpl{
    private String IN_TFECHA,FECHA_FROM,IN_PROCTYPE,IN_PROCTYPESQ,
            IN_MDA,IN_TDOC,IN_PNR,IN_STCONL,IN_PRAXISID,IN_IDFLEX,IN_AREFNBR,IN_TICKET;
    private List<A4331Filter> response = new ArrayList<>();
    
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

    public String getIN_STCONL() {
        return IN_STCONL;
    }

    public void setIN_STCONL(String IN_STCONL) {
        this.IN_STCONL = IN_STCONL;
    }

    public List<A4331Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331Filter> response) {
        this.response = response;
    }

    public String getIN_IDFLEX() {
        return IN_IDFLEX;
    }

    public void setIN_IDFLEX(String IN_IDFLEX) {
        this.IN_IDFLEX = IN_IDFLEX;
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
