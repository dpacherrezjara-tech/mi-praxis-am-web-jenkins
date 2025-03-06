package net.miatech.praxis.logic.salesAudit;

import net.miatech.praxis.SaleAudit.filter.SQP05372Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05377Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05379Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05401Filter;
import net.miatech.praxis.SaleAudit.filter.SQP05402Filter;

/**
 *
 * @author dvicente
 */
public interface ReservationBrowserLogic {
    SQP05377Filter loadSQP05377Filter(SQP05377Filter filter) throws Exception;
    SQP05372Filter loadSQP05372Filter(SQP05372Filter filter) throws Exception;
    SQP05379Filter loadSQP05379Filter(SQP05379Filter filter) throws Exception;
    SQP05401Filter loadSQP05401Filter() throws Exception;
    SQP05402Filter loadSQP05402Filter(SQP05402Filter filter) throws Exception;
}
