package net.miatech.praxis.logic.invoice;

import java.util.List;
import net.miatech.praxis.invoice.filters.SQP05361Filter;
import net.miatech.praxis.invoice.filters.SQP05362Filter;
import net.miatech.praxis.invoice.filters.SQP05363Filter;

/**
 *
 * @author dvicente
 */
public interface ArithmeticValidationLogic {
    SQP05361Filter loadSQP05361Filter(SQP05361Filter filter) throws Exception;
    SQP05362Filter loadSQP05362Filter(SQP05362Filter filter) throws Exception;
    List<SQP05363Filter> loadSQP05363Filter(List<SQP05363Filter> data) throws Exception;
}
