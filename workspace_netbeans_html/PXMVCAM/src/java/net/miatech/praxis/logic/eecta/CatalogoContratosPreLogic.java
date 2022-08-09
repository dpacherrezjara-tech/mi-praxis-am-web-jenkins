/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.CatalogoContratosPreDAO;
import net.miatech.praxis.eecta.SQP04527Filter;
import net.miatech.praxis.eecta.SQP04587Filter;
import net.miatech.praxis.eecta.SQP04588Filter;

/**
 *
 * @author vhidalgo
 */
public class CatalogoContratosPreLogic {
    private CatalogoContratosPreDAO objDAO = new CatalogoContratosPreDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    public List<SQP04587Filter> getSQP04587Filter(SQP04587Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04587Filter(filter);
    }
    public List<SQP04588Filter> getSQP04588Filter(SQP04588Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04588Filter(filter);
    }
    public SQP04527Filter setSQP04527Filter(SQP04527Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04527Filter(filter);
    }
    
    
}
