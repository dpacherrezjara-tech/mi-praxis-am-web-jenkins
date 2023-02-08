/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.TransactionFilesDAO;
import net.miatech.praxis.travelbank.SQP04806Filter;
import net.miatech.praxis.travelbank.SQP04807Filter;

/**
 *
 * @author vhidalgo
 */
public class TransactionFilesLogic {

    private TransactionFilesDAO objDAO = new TransactionFilesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04806Filter> getSQP04806Filter(SQP04806Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04806Filter(filter);
    }
     public List<SQP04807Filter> getSQP04807Filter(SQP04807Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04807Filter(filter);
    }

}
