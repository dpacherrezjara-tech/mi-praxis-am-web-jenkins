package net.miatech.praxis.generics;

import java.util.List;
import java.util.Map;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CallStorePaggin {

    private Boolean success = true;
    private String library;
    private String procedure;
    private Map<String,Object> params;
    private List< Map<String, Object>> response;
    
    private int total;

    @JsonProperty("pagnum")
    private int IO_PAGNUM;
    @JsonProperty("pagrow")
    private int IO_PAGROW = 20;
    @JsonProperty("totpag")
    private int IO_TOTPAG = -1;
    @JsonProperty("totrow")
    private int IO_TOTROW = -1;
    
    public void setPage() {
        Integer start = Integer.valueOf(this.params.get("start").toString());
        if(this.params.containsKey("excel")){
            this.IO_PAGROW = -1;
            this.IO_PAGNUM = 1;
        }
        else if ( this.params.containsKey("pagination") ) {
            String pagination = this.params.get("pagination").toString().toLowerCase() ;
            if ( ! Boolean.parseBoolean(pagination) ) {
                // Desactivar paginacion
                this.IO_PAGROW = -1;
                this.IO_PAGNUM = 1;
            }
        }
        else{
            this.IO_PAGROW = 20;
            this.IO_PAGNUM = (start / this.IO_PAGROW) + 1;
        }
        
        params.put("IO_PAGNUM", this.IO_PAGNUM);
        params.put("IO_PAGROW", this.IO_PAGROW);
        params.put("IO_TOTPAG", this.IO_TOTPAG);
        params.put("IO_TOTROW", this.IO_TOTROW);
    }
    
    public void setPageOut(Map<String,Object> obj){
        // Algunos SP no declaran los 4 parametros INOUT de paginacion (no estan
        // pensados para paginar server-side). En ese caso el driver JDBC no los
        // devuelve en absoluto (obj.get(...) == null): se conservan los valores
        // ya calculados en setPage() y el total se deriva del propio response.
        this.IO_PAGNUM = parseIntOrDefault(obj.get("IO_PAGNUM"), this.IO_PAGNUM);
        this.IO_PAGROW = parseIntOrDefault(obj.get("IO_PAGROW"), this.IO_PAGROW);
        this.IO_TOTPAG = parseIntOrDefault(obj.get("IO_TOTPAG"), this.IO_TOTPAG);
        this.IO_TOTROW = parseIntOrDefault(obj.get("IO_TOTROW"), (this.response != null) ? this.response.size() : this.IO_TOTROW);
        this.total = this.IO_TOTROW;
    }

    private int parseIntOrDefault(Object value, int defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}
