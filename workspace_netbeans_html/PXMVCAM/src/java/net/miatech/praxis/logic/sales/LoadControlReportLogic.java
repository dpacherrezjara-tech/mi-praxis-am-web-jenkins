/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP05015Filter;
import net.miatech.beans.SQP05068Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.LoadControlReportDAO;

/**
 *
 * @author vhidalgo
 */
public class LoadControlReportLogic {

    private LoadControlReportDAO objDAO = new LoadControlReportDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP05015Filter> getSQP05015Filter(SQP05015Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05015Filter(filter);
    }

    public List<SQP05068Filter> getSQP05068Filter(SQP05068Filter filter) throws SQLException, Exception {
        return objDAO.getSQP05068Filter(filter);
    }

}
