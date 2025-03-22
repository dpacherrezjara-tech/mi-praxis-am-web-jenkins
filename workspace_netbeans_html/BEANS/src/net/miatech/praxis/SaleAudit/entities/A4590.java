package net.miatech.praxis.SaleAudit.entities;

import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class A4590{
    private Integer RN;
    private String CCUST,  
            PRDA,
            PNR,
            PNRAA,
            FUENTE,
            JOBQUEUE,
            REFTKT,
            STSEARCH,
            TXTORIGIN,
            USCR, 
            FECR, 
            HOCR, 
            PGMCR,
            USUP, 
            FEUP, 
            HOUP, 
            PGMUP;
    private Integer QTYTKT;
    private Double NBRSEARCH;
}
