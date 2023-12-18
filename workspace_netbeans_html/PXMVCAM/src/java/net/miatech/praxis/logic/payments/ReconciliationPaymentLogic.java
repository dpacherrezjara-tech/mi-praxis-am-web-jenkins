/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationPaymentDAO;
import net.miatech.praxis.payment.old.A4113Filter;
import net.miatech.praxis.payment.old.A4114Filter;
import net.miatech.praxis.payment.old.A4115Filter;
import net.miatech.praxis.payment.old.A4331OFilter;
import net.miatech.praxis.payment.old.A4117Filter;
import net.miatech.praxis.payment.old.A4118Filter;
import net.miatech.praxis.payment.filter.SQP04847Filter;
import net.miatech.praxis.payment.filter.SQP05004Filter;
import net.miatech.praxis.payment.filter.SQP05048Filter;
import net.miatech.praxis.payment.old.SQP05048OLDFilter;
import net.miatech.praxis.payment.filter.SQP05052Filter;
import net.miatech.praxis.payment.filter.SQP05054Filter;
import net.miatech.praxis.payment.filter.SQP05055Filter;
import net.miatech.praxis.payment.filter.SQP05056Filter;
import net.miatech.praxis.payment.filter.SQP05057Filter;

/**
 *
 * @author lmendoza
 */
public class ReconciliationPaymentLogic {

    private final ReconciliationPaymentDAO ReconciliationPaymentDAO = new ReconciliationPaymentDAO();

    public void setSession(IServerSession ss) throws Exception {
        ReconciliationPaymentDAO.setSession(ss);
    }

    public List<A4113Filter> loadPX606SQP04692(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04692(filter);
    }

    public List<A4113Filter> loadPX606SQP04693(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04693(filter);
    }

    public List<A4113Filter> loadPX606SQP04329(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04329(filter);
    }

    public List<A4113Filter> loadPX606SQP04330(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04330(filter);
    }

    public List<A4115Filter> loadPX606SQP04269(A4115Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04269(filter);
    }

    public List<A4331OFilter> loadPX606SQP04270(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04270(filter);
    }

    public List<A4331OFilter> loadPX606SQP04471(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04471(filter);
    }

    public List<A4117Filter> loadPX606SQP04278(A4117Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04278(filter);
    }

    public List<A4118Filter> loadPX606SQP04279(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04279(filter);
    }

    public List<A4118Filter> loadPX606SQP04376(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04376(filter);
    }

    public List<A4331OFilter> loadPX606SQP04695(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04695(filter);
    }

    public List<A4114Filter> loadPX606SQP04571(A4113Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04571(filter);
    }

    public List<A4331OFilter> loadPX606SQP04694(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04694(filter);
    }

    public List<A4331OFilter> loadPX606SQP04721(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04721(filter);
    }

    public List<A4331OFilter> loadPX606SQP04698(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04698(filter);
    }
    
    public List<A4331OFilter> loadPX606SQP04619(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04619(filter);
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadSQP00697(filter);
    }

    public List<A4331OFilter> loadPX606SQP04697(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04697(filter);
    }

    public List<A4331OFilter> loadPX606SQP04696(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04696(filter);
    }

    public A4331OFilter loadPX606SQP04720(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04720(filter);
    }

    public A4118Filter loadPX606SQP04466(A4118Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04466(filter);
    }

    public String loadPX606SQP04360(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04360(filter);
    }

    public String loadPX606SQP04723(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04723(filter);
    }
    
    public String loadPX606SQP04846(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04846(filter);
    }
    
    public String loadPX606SQP04960(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04960(filter);
    }
    
    public String loadPX606SQP04848(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04848(filter);
    }
    
    public String loadPX606SQP04849(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04849(filter);
    }

    public List<A4331OFilter> loadPX606SQP04420(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04420(filter);
    }

    public List<A4331OFilter> loadPX606SQP04414(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04414(filter);
    }

    public List<A4331OFilter> loadPX606SQP04465(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04465(filter);
    }

    public List<A4331OFilter> loadPX606SQP04569(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04569(filter);
    }
    
    public List<A4331OFilter> loadPX606SQP04617(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04617(filter);
    }

    public List<A4331OFilter> loadPX606SQP04570(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04570(filter);
    }

    public List<A4331OFilter> loadPX606SQP04722(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04722(filter);
    }

    public List<A4331OFilter> loadPX606SQP04754(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04754(filter);
    }

    public List<A4331OFilter> loadPX606SQP04828(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04828(filter);
    }

    public List<A4331OFilter> loadPX606SQP04470(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04470(filter);
    }
    
    public List<A4331OFilter> loadPX606SQP04959(A4331OFilter filter) throws SQLException, Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04959(filter);
    }
    //-----------------------------------------------------------------------------------------
    
    public SQP05004Filter loadSQP05004Filter(SQP05004Filter filter){
        return ReconciliationPaymentDAO.loadSQP05004Filter(filter);
    }
    
    public SQP05048OLDFilter loadSQP05048Filter(SQP05048OLDFilter filter)throws Exception{
        return ReconciliationPaymentDAO.loadSQP05048Filter(filter);
    }
    
    public SQP04847Filter loadPX606SQP04847(SQP04847Filter filter) throws Exception {
        return ReconciliationPaymentDAO.loadPX606SQP04847(filter);
    }
    
    public SQP05052Filter loadSQP05052Filter(SQP05052Filter filter)throws Exception{
        return ReconciliationPaymentDAO.loadSQP05052Filter(filter);
    }
    
    public SQP05054Filter loadSQP05054Filter(SQP05054Filter filter)throws Exception{
        return ReconciliationPaymentDAO.loadSQP05054Filter(filter);
    }
    
    public SQP05055Filter loadSQP05055Filter(SQP05055Filter filter)throws Exception{
        return ReconciliationPaymentDAO.loadSQP05055Filter(filter);
    }
    
    public SQP05056Filter loadSQP05056Filter(SQP05056Filter filter)throws Exception{
        return ReconciliationPaymentDAO.loadSQP05056Filter(filter);
    }

    public SQP05057Filter loadSQP05057Filter(SQP05057Filter filter) {
        return ReconciliationPaymentDAO.SQP05057Filter(filter);
    }
}
