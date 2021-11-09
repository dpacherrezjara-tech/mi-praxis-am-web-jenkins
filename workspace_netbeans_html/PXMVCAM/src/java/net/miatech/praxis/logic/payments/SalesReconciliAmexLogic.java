/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesReconciliAmexDAO;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A4113Filter;

/**
 *
 * @author lmendoza
 */
public class SalesReconciliAmexLogic {

    private final SalesReconciliAmexDAO SalesReconciliAmexDAO = new SalesReconciliAmexDAO();

    public void setSession(IServerSession ss) {
        SalesReconciliAmexDAO.setSession(ss);
    }
    
    
    public List<A4113Filter> loadPX570SQP04257(A4113Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04257(filter);
   }
    
    
    
    //-----------------------------------------------------------------------------------------
    

}
