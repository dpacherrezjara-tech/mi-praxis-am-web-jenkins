package net.miatech.praxis.SaleAudit.entities;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class A4592 {
    private String CCUST,
                PRDAF,   
                PRDAT,   
                CUUID,   
                PIPID,   
                JOBQUEUE,
                STSEARCH,
                USCR,    
                FECR,    
                HOCR,    
                PGMCR,
                USUP,  
                FEUP,  
                HOUP,  
                PGMUP,
                NOTE; 
}
