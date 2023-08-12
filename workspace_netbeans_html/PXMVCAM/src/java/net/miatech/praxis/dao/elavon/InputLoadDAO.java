/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.elavon;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.elavon.ElavonExcelFile;
import net.miatech.praxis.elavon.ElavonFilesEnum;
import net.miatech.praxis.elavon.SQP04650Filter;
import net.miatech.praxis.elavon.SQP04651Filter;
import net.miatech.praxis.elavon.SQP04674Filter;
import net.miatech.praxis.elavon.X3147temp;
import org.apache.log4j.Logger;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Dvicente
 */
@Service
public class InputLoadDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    //valida que otro proceso no este en ejecucion
    public boolean getRunningProcess() throws Exception {
        Connection cnx = null;
        String SQLvalida = "SELECT COUNT(0) FROM PRAXIS.A4294 WHERE A4294STCAR = 'P'";
        ResultSet rs = null;
        Integer processing = 0;
        boolean res = true;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            rs = cnx.prepareStatement(SQLvalida).executeQuery();
            while (rs.next()) {
                processing = rs.getInt(1);
            }
            if (processing > 0) {
                res = false;
            }
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            res = false;
        }finally{
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return res;
    }

    //guarda excel en archivo temporal
    public boolean setX3147(List<X3147temp> temp) throws SQLException, Exception {
        Connection cnx = null;
        PreparedStatement pstmt = null;
        String SQL = "INSERT INTO PRAXIS.X3147 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cnx.prepareStatement("TRUNCATE TABLE PRAXIS.X3147").execute();
            pstmt = cnx.prepareStatement(SQL);
            //cnx.setAutoCommit(false);
            for (X3147temp line : temp) {
                pstmt.setString(1, line.getSYSTEM());
                pstmt.setString(2, line.getBATCH_DATE());
                pstmt.setString(3, line.getEXT_MID());
                pstmt.setString(4, line.getGLOBAL_NAME());
                pstmt.setString(5, line.getFUNDED_CCY());
                pstmt.setDouble(6, line.getUSD_RATE());
                pstmt.setString(7, line.getSALES_TYPE());
                pstmt.setString(8, line.getCARD());
                pstmt.setString(9, line.getROC_TEXT());
                pstmt.setString(10, line.getCOMBTIC_NUM());
                pstmt.setString(11, line.getTKT());
                pstmt.setString(12, line.getTRX_DEPART_DTE());
                pstmt.setDouble(13, line.getTRN_AMT());
                pstmt.setDouble(14, line.getCONV_TRN_AMT());
                pstmt.setString(15, line.getCPT_ID());
                pstmt.setString(16, "");
                pstmt.addBatch();
            }
            pstmt.executeBatch();
            //cnx.commit();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            return false;
        } finally {
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return true;
    }

    //guarda datos de excel en cabecera
    public SQP04650Filter getSQP04650Filter(SQP04650Filter filter) throws SQLException, Exception {
        Connection cnx = null;
        CallableStatement cstmt = null;
        String SQL = "{CALL PRAXIS.SQP04650(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, filter.getIN_FILENAME());
            cstmt.setInt(2, filter.getIN_ROWSRCV());
            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.execute();
            filter.setOUT_SQLCODE(cstmt.getString(3));
            filter.setOUT_MESSAGE(cstmt.getString(4));
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            return null;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    //procesa datos de archivo temporal a tabla A4323
    public SQP04674Filter getSQP04674Filter(SQP04674Filter filter) throws SQLException, Exception {
        Connection cnx = null;
        CallableStatement cstmt = null;
        String SQL = "{CALL PRAXIS.SQP04674(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, "139");
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.execute();
            filter.setOUT_SQLCODE(cstmt.getString(2));
            filter.setOUT_MESSAGE(cstmt.getString(3));
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            return null;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    //procesa datos de archivo temporal a tabla A4323, se ejecuta en back
    @Async("taskExecutor1")
    public void getSQP04674FilterAsync(SQP04674Filter filter) throws SQLException, Exception {
        System.out.println("Execute method asynchronously - " + Thread.currentThread().getName());
        Connection cnx = null;
        CallableStatement cstmt = null;
        String SQL = "{CALL PRAXIS.SQP04674(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.setString(1, filter.getIN_CCUST());
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.execute();
            filter.setOUT_SQLCODE(cstmt.getString(2));
            filter.setOUT_MESSAGE(cstmt.getString(3));
            System.out.println(filter.getOUT_SQLCODE() + " : " + filter.getOUT_MESSAGE());
        } catch (Exception e) {
            System.out.println("Metodo asyncrono se ha completado con error");
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                    System.out.println("Sesion cerrada de Metodo asyncrono");
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
    }

    //cabecera ELAVON
    public List<SQP04651Filter> getSQP04651Filter(SQP04651Filter filter) throws SQLException, Exception {
        List<SQP04651Filter> response = new ArrayList<>();
        CallableStatement cstmt = null;
        String SQL = "{CALL PRAXIS.SQP04651(?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rs = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.setString(1, filter.getIN_FROMDATE());
            cstmt.setString(2, filter.getIN_TODATE());
            cstmt.setInt(3, filter.getPagination().PAGNUM);
            cstmt.setInt(4, filter.getPagination().PAGROW);
            cstmt.setInt(5, filter.getPagination().TOTPAG);
            cstmt.setInt(6, filter.getPagination().TOTROW);
            cstmt.execute();
            filter.getPagination().PAGNUM = cstmt.getInt(3);
            filter.getPagination().PAGROW = cstmt.getInt(4);
            filter.getPagination().TOTPAG = cstmt.getInt(5);
            filter.getPagination().TOTROW = cstmt.getInt(6);
            rs = cstmt.getResultSet();
            while (rs.next()) {
                SQP04651Filter obj = new SQP04651Filter();
                obj.setA4294CCUST(rs.getString("A4294CCUST"));
                obj.setA4294FECAC(rs.getString("A4294FECAC"));
                obj.setA4294FECIN(rs.getString("A4294FECIN"));
                obj.setA4294FLNM(rs.getString("A4294FLNM"));
                obj.setA4294HORAC(rs.getString("A4294HORAC"));
                obj.setA4294HORIN(rs.getString("A4294HORIN"));
                obj.setA4294IDFIL(rs.getString("A4294IDFIL"));
                obj.setA4294PRDA(rs.getString("A4294PRDA"));
                obj.setA4294STCAR(rs.getString("A4294STCAR"));
                obj.setA4294STREC(rs.getString("A4294STREC"));
                obj.setA4294USRAC(rs.getString("A4294USRAC"));
                obj.setA4294USRIN(rs.getString("A4294USRIN"));
                obj.setA4294TTRC(rs.getInt("A4294TTRC"));
                obj.setA4294TTRF(rs.getInt("A4294TTRF"));
                obj.setA4294TTRM(rs.getInt("A4294TTRM"));
                obj.setA4294TTRP(rs.getInt("A4294TTRP"));

                //datos de ingreso
                obj.setIN_FROMDATE(filter.getIN_FROMDATE());
                obj.setIN_TODATE(filter.getIN_TODATE());

                //datos de paginacion
                obj.getPagination().PAGNUM = filter.getPagination().PAGNUM;
                obj.getPagination().PAGROW = filter.getPagination().PAGROW;
                obj.getPagination().TOTPAG = filter.getPagination().TOTPAG;
                obj.getPagination().TOTROW = filter.getPagination().TOTROW;
                response.add(obj);
            }
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            response = null;
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return response;
    }

    //obtiene lista de resultsets en forma de Map
    @Transactional
    public List<ElavonExcelFile> getResultElavon(String IdFile) throws Exception {
        final String sql = "{CALL PRAXIS.SQP04675(?)}";
        Connection cnx = null;
        CallableStatement cstmt = null;
        //lista de resultset (cada resut set se guarda en un listado de Map)
        List<ElavonExcelFile> list = new ArrayList<>();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(sql);
            cstmt.setString(1, IdFile);
            if (IdFile.length() != 9) {
                throw new SQLException("Parameter length must be 9");
            }
            boolean resultsAvailable = cstmt.execute();
            int cont = 0;
            while (resultsAvailable) {
                ElavonExcelFile elavonExcelFile = new ElavonExcelFile();
                ResultSet resultSet = cstmt.getResultSet();
                String rsname = ElavonFilesEnum.getById(cont);
                if (rsname == null) {
                    throw new Exception("Error en nombre");
                }
                elavonExcelFile.setFileName(rsname + "_" + IdFile);
                cont++;
                List<Map<String, Object>> subList = new ArrayList<>();
                while (resultSet.next()) {
                    ResultSetMetaData meta = resultSet.getMetaData();
                    int colcount = meta.getColumnCount();
                    Map<String, Object> map = new HashMap<>();
                    for (int i = 1; i <= colcount; i++) {
                        String name = meta.getColumnLabel(i);
                        map.put(name, resultSet.getString(i));
                    }
                    subList.add(map);
                }
                elavonExcelFile.setFileObjects(subList);
                list.add(elavonExcelFile);
                resultsAvailable = cstmt.getMoreResults();
            }
        } catch (Exception ex) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
            list = new ArrayList<>();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return list;
    }
}
