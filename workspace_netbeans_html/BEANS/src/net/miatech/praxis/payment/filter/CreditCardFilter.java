package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class CreditCardFilter {
    private Integer RN,QTY;
    private String PRDA,PROCTYPE,PROCTYPESQ,SCOUNTRY,SCARDN,DESC_PROCTYPE;

    public Integer getRN() {
        return RN;
    }

    public void setRN(Integer RN) {
        this.RN = RN;
    }

    public Integer getQTY() {
        return QTY;
    }

    public void setQTY(Integer QTY) {
        this.QTY = QTY;
    }

    public String getPRDA() {
        return PRDA;
    }

    public void setPRDA(String PRDA) {
        this.PRDA = PRDA;
    }

    public String getPROCTYPE() {
        return PROCTYPE;
    }

    public void setPROCTYPE(String PROCTYPE) {
        this.PROCTYPE = PROCTYPE;
    }

    public String getSCOUNTRY() {
        return SCOUNTRY;
    }

    public void setSCOUNTRY(String SCOUNTRY) {
        this.SCOUNTRY = SCOUNTRY;
    }

    public String getSCARDN() {
        return SCARDN;
    }

    public void setSCARDN(String SCARDN) {
        this.SCARDN = SCARDN;
    }

    public String getPROCTYPESQ() {
        return PROCTYPESQ;
    }

    public void setPROCTYPESQ(String PROCTYPESQ) {
        this.PROCTYPESQ = PROCTYPESQ;
    }

    public String getDESC_PROCTYPE() {
        return DESC_PROCTYPE;
    }

    public void setDESC_PROCTYPE(String DESC_PROCTYPE) {
        this.DESC_PROCTYPE = DESC_PROCTYPE;
    }
    
}
