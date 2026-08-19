package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4335;

/**
 *
 * @author Dvicente
 */
public class A4335Filter extends A4335{
    private String RN,TKT;
    //total del a4331
    private Double SVFOPS_TOTAL;
    //datos de contabilidad mp
    private String LIQ_STCON, LIQ_IDCON, LIQ_FCON, DESC_CODADJU, EXISTS_BALANCE ;

    public String getRN() {
        return RN;
    }

    public void setRN(String RN) {
        this.RN = RN;
    }

    public Double getSVFOPS_TOTAL() {
        return SVFOPS_TOTAL;
    }

    public void setSVFOPS_TOTAL(Double SVFOPS_TOTAL) {
        this.SVFOPS_TOTAL = SVFOPS_TOTAL;
    }

    public String getLIQ_STCON() {
        return LIQ_STCON;
    }

    public void setLIQ_STCON(String LIQ_STCON) {
        this.LIQ_STCON = LIQ_STCON;
    }

    public String getLIQ_IDCON() {
        return LIQ_IDCON;
    }

    public void setLIQ_IDCON(String LIQ_IDCON) {
        this.LIQ_IDCON = LIQ_IDCON;
    }

    public String getLIQ_FCON() {
        return LIQ_FCON;
    }

    public void setLIQ_FCON(String LIQ_FCON) {
        this.LIQ_FCON = LIQ_FCON;
    }

    public String getTKT() {
        return TKT;
    }

    public void setTKT(String TKT) {
        this.TKT = TKT;
    }

    public String getDESC_CODADJU() {
        return DESC_CODADJU;
    }

    public void setDESC_CODADJU(String DESC_CODADJU) {
        this.DESC_CODADJU = DESC_CODADJU;
    }
    
    public String getEXISTS_BALANCE() {
        return EXISTS_BALANCE;
    }

    public void setEXISTS_BALANCE(String EXISTS_BALANCE) {
        this.EXISTS_BALANCE = EXISTS_BALANCE;
    }
            
}
