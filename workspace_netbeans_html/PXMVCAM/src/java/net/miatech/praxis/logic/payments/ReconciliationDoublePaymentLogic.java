package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationDoublePaymentDAO;
import net.miatech.praxis.payment.filter.A4116Filter;

public class ReconciliationDoublePaymentLogic {

    private final ReconciliationDoublePaymentDAO ReconciliationDoublePaymentDAO = new ReconciliationDoublePaymentDAO();

    public void setSession(IServerSession ss) {
        ReconciliationDoublePaymentDAO.setSession(ss);

    }

    public List<A4116Filter> loadPX622SQP04472(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX622SQP04472(filter);
    }

    public List<A4116Filter> loadPX570SQP04470(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX570SQP04470(filter);
    }

    public List<A4116Filter> loadPX570SQP04540(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX570SQP04540(filter);
    }

    public A4116Filter loadPX570SQP04359(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX570SQP04359(filter);
    }

    public String loadPX622SQP04542(A4116Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadPX622SQP04542(filter);
    }
    
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return ReconciliationDoublePaymentDAO.loadSQP00697(filter);
    }

}
