package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author DPandal
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SQP05724Filter {
    
    private String IN_CCUST, IN_TFECHA, FECHA_FROM, FECHA_TO
            , IN_PROCESADOR, IN_MDA, IN_TDOC
            , IN_PNR, IN_PRAXISID, IN_FLEXID, IN_TICKET, IN_AREFNBR
            , IN_CUUID, IN_FUUID;
    
    @Builder.Default
    private List<A4183DetailAccounting> response = new ArrayList<>();

    
}

