/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4359Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RfndarcUserMaintenanceFormDAO;

/**
 *
 * @author zperez
 */
public class RfndarcUserMaintenanceFormLogic {

    private RfndarcUserMaintenanceFormDAO objDAO = new RfndarcUserMaintenanceFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4359Filter> SearchRefundUser(A4359Filter filter) throws SQLException, Exception {
        return objDAO.SearchRefundUser(filter);
    }

    public String insertTKT(A4359Filter filter) throws SQLException, Exception {
        return objDAO.insertTKT(filter);
    }
    
    public List<A4359Filter> loadDataInit() throws SQLException, Exception {
        return objDAO.loadDataInit();
    }

}
