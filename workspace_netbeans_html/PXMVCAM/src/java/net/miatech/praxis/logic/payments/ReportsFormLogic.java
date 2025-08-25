/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4803Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReportsFormDAO;

/**
 *
 * @author zperez
 */
public class ReportsFormLogic {
     public ReportsFormDAO reportsFormDAO = new ReportsFormDAO();

    public void setSession(IServerSession ss) {
        reportsFormDAO.setSession(ss);
    }
    
    
    public String generateReport(A4803Filter filter,String json ) throws SQLException, Exception {
        return reportsFormDAO.generateReport(filter,json);
    }
    
    public List<A4803Filter> SearchQueryReports(A4803Filter filter) throws SQLException, Exception {
        return reportsFormDAO.SearchQueryReports(filter);
    }

    
}
