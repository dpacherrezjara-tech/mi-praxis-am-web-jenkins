/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.eecta;

import java.sql.SQLException;
import java.util.List;
import net.miatech.praxis.eecta.A4264Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.eecta.UATPSalesDAO;
import net.miatech.praxis.eecta.SQP04627Filter;

/**
 *
 * @author Dvicente
 */
public class UATPSalesLogic {
    
    private UATPSalesDAO dao =  new UATPSalesDAO();
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    
    public SQP04627Filter setSQP04627Filter() throws SQLException,Exception{
        return dao.setSQP04627Filter();
    }
    
    public List<A4264Filter> getSQP04628Filter(A4264Filter filter)throws SQLException,Exception{
        return dao.getSQP0A4628Filter(filter);
    }
    
    public boolean saveX3155(List<String> lines)throws SQLException,Exception{
        return dao.setX3155(lines);
    }
}
