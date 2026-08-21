/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.salesAudit;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A4360Filter;
import net.miatech.beans.SaleAudit.A4361Filter;
import net.miatech.beans.SaleAudit.A4363Filter;
import net.miatech.beans.SaleAudit.A4367Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.salesAudit.RFNDAssociatedARCRFNDFormDAO;

/**
 *
 * @author zperez
 */
public class RFNDAssociatedARCRFNDFormLogic {

    private RFNDAssociatedARCRFNDFormDAO objDAO = new RFNDAssociatedARCRFNDFormDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A4361Filter> SearchRfndCabece(A4361Filter filter) throws SQLException, Exception {
        return objDAO.SearchRfndCabece(filter);
    }

    public List<A4363Filter> searchDetail(A4363Filter filter) throws SQLException, Exception {
        return objDAO.searchDetail(filter);
    }

    public A4361Filter SearchRFNDetailTCKT(A4361Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDetailTCKT(filter);
    }

    public String ProcesaDeleteManual(A4363Filter filter) throws SQLException, Exception {
        return objDAO.ProcesaDeleteManual(filter);
    }

    public List<A4360Filter> SearchRFNDRazon(A4360Filter filter) throws SQLException, Exception {
        return objDAO.SearchRFNDRazon(filter);
    }

    public String ProcesaManualRFNDARCTCKT(A4363Filter filter, String lstaTaxes, String lstarazones, String fop) throws SQLException, Exception {
        return objDAO.ProcesaManualRFNDARCTCKT(filter, lstaTaxes, lstarazones, fop);
    }

    public A4367Filter ProcesaUpdateUsosCPN(A4367Filter filter) throws SQLException, Exception {
        return objDAO.ProcesaUpdateUsosCPN(filter);
    }

}
