package net.miatech.praxis.logic.flown;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.EMDStandaloneDAO;
import net.miatech.beans.A1817Filter;
import net.miatech.praxis.flown.A1817;

public class EMDStandaloneLogic {

    private final EMDStandaloneDAO EMDStandaloneDAO = new EMDStandaloneDAO();

    public void setSession(IServerSession ss) {
        EMDStandaloneDAO.setSession(ss);
    }

    public List<A1817Filter> loadPX529SQP04931(A1817Filter filter) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP04931(filter);
    }
    
    public List<A1817Filter> loadPX529SQP04934(A1817Filter filter) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP04934(filter);
    }   
    
    public List<A1817Filter> loadPX529SQP05094(A1817Filter filter) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP05094(filter);
    }   
    
    public List<A1817Filter> loadPX529SQP05095(A1817Filter filter) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP05095(filter);
    }   
            
    public List<A1817Filter> loadPX529SQP04924(A1817Filter filter) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP04924(filter);
    }
    
    public String loadPX529SQP04925(A1817Filter filter, String option) throws SQLException, Exception {
        return EMDStandaloneDAO.loadPX529SQP04925(filter, option);
    }
}
