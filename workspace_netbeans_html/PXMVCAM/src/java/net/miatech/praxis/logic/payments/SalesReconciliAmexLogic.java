/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesReconciliAmexDAO;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;

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

    public List<A4115Filter> loadPX570SQP04269(A4115Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04269(filter);
    }

    public List<A4116Filter> loadPX570SQP04270(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04270(filter);
    }

    public List<A4117Filter> loadPX570SQP04278(A4117Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04278(filter);
    }

    public List<A4118Filter> loadPX570SQP04279(A4118Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04279(filter);
    }

    public List<A4116Filter> loadPX570SQP04275(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04275(filter);
    }

    public List<A4116Filter> loadPX570SQP04328(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04328(filter);
    }

    
    public List<A4116Filter> loadPX570SQP04284(A4116Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadPX570SQP04284(filter);
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return SalesReconciliAmexDAO.loadSQP00697(filter);
    }

    //-----------------------------------------------------------------------------------------
}
