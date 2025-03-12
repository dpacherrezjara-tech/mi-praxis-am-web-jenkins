package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A2354;

/**
 *
 * @author Dvicente
 */
public class A2354Filter extends A2354{
    private String FECHAINI,FECHAFIN,CODAGRUP,DESCAGRUP,NIATA;
    private Integer RN;

    public String getFECHAINI() {
        return FECHAINI;
    }

    public void setFECHAINI(String FECHAINI) {
        this.FECHAINI = FECHAINI;
    }

    public String getFECHAFIN() {
        return FECHAFIN;
    }

    public void setFECHAFIN(String FECHAFIN) {
        this.FECHAFIN = FECHAFIN;
    }

    public String getCODAGRUP() {
        return CODAGRUP;
    }

    public void setCODAGRUP(String CODAGRUP) {
        this.CODAGRUP = CODAGRUP;
    }

    public String getDESCAGRUP() {
        return DESCAGRUP;
    }

    public void setDESCAGRUP(String DESCAGRUP) {
        this.DESCAGRUP = DESCAGRUP;
    }

    public Integer getRN() {
        return RN;
    }

    public void setRN(Integer RN) {
        this.RN = RN;
    }

    public String getNIATA() {
        return NIATA;
    }

    public void setNIATA(String NIATA) {
        this.NIATA = NIATA;
    }
}
