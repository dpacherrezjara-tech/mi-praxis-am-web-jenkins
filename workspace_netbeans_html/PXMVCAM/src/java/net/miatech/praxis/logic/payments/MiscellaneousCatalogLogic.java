package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.filter.SQP05273Filter;
import net.miatech.praxis.payment.filter.SQP05274Filter;
import net.miatech.praxis.payment.filter.SQP05275Filter;

/**
 *
 * @author Dvicente
 */
public interface MiscellaneousCatalogLogic {
    SQP05273Filter loadSQP05273Filter(SQP05273Filter filter) throws Exception;
    SQP05274Filter loadSQP05274Filter(SQP05274Filter filter) throws Exception;
    SQP05275Filter loadSQP05275Filter(SQP05275Filter filter) throws Exception;
}
