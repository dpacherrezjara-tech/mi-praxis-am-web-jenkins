package net.miatech.praxis.logic.flown;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.ReportNrtmexDAO;
import net.miatech.beans.A1817Filter;
import net.miatech.praxis.flown.A1817;

public class ReportNrtmexLogic {

    private final ReportNrtmexDAO ReportNrtmexDAO = new ReportNrtmexDAO();

    public void setSession(IServerSession ss) {
        ReportNrtmexDAO.setSession(ss);
    }

    public List<A1817Filter> loadPX529SQP04935(A1817Filter filter) throws SQLException, Exception {
        return ReportNrtmexDAO.loadPX529SQP04935(filter);
    }
    
    public List<A1817Filter> loadPX529SQP04932(A1817Filter filter) throws SQLException, Exception {
        return ReportNrtmexDAO.loadPX529SQP04932(filter);
    }
    
}
