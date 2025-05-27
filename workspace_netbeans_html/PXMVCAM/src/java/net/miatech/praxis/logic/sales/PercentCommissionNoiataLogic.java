/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00796Filter;
import net.miatech.beans.SQP00806Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.PercentCommissionNoiataDAO;

/**
 *
 * @author lmendoza
 */
public class PercentCommissionNoiataLogic {

    private final PercentCommissionNoiataDAO PercentCommissionNoiataDAO = new PercentCommissionNoiataDAO();

    public void setSession(IServerSession ss) {
        PercentCommissionNoiataDAO.setSession(ss);

    }

    public List<SQP00796Filter> getSQP00132Filter(SQP00796Filter filter) throws SQLException, Exception {
        return PercentCommissionNoiataDAO.getSQP00132Filter(filter);
    }

    public String get_PX112S03A1757(String VP_OPTION, String VP_PARAM) throws SQLException, Exception {
        return PercentCommissionNoiataDAO.get_PX112S03A1757(VP_OPTION, VP_PARAM);
    }
     public SQP00806Filter setSQP00651(SQP00806Filter filter) throws SQLException, Exception {
        return PercentCommissionNoiataDAO.setSQP00651(filter);
    }

}
