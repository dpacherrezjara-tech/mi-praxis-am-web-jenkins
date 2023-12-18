package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class SQP05217Filter {
    private String IN_CCUST,IN_CIA,IN_FORMA,IN_SERIE,SQLMSG;
    private Integer SQLRES;
    
    List<A4496> response = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_CIA() {
        return IN_CIA;
    }

    public void setIN_CIA(String IN_CIA) {
        this.IN_CIA = IN_CIA;
    }

    public String getIN_FORMA() {
        return IN_FORMA;
    }

    public void setIN_FORMA(String IN_FORMA) {
        this.IN_FORMA = IN_FORMA;
    }

    public String getIN_SERIE() {
        return IN_SERIE;
    }

    public void setIN_SERIE(String IN_SERIE) {
        this.IN_SERIE = IN_SERIE;
    }

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }

    public Integer getSQLRES() {
        return SQLRES;
    }

    public void setSQLRES(Integer SQLRES) {
        this.SQLRES = SQLRES;
    }

    public List<A4496> getResponse() {
        return response;
    }

    public void setResponse(List<A4496> response) {
        this.response = response;
    }
}
