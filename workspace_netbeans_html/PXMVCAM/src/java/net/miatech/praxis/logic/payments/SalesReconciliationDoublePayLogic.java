package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05163Filter;
import net.miatech.praxis.payment.filter.SQP05164Filter;
import net.miatech.praxis.payment.filter.SQP05165Filter;

/**
 *
 * @author Dvicente
 */
public interface SalesReconciliationDoublePayLogic {

    List<A3152> getPaises() throws Exception;

    List<A006> getMonedas() throws Exception;

    SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception;

    //obtiene data de dp
    SQP05163Filter loadSQP05163Filter(SQP05163Filter filter) throws Exception;

    //actualiza records de reembolso
    SQP05164Filter loadSQP05164Filter(SQP05164Filter filter) throws Exception;

    SQP05052Filter loadSQP05052Filter(SQP05052Filter filter) throws Exception;
    
    //obtiene desglose de boletos
    SQP05165Filter loadSQP05165Filter(SQP05165Filter filter) throws Exception;
}
