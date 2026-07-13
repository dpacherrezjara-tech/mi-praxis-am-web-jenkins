package net.miatech.praxis.payment.filter;

import java.util.List;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.entities.A4451MP;

/**
 *
 * @author Dvicente
 */
public class SQP05276Filter {
    private String IN_STATUS;
    
    private List<A4451MP> CERROR;
    private List<A4451MP> CODADJU;
    private List<A4451MP> PROCESADORES;
    private List<A4451MP> CREDITCARDS;
    private List<A3152> PAISES;
    private List<A006> MONEDAS;
    private List<A4451MP> ADMINS;
    private List<A4451MP> STVALS;
    private List<A4451MP> AUTOCOMMENTS;
    private List<A4451MP> REGLAS;
    
    
    public SQP05276Filter(String IN_STATUS) {
        this.IN_STATUS = IN_STATUS;
    }

    public String getIN_STATUS() {
        return IN_STATUS;
    }

    public void setIN_STATUS(String IN_STATUS) {
        this.IN_STATUS = IN_STATUS;
    }

    public List<A4451MP> getCERROR() {
        return CERROR;
    }

    public void setCERROR(List<A4451MP> CERROR) {
        this.CERROR = CERROR;
    }

    public List<A4451MP> getCODADJU() {
        return CODADJU;
    }

    public void setCODADJU(List<A4451MP> CODADJU) {
        this.CODADJU = CODADJU;
    }

    public List<A4451MP> getPROCESADORES() {
        return PROCESADORES;
    }

    public void setPROCESADORES(List<A4451MP> PROCESADORES) {
        this.PROCESADORES = PROCESADORES;
    }

    public List<A4451MP> getCREDITCARDS() {
        return CREDITCARDS;
    }

    public void setCREDITCARDS(List<A4451MP> CREDITCARDS) {
        this.CREDITCARDS = CREDITCARDS;
    }

    public List<A3152> getPAISES() {
        return PAISES;
    }

    public void setPAISES(List<A3152> PAISES) {
        this.PAISES = PAISES;
    }

    public List<A006> getMONEDAS() {
        return MONEDAS;
    }

    public void setMONEDAS(List<A006> MONEDAS) {
        this.MONEDAS = MONEDAS;
    }

    public List<A4451MP> getADMINS() {
        return ADMINS;
    }

    public void setADMINS(List<A4451MP> ADMINS) {
        this.ADMINS = ADMINS;
    }
    
    
    public List<A4451MP> getSTVALS() {
        return STVALS;
    }

    public void setSTVALS(List<A4451MP> STVALS) {
        this.STVALS = STVALS;
    }
    
    public List<A4451MP> getAUTOCOMMENTS() {
        return AUTOCOMMENTS;
    }

    public void setAUTOCOMMENTS(List<A4451MP> AUTOCOMMENTS) {
        this.AUTOCOMMENTS = AUTOCOMMENTS;
    }
    
     public List<A4451MP> getREGLAS() {
        return REGLAS;
    }

    public void setREGLAS(List<A4451MP> REGLAS) {
        this.REGLAS = REGLAS;
    }
    
            
}
