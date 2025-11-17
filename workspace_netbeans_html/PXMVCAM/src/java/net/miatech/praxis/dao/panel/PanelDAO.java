/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.panel;

/**
 *
 * @author lzambrano
 */
import java.sql.CallableStatement; 
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.SQP05855Filter;
import net.miatech.beans.SQP05856Filter;
import net.miatech.beans.PX076S01INF053Filter;
import net.miatech.beans.SQP05762Filter;
import net.miatech.beans.SQP05763Filter;
import net.miatech.beans.SQP05764Filter;
import net.miatech.beans.SQP05765Filter;
import net.miatech.beans.SQP05852Filter;
import net.miatech.beans.SQP05798Filter;
import net.miatech.beans.SQP05851Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class PanelDAO {
    private IServerSession session; 
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();
    public PanelDAO() {        
    }
     public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
    public PanelDAO(IServerSession ss) {
        session = ss;
    }
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX041S01INF001Filter> loadPX038S01A1698(PX041S01INF001Filter filter) throws SQLException , Exception {
        List<PX041S01INF001Filter> lstRtn = new ArrayList<PX041S01INF001Filter>(0);
        PX041S01INF001Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX041S01INF001(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_APLICA);
            cstmt01.setString(3, filter.VP_USR);
            cstmt01.setInt(4, filter.VP_TYPEF);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX041S01INF001Filter();
                objRtn.DTCR = rs01.getString("DTCR");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.PERMA = rs01.getString("PERMA");
                objRtn.PERMC = rs01.getString("PERMC");                
                objRtn.PERME = rs01.getString("PERME");
                objRtn.PERML = rs01.getString("PERML");
                objRtn.PERMM = rs01.getString("PERMM");
                objRtn.PERMX = rs01.getString("PERMX");
                objRtn.PROG = rs01.getString("PROG");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.USUP = rs01.getString("USUP"); 
                objRtn.USR  = rs01.getString("USR"); 
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<SQP05762Filter> loadSQP05762(SQP05762Filter filter) throws SQLException , Exception {
        List<SQP05762Filter> lstRtn = new ArrayList<SQP05762Filter>(0);
        SQP05762Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05762(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_APLICA);
            cstmt01.setString(3, filter.VP_ID_PROFILE);
            cstmt01.setInt(4, filter.VP_TYPEF);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05762Filter();
                objRtn.DTCR = rs01.getString("DTCR");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.PERMA = rs01.getString("PERMA");
                objRtn.PERMC = rs01.getString("PERMC");                
                objRtn.PERME = rs01.getString("PERME");
                objRtn.PERML = rs01.getString("PERML");
                objRtn.PERMM = rs01.getString("PERMM");
                objRtn.PERMX = rs01.getString("PERMX");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.USUP = rs01.getString("USUP"); 
                objRtn.ID_PROFILE  = rs01.getString("ID_PROFILE"); 
                objRtn.DESC1  = rs01.getString("DESC1"); 
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<SQP05852Filter> loadSQP05852(SQP05852Filter filter) throws SQLException , Exception {
        List<SQP05852Filter> lstRtn = new ArrayList<SQP05852Filter>(0);
        SQP05852Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05852(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setInt(3, filter.VP_TYPEF);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05852Filter();
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.DESCRIPCION = rs01.getString("DESCRIPCION");
                objRtn.MODULO = rs01.getString("MODULO");                
                objRtn.MENU1 = rs01.getString("MENU1");
                objRtn.MENU2 = rs01.getString("MENU2");
                objRtn.MENU3 = rs01.getString("MENU3");
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<SQP05798Filter> loadSQP05798(SQP05798Filter filter) throws SQLException , Exception {
        List<SQP05798Filter> lstRtn = new ArrayList<SQP05798Filter>(0);
        SQP05798Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05798(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setInt(3, filter.VP_TYPEF);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05798Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.USR = rs01.getString("USR");
                objRtn.NOM = rs01.getString("NOM");                
                objRtn.APE = rs01.getString("APE");
                objRtn.DESC1 = rs01.getString("DESC1");
                objRtn.MAIL = rs01.getString("MAIL");
                objRtn.PROFILE = rs01.getString("PROFILE");
                objRtn.NPROG = rs01.getString("NPROG");
                objRtn.PERMA = rs01.getString("PERMA");
                objRtn.PERML = rs01.getString("PERML");
                objRtn.PERMC = rs01.getString("PERMC");
                objRtn.PERMM = rs01.getString("PERMM");
                objRtn.PERME = rs01.getString("PERME");
                objRtn.PERMX = rs01.getString("PERMX");
                objRtn.USRC = rs01.getString("USRC");
                objRtn.DATC = rs01.getString("DATC");
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<SQP05764Filter> loadSQP05764(SQP05764Filter filter) throws SQLException , Exception {
        List<SQP05764Filter> lstRtn = new ArrayList<SQP05764Filter>(0);
        SQP05764Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05764(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_FILTER);
            cstmt01.setInt(2, filter.VP_TYPEF);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP05764Filter();
                objRtn.CCUST  = rs01.getString("CCUST"); 
                objRtn.ID_PROFILE  = rs01.getString("ID_PROFILE"); 
                objRtn.DESC1  = rs01.getString("DESC1"); 
                objRtn.STAT = rs01.getString("STAT");
                objRtn.DTCR = rs01.getString("DTCR");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.USUP = rs01.getString("USUP"); 
                
                //PAGIN
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<SQP05855Filter> loadSQP05855(SQP05855Filter filter) throws SQLException , Exception {
        List<SQP05855Filter> lstRtn = new ArrayList<SQP05855Filter>(0);
        SQP05855Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP05855(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_USR);
            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {//USR, CITY, STAT,USCR, DTCR, USUP, DTUP
                objRtn = new SQP05855Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.USR = rs01.getString("USR");
                objRtn.CITY = rs01.getString("CITY");
                objRtn.STAT = rs01.getString("STAT");
                objRtn.NOM = rs01.getString("NOM");
                objRtn.APE = rs01.getString("APE");
                objRtn.CREMP = rs01.getString("CREMP");
                objRtn.ID_PROFILE = rs01.getString("ID_PROFILE");
                objRtn.PROFILE = rs01.getString("PROFILE");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.DTCR = rs01.getString("DTCR");                
                objRtn.USUP = rs01.getString("USUP");
                objRtn.DTUP = rs01.getString("DTUP");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public SQP05851Filter  setSQP05851( SQP05851Filter filter ) throws SQLException , Exception {        
        //MANT. LOG TABLE   
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PRAXIS.SQP05851(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);      
            
            cstmt.setString(1, filter.VP_ID_OPERATOR );
            cstmt.setString(2, filter.VP_OPER );
            cstmt.setString(3, filter.VP_NPROG );
            cstmt.setString(4, filter.VP_DESC1);
            cstmt.setString(5, filter.VP_ACTIO);
            cstmt.execute();                                             
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public PX076S01INF053Filter  setPX076S01INF053( PX076S01INF053Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PX076S01INF053(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_APLICA);
            cstmt.setString(5, filter.VP_NPROG);            
            cstmt.setString(6, filter.VP_PERMA);            
            cstmt.setString(7, filter.VP_PERML);
            cstmt.setString(8, filter.VP_PERMC);
            cstmt.setString(9, filter.VP_PERMM);
            cstmt.setString(10, filter.VP_PERME);
            cstmt.setString(11, filter.VP_PERMX);
            cstmt.setString(12, filter.VP_STAT);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public SQP05763Filter  setSQP05763( SQP05763Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP05763(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER
            cstmt.registerOutParameter(14, Types.VARCHAR);
            cstmt.registerOutParameter(15, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_ID_PROFILE );
            cstmt.setString(4, filter.VP_DESC1 );
            cstmt.setString(5, filter.VP_APLICA);
            cstmt.setString(6, filter.VP_NPROG);            
            cstmt.setString(7, filter.VP_PERMA);            
            cstmt.setString(8, filter.VP_PERML);
            cstmt.setString(9, filter.VP_PERMC);
            cstmt.setString(10, filter.VP_PERMM);
            cstmt.setString(11, filter.VP_PERME);
            cstmt.setString(12, filter.VP_PERMX);
            cstmt.setString(13, filter.VP_STAT);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(14);
            filter.dbException.MESSAGE = cstmt.getString(15);                        
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (cstmt != null) {                
                try { cstmt.close(); } 
                catch(SQLException e) { 
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SQP05765Filter  setSQP05765( SQP05765Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP05765(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER           
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_ID_PROFILE );
            cstmt.setString(4, filter.VP_DESC1 );
            cstmt.setString(5, filter.VP_STAT);
            cstmt.execute();                     
        }catch(SQLException e) { 
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
        }finally {
            if (cstmt != null) {                
                try { cstmt.close(); } 
                catch(SQLException e) { 
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); 
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX076S01INF053Filter setSQP05412( PX076S01INF053Filter filter ) throws SQLException , Exception {        
        //MANT. TABLA INF053: INSERT, UPDATE O DELETE.        
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL SQP05412(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt = cnx.prepareCall(SQLCLL01);
            // OUT REGISTER
            cstmt.registerOutParameter(15, Types.VARCHAR);
            cstmt.registerOutParameter(16, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_USRCOPY );
            cstmt.setString(5, filter.VP_APLICA);
            cstmt.setString(6, filter.VP_NPROG);
            cstmt.setString(7, filter.VP_MODULE);
            cstmt.setString(8, filter.VP_PERMA);            
            cstmt.setString(9, filter.VP_PERML);
            cstmt.setString(10, filter.VP_PERMC);
            cstmt.setString(11, filter.VP_PERMM);
            cstmt.setString(12, filter.VP_PERME);
            cstmt.setString(13, filter.VP_PERMX);
            cstmt.setString(14, filter.VP_STAT);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(15);
            filter.dbException.MESSAGE = cstmt.getString(16);                        
        } finally {
            if (cstmt != null) {                
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SQP05856Filter  setSQP05856( SQP05856Filter filter ) throws SQLException , Exception {    
        CallableStatement cstmt = null;        
        String SQLCLL01 = "{CALL PRAXIS.SQP05856(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);             
            
            cstmt.setString(1, filter.VP_ACTION );
            cstmt.setString(2, filter.VP_CCUST );
            cstmt.setString(3, filter.VP_USR );
            cstmt.setString(4, filter.VP_CITY );
            cstmt.setString(5, filter.VP_STAT);
            cstmt.setString(6, filter.VP_APLICA);
            cstmt.setString(7, filter.VP_EMAIL);
            cstmt.setString(8, filter.VP_NOM);
            cstmt.setString(9, filter.VP_APE);
            cstmt.setString(10, filter.VP_ID_PROFILE);
            cstmt.execute();                        
            filter.dbException.SQLCODE = cstmt.getString(11);
            filter.dbException.MESSAGE = cstmt.getString(12);                        
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        finally {
            if (cstmt != null) {
                try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
}
