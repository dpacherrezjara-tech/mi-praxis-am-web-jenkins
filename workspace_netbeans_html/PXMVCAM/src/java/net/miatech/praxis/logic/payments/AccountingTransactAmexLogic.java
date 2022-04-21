package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.AccountingTransactAmexDAO;
import net.miatech.praxis.payment.filter.A4116Filter;


public class AccountingTransactAmexLogic {

    private final AccountingTransactAmexDAO AccountingTransactAmexDAO = new AccountingTransactAmexDAO();

    public void setSession(IServerSession ss) {
        AccountingTransactAmexDAO.setSession(ss);
    }

    public List<A4116Filter> loadPX590SQP04416(A4116Filter filter) throws SQLException, Exception {
        return AccountingTransactAmexDAO.loadPX590SQP04416(filter);
    }
    
    public List<A4116Filter> loadPX590SQP04417(A4116Filter filter) throws SQLException, Exception {
        return AccountingTransactAmexDAO.loadPX590SQP04417(filter);
    }
    
}
