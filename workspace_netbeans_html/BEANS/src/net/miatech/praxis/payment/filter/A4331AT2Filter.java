package net.miatech.praxis.payment.filter;

/**
 *
 * @author Dvicente
 */
public class A4331AT2Filter{
    private String FECHA,IDFLEX,PRAXISID,PROC_DESC;
    private Double TOTAL,PENDING,ACCOUNTED,TO_DEBUG;
    private Integer RN,QTY_PENDING,QTY_ACCOUNTED,QTY_TO_DEBUG,QTY_TOTAL;

    public Integer getRN() {
        return RN;
    }

    public void setRN(Integer RN) {
        this.RN = RN;
    }

    public String getPROC_DESC() {
        return PROC_DESC;
    }

    public void setPROC_DESC(String PROC_DESC) {
        this.PROC_DESC = PROC_DESC;
    }

    public Double getTOTAL() {
        return TOTAL;
    }

    public void setTOTAL(Double TOTAL) {
        this.TOTAL = TOTAL;
    }

    public Double getPENDING() {
        return PENDING;
    }

    public void setPENDING(Double PENDING) {
        this.PENDING = PENDING;
    }

    public Double getACCOUNTED() {
        return ACCOUNTED;
    }

    public void setACCOUNTED(Double ACCOUNTED) {
        this.ACCOUNTED = ACCOUNTED;
    }

    public Double getTO_DEBUG() {
        return TO_DEBUG;
    }

    public void setTO_DEBUG(Double TO_DEBUG) {
        this.TO_DEBUG = TO_DEBUG;
    }

    public Integer getQTY_PENDING() {
        return QTY_PENDING;
    }

    public void setQTY_PENDING(Integer QTY_PENDING) {
        this.QTY_PENDING = QTY_PENDING;
    }

    public Integer getQTY_ACCOUNTED() {
        return QTY_ACCOUNTED;
    }

    public void setQTY_ACCOUNTED(Integer QTY_ACCOUNTED) {
        this.QTY_ACCOUNTED = QTY_ACCOUNTED;
    }

    public Integer getQTY_TO_DEBUG() {
        return QTY_TO_DEBUG;
    }

    public void setQTY_TO_DEBUG(Integer QTY_TO_DEBUG) {
        this.QTY_TO_DEBUG = QTY_TO_DEBUG;
    }

    public Integer getQTY_TOTAL() {
        return QTY_TOTAL;
    }

    public void setQTY_TOTAL(Integer QTY_TOTAL) {
        this.QTY_TOTAL = QTY_TOTAL;
    }

    public String getFECHA() {
        return FECHA;
    }

    public void setFECHA(String FECHA) {
        this.FECHA = FECHA;
    }

    public String getIDFLEX() {
        return IDFLEX;
    }

    public void setIDFLEX(String IDFLEX) {
        this.IDFLEX = IDFLEX;
    }

    public String getPRAXISID() {
        return PRAXISID;
    }

    public void setPRAXISID(String PRAXISID) {
        this.PRAXISID = PRAXISID;
    }
}
