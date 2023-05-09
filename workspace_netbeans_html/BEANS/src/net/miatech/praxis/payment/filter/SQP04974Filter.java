package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class SQP04974Filter {
    //INPUTS
    private String TIPO;
    private String FECHA_FROM;
    private String FECHA_TO;
    
    //OUTPUTS
    private String RN;
    private String REGIS;
    private String FREGIS;
    private String RECEIVED;
    private String LOADED;
    private String EXONERADO;
    private String PRDA;
    private String PROCESADOR;
    private String PROSEQ;

    public String getRN() {
        return RN;
    }

    public void setRN(String RN) {
        this.RN = RN;
    }
    
    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getFECHA_FROM() {
        return FECHA_FROM;
    }

    public void setFECHA_FROM(String FECHA_FROM) {
        this.FECHA_FROM = FECHA_FROM;
    }

    public String getFECHA_TO() {
        return FECHA_TO;
    }

    public void setFECHA_TO(String FECHA_TO) {
        this.FECHA_TO = FECHA_TO;
    }

    public String getRECEIVED() {
        return RECEIVED;
    }

    public void setRECEIVED(String RECEIVED) {
        this.RECEIVED = RECEIVED;
    }

    public String getLOADED() {
        return LOADED;
    }

    public void setLOADED(String LOADED) {
        this.LOADED = LOADED;
    }

    public String getEXONERADO() {
        return EXONERADO;
    }

    public void setEXONERADO(String EXONERADO) {
        this.EXONERADO = EXONERADO;
    }

    public String getPRDA() {
        return PRDA;
    }

    public void setPRDA(String PRDA) {
        this.PRDA = PRDA;
    }

    public String getPROCESADOR() {
        return PROCESADOR;
    }

    public void setPROCESADOR(String PROCESADOR) {
        this.PROCESADOR = PROCESADOR;
    }

    public String getPROSEQ() {
        return PROSEQ;
    }

    public void setPROSEQ(String PROSEQ) {
        this.PROSEQ = PROSEQ;
    }

    public String getREGIS() {
        return REGIS;
    }

    public void setREGIS(String REGIS) {
        this.REGIS = REGIS;
    }

    public String getFREGIS() {
        return FREGIS;
    }

    public void setFREGIS(String FREGIS) {
        this.FREGIS = FREGIS;
    }
    
    
    
    
}
