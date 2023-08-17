package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05041Filter extends CustomPageImpl{
    private String IN_TFECHA,FECHA_FROM_P,FECHA_FROM_H,
            IN_PROCTYPE,IN_PROCTYPESQ,IN_MDA,IN_TDOC,IN_PNR,IN_STCONL;
    private List<A4331NEWFilter> response = new ArrayList<>();
    
    public String getIN_TFECHA() {
        return IN_TFECHA;
    }

    public void setIN_TFECHA(String IN_TFECHA) {
        this.IN_TFECHA = IN_TFECHA;
    }

    public String getFECHA_FROM_P() {
        return FECHA_FROM_P;
    }

    public void setFECHA_FROM_P(String FECHA_FROM_P) {
        this.FECHA_FROM_P = FECHA_FROM_P;
    }

    public String getFECHA_FROM_H() {
        return FECHA_FROM_H;
    }

    public void setFECHA_FROM_H(String FECHA_FROM_H) {
        this.FECHA_FROM_H = FECHA_FROM_H;
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

    public List<A4331NEWFilter> getResponse() {
        return response;
    }

    public void setResponse(List<A4331NEWFilter> response) {
        this.response = response;
    }
}
