package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.EMDTrackingPaymentDAO;
import net.miatech.praxis.payment.old.A2331Filter;
import net.miatech.praxis.payment.old.A3757Filter;

public class EMDTrackingPaymentLogic {

    private final EMDTrackingPaymentDAO EMDTrackingPaymentDAO = new EMDTrackingPaymentDAO();

    public void setSession(IServerSession ss) {
        EMDTrackingPaymentDAO.setSession(ss);
    }

    public List<A3757Filter> loadPX529SQP03550(A3757Filter filter) throws SQLException, Exception {
        return EMDTrackingPaymentDAO.loadPX529SQP03550(filter);
    }
    
    public List<A3757Filter> loadPX529SQP03551(A3757Filter filter) throws SQLException, Exception {
        return EMDTrackingPaymentDAO.loadPX529SQP03551(filter);
    }
    
    public List<A3757Filter> loadPX529SQP03552(A3757Filter filter) throws SQLException, Exception {
        return EMDTrackingPaymentDAO.loadPX529SQP03552(filter);
    }
    
    public List<A3757Filter> loadPX529SQP03571(A3757Filter filter) throws SQLException, Exception {
        return EMDTrackingPaymentDAO.loadPX529SQP03571(filter);
    }
    
    public List<A2331Filter> loadPX529SQP03572(A2331Filter filter) throws SQLException, Exception {
        return EMDTrackingPaymentDAO.loadPX529SQP03572(filter);
    }
    
}
