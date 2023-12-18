package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationDoublePaymentDAO;
import net.miatech.praxis.payment.old.A4116Filter;
import net.miatech.praxis.payment.old.A4331OFilter;
import net.miatech.praxis.payment.filter.SQP04955Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05043Filter;

public class ReconciliationDoublePaymentLogic {

    private final ReconciliationDoublePaymentDAO ReconciliationDoublePaymentDAO = new ReconciliationDoublePaymentDAO();

    public void setSession(IServerSession ss) {
        ReconciliationDoublePaymentDAO.setSession(ss);

    }

    public List<A4116Filter> loadPX622SQP04955(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX622SQP04955(filter);
    }
    
    public SQP04955Filter getSQP04955Filter(SQP04955Filter filter) throws Exception{
        return ReconciliationDoublePaymentDAO.getSQP04955Filter(filter);
    }

    public List<A4331OFilter> loadPX606SQP04470(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX606SQP04470(filter);
    }

    public List<A4331OFilter> loadPX606SQP04698(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX606SQP04698(filter);
    }

    public A4331OFilter loadPX606SQP04720(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX606SQP04720(filter);
    }

    public String loadPX622SQP04954(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX622SQP04954(filter);
    }
    
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadSQP00697(filter);
    }
    
    public SQP05043Filter getSQP05043Filter(SQP05043Filter filter) throws Exception{
        return ReconciliationDoublePaymentDAO.getSQP05043Filter(filter);
    }
    
    public SQP05004Filter getSQP05004Filter(SQP05004Filter filter)throws Exception{
        return ReconciliationDoublePaymentDAO.getSQP05004Filter(filter);
    }
}
