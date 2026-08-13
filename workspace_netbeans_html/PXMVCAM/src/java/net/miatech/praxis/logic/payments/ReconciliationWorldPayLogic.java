/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationWorldPayDAO;
import net.miatech.praxis.payment.old.A4040Filter;
import net.miatech.praxis.payment.old.A4041Filter;
import net.miatech.praxis.payment.old.A4042Filter;

/**
 *
 * @author lmendoza
 */
public class ReconciliationWorldPayLogic {

    private final ReconciliationWorldPayDAO banksCatalogDAO = new ReconciliationWorldPayDAO();

    public void setSession(IServerSession ss) {
        banksCatalogDAO.setSession(ss);

    }

    public List<A4040Filter> loadPX589SQP04434(A4040Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX589SQP04434(filter);
    }
    
    public List<A4040Filter> loadPX589SQP04411(A4040Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX589SQP04411(filter);
    }
    
    public List<A4040Filter> loadPX589SQP04412(A4040Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX589SQP04412(filter);
    }
    
    public List<A4041Filter> loadPX589SQP04430(A4041Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX589SQP04430(filter);
    }
    
    public List<A4042Filter> loadPX589SQP04431(A4042Filter filter) throws SQLException, Exception {
        return banksCatalogDAO.loadPX589SQP04431(filter);
    }

}
