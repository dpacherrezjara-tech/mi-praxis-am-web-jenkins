package net.miatech.praxis.invoice.filters;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SQP05362Filter {
    private String IN_FPROC,IN_TRNCU,IN_TRNCO,IN_TIPO,IN_CIA,IN_FORMA,IN_SERIE;
    List<?> response = new ArrayList<>();
}
