package net.miatech.praxis.payment.filter;

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
public class SQP05302Filter {
    private String IN_CCUST,IN_PROCTYPE,IN_PROCTYPESQ,
            IN_TRANSTYPE,IN_PRDA,IN_TDOC;
}
