package net.miatech.praxis.payment.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author dvicente
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class A4584 {

    private String CCUST,
            PRDA,
            TDOC,
            AREFNBR,
            PROCTYPE,
            PROCTYPESQ,
            SDATE,
            PAYDATE,
            TRANSTYPE,
            SCARDN,
            SAUTHOC,
            FVOID,
            SMERCHID,
            PMERCHID,
            NBRLIQUID,
            CODCHGBACK,
            CHGBNUM,
            SPNR,
            TICKET,
            SCURRENCY,
            STVAL,
            PCARDN,
            PAUTHOC,
            PPNR,
            USCR,
            FECR,
            HOCR,
            PGMCR,
            UUID;
    private Double TGROSAMOUN,
            SVFOPS,
            ADJU,
            ADJU_USD,
            EXCHRATE;
    private Integer QTYTKT;
}
