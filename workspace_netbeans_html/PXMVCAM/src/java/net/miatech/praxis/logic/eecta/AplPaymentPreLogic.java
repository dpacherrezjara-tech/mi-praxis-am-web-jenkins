/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.AplPaymentPreDAO;
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;
import net.miatech.praxis.eecta.SQP05193Filter;
import net.miatech.praxis.eecta.SQP05194Filter;
import net.miatech.praxis.eecta.SQP05195Filter;
import net.miatech.praxis.eecta.SQP05196Filter;

/**
 *
 * @author vhidalgo
 */
public class AplPaymentPreLogic {

    private AplPaymentPreDAO objDAO = new AplPaymentPreDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP05193Filter> getSQP05193Filter(SQP05193Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05193Filter(filter);
    }

    public List<SQP05196Filter> getSQP05196Filter(SQP05196Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05196Filter(filter);
    }

    public SQP03952Filter setSQP03952Filter(SQP03952Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03952Filter(filter);
    }

    public List<SQP05194Filter> getSQP05194Filter(SQP05194Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05194Filter(filter);
    }

    public List<SQP05195Filter> getSQP05195Filter(SQP05195Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05195Filter(filter);
    }

    public SQP03943Filter setSQP03943Filter(SQP03943Filter filter) throws SQLException, Exception {
        return objDAO.setSQP03943Filter(filter);
    }

    public SQP04059Filter setSQP04059Filter(SQP04059Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04059Filter(filter);
    }

    public List<SQP04053Filter> getSQP04053Filter(SQP04053Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04053Filter(filter);
    }

}
