package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.SQP04717Filter;
import net.miatech.praxis.payment.filter.SQP04718Filter;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

/**
 *
 * @author Dvicente
 */
@Service
public class LoadDeliveryDAO {

    private static final Logger logError = Logger.getLogger("errorLog");

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    private IServerSession session;

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SQP04717Filter> getSQP04717Filter(SQP04717Filter filter) throws Exception {
        Connection con = null;
        CallableStatement cstmt = null;
        ResultSet rs = null;
        String sql = "{CALL PRAXISMP.SQP04717(?,?,?,?,?,?,?,?,?)}";
        List<SQP04717Filter> lstObj = new ArrayList<>();
        try {
            con = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = con.prepareCall(sql);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            
            cstmt.setString(1, filter.getIN_CCUST());
            cstmt.setString(2, filter.getIN_PROCESADOR());
            cstmt.setString(3, filter.getIN_OPCION ());
            cstmt.setString(4, filter.getIN_FROMDATE());
            cstmt.setString(5, filter.getIN_TODATE());
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);   
            cstmt.execute();
            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);
            
            rs = cstmt.getResultSet();
            while (rs.next()) {
                SQP04717Filter obj = new SQP04717Filter();
                obj.setA4298CCUST(rs.getString("A4298CCUST"));
                obj.setA4298TYPE(rs.getString("A4298TYPE"));
                obj.setA4298FCOD(rs.getString("A4298FCOD"));
                obj.setA4298IDFIL(rs.getString("A4298IDFIL"));
                obj.setA4298SQFIL(rs.getString("A4298SQFIL"));
                obj.setA4298PRDA(rs.getString("A4298PRDA"));
                obj.setA4298REVN(rs.getString("A4298REVN"));
                obj.setA4298TPST(rs.getString("A4298TPST"));
                obj.setA4298FLNM(rs.getString("A4298FLNM"));
                obj.setA4298TTRN(rs.getDouble("A4298TTRN"));
                obj.setA4298TLIN(rs.getDouble("A4298TLIN"));
                obj.setA4298QTRN(rs.getDouble("A4298QTRN"));
                obj.setA4298QLIN(rs.getDouble("A4298QLIN"));
                obj.setA4298NTAB(rs.getString("A4298NTAB"));
                obj.setA4298STREC(rs.getString("A4298STREC"));
                obj.setA4298STCAR(rs.getString("A4298STCAR"));
                obj.setA4298UCARG(rs.getString("A4298UCARG"));
                obj.setA4298FCARG(rs.getString("A4298FCARG"));
                obj.setA4298HCARG(rs.getString("A4298HCARG"));
                obj.setA4298REGIS(rs.getString("A4298REGIS"));
                obj.setA4298FREGI(rs.getString("A4298FREGI"));
                obj.setA4298HREGI(rs.getString("A4298HREGI"));
                obj.setA4298REGVI(rs.getString("A4298REGVI"));
                obj.setA4298FREVI(rs.getString("A4298FREVI"));
                obj.setA4298HREVI(rs.getString("A4298HREVI"));
                obj.page.PAGNUM = filter.page.PAGNUM;
                obj.page.PAGROW = filter.page.PAGROW;
                obj.page.TOTPAG = filter.page.TOTPAG;
                obj.page.TOTROW = filter.page.TOTROW;                
                lstObj.add(obj);
            }
        } catch (Exception e) {
            System.out.println("Error en SQL: " + e.getMessage());
        } finally {
            if (rs!= null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt!= null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(con);
            pasarGarbageCollector();
        }
        return lstObj;
    }

    public List<SQP04718Filter> getSQP04718Filter(SQP04718Filter filter) throws Exception{
        Connection con = null;
        CallableStatement cstmt = null;
        ResultSet rs = null;
        String sql = "{CALL PRAXISMP.SQP04718(?,?)}";
        List<SQP04718Filter> lstObj = new ArrayList<>();
        try {
            con = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = con.prepareCall(sql);
            cstmt.setString(1, filter.getIN_TABLE());
            cstmt.setString(2, filter.getIN_IDFILE());
            cstmt.execute();
            rs = cstmt.getResultSet();
            while (rs.next()) {
                SQP04718Filter obj = new SQP04718Filter();
                obj.setLONG(rs.getString(filter.getIN_TABLE() + "LONG"));
                lstObj.add(obj);
            }
        } catch (Exception e) {
            System.out.println("Error en SQL: " + e.getMessage());
        } finally {
            if (rs!= null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt!= null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(con);
            pasarGarbageCollector();
        }
        return lstObj;
    }
}
