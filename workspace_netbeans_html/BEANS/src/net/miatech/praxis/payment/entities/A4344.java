package net.miatech.praxis.payment.entities;

import java.math.BigDecimal;

/**
 *
 * @author Dvicente
 */
public class A4344 {
    private String RN;
    private String CXRRNUM;
    private String RECTYPE;
    private String TAMMAXLONG;
    private String PROCESADOR;
    private String PROCESASEQ;
    private String TRADM;
    private BigDecimal SECUENCIA;

    public String getRN() {
        return RN;
    }

    public void setRN(String RN) {
        this.RN = RN;
    }

    public String getCXRRNUM() {
        return CXRRNUM;
    }

    public void setCXRRNUM(String CXRRNUM) {
        this.CXRRNUM = CXRRNUM;
    }

    public String getRECTYPE() {
        return RECTYPE;
    }

    public void setRECTYPE(String RECTYPE) {
        this.RECTYPE = RECTYPE;
    }

    public String getTAMMAXLONG() {
        return TAMMAXLONG;
    }

    public void setTAMMAXLONG(String TAMMAXLONG) {
        this.TAMMAXLONG = TAMMAXLONG;
    }

    public String getPROCESADOR() {
        return PROCESADOR;
    }

    public void setPROCESADOR(String PROCESADOR) {
        this.PROCESADOR = PROCESADOR;
    }

    public String getPROCESASEQ() {
        return PROCESASEQ;
    }

    public void setPROCESASEQ(String PROCESASEQ) {
        this.PROCESASEQ = PROCESASEQ;
    }

    public String getTRADM() {
        return TRADM;
    }

    public void setTRADM(String TRADM) {
        this.TRADM = TRADM;
    }

    public BigDecimal getSECUENCIA() {
        return SECUENCIA;
    }

    public void setSECUENCIA(BigDecimal SECUENCIA) {
        this.SECUENCIA = SECUENCIA;
    }
    
    
}
