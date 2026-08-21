package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.payment.entities.A3152;
import net.miatech.praxis.payment.filter.SQP04979Filter;
import net.miatech.praxis.payment.filter.SQP04980Filter;
import net.miatech.praxis.payment.filter.SQP04981Filter;
import net.miatech.praxis.payment.filter.SQP04982Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP04983Filter;

/**
 *
 * @author Dvicente
 */
public interface SalesComplementLogic {
    //plugrade
    public SQP04979Filter getSQP04979Filter(SQP04979Filter filter) throws Exception;
    //ligas
    public SQP04980Filter getSQP04980Filter(SQP04980Filter filter) throws Exception;
    //tablets
    public SQP04981Filter getSQP04981Filter(SQP04981Filter filter) throws Exception;
    //tickets conciliacion venta vs liqui
    public SQP04982Filter getSQP04982Filter(SQP04982Filter filter) throws Exception;
    //obtener PNR
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter); 
    //obtener info de Master Table A4451
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter) throws Exception;
    public List<A3152> getPaises()throws Exception;
}
