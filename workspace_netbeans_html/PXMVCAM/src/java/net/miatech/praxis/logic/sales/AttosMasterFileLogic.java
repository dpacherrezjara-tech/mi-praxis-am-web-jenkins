package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A4290;
import net.miatech.praxis.dao.sales.AttosMasterFileDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AttosMasterFileLogic {
    
    private AttosMasterFileDAO objDAO = new AttosMasterFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
//    public List<A4290> loadCityReport(A4290 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
//        return objDAO.loadCityReport(filter, hmPaises);
//    }
    
    public List<A4290> loadCityReport(A4290 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadCityReport(filter, rowsPag, hmPaises);
    }
    
    public String cityReportMaintance(A4290 filter, String strOption)throws SQLException, Exception {
        return objDAO.cityReportMaintance(filter,strOption);
    }
    
    public List<A4290> loadCityReport6EXCEL(A4290 filter, HashMap<String, String> hmPaises) throws SQLException, Exception {
        return objDAO.loadCityReport6EXCEL(filter, hmPaises);
    }
}
