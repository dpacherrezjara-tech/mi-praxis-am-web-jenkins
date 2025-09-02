package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author dpandal
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SQP05646Filter {
    
    private String IN_CCUST,
            IN_DATE,IN_TDATE,IN_DATEFROM,IN_DATETO,
            IN_TRNCU,IN_SAGENT,IN_SCOUNTRY,IN_FVOID,
            IN_STVAL,IN_TCARD,IN_CCARD,IN_FUENT,IN_SFUEN,IN_SCURRENCY;
    
    @Builder.Default
    private List<A4331SRFilter> response = new ArrayList<>();
    
}
