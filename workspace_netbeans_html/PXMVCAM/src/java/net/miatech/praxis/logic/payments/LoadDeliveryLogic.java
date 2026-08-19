/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadDeliveryDAO;
import net.miatech.praxis.payment.filter.SQP04717Filter;
import net.miatech.praxis.payment.filter.SQP04718Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Dvicente
 */
@Component
public class LoadDeliveryLogic {
    
    //<editor-fold defaultstate="collapsed" desc="dependencias">
    @Autowired
    private LoadDeliveryDAO dao;
    //</editor-fold>
    
    public void setSession(IServerSession ss){
        dao.setSession(ss);
    }
    
    public List<SQP04717Filter> getSQP04717Filter(SQP04717Filter filter) throws Exception{
        return dao.getSQP04717Filter(filter);
    }
    
    public List<SQP04718Filter> getSQP04718Filter(SQP04718Filter filter) throws Exception{
        return dao.getSQP04718Filter(filter);
    }
    
}
