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
public class A4582 {
    private String UUID,CCUST,PRDA,PROCTYPE,PROCTYPESQ,DESCR,STS,
            USCR,FECR,HOCR,PGMCR;
    private Integer TOTAL,MATCHS,ERRORS;
}
