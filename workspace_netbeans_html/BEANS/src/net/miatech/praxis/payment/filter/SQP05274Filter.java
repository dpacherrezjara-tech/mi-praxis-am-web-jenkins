package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05274Filter {
    private String IN_OPTION,
            IN_A4451KEY1,IN_A4451KEY2,IN_A4451KEY3,IN_A4451DESC1,IN_A4451DESC2,
            IN_A4451FECH1,IN_A4451FECH2,IN_A4451COMEN,IN_A4451STS;
    
    private Double IN_A4451CANT1,IN_A4451CANT2;
    private Integer OUT_ROWS;
    private String OUT_SQLMSG;

    public String getIN_OPTION() {
        return IN_OPTION;
    }

    public void setIN_OPTION(String IN_OPTION) {
        this.IN_OPTION = IN_OPTION;
    }

    public String getIN_A4451KEY1() {
        return IN_A4451KEY1;
    }

    public void setIN_A4451KEY1(String IN_A4451KEY1) {
        this.IN_A4451KEY1 = IN_A4451KEY1;
    }

    public String getIN_A4451KEY2() {
        return IN_A4451KEY2;
    }

    public void setIN_A4451KEY2(String IN_A4451KEY2) {
        this.IN_A4451KEY2 = IN_A4451KEY2;
    }

    public String getIN_A4451KEY3() {
        return IN_A4451KEY3;
    }

    public void setIN_A4451KEY3(String IN_A4451KEY3) {
        this.IN_A4451KEY3 = IN_A4451KEY3;
    }

    public String getIN_A4451DESC1() {
        return IN_A4451DESC1;
    }

    public void setIN_A4451DESC1(String IN_A4451DESC1) {
        this.IN_A4451DESC1 = IN_A4451DESC1;
    }

    public String getIN_A4451DESC2() {
        return IN_A4451DESC2;
    }

    public void setIN_A4451DESC2(String IN_A4451DESC2) {
        this.IN_A4451DESC2 = IN_A4451DESC2;
    }

    public String getIN_A4451FECH1() {
        return IN_A4451FECH1;
    }

    public void setIN_A4451FECH1(String IN_A4451FECH1) {
        this.IN_A4451FECH1 = IN_A4451FECH1;
    }

    public String getIN_A4451FECH2() {
        return IN_A4451FECH2;
    }

    public void setIN_A4451FECH2(String IN_A4451FECH2) {
        this.IN_A4451FECH2 = IN_A4451FECH2;
    }

    public String getIN_A4451COMEN() {
        return IN_A4451COMEN;
    }

    public void setIN_A4451COMEN(String IN_A4451COMEN) {
        this.IN_A4451COMEN = IN_A4451COMEN;
    }

    public String getIN_A4451STS() {
        return IN_A4451STS;
    }

    public void setIN_A4451STS(String IN_A4451STS) {
        this.IN_A4451STS = IN_A4451STS;
    }

    public Double getIN_A4451CANT1() {
        return IN_A4451CANT1;
    }

    public void setIN_A4451CANT1(Double IN_A4451CANT1) {
        this.IN_A4451CANT1 = IN_A4451CANT1;
    }

    public Double getIN_A4451CANT2() {
        return IN_A4451CANT2;
    }

    public void setIN_A4451CANT2(Double IN_A4451CANT2) {
        this.IN_A4451CANT2 = IN_A4451CANT2;
    }

    public Integer getOUT_ROWS() {
        return OUT_ROWS;
    }

    public void setOUT_ROWS(Integer OUT_ROWS) {
        this.OUT_ROWS = OUT_ROWS;
    }

    public String getOUT_SQLMSG() {
        return OUT_SQLMSG;
    }

    public void setOUT_SQLMSG(String OUT_SQLMSG) {
        this.OUT_SQLMSG = OUT_SQLMSG;
    }
}
