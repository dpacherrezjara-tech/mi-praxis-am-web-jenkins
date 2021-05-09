/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.ControlUATPDAO;

/**
 *
 * @author vhidalgo
 */
public class ControlUATPLogic {
    private ControlUATPDAO objDAO = new ControlUATPDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    /*
      public List<SQP01558Filter> getSQP01558Filter(SQP01558Filter filter) throws SQLException, Exception {
        return objDAO.getSQP01558Filter(filter);
    }
    */
}
