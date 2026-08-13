/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4360Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDARCReasonsFormDAO;

/**
 *
 * @author zperez
 */
public class RFNDARCReasonsFormLogic {

    private RFNDARCReasonsFormDAO objDAO = new RFNDARCReasonsFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4360Filter> SearchRFNDReasaons(A4360Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDReasaons(filter);
    }

    public String insertTKT(A4360Filter filter) throws SQLException, Exception {
        return objDAO.insertTKT(filter);
    }

}
