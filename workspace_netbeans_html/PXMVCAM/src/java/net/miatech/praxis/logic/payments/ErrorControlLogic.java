package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.praxis.payment.entities.A4480MP;
import net.miatech.praxis.payment.errordtos.VN0002PG;
import net.miatech.praxis.payment.errordtos.VN0002PG_UP;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05020Filter;
import net.miatech.praxis.payment.filter.SQP05021Filter;
import net.miatech.praxis.payment.filter.SQP05025Filter;
import net.miatech.praxis.payment.filter.SQP05026Filter;

/**
 *
 * @author Dvicente
 */
public interface ErrorControlLogic {
    //codigos de error
    List<A4480MP> getSQP05019Filter() throws Exception;
    //obtiene sumario de errores (formateo)
    SQP05020Filter getSQP05020Filter(SQP05020Filter filter)throws Exception;
    //obtener info de Master Table MP
    SQP05004Filter getSQP05004Filter(SQP05004Filter filter)throws Exception;
    //obtiene detalle de errores (formateo)
    SQP05021Filter getSQP05021Filter(SQP05021Filter filter)throws Exception;
    //obtiene sumario de errores (carga)
    SQP05025Filter getSQP05025Filter(SQP05025Filter filter)throws Exception;
    //obtiene detalle de errores (carga)
    SQP05026Filter getSQP05026Filter(SQP05026Filter filter)throws Exception;
    
    
    //************************************************************************
    
    //Informacion para Data entry VN0002
    VN0002PG getVN0002PGInfo(VN0002PG filter)throws Exception;
    //Update para Data entry VN0002
    Integer updateVN0002PG(VN0002PG_UP filter)throws Exception;
}
