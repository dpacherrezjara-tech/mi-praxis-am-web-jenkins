package net.miatech.praxis.payment.old;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.entities.X3169;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05048OLDFilter {
    private String IN_CCUST,IN_PRDA,IN_MERCHID,IN_PAYDATE,IN_PCURRENCY,IN_PROCTYPE,IN_SMERCHID,IN_SDATE,IN_SCARDN,
            IN_SAUTHOC,IN_IDITEMS,IN_IDITEMT,IN_PNR,IN_TKT,IN_CERROR,IN_ADJ_TYPE,IN_AREFNBR,IN_TDOC,IN_PROCTYPESQ,
            SQLMSG;
    private Double IN_TGROSAMPAY;
    private Integer IN_QTYTKT,SQLRES;

    private List<X3169> detail = new ArrayList<>();

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_PRDA() {
        return IN_PRDA;
    }

    public void setIN_PRDA(String IN_PRDA) {
        this.IN_PRDA = IN_PRDA;
    }

    public String getIN_MERCHID() {
        return IN_MERCHID;
    }

    public void setIN_MERCHID(String IN_MERCHID) {
        this.IN_MERCHID = IN_MERCHID;
    }

    public String getIN_PAYDATE() {
        return IN_PAYDATE;
    }

    public void setIN_PAYDATE(String IN_PAYDATE) {
        this.IN_PAYDATE = IN_PAYDATE;
    }

    public String getIN_PCURRENCY() {
        return IN_PCURRENCY;
    }

    public void setIN_PCURRENCY(String IN_PCURRENCY) {
        this.IN_PCURRENCY = IN_PCURRENCY;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_SMERCHID() {
        return IN_SMERCHID;
    }

    public void setIN_SMERCHID(String IN_SMERCHID) {
        this.IN_SMERCHID = IN_SMERCHID;
    }

    public String getIN_SDATE() {
        return IN_SDATE;
    }

    public void setIN_SDATE(String IN_SDATE) {
        this.IN_SDATE = IN_SDATE;
    }

    public String getIN_SCARDN() {
        return IN_SCARDN;
    }

    public void setIN_SCARDN(String IN_SCARDN) {
        this.IN_SCARDN = IN_SCARDN;
    }

    public String getIN_SAUTHOC() {
        return IN_SAUTHOC;
    }

    public void setIN_SAUTHOC(String IN_SAUTHOC) {
        this.IN_SAUTHOC = IN_SAUTHOC;
    }

    public String getIN_IDITEMS() {
        return IN_IDITEMS;
    }

    public void setIN_IDITEMS(String IN_IDITEMS) {
        this.IN_IDITEMS = IN_IDITEMS;
    }

    public String getIN_IDITEMT() {
        return IN_IDITEMT;
    }

    public void setIN_IDITEMT(String IN_IDITEMT) {
        this.IN_IDITEMT = IN_IDITEMT;
    }

    public String getIN_PNR() {
        return IN_PNR;
    }

    public void setIN_PNR(String IN_PNR) {
        this.IN_PNR = IN_PNR;
    }

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
    }

    public String getIN_CERROR() {
        return IN_CERROR;
    }

    public void setIN_CERROR(String IN_CERROR) {
        this.IN_CERROR = IN_CERROR;
    }

    public String getIN_ADJ_TYPE() {
        return IN_ADJ_TYPE;
    }

    public void setIN_ADJ_TYPE(String IN_ADJ_TYPE) {
        this.IN_ADJ_TYPE = IN_ADJ_TYPE;
    }

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }

    public Double getIN_TGROSAMPAY() {
        return IN_TGROSAMPAY;
    }

    public void setIN_TGROSAMPAY(Double IN_TGROSAMPAY) {
        this.IN_TGROSAMPAY = IN_TGROSAMPAY;
    }

    public Integer getIN_QTYTKT() {
        return IN_QTYTKT;
    }

    public void setIN_QTYTKT(Integer IN_QTYTKT) {
        this.IN_QTYTKT = IN_QTYTKT;
    }

    public Integer getSQLRES() {
        return SQLRES;
    }

    public void setSQLRES(Integer SQLRES) {
        this.SQLRES = SQLRES;
    }

    public List<X3169> getDetail() {
        return detail;
    }

    public void setDetail(List<X3169> detail) {
        this.detail = detail;
    }
    
    
    
}
