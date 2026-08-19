package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05046Filter extends CustomPageImpl{
    private String IN_TFECHA,IN_FROM,IN_TO,IN_TICKET,IN_PNR,IN_SCARDN,IN_SAUTHOC,IN_STATSBRE;
    private Integer OU_ALERT;
    private List<A4482Filter> response = new ArrayList<>();

    public String getIN_TFECHA() {
        return IN_TFECHA;
    }

    public void setIN_TFECHA(String IN_TFECHA) {
        this.IN_TFECHA = IN_TFECHA;
    }

    public String getIN_FROM() {
        return IN_FROM;
    }

    public void setIN_FROM(String IN_FROM) {
        this.IN_FROM = IN_FROM;
    }

    public String getIN_TO() {
        return IN_TO;
    }

    public void setIN_TO(String IN_TO) {
        this.IN_TO = IN_TO;
    }

    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }

    public String getIN_SAUTHOC() {
        return IN_SAUTHOC;
    }

    public void setIN_SAUTHOC(String IN_SAUTHOC) {
        this.IN_SAUTHOC = IN_SAUTHOC;
    }

    public List<A4482Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A4482Filter> response) {
        this.response = response;
    }

    public String getIN_STATSBRE() {
        return IN_STATSBRE;
    }

    public void setIN_STATSBRE(String IN_STATSBRE) {
        this.IN_STATSBRE = IN_STATSBRE;
    }

    public Integer getOU_ALERT() {
        return OU_ALERT;
    }

    public void setOU_ALERT(Integer OU_ALERT) {
        this.OU_ALERT = OU_ALERT;
    }
}
