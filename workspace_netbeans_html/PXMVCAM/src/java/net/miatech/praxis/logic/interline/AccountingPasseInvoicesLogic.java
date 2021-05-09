    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.interline;

import java.util.List;
import net.miatech.beans.A1964Filter;
import net.miatech.beans.A1965Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.AccountingPasseInvoicesDAO;
import net.miatech.praxis.interline.filter.SFI020Filter;

/**
 *
 * @author lmendoza
 */
public class AccountingPasseInvoicesLogic {

    private final AccountingPasseInvoicesDAO passengerInvoicesDAO = new AccountingPasseInvoicesDAO();

    public void setSession(IServerSession ss) {
        passengerInvoicesDAO.setSession(ss);

    }
    
    public List<A1964Filter> loadPX538(A1964Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538(filter);
    }
    
    public List<A1965Filter> loadPX538_Xpagar(A1964Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538_Xpagar(filter);
    }
    
    public List<SFI020Filter> loadPX538_excel(SFI020Filter filter) throws Exception {
        return passengerInvoicesDAO.loadPX538_excel(filter);
    }
}
