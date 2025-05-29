/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.flown;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.SimplifiedUsageFileDAO;
import net.miatech.praxis.flown.filter.SQP05607Filter;

/**
 *
 * @author vhidalgo
 */
public class SimplifiedUsageFileLogic {

    private final SimplifiedUsageFileDAO objDAO = new SimplifiedUsageFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public List<SQP05607Filter> getSQP05607Filter(SQP05607Filter filter) throws SQLException, Exception {
        return objDAO.getSQP03942Filter(filter);
    }
}
