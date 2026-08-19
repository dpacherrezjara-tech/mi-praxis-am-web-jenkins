/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.ReconciliationReportDAO;
import net.miatech.praxis.travelbank.SQP04995Filter;
import net.miatech.praxis.travelbank.SQP04996Filter;

/**
 *
 * @author vhidalgo
 */
public class ReconciliationReportLogic {

    private ReconciliationReportDAO objDAO = new ReconciliationReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="Resumen"
    public List<SQP04995Filter> getSQP04995Filter(SQP04995Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04995Filter(filter);
    }
    // </editor-fold>
    
      // <editor-fold defaultstate="collapsed" desc="Detalle credit id"
    public List<SQP04996Filter> getSQP04996Filter(SQP04996Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04996Filter(filter);
    }
    // </editor-fold>
    
     
}
