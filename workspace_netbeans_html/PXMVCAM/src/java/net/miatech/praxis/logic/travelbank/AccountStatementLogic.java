/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.AccountStatementDAO;
import net.miatech.praxis.travelbank.SQP04825Filter;

/**
 *
 * @author vhidalgo
 */
public class AccountStatementLogic {

    private AccountStatementDAO objDAO = new AccountStatementDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="EECC">
    public List<SQP04825Filter> getSQP04825Filter(SQP04825Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04825Filter(filter);
    }

    // </editor-fold>
}
