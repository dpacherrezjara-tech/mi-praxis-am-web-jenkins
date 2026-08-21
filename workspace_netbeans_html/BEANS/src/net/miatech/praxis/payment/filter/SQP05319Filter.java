package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.miatech.praxis.payment.entities.A4584;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SQP05319Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_PROCTYPE,IN_PROCTYPESQ;
    @Builder.Default
    List<A4584> response = new ArrayList<>();
}
