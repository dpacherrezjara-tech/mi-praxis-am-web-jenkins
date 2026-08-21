/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.travelbank;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.TransactionFilesDAO;
import net.miatech.praxis.travelbank.SQP04806Filter;
import net.miatech.praxis.travelbank.SQP04807Filter;
import net.miatech.praxis.travelbank.SQP04808Filter;
import net.miatech.praxis.travelbank.SQP04809Filter;
import net.miatech.praxis.travelbank.SQP04810Filter;
import net.miatech.praxis.travelbank.SQP04819Filter;
import net.miatech.praxis.travelbank.SQP04820Filter;
import net.miatech.praxis.travelbank.SQP04821Filter;
import net.miatech.praxis.travelbank.SQP04822Filter;
import net.miatech.praxis.travelbank.SQP04823Filter;
import net.miatech.praxis.travelbank.SQP04824Filter;
import net.miatech.praxis.travelbank.SQP04970Filter;

/**
 *
 * @author vhidalgo
 */
public class TransactionFilesLogic {

    private TransactionFilesDAO objDAO = new TransactionFilesDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    // <editor-fold defaultstate="collapsed" desc="ISSUES">
    public List<SQP04806Filter> getSQP04806Filter(SQP04806Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04806Filter(filter);
    }

    public List<SQP04807Filter> getSQP04807Filter(SQP04807Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04807Filter(filter);
    }

    public List<SQP04970Filter> getSQP04970Filter(SQP04970Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04970Filter(filter);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="USED">
    public List<SQP04808Filter> getSQP04808Filter(SQP04808Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04808Filter(filter);
    }

    public List<SQP04809Filter> getSQP04809Filter(SQP04809Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04809Filter(filter);
    }

    public List<SQP04810Filter> getSQP04810Filter(SQP04810Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04810Filter(filter);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="EXPIRE">
    public List<SQP04819Filter> getSQP04819Filter(SQP04819Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04819Filter(filter);
    }

    public List<SQP04820Filter> getSQP04820Filter(SQP04820Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04820Filter(filter);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LOSSES">
    public List<SQP04821Filter> getSQP04821Filter(SQP04821Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04821Filter(filter);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="MERGE">
    public List<SQP04822Filter> getSQP04822Filter(SQP04822Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04822Filter(filter);
    }

    public List<SQP04823Filter> getSQP04823Filter(SQP04823Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04823Filter(filter);
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LIABILITY">

    public List<SQP04824Filter> getSQP04824Filter(SQP04824Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04824Filter(filter);
    }

    // </editor-fold>
}
