package net.miatech.praxis.invoice.filters;

import lombok.Data;
import net.miatech.praxis.invoice.entities.A4586;

/**
 *
 * @author dvicente
 */
@Data
public class SQP05360Filter {
    private String IN_IDCOD;
    A4586 response = new A4586();
}
