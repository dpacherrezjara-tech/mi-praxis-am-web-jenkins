/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1744Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.PassengerConciliationDAO;
import net.miatech.praxis.dao.flown.ZoneAverageRatesDAO;

/**
 *
 * @author lmendoza
 */
public class ZoneAverageRatesLogic {

    private final ZoneAverageRatesDAO revenueZoneDAO = new ZoneAverageRatesDAO();

    public void setSession(IServerSession ss) {
        revenueZoneDAO.setSession(ss);
    }

    public List<A1692Filter> loadSQP03848(A1692Filter filter) throws SQLException, Exception {
        return revenueZoneDAO.loadSQP03848(filter);
    }

    public List<A1692Filter> loadSQP03849(A1692Filter filter) throws SQLException, Exception {
        return revenueZoneDAO.loadSQP03849(filter);
    }

    public List<A1692Filter> loadSQP04258(A1692Filter filter) throws SQLException, Exception {
        return revenueZoneDAO.loadSQP04258(filter);
    }

}
