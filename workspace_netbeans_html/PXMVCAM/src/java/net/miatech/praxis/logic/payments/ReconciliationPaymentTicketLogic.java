package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationPaymentTicketDAO;
import net.miatech.praxis.payment.filter.A4337Filter;
import net.miatech.praxis.payment.old.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ReconciliationPaymentTicketLogic {

    private ReconciliationPaymentTicketDAO ReconciliationPaymentTicket = new ReconciliationPaymentTicketDAO();

    public void setSession(IServerSession ss) {
        ReconciliationPaymentTicket.setSession(ss);
    }

    public List<A4337Filter> loadPX621SQP04850(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04850(filter);
    }

    public List<A4337Filter> loadPX621SQP04830(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04830(filter);
    }

    public List<A2370Filter> loadPX621SQP00899(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00899(filter);
    }

    public HashMap<String, List<A4337Filter>> loadPX621SQP04859(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04859(filter);
    }

    public HashMap<String, List<A4337Filter>> loadPX621SQP04864(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04864(filter);
    }

    public HashMap<String, List<A4337Filter>> loadPX621SQP04865(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04865(filter);
    }

    public List<A4337Filter> loadPX621SQP04852(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04852(filter);
    }

    public List<A4337Filter> loadPX621SQP04831(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04831(filter);
    }

    public List<A4337Filter> loadPX621SQP04856(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04856(filter);
    }

    public List<A4337Filter> loadPX621SQP04832(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04832(filter);
    }

    public List<A4337Filter> loadPX621SQP04857(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04857(filter);
    }

    public List<A4337Filter> loadPX621SQP04858(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04858(filter);
    }

    public List<A4337Filter> loadPX621SQP00900(A2370Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00900(filter);
    }

    public List<A4337Filter> loadPX621SQP00901(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00901(filter);
    }

    public A4337Filter loadPX621SQP04860(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04860(filter);
    }

    public List<A4337Filter> loadPX621SQP04863(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04863(filter);
    }

    public List<A4337Filter> loadPX621SQP04851(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04851(filter);
    }

    public List<A4337Filter> loadPX621SQP04861(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04861(filter);
    }

    public List<A4337Filter> loadPX621SQP04853(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04853(filter);
    }

    public List<A4337Filter> loadPX621SQP04854(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04854(filter);
    }

    public List<A4337Filter> loadPX621SQP04862(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04862(filter);
    }

    public HashMap<String, List<A4337Filter>> loadPX621SQP04855(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04855(filter);
    }

    public List<A4337Filter> loadPX621SQP04829(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04829(filter);
    }

    public String loadPX621SQP04833(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04833(filter);
    }
    
    public String loadPX621SQP04834(A4337Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04834(filter);
    }
}
