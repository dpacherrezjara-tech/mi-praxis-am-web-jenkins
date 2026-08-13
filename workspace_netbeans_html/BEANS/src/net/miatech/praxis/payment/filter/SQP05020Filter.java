package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.A4481MP;

/**
 *
 * @author Dvicente
 */
public class SQP05020Filter {
    private String DATE_FROM;
    private String DATE_TO;
    private String TBL_PROC;
    private String CERROR;
    private List<A4481MP> response = new ArrayList<>();

    public String getDATE_FROM() {
        return DATE_FROM;
    }

    public void setDATE_FROM(String DATE_FROM) {
        this.DATE_FROM = DATE_FROM;
    }

    public String getDATE_TO() {
        return DATE_TO;
    }

    public void setDATE_TO(String DATE_TO) {
        this.DATE_TO = DATE_TO;
    }

    public String getTBL_PROC() {
        return TBL_PROC;
    }

    public void setTBL_PROC(String TBL_PROC) {
        this.TBL_PROC = TBL_PROC;
    }

    public String getCERROR() {
        return CERROR;
    }

    public void setCERROR(String CERROR) {
        this.CERROR = CERROR;
    }

    public List<A4481MP> getResponse() {
        return response;
    }

    public void setResponse(List<A4481MP> response) {
        this.response = response;
    }
    
}
