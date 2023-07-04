package net.miatech.praxis.Sales.filters;

import net.miatech.praxis.Sales.A4373;

/**
 *
 * @author Dvicente
 */
public class S0001A4373Filter extends A4373{
    
    //inputs
    private String AIRLINE;
    private String CIA;
    private String FORMA;
    private String SERIE;
    private String SEQ;
    
    //columnas adicionales
    private String ERROR_DESC;

    public String getAIRLINE() {
        return AIRLINE;
    }

    public void setAIRLINE(String AIRLINE) {
        this.AIRLINE = AIRLINE;
    }

    public String getCIA() {
        return CIA;
    }

    public void setCIA(String CIA) {
        this.CIA = CIA;
    }

    public String getFORMA() {
        return FORMA;
    }

    public void setFORMA(String FORMA) {
        this.FORMA = FORMA;
    }

    public String getSERIE() {
        return SERIE;
    }

    public void setSERIE(String SERIE) {
        this.SERIE = SERIE;
    }

    public String getSEQ() {
        return SEQ;
    }

    public void setSEQ(String SEQ) {
        this.SEQ = SEQ;
    }

    public String getERROR_DESC() {
        return ERROR_DESC;
    }

    public void setERROR_DESC(String ERROR_DESC) {
        this.ERROR_DESC = ERROR_DESC;
    }
    
    
    
}
