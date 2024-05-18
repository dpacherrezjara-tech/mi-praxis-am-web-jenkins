package net.miatech.praxis.payment.filter;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
public class SQP05308Filter {
    private String IN_ACTION;
    private String IN_UUID;
    private String IN_CCUST;
    private String IN_PRDA;
    private String IN_PROCTYPE;
    private String IN_PROCTYPESQ;
    private Integer IN_TOTAL;
    private Integer IN_MATCHS;
    private Integer IN_ERRORS;
    private String IN_DESCR;
    private String IN_STS;
}
