package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadConciliationTestDAO;
import net.miatech.praxis.payment.filter.A4164Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadConciliationTestLogic {
    
    private LoadConciliationTestDAO loadConciliationTestDAO = new LoadConciliationTestDAO();
    
    public void setSession(IServerSession ss) {
        loadConciliationTestDAO.setSession(ss);
    }
    
    public List<A4164Filter> loadPX584SQP04338(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04338(filter);
    }
    
    public List<A2370Filter> loadPX584SQP00899(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00899(filter);
    }
    
    public HashMap<String, List<A4164Filter>> loadPX584SQP01960(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP01960(filter);
    }
    
    public HashMap<String, List<A4164Filter>> loadPX584SQP01828(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP01828(filter);
    }
    
    public HashMap<String, List<A4164Filter>> loadPX584SQP01976(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP01976(filter);
    }
    
    public List<A4164Filter> loadPX584SQP04340(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04340(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00656(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00656(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00657(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00657(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00658(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00658(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00900(A2370Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00900(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00901(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00901(filter);
    }
    
    public A4164Filter loadPX584SQP00659(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00659(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00817(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00817(filter);
    }
    
    public List<A4164Filter> loadPX584SQP04339(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP04339(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00894(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00894(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00677(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00677(filter);
    }
    
    public List<A4164Filter> loadPX584SQP00678(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00678(filter);
    }
    
    public List<A4164Filter> loadPX584SQP03986(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP03986(filter);
    }
    
    public HashMap<String, List<A4164Filter>> loadPX584SQP00715(A4164Filter filter) throws SQLException, Exception {
        return loadConciliationTestDAO.loadPX584SQP00715(filter);
    }
}
