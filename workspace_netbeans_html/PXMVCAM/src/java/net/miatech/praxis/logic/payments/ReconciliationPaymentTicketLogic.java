package net.miatech.praxis.logic.payments;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.ReconciliationPaymentTicketDAO;
import net.miatech.praxis.payment.filter.A4164Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

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

    public List<A4164Filter> loadPX621SQP04338(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04338(filter);
    }

    public List<A4164Filter> loadPX621SQP04730(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04730(filter);
    }

    public List<A2370Filter> loadPX621SQP00899(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00899(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX621SQP04347(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04347(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX621SQP04352(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04352(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX621SQP04353(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04353(filter);
    }

    public List<A4164Filter> loadPX621SQP04340(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04340(filter);
    }

    public List<A4164Filter> loadPX621SQP04731(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04731(filter);
    }

    public List<A4164Filter> loadPX621SQP04344(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04344(filter);
    }

    public List<A4164Filter> loadPX621SQP04732(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04732(filter);
    }

    public List<A4164Filter> loadPX621SQP04345(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04345(filter);
    }

    public List<A4164Filter> loadPX621SQP04346(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04346(filter);
    }

    public List<A4164Filter> loadPX621SQP00900(A2370Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00900(filter);
    }

    public List<A4164Filter> loadPX621SQP00901(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP00901(filter);
    }

    public A4164Filter loadPX621SQP04348(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04348(filter);
    }

    public List<A4164Filter> loadPX621SQP04351(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04351(filter);
    }

    public List<A4164Filter> loadPX621SQP04339(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04339(filter);
    }

    public List<A4164Filter> loadPX621SQP04349(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04349(filter);
    }

    public List<A4164Filter> loadPX621SQP04341(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04341(filter);
    }

    public List<A4164Filter> loadPX621SQP04342(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04342(filter);
    }

    public List<A4164Filter> loadPX621SQP04350(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04350(filter);
    }

    public HashMap<String, List<A4164Filter>> loadPX621SQP04343(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04343(filter);
    }

    public List<A4164Filter> loadPX621SQP04604(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04604(filter);
    }

    public String loadPX621SQP04752(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04752(filter);
    }
    
    public String loadPX621SQP04755(A4164Filter filter) throws SQLException, Exception {
        return ReconciliationPaymentTicket.loadPX621SQP04755(filter);
    }
}
