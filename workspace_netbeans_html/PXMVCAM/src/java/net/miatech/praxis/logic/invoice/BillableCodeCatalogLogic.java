package net.miatech.praxis.logic.invoice;

import net.miatech.praxis.invoice.filters.SQP05356Filter;
import net.miatech.praxis.invoice.filters.SQP05357Filter;
import net.miatech.praxis.invoice.filters.SQP05360Filter;

/**
 *
 * @author dvicente
 */
public interface BillableCodeCatalogLogic {
    SQP05356Filter loadSQP05356Filter(SQP05356Filter filter) throws Exception;
    SQP05357Filter loadSQP05357Filter(SQP05357Filter filter) throws Exception;
    SQP05360Filter loadSQP05360Filter(SQP05360Filter filter) throws Exception;
}
