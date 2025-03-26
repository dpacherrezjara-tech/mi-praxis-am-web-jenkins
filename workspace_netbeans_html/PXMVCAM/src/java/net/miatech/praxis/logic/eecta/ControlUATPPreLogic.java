/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.ControlUATPPreDAO;
import net.miatech.praxis.eecta.SQP03347Filter;
import net.miatech.praxis.eecta.SQP03348Filter;
import net.miatech.praxis.eecta.SQP04229Filter;
import net.miatech.praxis.eecta.SQP04530Filter;
import net.miatech.praxis.eecta.SQP05188Filter;
import net.miatech.praxis.eecta.SQP05189Filter;
import net.miatech.praxis.eecta.SQP05190Filter;
import net.miatech.praxis.eecta.SQP05191Filter;
import net.miatech.praxis.eecta.SQP05192Filter;
import net.miatech.praxis.eecta.SQP05524Filter;

/**
 *
 * @author vhidalgo
 */
public class ControlUATPPreLogic {

    private ControlUATPPreDAO objDAO = new ControlUATPPreDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP05188Filter> getSQP05188Filter(SQP05188Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05188Filter(filter);
    }

    public List<SQP05189Filter> getSQP05189Filter(SQP05189Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05189Filter(filter);
    }

    public SQP04530Filter setSQP04530Filter(SQP04530Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04530Filter(filter);
    }

    public List<SQP03347Filter> getSQP03347Filter(SQP03347Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03347Filter(filter);
    }

    public SQP03348Filter setSQP03348Filter(SQP03348Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03348Filter(filter);
    }

    public List<SQP05191Filter> getSQP05191Filter(SQP05191Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05191Filter(filter);
    }

    public List<SQP05192Filter> getSQP05192Filter(SQP05192Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05192Filter(filter);
    }

    public SQP04229Filter setSQP04229Filter(SQP04229Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04229Filter(filter);
    }

    public List<SQP05190Filter> getSQP05190Filter(SQP05190Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05190Filter(filter);
    }

    public SQP05524Filter setQP05524Filter(SQP05524Filter filter) throws SQLException, Exception {
        return objDAO.setSQP05524Filter(filter);
    }

}
