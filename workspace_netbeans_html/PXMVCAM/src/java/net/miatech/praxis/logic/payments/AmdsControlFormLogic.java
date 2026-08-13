/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.AmdsControlFormDAO;
import net.miatech.praxis.payment.filter.A4497Filter;

/**
 *
 * @author zperez
 */
public class AmdsControlFormLogic {

    private AmdsControlFormDAO objDAO = new AmdsControlFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4497Filter> SearchReport(A4497Filter filter) throws SQLException, Exception {
        return objDAO.SearchReport(filter);
    }
    public String VeriUpadaStatus(ArrayList<A4497Filter> filter) throws SQLException, Exception {
        return objDAO.VeriUpadaStatus(filter);
    }
}
