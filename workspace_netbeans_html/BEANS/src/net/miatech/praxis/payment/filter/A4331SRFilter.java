package net.miatech.praxis.payment.filter;

import lombok.Data;

/**
 *
 * @author Dvicente
 */
@Data
public class A4331SRFilter {
    private String PRDA,PAYDATE,FEUP,DESC_PROCTYPE,
            A4496FECVT,A4496FPROC,A4501FEUP;
    private Integer TOTAL,
            TOTAL_MATCH,TOTAL_PENDING,
            TOTAL_NC_MATCH,TOTAL_NC_PENDING,
            TOTAL_PG_MATCH,TOTAL_PG_PENDING,
            TOTAL_LIG_MATCH,TOTAL_LIG_PENDING,
            TOTAL_TAB_MATCH,TOTAL_TAB_PENDING;
}
