package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.EmailsDAO;
import net.miatech.praxis.payment.filter.A4170Filter;

public class EmailsLogic {

    private final EmailsDAO EmailsDAO = new EmailsDAO();

    public void setSession(IServerSession ss) {
        EmailsDAO.setSession(ss);
    }

    public List<A4170Filter> loadPX600SQP04543(A4170Filter filter) throws SQLException, Exception {
        return EmailsDAO.loadPX600SQP04543(filter);
    }
        
    public A4170Filter loadPX600SQP04544(A4170Filter filter) throws SQLException, Exception {
        return EmailsDAO.loadPX600SQP04544(filter);
    }
    
    public String loadPX600SQP04545(A4170Filter filter, String option) throws SQLException, Exception {
        return EmailsDAO.loadPX600SQP04545(filter, option);
    }
}
