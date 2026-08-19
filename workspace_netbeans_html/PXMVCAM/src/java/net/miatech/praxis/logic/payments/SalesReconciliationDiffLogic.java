package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05152Filter;
import net.miatech.praxis.payment.filter.SQP05153Filter;
import net.miatech.praxis.payment.filter.SQP05154Filter;

/**
 *
 * @author Dvicente
 */
public interface SalesReconciliationDiffLogic {
    
    List<A3152> getPaises() throws Exception;
    SQP05004Filter loadSQP05004Filter(SQP05004Filter filter) throws Exception;
    SQP05153Filter loadSQP05153Filter(SQP05153Filter filter) throws Exception;
    SQP05154Filter loadSQP05154Filter(SQP05154Filter filter) throws Exception;
    
    void loadSQP05152Filter(SQP05152Filter filter) throws Exception;
}
