/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.IMF072Filter;
import net.miatech.beans.IMF140Filter;
import net.miatech.beans.IMF141Filter;
import net.miatech.beans.spring.implement.IServerSession;

import net.miatech.praxis.dao.flown.ForecastDAO;

public class ForecastLogic {

    private final ForecastDAO ForecastDAO = new ForecastDAO();

    public void setSession(IServerSession ss) {
        ForecastDAO.setSession(ss);
    }

    public List<IMF140Filter> loadPX551SQP04119(IMF140Filter filter) throws SQLException, Exception {
        return ForecastDAO.loadPX551SQP04119(filter);
    }
    
     
}
