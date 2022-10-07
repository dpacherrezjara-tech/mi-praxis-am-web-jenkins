/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.elavon;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.elavon.InputLoadDAO;
import net.miatech.praxis.elavon.SQP04650Filter;
import net.miatech.praxis.elavon.SQP04651Filter;
import net.miatech.praxis.elavon.X3147temp;

/**
 *
 * @author Dvicente
 */
public class InputLoadLogic {
    private InputLoadDAO dao = new InputLoadDAO();
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    
    public boolean saveX3147(List<X3147temp> temp)throws SQLException,Exception{
        return dao.setX3147(temp);
    }
    
    public SQP04650Filter getSQP04650 (SQP04650Filter filter)throws SQLException,Exception{
        return dao.getSQP04650Filter(filter);
    }
    
    public List<SQP04651Filter> getSQP04651 (SQP04651Filter filter)throws SQLException,Exception{
        return dao.getSQP04651Filter(filter);
    }
    
    public List<List<Map<String,Object>>> getResultElavon()throws Exception{
        return dao.getResultElavon();
    }
}
