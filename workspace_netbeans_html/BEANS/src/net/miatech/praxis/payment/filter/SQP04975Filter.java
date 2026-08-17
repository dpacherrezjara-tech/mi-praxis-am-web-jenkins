package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class SQP04975Filter {
    //IN
    private String CCUST;
    private String TIPO;
    private String FECHA_FROM;
    
    //OUT
    private String STS;
    
    //RESULT SET
    private String PROCESADOR;
    private String TFILE;
    private String FECHA;
    private int TOTALROWS;
    private String STATUS;

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
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

    public String getSTS() {
        return STS;
    }

    public void setSTS(String STS) {
        this.STS = STS;
    }

    public String getPROCESADOR() {
        return PROCESADOR;
    }

    public void setPROCESADOR(String PROCESADOR) {
        this.PROCESADOR = PROCESADOR;
    }

    public String getTFILE() {
        return TFILE;
    }

    public void setTFILE(String TFILE) {
        this.TFILE = TFILE;
    }

    public String getFECHA() {
        return FECHA;
    }

    public void setFECHA(String FECHA) {
        this.FECHA = FECHA;
    }

    public int getTOTALROWS() {
        return TOTALROWS;
    }

    public void setTOTALROWS(int TOTALROWS) {
        this.TOTALROWS = TOTALROWS;
    }

    public String getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }
    
    
    
}
