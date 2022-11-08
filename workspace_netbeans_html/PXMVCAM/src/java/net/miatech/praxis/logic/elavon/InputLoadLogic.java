/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.elavon;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.elavon.InputLoadDAO;
import net.miatech.praxis.elavon.ElavonExcelFile;
import net.miatech.praxis.elavon.SQP04650Filter;
import net.miatech.praxis.elavon.SQP04651Filter;
import net.miatech.praxis.elavon.SQP04674Filter;
import net.miatech.praxis.elavon.X3147temp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
public class InputLoadLogic {
    
     // <editor-fold defaultstate="collapsed" desc="Dependencias">
    @Autowired
    private InputLoadDAO dao;
     // </editor-fold>
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    
    public boolean getProcessRunning()throws Exception{
        return dao.getRunningProcess();
    }
    
    public boolean saveX3147(List<X3147temp> temp)throws SQLException,Exception{
        return dao.setX3147(temp);
    }
    
    public SQP04650Filter getSQP04650 (SQP04650Filter filter)throws SQLException,Exception{
        return dao.getSQP04650Filter(filter);
    }
    
    public SQP04674Filter getSQP04674 (SQP04674Filter filter)throws SQLException,Exception{
        return dao.getSQP04674Filter(filter);
    }
    
    public void getSQP04674async (SQP04674Filter filter)throws SQLException,Exception,InterruptedException{
        dao.getSQP04674FilterAsync(filter);
    }
    
    public List<SQP04651Filter> getSQP04651 (SQP04651Filter filter)throws SQLException,Exception{
        return dao.getSQP04651Filter(filter);
    }
    
    public List<ElavonExcelFile> getResultElavon(String idFile)throws Exception{
        return dao.getResultElavon(idFile);
    }
}
