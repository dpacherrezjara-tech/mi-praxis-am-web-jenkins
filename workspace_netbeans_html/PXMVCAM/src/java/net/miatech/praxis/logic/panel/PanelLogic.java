/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.panel;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.SQP05855Filter;
import net.miatech.beans.SQP05856Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.SQP05762Filter;
import net.miatech.beans.SQP05763Filter;
import net.miatech.beans.SQP05764Filter;
import net.miatech.beans.SQP05765Filter;
import net.miatech.beans.SQP05852Filter;
import net.miatech.beans.SQP05798Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.panel.PanelDAO;

/**
 *
 * @author lzambrano
 */
public class PanelLogic {
    private PanelDAO panelDAO = new PanelDAO();
    public void setSession(IServerSession ss) {                
        panelDAO.setSession(ss);
    }
    
    public List <PX041S01INF001Filter>  loadPX041S01INF001( PX041S01INF001Filter filter) throws SQLException , Exception{
        return panelDAO.loadPX038S01A1698(filter);
    }
    
    public List <SQP05762Filter>  loadSQP05762( SQP05762Filter filter) throws SQLException , Exception{
        return panelDAO.loadSQP05762(filter);
    }
    
    public List <SQP05852Filter>  loadSQP05852( SQP05852Filter filter) throws SQLException , Exception{
        return panelDAO.loadSQP05852(filter);
    }
    
    public List <SQP05798Filter>  loadSQP05798( SQP05798Filter filter) throws SQLException , Exception{
        return panelDAO.loadSQP05798(filter);
    }
    
    public List <SQP05855Filter>  loadSQP05855( SQP05855Filter filter) throws SQLException , Exception{
        return panelDAO.loadSQP05855(filter);
    }
     
    public PX076S01INF053Filter setPX076S01INF053(PX076S01INF053Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setPX076S01INF053(filter);
    }
    
    public SQP05763Filter setSQP05763(SQP05763Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05763(filter);
    }
    
    public List <SQP05764Filter> loadSQP05764(SQP05764Filter filter ) throws SQLException , Exception{ 
        return panelDAO.loadSQP05764(filter);
    }
    
    public SQP05765Filter setSQP05765(SQP05765Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05765(filter);
    }
    
    public SQP05851Filter setSQP05851(SQP05851Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05851(filter);
    }
    
    public PX076S01INF053Filter setSQP05412(PX076S01INF053Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05412(filter);
    }
    
    public SQP05856Filter setSQP05856(SQP05856Filter filter ) throws SQLException , Exception{ 
        return panelDAO.setSQP05856(filter);
    }
     
}
