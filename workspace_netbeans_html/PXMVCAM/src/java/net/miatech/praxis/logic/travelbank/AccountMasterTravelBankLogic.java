package net.miatech.praxis.logic.travelbank;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A4405Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.AccountMasterTravelBankDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountMasterTravelBankLogic {
    
    private AccountMasterTravelBankDAO objDAO = new AccountMasterTravelBankDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4405Filter> setPX126S02A4405(A4405Filter filter) throws SQLException {
        return objDAO.loadPX126S02A4405(filter);
    }

    public String accountMasterMaintance(A4405Filter filter, String strOption) throws SQLException {
        return objDAO.accountMasterMaintance(filter, strOption);
    }
    public List<A4405Filter> loadPX126S02A4405EXCEL(A4405Filter filter) throws SQLException, Exception {
        return objDAO.loadPX126S02A4405EXCEL(filter);
    }
}
