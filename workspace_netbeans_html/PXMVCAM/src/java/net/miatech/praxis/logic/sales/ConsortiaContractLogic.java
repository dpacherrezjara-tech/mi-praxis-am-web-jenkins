/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00790Filter;
import net.miatech.beans.SQP00791Filter;
import net.miatech.beans.SQP00792Filter;
import net.miatech.beans.SQP00793Filter;
import net.miatech.beans.SQP00794Filter;
import net.miatech.beans.SQP00795Filter;
import net.miatech.beans.SQP04561Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.sales.ConsortiaContractDAO;

/**
 *
 * @author lmendoza
 */
public class ConsortiaContractLogic {

    private final ConsortiaContractDAO ConsortiaContractDAO = new ConsortiaContractDAO();

    public void setSession(IServerSession ss) {
        ConsortiaContractDAO.setSession(ss);

    }

    public List<SQP00790Filter> loadPX117A1728(SQP00790Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadPX117A1728(filter);
    }

    public List<SQP00792Filter> loadPX117A1729(SQP00792Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadPX117A1729(filter);
    }

    public List<SQP00794Filter> loadPX117S04A1728(SQP00794Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadPX117S04A1728(filter);
    }

    public SQP00794Filter loadDataEnvioMail(SQP00794Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadDataEnvioMail(filter);
    }

    public SQP00795Filter loadPX117S03A1728(SQP00795Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadPX117S03A1728(filter);
    }

    public SQP00791Filter setPX117S01A1728(SQP00791Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.setPX117S01A1728(filter);
    }

    public SQP00793Filter setPX117S2A1728(SQP00793Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.setPX117S2A1728(filter);
    }
    
    public List<SQP00792Filter> downLoadDetalleCTIA(SQP00792Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.downLoadDetalleCTIA(filter);
    }
    
    public List<SQP04561Filter> loadSQP04561(SQP04561Filter filter) throws SQLException, Exception {
        return ConsortiaContractDAO.loadSQP04561(filter);
    }
    
}
