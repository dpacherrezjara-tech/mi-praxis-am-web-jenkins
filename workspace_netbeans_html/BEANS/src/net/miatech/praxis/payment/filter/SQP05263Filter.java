package net.miatech.praxis.payment.filter;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SQP05263Filter {
    private String IN_OPTION,
            IN_A4559CCUST,IN_A4559CODE,IN_A4559DESC,IN_A4559PAIS,IN_A4559REGI;

    public String getIN_OPTION() {
        return IN_OPTION;
    }

    public void setIN_OPTION(String IN_OPTION) {
        this.IN_OPTION = IN_OPTION;
    }

    public String getIN_A4559CCUST() {
        return IN_A4559CCUST;
    }

    public void setIN_A4559CCUST(String IN_A4559CCUST) {
        this.IN_A4559CCUST = IN_A4559CCUST;
    }

    public String getIN_A4559CODE() {
        return IN_A4559CODE;
    }

    public void setIN_A4559CODE(String IN_A4559CODE) {
        this.IN_A4559CODE = IN_A4559CODE;
    }

    public String getIN_A4559DESC() {
        return IN_A4559DESC;
    }

    public void setIN_A4559DESC(String IN_A4559DESC) {
        this.IN_A4559DESC = IN_A4559DESC;
    }

    public String getIN_A4559PAIS() {
        return IN_A4559PAIS;
    }

    public void setIN_A4559PAIS(String IN_A4559PAIS) {
        this.IN_A4559PAIS = IN_A4559PAIS;
    }

    public String getIN_A4559REGI() {
        return IN_A4559REGI;
    }

    public void setIN_A4559REGI(String IN_A4559REGI) {
        this.IN_A4559REGI = IN_A4559REGI;
    }
    
    
}
