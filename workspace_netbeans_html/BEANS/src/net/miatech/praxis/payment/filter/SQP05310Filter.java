package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.miatech.praxis.payment.entities.A4582Filter;

/**
 *
 * @author Dvicente
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SQP05310Filter {
    private String IN_CCUST,IN_FROM,IN_TO,IN_USCR;
    @Builder.Default
    List<A4582Filter> response = new ArrayList<>();
}
