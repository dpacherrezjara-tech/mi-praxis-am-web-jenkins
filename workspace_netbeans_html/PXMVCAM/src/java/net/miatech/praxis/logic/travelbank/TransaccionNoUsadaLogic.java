/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.TransaccionNoUsadaDAO;
import net.miatech.praxis.travelbank.SQP04903Filter;

/**
 *
 * @author vhidalgo
 */
public class TransaccionNoUsadaLogic {

    private TransaccionNoUsadaDAO objDAO = new TransaccionNoUsadaDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="TNU">
    public List<SQP04903Filter> getSQP04903Filter(SQP04903Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04903Filter(filter);
    }

    // </editor-fold>
}
