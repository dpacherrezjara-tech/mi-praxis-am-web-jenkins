package net.miatech.praxis.payment.filter;

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
public class SQP05048Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,IN_PROCTYPE,IN_PROCTYPESQ,
            IN_SPNR,IN_TICKET,IN_CERROR,IN_CODADJU,IN_FVOID,IN_FADM,IN_FDESGLOSE;
    private Double IN_SVFOPS;
    private Integer IN_QTYTKT;
    //respuesta
    private Integer SQLRES;
    private String SQLMSG;
    
    List<X3169> detail = new ArrayList<>();

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

    public String getIN_TDOC() {
        return IN_TDOC;
    }

    public void setIN_TDOC(String IN_TDOC) {
        this.IN_TDOC = IN_TDOC;
    }

    public String getIN_AREFNBR() {
        return IN_AREFNBR;
    }

    public void setIN_AREFNBR(String IN_AREFNBR) {
        this.IN_AREFNBR = IN_AREFNBR;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getIN_PROCTYPESQ() {
        return IN_PROCTYPESQ;
    }

    public void setIN_PROCTYPESQ(String IN_PROCTYPESQ) {
        this.IN_PROCTYPESQ = IN_PROCTYPESQ;
    }

    public String getIN_SPNR() {
        return IN_SPNR;
    }

    public void setIN_SPNR(String IN_SPNR) {
        this.IN_SPNR = IN_SPNR;
    }

    public String getIN_TICKET() {
        return IN_TICKET;
    }

    public void setIN_TICKET(String IN_TICKET) {
        this.IN_TICKET = IN_TICKET;
    }

    public String getIN_CERROR() {
        return IN_CERROR;
    }

    public void setIN_CERROR(String IN_CERROR) {
        this.IN_CERROR = IN_CERROR;
    }

    public String getIN_CODADJU() {
        return IN_CODADJU;
    }

    public void setIN_CODADJU(String IN_CODADJU) {
        this.IN_CODADJU = IN_CODADJU;
    }

    public String getIN_FVOID() {
        return IN_FVOID;
    }

    public void setIN_FVOID(String IN_FVOID) {
        this.IN_FVOID = IN_FVOID;
    }

    public String getIN_FADM() {
        return IN_FADM;
    }

    public void setIN_FADM(String IN_FADM) {
        this.IN_FADM = IN_FADM;
    }

    public String getIN_FDESGLOSE() {
        return IN_FDESGLOSE;
    }

    public void setIN_FDESGLOSE(String IN_FDESGLOSE) {
        this.IN_FDESGLOSE = IN_FDESGLOSE;
    }

    public Double getIN_SVFOPS() {
        return IN_SVFOPS;
    }

    public void setIN_SVFOPS(Double IN_SVFOPS) {
        this.IN_SVFOPS = IN_SVFOPS;
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

    public String getSQLMSG() {
        return SQLMSG;
    }

    public void setSQLMSG(String SQLMSG) {
        this.SQLMSG = SQLMSG;
    }

    public List<X3169> getDetail() {
        return detail;
    }

    public void setDetail(List<X3169> detail) {
        this.detail = detail;
    }

    
    
}
