package net.miatech.praxis.SaleAudit.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SQP05379Filter {
    private String IN_CCUST,IN_FROM,IN_TO;
    List<?> response = new ArrayList<>();
}
