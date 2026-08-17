package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4496;

/**
 *
 * @author Dvicente
 */
public class SQP05217Filter {
    private String IN_A4496CCUST,IN_A4496CIA,IN_A4496FORMA,IN_A4496SERIE,SQLMSG;
    private Integer SQLRES;
    
    List<A4496> response = new ArrayList<>();

    public String getIN_A4496CCUST() {
        return IN_A4496CCUST;
    }

    public void setIN_A4496CCUST(String IN_A4496CCUST) {
        this.IN_A4496CCUST = IN_A4496CCUST;
    }

    public String getIN_A4496CIA() {
        return IN_A4496CIA;
    }

    public void setIN_A4496CIA(String IN_A4496CIA) {
        this.IN_A4496CIA = IN_A4496CIA;
    }

    public String getIN_A4496FORMA() {
        return IN_A4496FORMA;
    }

    public void setIN_A4496FORMA(String IN_A4496FORMA) {
        this.IN_A4496FORMA = IN_A4496FORMA;
    }

    public String getIN_A4496SERIE() {
        return IN_A4496SERIE;
    }

    public void setIN_A4496SERIE(String IN_A4496SERIE) {
        this.IN_A4496SERIE = IN_A4496SERIE;
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
