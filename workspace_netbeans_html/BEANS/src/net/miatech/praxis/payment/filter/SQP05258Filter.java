package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A003;

/**
 *
 * @author Dvicente
 */
public class SQP05258Filter {
    private String IN_IATA;
    private Integer SQLCOD;
    private String SQLMSG;
    private A003 response;

    public String getIN_IATA() {
        return IN_IATA;
    }

    public void setIN_IATA(String IN_IATA) {
        this.IN_IATA = IN_IATA;
    }

    public Integer getSQLCOD() {
        return SQLCOD;
    }

    public void setSQLCOD(Integer SQLCOD) {
        this.SQLCOD = SQLCOD;
    }

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }

    public A003 getResponse() {
        return response;
    }

    public void setResponse(A003 response) {
        this.response = response;
    }       
}
