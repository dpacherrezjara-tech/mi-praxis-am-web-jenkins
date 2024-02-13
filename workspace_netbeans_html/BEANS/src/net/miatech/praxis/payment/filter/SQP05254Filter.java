package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05254Filter extends CustomPageImpl{
    private String IN_CCUST,IN_MERCHN,IN_RSOCIAL,
            IN_UNIOPE,IN_CANAL,IN_STATUS,IN_SCOUNTRY;
    
    private List<A2354Filter> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_MERCHN() {
        return IN_MERCHN;
    }

    public void setIN_MERCHN(String IN_MERCHN) {
        this.IN_MERCHN = IN_MERCHN;
    }

    public String getIN_RSOCIAL() {
        return IN_RSOCIAL;
    }

    public void setIN_RSOCIAL(String IN_RSOCIAL) {
        this.IN_RSOCIAL = IN_RSOCIAL;
    }

    public String getIN_UNIOPE() {
        return IN_UNIOPE;
    }

    public void setIN_UNIOPE(String IN_UNIOPE) {
        this.IN_UNIOPE = IN_UNIOPE;
    }

    public String getIN_CANAL() {
        return IN_CANAL;
    }

    public void setIN_CANAL(String IN_CANAL) {
        this.IN_CANAL = IN_CANAL;
    }

    public String getIN_STATUS() {
        return IN_STATUS;
    }

    public void setIN_STATUS(String IN_STATUS) {
        this.IN_STATUS = IN_STATUS;
    }

    public String getIN_SCOUNTRY() {
        return IN_SCOUNTRY;
    }

    public void setIN_SCOUNTRY(String IN_SCOUNTRY) {
        this.IN_SCOUNTRY = IN_SCOUNTRY;
    }

    public List<A2354Filter> getResponse() {
        return response;
    }

    public void setResponse(List<A2354Filter> response) {
        this.response = response;
    }
}
