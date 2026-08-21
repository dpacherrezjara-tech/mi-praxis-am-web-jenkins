/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.TransaccionBalanceDAO;
import net.miatech.praxis.travelbank.SQP04894Filter;

/**
 *
 * @author vhidalgo
 */
public class TransaccionBalanceLogic {

    private TransaccionBalanceDAO objDAO = new TransaccionBalanceDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="CONSULTA POR TRANSACC ID"
    public List<SQP04894Filter> getSQP04894Filter(SQP04894Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04894Filter(filter);
    }

    // </editor-fold>
}
