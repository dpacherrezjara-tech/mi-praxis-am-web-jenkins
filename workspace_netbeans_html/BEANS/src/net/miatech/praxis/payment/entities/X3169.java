package net.miatech.praxis.payment.entities;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 *
 * @author Dvicente
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class X3169 {

    private String CCUST,
            SCOUNTRY,
            SMERCHID,
            SCURRENCY,
            TDOC,
            TDOCO,
            TRNCU,
            FUENTE,
            CANAL,
            CERROR,
            STVAL,
            PRDA,
            PMERCHID,
            PAYDATE,
            CARDTYPE,
            SCARDCOD,
            SCARDN,
            SAUTHOC,
            SPNR,
            CCIA,
            FORMA,
            SERIE,
            SEQ,
            CIAP,
            FORMAP,
            SERIEP,
            FLAG,
            STDOC,
            CORRL,
            TCORR,
            FVOID,
            FCONT,
            IDCON,
            SAGENT,
            SDATE,
            GRUPO,
            CODEPR,
            RUTA0,
            RUTA1,
            RUTA2,
            RUTA3,
            RUTA4,
            FVLO1,
            FVLO2,
            FVLO3,
            FVLO4,
            TOTCUP,
            CPUI,
            PAX,
            NBRLIQUID,
            CODCHGBACK,
            CHGBNUM,
            FREGLA,
            FADM,
            AREFNBR,
            PROCTYPE,
            PROCTYPESQ,
            FORCESCAN,
            STMANUAL,
            OBSERV,
            USCR,
            FECR,
            HOCR,
            PGMCR;
    private Double SVFOPS, TGROSAMOUN,
            SFEEAMOU,
            DISCRATE,
            DISCAMOUN,
            DISCAMOUNC,
            DISCAMOUNI,
            ACCEAMOU,
            IVACOM12;
}
