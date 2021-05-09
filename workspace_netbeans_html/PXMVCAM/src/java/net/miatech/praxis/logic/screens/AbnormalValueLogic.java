/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.logic.screens;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.IMF111Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.screens.AbnormalValueDAO;

/**
 *
 * @author jtorres
 */
public class AbnormalValueLogic {
    
    private AbnormalValueDAO AbnormalValueDAO = new AbnormalValueDAO();
    
    public AbnormalValueLogic() {
    }
    
    public AbnormalValueLogic(IServerSession ss) {
        AbnormalValueDAO.setSession(ss);
    }
    
    public void setSession(IServerSession ss) {
        AbnormalValueDAO.setSession(ss);
    }

    // =========================================================================
    // =============================== SALES ===================================
    // =========================================================================
    public List<IMF111Filter> loadPX414SQP02393(IMF111Filter filter) throws SQLException, Exception {
        return AbnormalValueDAO.loadPX414SQP02393(filter);
    }
    
    public List<IMF111Filter> loadPX414SQP02394(IMF111Filter filter) throws SQLException, Exception {
        return AbnormalValueDAO.loadPX414SQP02394(filter);
    }
    
    public List<IMF111Filter> loadPX414SQP02395(IMF111Filter filter) throws SQLException, Exception {
        return AbnormalValueDAO.loadPX414SQP02395(filter);
    }
    
}
