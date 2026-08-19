/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4359Filter;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDQueryRefundFormDAO;

/**
 *
 * @author zperez
 */
public class RFNDQueryRefundFormLogic {

    private RFNDQueryRefundFormDAO objDAO = new RFNDQueryRefundFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4361Filter> SearchRfndCabece(A4361Filter filter) throws SQLException, Exception {
        return objDAO.SearchRfndCabece(filter);
    }
    public List<A4359Filter> Searchauditor() throws SQLException, Exception {
        return objDAO.Searchauditor();
    }

}
