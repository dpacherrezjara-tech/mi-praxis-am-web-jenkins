package net.miatech.praxis.payment.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class A4581 {
    private String UUID,CCUST,PRDA,TDOC,AREFNBR,
            PROCTYPE,PROCTYPESQ,ERRORMSG,USCR,FECR,HOCR,PGMCR;
    private Integer ERRORCOD;
}
