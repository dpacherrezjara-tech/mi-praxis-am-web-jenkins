package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.A3152MP;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05048Filter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05054Filter;
import net.miatech.praxis.payment.filter.SQP05055Filter;
import net.miatech.praxis.payment.filter.SQP05056Filter;
import net.miatech.praxis.payment.filter.SQP05057Filter;
import net.miatech.praxis.payment.filter.SQP05059Filter;
import net.miatech.praxis.payment.filter.SQP05060Filter;
import net.miatech.praxis.payment.filter.SQP05061Filter;
import net.miatech.praxis.payment.filter.SQP05062Filter;
import net.miatech.praxis.payment.filter.SQP05063Filter;
import net.miatech.praxis.payment.filter.SQP05065Filter;
import net.miatech.praxis.payment.filter.SQP05072Filter;

/**
 *
 * @author Dvicente
 */
public interface SalesReconciliationLogic {

    //storeds para listado de payments
    SQP05059Filter getSQP05059Filter(SQP05059Filter filter) throws Exception;

    List<A3152MP> getPaises() throws Exception;

    SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception;

    SQP05060Filter getSQP05060Filter(SQP05060Filter filter) throws Exception;

    //Stored para mantenimiento de Data Entry
    SQP05048Filter loadSQP05048Filter(SQP05048Filter filter) throws Exception;

    SQP04847Filter loadSQP04847Filter(SQP04847Filter filter) throws Exception;

    SQP05052Filter loadSQP05052Filter(SQP05052Filter filter) throws Exception;

    SQP05054Filter loadSQP05054Filter(SQP05054Filter filter) throws Exception;

    SQP05055Filter loadSQP05055Filter(SQP05055Filter filter) throws Exception;

    SQP05056Filter loadSQP05056Filter(SQP05056Filter filter) throws Exception;

    SQP05057Filter loadSQP05057Filter(SQP05057Filter filter) throws Exception;

    SQP05062Filter loadSQP05062Filter(SQP05062Filter filter) throws Exception;
    
    SQP05061Filter loadSQP05061Filter(SQP05061Filter filter) throws Exception;
    
    SQP05072Filter loadSQP05072Filter(SQP05072Filter filter) throws Exception;
    
    //Mantenimiento MSI Tracking
    SQP05063Filter loadSQP05063Filter(SQP05063Filter filter) throws Exception;
    SQP05065Filter loadSQP05065Filter(SQP05065Filter filter) throws Exception;
}
