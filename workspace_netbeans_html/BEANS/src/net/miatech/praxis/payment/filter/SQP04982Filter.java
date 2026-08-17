package net.miatech.praxis.payment.filter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP04982Filter extends CustomPageImpl{
    private String IN_CCUST;
    private String IN_SDATES;
    private String IN_SPNR;
    private String IN_PLUSGRADE;
    private BigDecimal SVFOP;
    
    transient List<A4455Filter> result = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_SDATES() {
        return IN_SDATES;
    }

    public void setIN_SDATES(String IN_SDATES) {
        this.IN_SDATES = IN_SDATES;
    }

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_PLUSGRADE() {
        return IN_PLUSGRADE;
    }

    public void setIN_PLUSGRADE(String IN_PLUSGRADE) {
        this.IN_PLUSGRADE = IN_PLUSGRADE;
    }

    public BigDecimal getSVFOP() {
        return SVFOP;
    }

    public void setSVFOP(BigDecimal SVFOP) {
        this.SVFOP = SVFOP;
    }

    public List<A4455Filter> getResult() {
        return result;
    }

    public void setResult(List<A4455Filter> result) {
        this.result = result;
    }
    
    
}
