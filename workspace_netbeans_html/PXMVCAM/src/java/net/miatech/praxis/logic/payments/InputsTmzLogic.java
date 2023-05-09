package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.CalendarTmz;
import net.miatech.praxis.payment.filter.SQP04971Filter;
import net.miatech.praxis.payment.filter.SQP04972Filter;
import net.miatech.praxis.payment.filter.SQP04974Filter;

/**
 *
 * @author Dvicente
 */
public interface InputsTmzLogic {
    public SQP04971Filter getSQP04971Filter(SQP04971Filter filter);
    public List<CalendarTmz> getSQP04972Filter(SQP04972Filter filter);
    public List<SQP04974Filter> getSQP04974Filter(SQP04974Filter filter);
    
}
