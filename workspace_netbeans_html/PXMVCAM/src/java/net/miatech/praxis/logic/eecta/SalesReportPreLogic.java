/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.SalesReportPreDAO;
import net.miatech.praxis.eecta.SQP04556Filter;
import net.miatech.praxis.eecta.SQP04557Filter;

/**
 *
 * @author vhidalgo
 */
public class SalesReportPreLogic {

    private SalesReportPreDAO objDAO = new SalesReportPreDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04556Filter> getSQP04556Filter(SQP04556Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04556Filter(filter);
    }

    public List<SQP04557Filter> getSQP04557Filter(SQP04557Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04557Filter(filter);
    }
}
