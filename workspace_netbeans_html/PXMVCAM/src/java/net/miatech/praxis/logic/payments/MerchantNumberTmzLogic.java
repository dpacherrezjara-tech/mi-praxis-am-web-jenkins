package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP05254Filter;
import net.miatech.praxis.payment.filter.SQP05255Filter;
import net.miatech.praxis.payment.filter.SQP05256Filter;
import net.miatech.praxis.payment.filter.SQP05258Filter;

/**
 *
 * @author Dvicente
 */
public interface MerchantNumberTmzLogic {
    
    List<A3152> getPaises() throws Exception;
    SQP05254Filter loadSQP05254Filter(SQP05254Filter filter) throws Exception;
    SQP05255Filter loadSQP05255Filter(SQP05255Filter filter) throws Exception;
    void loadSQP05256Filter(SQP05256Filter filter) throws Exception;
    SQP05258Filter loadSQP05258Filter(SQP05258Filter filter) throws Exception;
}
