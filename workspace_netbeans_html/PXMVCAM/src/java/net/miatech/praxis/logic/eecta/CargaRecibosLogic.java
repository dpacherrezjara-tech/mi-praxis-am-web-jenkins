/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.CargaRecibosDAO;
import net.miatech.praxis.eecta.SQP04195Filter;
import net.miatech.praxis.eecta.SQP04196Filter;

/**
 *
 * @author vhidalgo
 */
public class CargaRecibosLogic {
    private CargaRecibosDAO objDAO = new CargaRecibosDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04196Filter> getSQP04196Filter(SQP04196Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04196Filter(filter);
    }
      public SQP04195Filter setSQP04195Filter(SQP04195Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04195Filter(filter);
    }
      
}
