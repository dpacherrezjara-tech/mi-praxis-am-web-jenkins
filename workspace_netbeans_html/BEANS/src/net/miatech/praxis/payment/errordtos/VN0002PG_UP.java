package net.miatech.praxis.payment.errordtos;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class VN0002PG_UP {
    //DATOS BUSQUEDA
    private String IN_CCUST;
    private String IN_TKT;
    private String IN_IDREF;
    private String IN_PROCTYPE;
    
    //DATOS UPDATE
    @JsonProperty("ccard1")
    private String UP_CC1;
    @JsonProperty("ccard2")
    private String UP_CC2;
    @JsonProperty("auth")
    private String UP_AUTH;
    @JsonProperty("qtypax")
    private Integer UP_QTYPAX;
    @JsonProperty("qtytk")
    private Integer UP_QTYTKT;
    @JsonProperty("mda")
    private String UP_CURR;
    @JsonProperty("totamount")
    private Double UP_SVFOP;
    @JsonProperty("totamounto")
    private Double UP_AMTOFF;

    public String getIN_CCUST() {
        return IN_CCUST;
    }

    public void setIN_CCUST(String IN_CCUST) {
        this.IN_CCUST = IN_CCUST;
    }

    public String getIN_TKT() {
        return IN_TKT;
    }

    public void setIN_TKT(String IN_TKT) {
        this.IN_TKT = IN_TKT;
    }

    public String getIN_IDREF() {
        return IN_IDREF;
    }

    public void setIN_IDREF(String IN_IDREF) {
        this.IN_IDREF = IN_IDREF;
    }

    public String getIN_PROCTYPE() {
        return IN_PROCTYPE;
    }

    public void setIN_PROCTYPE(String IN_PROCTYPE) {
        this.IN_PROCTYPE = IN_PROCTYPE;
    }

    public String getUP_CC1() {
        return UP_CC1;
    }

    public void setUP_CC1(String UP_CC1) {
        this.UP_CC1 = UP_CC1;
    }

    public String getUP_CC2() {
        return UP_CC2;
    }

    public void setUP_CC2(String UP_CC2) {
        this.UP_CC2 = UP_CC2;
    }

    public String getUP_AUTH() {
        return UP_AUTH;
    }

    public void setUP_AUTH(String UP_AUTH) {
        this.UP_AUTH = UP_AUTH;
    }

    public Integer getUP_QTYPAX() {
        return UP_QTYPAX;
    }

    public void setUP_QTYPAX(Integer UP_QTYPAX) {
        this.UP_QTYPAX = UP_QTYPAX;
    }

    public Integer getUP_QTYTKT() {
        return UP_QTYTKT;
    }

    public void setUP_QTYTKT(Integer UP_QTYTKT) {
        this.UP_QTYTKT = UP_QTYTKT;
    }

    public String getUP_CURR() {
        return UP_CURR;
    }

    public void setUP_CURR(String UP_CURR) {
        this.UP_CURR = UP_CURR;
    }

    public Double getUP_SVFOP() {
        return UP_SVFOP;
    }

    public void setUP_SVFOP(Double UP_SVFOP) {
        this.UP_SVFOP = UP_SVFOP;
    }

    public Double getUP_AMTOFF() {
        return UP_AMTOFF;
    }

    public void setUP_AMTOFF(Double UP_AMTOFF) {
        this.UP_AMTOFF = UP_AMTOFF;
    }
    
    
}
