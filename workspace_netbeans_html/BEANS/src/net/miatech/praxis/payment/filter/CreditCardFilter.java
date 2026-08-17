package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class CreditCardFilter {
    private Integer RN,QTY,QTY_SALE,QTY_RFND,QTY_CHBK,QTY_ADJU,QTY_VOID,QTY_MATCH,QTY_PENDING;
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

    public Integer getQTY_SALE() {
        return QTY_SALE;
    }

    public void setQTY_SALE(Integer QTY_SALE) {
        this.QTY_SALE = QTY_SALE;
    }

    public Integer getQTY_RFND() {
        return QTY_RFND;
    }

    public void setQTY_RFND(Integer QTY_RFND) {
        this.QTY_RFND = QTY_RFND;
    }

    public Integer getQTY_CHBK() {
        return QTY_CHBK;
    }

    public void setQTY_CHBK(Integer QTY_CHBK) {
        this.QTY_CHBK = QTY_CHBK;
    }

    public Integer getQTY_ADJU() {
        return QTY_ADJU;
    }

    public void setQTY_ADJU(Integer QTY_ADJU) {
        this.QTY_ADJU = QTY_ADJU;
    }

    public Integer getQTY_VOID() {
        return QTY_VOID;
    }

    public void setQTY_VOID(Integer QTY_VOID) {
        this.QTY_VOID = QTY_VOID;
    }

    public Integer getQTY_MATCH() {
        return QTY_MATCH;
    }

    public void setQTY_MATCH(Integer QTY_MATCH) {
        this.QTY_MATCH = QTY_MATCH;
    }

    public Integer getQTY_PENDING() {
        return QTY_PENDING;
    }

    public void setQTY_PENDING(Integer QTY_PENDING) {
        this.QTY_PENDING = QTY_PENDING;
    }
}
