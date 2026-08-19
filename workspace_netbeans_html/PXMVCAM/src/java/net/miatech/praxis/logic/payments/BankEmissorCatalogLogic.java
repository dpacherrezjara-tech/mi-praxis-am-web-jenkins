package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP05262Filter;
import net.miatech.praxis.payment.filter.SQP05263Filter;
import net.miatech.praxis.payment.filter.SQP05265Filter;

/**
 *
 * @author Dvicente
 */
public interface BankEmissorCatalogLogic {
    List<A3152> getPaises() throws Exception;
    SQP05262Filter loadSQP05262Filter(SQP05262Filter filter) throws Exception;
    SQP05265Filter loadSQP05265Filter(SQP05265Filter filter) throws Exception;
    void loadSQP05263Filter(SQP05263Filter filter) throws Exception;
}
