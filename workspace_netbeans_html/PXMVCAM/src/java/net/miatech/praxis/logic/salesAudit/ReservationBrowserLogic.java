package net.miatech.praxis.logic.salesAudit;

import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;

/**
 *
 * @author dvicente
 */
public interface ReservationBrowserLogic {
    SQP05377Filter loadSQP05377Filter(SQP05377Filter filter) throws Exception;
}
