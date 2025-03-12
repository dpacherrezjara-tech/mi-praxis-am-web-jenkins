/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.travelbank;

import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.travelbank.DeliveryFilesDAO;
import net.miatech.praxis.travelbank.SQP04836Filter;
import net.miatech.praxis.travelbank.SQP04837Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
public class DeliveryFilesLogic {
    //<editor-fold defaultstate="collapsed" desc="variables">
    @Autowired
    private DeliveryFilesDAO dao ;
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    //</editor-fold>
    
    public List<SQP04836Filter> getSQP04836Filter(SQP04836Filter filter)throws Exception{
        return dao.getSQP04836Filter(filter);
    }
    
    public List<SQP04837Filter> getSQP04837Filter(SQP04837Filter filter)throws Exception{
        return dao.getSQP04837Filter(filter);
    }
}
