package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A006;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05036Filter;
import net.miatech.praxis.payment.filter.SQP05037Filter;
import net.miatech.praxis.payment.filter.SQP05041Filter;
import net.miatech.praxis.payment.filter.SQP05042Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;

/**
 *
 * @author Dvicente
 */
public interface AccountingTransactionLogic {
    //obtiene sumario
    SQP05036Filter getSQP05036Filter(SQP05036Filter filter)throws Exception;
    //obtiener datos de mastertable
    SQP05004Filter getSQP05004Filter(SQP05004Filter filter)throws Exception;
    //obtiene data para arbol por fecha
    SQP05037Filter getSQP05037Filter(SQP05037Filter filter)throws Exception;
    //obtiene detalle de arbol
    SQP05041Filter getSQP05041Filter(SQP05041Filter filter)throws Exception;
    //obtiene detalle contable
    SQP05042Filter getSQP05042Filter(SQP05042Filter filter)throws Exception;
    //obtiene detalle de tickets desglosados
    SQP05043Filter getSQP05043Filter(SQP05043Filter filter)throws Exception;
    //Monedas
    List<A006> getMonedas() throws Exception;
}
