/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4306Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.AccountingEmailMaintenanceFormDAO;

/**
 *
 * @author zperez
 */
public class AccountingEmailMaintenanceFormLogic {
    private AccountingEmailMaintenanceFormDAO EmailcatalDAO= new AccountingEmailMaintenanceFormDAO();
    
    public void setSession(IServerSession ss) {
        EmailcatalDAO.setSession(ss);
    }
    
    public List<A4306Filter> Search(A4306Filter filter) throws SQLException, Exception {
        return EmailcatalDAO.Search(filter);
    }
    
     public String mantenimiento(A4306Filter filter) throws SQLException, Exception {
        return EmailcatalDAO.mantenimiento(filter);
    }
    
}
