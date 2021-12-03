/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.CargaRecibosDAO;
import net.miatech.praxis.eecta.SQP04195Filter;
import net.miatech.praxis.eecta.SQP04196Filter;
import net.miatech.praxis.eecta.SQP04197Filter;
import net.miatech.praxis.eecta.SQP04211Filter;
import net.miatech.praxis.eecta.SQP04217Filter;
import net.miatech.praxis.eecta.SQP04218Filter;
import net.miatech.praxis.eecta.SQP04219Filter;
import net.miatech.praxis.eecta.SQP04253Filter;
import net.miatech.praxis.eecta.SQP04254Filter;
import net.miatech.praxis.eecta.SQP04255Filter;
import net.miatech.praxis.eecta.SQP04259Filter;
import net.miatech.praxis.eecta.SQP04260Filter;

/**
 *
 * @author vhidalgo
 */
public class CargaRecibosLogic {

    private CargaRecibosDAO objDAO = new CargaRecibosDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SQP04217Filter> getSQP04217Filter(SQP04217Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04217Filter(filter);
    }

    public List<SQP04211Filter> getSQP04211Filter(SQP04211Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04211Filter(filter);
    }

    public List<SQP04196Filter> getSQP04196Filter(SQP04196Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04196Filter(filter);
    }

    public SQP04195Filter setSQP04195Filter(SQP04195Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04195Filter(filter);
    }

    public SQP04197Filter setSQP04197Filter(SQP04197Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04197Filter(filter);
    }

    public List<SQP04218Filter> getSQP04218Filter(SQP04218Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04218Filter(filter);
    }

    public List<SQP04219Filter> getSQP04219Filter(SQP04219Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04219Filter(filter);
    }

    public SQP04253Filter setSQP04253Filter(SQP04253Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04253Filter(filter);
    }

    public List<SQP04254Filter> getSQP04254Filter(SQP04254Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04254Filter(filter);
    }

    public List<SQP04255Filter> getSQP04255Filter(SQP04255Filter filter) throws SQLException, Exception {
        return objDAO.getSQP04255Filter(filter);
    }
     public SQP04259Filter setSQP04259Filter(SQP04259Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04259Filter(filter);
    }
      public SQP04260Filter setSQP04260Filter(SQP04260Filter filter) throws SQLException, Exception {
        return objDAO.setSQP04260Filter(filter);
    }
     
    
}
