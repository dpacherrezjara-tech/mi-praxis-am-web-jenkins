package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.A006;
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
import net.miatech.praxis.payment.filter.SQP05074Filter;
import net.miatech.praxis.payment.filter.SQP05077Filter;
import net.miatech.praxis.payment.filter.SQP05081Filter;
import net.miatech.praxis.payment.filter.SQP05088Filter;
import net.miatech.praxis.payment.filter.SQP05089Filter;
import net.miatech.praxis.payment.filter.SQP05126Filter;
import net.miatech.praxis.payment.filter.SQP05128Filter;
import net.miatech.praxis.payment.filter.SQP05129Filter;
import net.miatech.praxis.payment.filter.SQP05130Filter;
import net.miatech.praxis.payment.filter.SQP05132Filter;
import net.miatech.praxis.payment.filter.SQP05133Filter;
import net.miatech.praxis.payment.filter.SQP05134Filter;
import net.miatech.praxis.payment.filter.SQP05141Filter;
import net.miatech.praxis.payment.filter.SQP05142Filter;
import net.miatech.praxis.payment.filter.SQP05147Filter;

/**
 *
 * @author Dvicente
 */
public interface SalesReconciliationLogic {

    //storeds para listado de payments
    SQP05059Filter getSQP05059Filter(SQP05059Filter filter) throws Exception;

    List<A3152MP> getPaises() throws Exception;
    List<A006> getMonedas() throws Exception;

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
    
    //Mantenimiento ChargebackTracking
    SQP05081Filter loadSQP05081Filter(SQP05081Filter filter) throws Exception;
    SQP05077Filter loadSQP05077Filter(SQP05077Filter filter) throws Exception;
    
    //proceso de conciliacion entre Transacciones
    SQP05074Filter loadSQP05074Filter(SQP05074Filter filter) throws Exception;
    SQP05147Filter loadSQP05147Filter() throws Exception;
    
    //storeds para listado de ticket
    SQP05088Filter loadSQP05088Filter(SQP05088Filter filter) throws Exception;
    SQP05089Filter loadSQP05089Filter(SQP05089Filter filter) throws Exception;
    
    SQP05126Filter loadSQP05126Filter(SQP05126Filter filter) throws Exception;
    
    //Mantenimiento Stand By BT
    SQP05128Filter loadSQP05128Filter(SQP05128Filter filter) throws Exception;
    SQP05129Filter loadSQP05129Filter(SQP05129Filter filter) throws Exception;
    //ADM By Ticket
    SQP05130Filter loadSQP05130Filter(SQP05130Filter filter) throws Exception;
    //Reversa ADM
    SQP05132Filter loadSQP05132Filter(SQP05132Filter filter) throws Exception;
    
    //summary
    SQP05133Filter loadSQP05133Filter(SQP05133Filter filter) throws Exception;
    SQP05134Filter loadSQP05134Filter(SQP05134Filter filter) throws Exception;
    
    SQP05141Filter loadSQP05141Filter(SQP05141Filter filter) throws Exception;
    SQP05142Filter loadSQP05142Filter(SQP05142Filter filter) throws Exception;
}
