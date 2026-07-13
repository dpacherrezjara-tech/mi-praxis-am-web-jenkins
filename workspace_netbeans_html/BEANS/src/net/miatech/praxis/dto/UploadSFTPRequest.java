/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dto;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author vhidalgo
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class UploadSFTPRequest {
    
    @JsonProperty("VP_CCUST")
    private String VP_CCUST;
    
    @JsonProperty("VP_FECHA1")
    private String VP_FECHA1;
    
    @JsonProperty("VP_FECHA2")
    private String VP_FECHA2;
    
    @JsonProperty("VP_TOPE")
    private Integer VP_TOPE;

    public UploadSFTPRequest() {
    }

    public UploadSFTPRequest(String VP_CCUST, String VP_FECHA1, String VP_FECHA2, Integer VP_TOPE) {
        this.VP_CCUST = VP_CCUST;
        this.VP_FECHA1 = VP_FECHA1;
        this.VP_FECHA2 = VP_FECHA2;
        this.VP_TOPE = VP_TOPE;
    }

    public String getVP_CCUST() {
        return VP_CCUST;
    }

    public void setVP_CCUST(String VP_CCUST) {
        this.VP_CCUST = VP_CCUST;
    }

    public String getVP_FECHA1() {
        return VP_FECHA1;
    }

    public void setVP_FECHA1(String VP_FECHA1) {
        this.VP_FECHA1 = VP_FECHA1;
    }

    public String getVP_FECHA2() {
        return VP_FECHA2;
    }

    public void setVP_FECHA2(String VP_FECHA2) {
        this.VP_FECHA2 = VP_FECHA2;
    }

    public Integer getVP_TOPE() {
        return VP_TOPE;
    }

    public void setVP_TOPE(Integer VP_TOPE) {
        this.VP_TOPE = VP_TOPE;
    }

    @Override
    public String toString() {
        return "UploadSFTPRequest{"
                + "VP_CCUST='" + VP_CCUST + '\''
                + ", VP_FECHA1='" + VP_FECHA1 + '\''
                + ", VP_FECHA2='" + VP_FECHA2 + '\''
                + ", VP_TOPE=" + VP_TOPE
                + '}';
    }
}
