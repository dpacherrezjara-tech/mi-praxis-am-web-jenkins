package net.miatech.praxis.payment.filter;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author Dvicente
 */
@Data
public class ScannerFilter {
    private String CCUST,TRNCU,SPNR,SDATE,SAGENT,FUENTE,
            SEQ,CCIA,FORMA,SERIE,CORRL,
            CARDTYPE,SCARDCOD,SCURRENCY,SCARDN,SAUTHOC,FVOID,
            CODEPR,GRUPO,CANAL,
            CIAP,FORMAP,SERIEP,
            RUTA0,RUTA1,RUTA2,RUTA3,RUTA4,
            FVLO1,FVLO2,FVLO3,FVLO4,
            TOTCUP,CPUI,PAX,FLAG,STDOC,TCORR;
    @JsonProperty(value = "TDOCO")
    private String TDOC;
    private Double SVFOPS,TGROSAMOUN;
    private Integer DUPLICATES;
}
