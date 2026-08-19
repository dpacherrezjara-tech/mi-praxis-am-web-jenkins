/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.TransaccionErrorDAO;
import net.miatech.praxis.travelbank.SQP04948Filter;
import net.miatech.praxis.travelbank.SQP04949Filter;
import net.miatech.praxis.travelbank.SQP04984Filter;

/**
 *
 * @author vhidalgo
 */
public class TransaccionErrorLogic {

    private TransaccionErrorDAO objDAO = new TransaccionErrorDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="Resumen de errores"
    public List<SQP04948Filter> getSQP04948Filter(SQP04948Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04948Filter(filter);
    }
    // </editor-fold>
    
      // <editor-fold defaultstate="collapsed" desc="Detalle de errores"
    public List<SQP04949Filter> getSQP04949Filter(SQP04949Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04949Filter(filter);
    }
    // </editor-fold>
    
      public SQP04984Filter setSQP04984Filter(SQP04984Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04984Filter(filter);
    }
}
