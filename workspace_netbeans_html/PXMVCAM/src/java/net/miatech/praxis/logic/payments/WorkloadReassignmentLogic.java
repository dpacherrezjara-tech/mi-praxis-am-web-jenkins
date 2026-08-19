/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A4836Filter;
import net.miatech.beans.SQP05739Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.WorkloadReassignmentDAO;

/**
 *
 * @author zperez
 */
public class WorkloadReassignmentLogic {

    private WorkloadReassignmentDAO loadReassignmentDAO = new WorkloadReassignmentDAO();

    public void setSession(IServerSession ss) {
        loadReassignmentDAO.setSession(ss);
    }

    public List<SQP05739Filter> SearchGroupTaskAssignment(SQP05739Filter filter) throws SQLException, Exception {
        return loadReassignmentDAO.SearchGroupTaskAssignment(filter);
    }
    public List<SQP05739Filter> SearchTaskAssignmentDetail(SQP05739Filter filter) throws SQLException, Exception {
        return loadReassignmentDAO.SearchTaskAssignmentDetail(filter);
    }
    public String insertAuditor(ArrayList<SQP05739Filter> filter, String Auditor) throws SQLException, Exception {
        return loadReassignmentDAO.insertAuditor(filter, Auditor);
    }
    public List<A4836Filter> ListAuditorProcesa(A4836Filter filter) throws SQLException, Exception {
        return loadReassignmentDAO.ListAuditorProcesa(filter);
    }
    public String ProcesaAsignacion(A4836Filter filter,String asigna) throws SQLException, Exception {
        return loadReassignmentDAO.ProcesaAsignacion(filter, asigna);
    }
    
}
