/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.TaskARCAssignmentFormDAO;

/**
 *
 * @author zpp
 */
public class TaskARCAssignmentFormLogic {

    private TaskARCAssignmentFormDAO BwrTaskAssig = new TaskARCAssignmentFormDAO();

    public void setSession(IServerSession ss) {
        BwrTaskAssig.setSession(ss);
    }

    public List<A4361Filter> SearchTaskAssignment(A4361Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchTaskAssignment(filter);
    }

    public List<A4361Filter> SearchTaskAssignmentDetail(A4361Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchTaskAssignmentDetail(filter);
    }

    public String insertAuditor(ArrayList<A4361Filter> filter, String Auditor) throws SQLException, Exception {
        return BwrTaskAssig.insertAuditor(filter, Auditor);
    }

    public List<A4361Filter> SearchGroupTaskAssignment(A4361Filter filter) throws SQLException, Exception {
        return BwrTaskAssig.SearchGroupTaskAssignment(filter);
    }
    public List<A4361Filter> loadDataInit() throws SQLException, Exception {
        return BwrTaskAssig.loadDataInit();
    }

}
