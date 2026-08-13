package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.Sales.A4373;
import net.miatech.praxis.Sales.A4373Filter;
import net.miatech.praxis.dao.payments.LoadPaymentDAO;
import net.miatech.praxis.payment.old.A2289Filter;
import net.miatech.praxis.payment.old.A4168Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadPaymentLogic {

    private LoadPaymentDAO objDAO = new LoadPaymentDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A2289Filter> loadSQP00885(A2289Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP00885(filter);
    }       
    
    /*NUEVO RFTX*/
    public List<A4373Filter> loadSQP04826(A4373Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP04826(filter);
    }  
    
    public List<A2289Filter> loadSQP00888(A2289Filter filter) throws Exception {
        return objDAO.loadSQP00888(filter);
    }

    public List<A4168Filter> loadSQP04467(A4168Filter filter) throws SQLException, Exception {
        return objDAO.loadSQP04467(filter);
    }
}
