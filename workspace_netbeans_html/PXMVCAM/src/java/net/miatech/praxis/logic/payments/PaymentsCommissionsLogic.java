package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05135Filter;
import net.miatech.praxis.payment.filter.SQP05155Filter;
import net.miatech.praxis.payment.filter.SQP05156Filter;
import net.miatech.praxis.payment.filter.SQP05158Filter;
import net.miatech.praxis.payment.filter.SQP05267Filter;

/**
 *
 * @author Dvicente
 */
public interface PaymentsCommissionsLogic {
    
    List<A3152> getPaises() throws Exception;
    List<A006> getMonedas() throws Exception;
    SQP05004Filter loadSQP05004Filter(SQP05004Filter filter) throws Exception;
    SQP05155Filter loadSQP05155Filter(SQP05155Filter filter) throws Exception;
    SQP05156Filter loadSQP05156Filter(SQP05156Filter filter) throws Exception;
    SQP05158Filter loadSQP05158Filter(SQP05158Filter filter) throws Exception;
    SQP05135Filter loadSQP05135Filter(SQP05135Filter filter) throws Exception;
    void loadSQP05267Filter(SQP05267Filter filter) throws Exception;
}
