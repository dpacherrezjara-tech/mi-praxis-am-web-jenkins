package net.miatech.beans;

/**
 *
 * @author Dvicente
 */
public class SQP04905Filter {
    //PARAMETROS IN
    private String TFECHA, FINICIO, FFIN, TIPO;
    
    //RESULT SET
    private String FVTA,FCONT,TIPOC;
    private Integer TDOCS;
    private Double TFARE, TYQ;

    public String getFCONT() {
        return FCONT;
    }

    public void setFCONT(String FCONT) {
        this.FCONT = FCONT;
    }
    
    public void limpiaFechas(){
        this.FINICIO = this.FINICIO.replace("/", "");
        this.FFIN = this.FFIN.replace("/", "");
    }

    public String getTFECHA() {
        return TFECHA;
    }

    public void setTFECHA(String TFECHA) {
        this.TFECHA = TFECHA;
    }

    public String getFINICIO() {
        return FINICIO;
    }

    public void setFINICIO(String FINICIO) {
        this.FINICIO = FINICIO;
    }

    public String getFFIN() {
        return FFIN;
    }

    public void setFFIN(String FFIN) {
        this.FFIN = FFIN;
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getFVTA() {
        return FVTA;
    }

    public void setFVTA(String FVTA) {
        this.FVTA = FVTA;
    }

    public String getTIPOC() {
        return TIPOC;
    }

    public void setTIPOC(String TIPOC) {
        this.TIPOC = TIPOC;
    }

    public Integer getTDOCS() {
        return TDOCS;
    }

    public void setTDOCS(Integer TDOCS) {
        this.TDOCS = TDOCS;
    }

    public Double getTFARE() {
        return TFARE;
    }

    public void setTFARE(Double TFARE) {
        this.TFARE = TFARE;
    }

    public Double getTYQ() {
        return TYQ;
    }

    public void setTYQ(Double TYQ) {
        this.TYQ = TYQ;
    }
    
    
    
}
