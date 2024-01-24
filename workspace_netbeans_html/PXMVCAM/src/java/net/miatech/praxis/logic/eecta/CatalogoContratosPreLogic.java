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
import net.miatech.praxis.eecta.SQP04589Filter;
import net.miatech.praxis.eecta.SQP04666Filter;
import net.miatech.praxis.eecta.SQP05212Filter;
import net.miatech.praxis.eecta.SQP05241Filter;
import net.miatech.praxis.eecta.SQP05242Filter;
import net.miatech.praxis.eecta.SQP05245Filter;

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

    public List<SQP04589Filter> getSQP04589Filter(SQP04589Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04589Filter(filter);
    }

    public SQP04666Filter setSQP04666Filter(SQP04666Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04666Filter(filter);
    }

    public SQP05212Filter setSQP05212Filter(SQP05212Filter filter) throws SQLException, Exception {
        return objDAO.setSQP05212Filter(filter);
    }

    public SQP05245Filter setSQP05245Filter(SQP05245Filter filter) throws SQLException, Exception {
        return objDAO.setSQP05245Filter(filter);
    }

    public SQP05241Filter setSQP05241Filter(SQP05241Filter filter) throws SQLException, Exception {
        return objDAO.setSQP05241Filter(filter);
    }

    public List<SQP05242Filter> getSQP05242Filter(SQP05242Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05242Filter(filter);
    }

}
