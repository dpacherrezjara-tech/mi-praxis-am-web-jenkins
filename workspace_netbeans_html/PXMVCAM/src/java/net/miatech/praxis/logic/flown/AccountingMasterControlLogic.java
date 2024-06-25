/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.AccountingMasterControlDAO;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.praxisbi.A4992Filter;

/**
 *
 * @author lmendoza
 */
public class AccountingMasterControlLogic {

    private final AccountingMasterControlDAO accountingMasterControlDAO = new AccountingMasterControlDAO();

    public void setSession(IServerSession ss) {
        accountingMasterControlDAO.setSession(ss);

    }

    public List<A1955Filter> search(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.search(filter);
    }
    public List<A4992Filter> searchSQP05346(A4992Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.searchSQP05346(filter);
    }
    public String consistenciaFlown(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.consistenciaFlown(filter);
    } 
    
     public String accountMaintance(A1955Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterControlDAO.accountMaintance(filter, strOption);
    }
     
    public A1955Filter accountValidation(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.accountValidation(filter);
    }
     
    public String reversaFlown(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.reversaFlown(filter);
    }
    
    public String accountMaintancePendingFlown(A1955Filter filter, String strOption) throws SQLException, Exception {
        return accountingMasterControlDAO.accountMaintancePendingFlown(filter, strOption);
    }
    
    public A1955Filter searchReversa(A1955Filter filter) throws SQLException, Exception {
        return accountingMasterControlDAO.searchReversa(filter);
    }
}
