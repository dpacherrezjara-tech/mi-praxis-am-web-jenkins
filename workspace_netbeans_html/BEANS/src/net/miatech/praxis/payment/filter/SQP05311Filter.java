package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.miatech.praxis.payment.entities.A4581Filter;

/**
 *
 * @author Dvicente
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SQP05311Filter {
    private String IN_UUID;
    @Builder.Default
    List<A4581Filter> response = new ArrayList<>();
}
