package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
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
public class SQP05312Filter {
    private String IN_CCUST,IN_PRDA,IN_TDOC,IN_AREFNBR,IN_SCARDN;
    private Double IN_TGROSAMOUN;
    @Builder.Default
    List<A4331Filter> response  = new ArrayList<>();
}
