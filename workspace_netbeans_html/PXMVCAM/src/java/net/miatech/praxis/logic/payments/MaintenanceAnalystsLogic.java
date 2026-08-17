/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A4836Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.MaintenanceAnalystsDAO;

/**
 *
 * @author zperez
 */
public class MaintenanceAnalystsLogic {

    private final MaintenanceAnalystsDAO maintenanceAnalystsDAO = new MaintenanceAnalystsDAO();

    public void setSession(IServerSession ss) {
        maintenanceAnalystsDAO.setSession(ss);
    }

    public List<A4836Filter> SearchMantAuditor(A4836Filter filter) throws SQLException, Exception {
        return maintenanceAnalystsDAO.SearchMantAuditor(filter);
    }
    
    public List<A4836Filter> loadDataAuditor() throws SQLException, Exception {
        return maintenanceAnalystsDAO.loadDataAuditor();
    }
    public String mantenimientoAuditor(A4836Filter filter) throws SQLException, Exception {
        return maintenanceAnalystsDAO.mantenimientoAuditor(filter);
    }
    

}
