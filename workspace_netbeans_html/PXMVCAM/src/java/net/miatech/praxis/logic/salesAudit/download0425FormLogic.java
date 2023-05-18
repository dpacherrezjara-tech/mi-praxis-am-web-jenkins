/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00977Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.download0425FormDAO;

/**
 *
 * @author zperez
 */
public class download0425FormLogic {

    private download0425FormDAO A0425FormDAO = new download0425FormDAO();

    public void setSession(IServerSession ss) {
        A0425FormDAO.setSession(ss);
    }

    public List<SQP00977Filter> Search(SQP00977Filter filter) throws SQLException, Exception {
        return A0425FormDAO.Search(filter);
    }

    public String ProcesarTKTATOS(SQP00977Filter filter) throws SQLException, Exception {
        return A0425FormDAO.ProcesarTKTATOS(filter);
    }
}
