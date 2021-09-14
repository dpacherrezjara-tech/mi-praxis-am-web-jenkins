/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.MassiveRefunduatpFormDAO;

/**
 *
 * @author zperez
 */
public class MassiveRefunduatpFormLogic {

    public MassiveRefunduatpFormDAO RefunduatpFormDAO = new MassiveRefunduatpFormDAO();

    public void setSession(IServerSession ss) {
        RefunduatpFormDAO.setSession(ss);
    }
    
    public String subirExcel(ArrayList<A4076Filter> filter) throws SQLException, Exception {
        return RefunduatpFormDAO.subirExcel(filter);
    }

}
