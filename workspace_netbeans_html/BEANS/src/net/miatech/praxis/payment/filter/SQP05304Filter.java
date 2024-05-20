package net.miatech.praxis.payment.filter;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author Dvicente
 */
@Data
@Builder
public class SQP05304Filter {
    private String VP_CCUST,VP_PROCESO;
}
