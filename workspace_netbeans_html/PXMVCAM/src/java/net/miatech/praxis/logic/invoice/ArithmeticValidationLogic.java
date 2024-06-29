package net.miatech.praxis.logic.invoice;

import net.miatech.praxis.invoice.filters.SQP05361Filter;
import net.miatech.praxis.invoice.filters.SQP05362Filter;

/**
 *
 * @author dvicente
 */
public interface ArithmeticValidationLogic {
    SQP05361Filter loadSQP05361Filter(SQP05361Filter filter) throws Exception;
    SQP05362Filter loadSQP05362Filter(SQP05362Filter filter) throws Exception;
}
