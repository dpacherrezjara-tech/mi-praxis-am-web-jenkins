package net.miatech.praxis.logic.payments;

import net.miatech.praxis.logic.interline.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.payment.filter.A2358Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ReasonCodeReportDAO;
import net.miatech.praxis.dao.payments.BanksCatalogDAO;
import net.miatech.praxis.dao.payments.InputsCatalogDAO;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.A2359;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;

public class InputsCatalogLogic {

    private final InputsCatalogDAO InputsCatalogDAO = new InputsCatalogDAO();

    public void setSession(IServerSession ss) {
        InputsCatalogDAO.setSession(ss);
    }

   public List<A2358Filter> loadPX602SQP04601(A2358Filter filter) throws SQLException, Exception {
        return InputsCatalogDAO.loadPX602SQP04601(filter);
    }
}
