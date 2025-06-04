package net.miatech.praxis.invoice.filters;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SQP05361Filter extends CustomPageImpl{
    private String IN_FROM,IN_TO,IN_TRNCU,IN_TRNCO,IN_TIPO,IN_TICKET;
    List<?> response = new ArrayList<>();
}
