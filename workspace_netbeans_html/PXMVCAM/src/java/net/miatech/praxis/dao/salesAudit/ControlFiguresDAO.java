/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

import java.sql.ResultSetMetaData;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author lmendoza
 */
public class ControlFiguresDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ControlFiguresDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ControlFiguresDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

//    public List<SQP00942Filter> Search(SQP00942Filter filter) throws SQLException, Exception {
//        List<SQP00942Filter> lstRtn = new ArrayList<>(0);
//        SQP00942Filter objRtn;
//
//        CallableStatement cstmt01 = null;
//        ResultSet rs01 = null;
//
//        String SQLCLL01 = "{CALL PXSAUDIT.SQP00942XX(?,?,?,?,?,?,?,?,?)}";
//
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt01 = cnx.prepareCall(SQLCLL01);
//
//            cstmt01.registerOutParameter(6, Types.INTEGER);
//            cstmt01.registerOutParameter(7, Types.INTEGER);
//            cstmt01.registerOutParameter(8, Types.INTEGER);
//            cstmt01.registerOutParameter(9, Types.INTEGER);
//
//            cstmt01.setString(1, filter.OPCIONTYPE);
//            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
//            cstmt01.setString(3, filter.DATEFROM);
//            cstmt01.setString(4, filter.DATETO);
//            cstmt01.setString(5, filter.CIA);
//
//            cstmt01.setInt(6, filter.page.PAGNUM);
//            cstmt01.setInt(7, filter.page.PAGROW);
//            cstmt01.setInt(8, filter.page.TOTPAG);
//            cstmt01.setInt(9, filter.page.TOTROW);
//
//            cstmt01.execute();
//            
//            //*System.out.println("Aqui entro con Filtro Categoria: ");
//            filter.page.PAGNUM = cstmt01.getInt(6);
//            filter.page.PAGROW = cstmt01.getInt(7);
//            filter.page.TOTPAG = cstmt01.getInt(8);
//            filter.page.TOTROW = cstmt01.getInt(9);
//
//            rs01 = cstmt01.getResultSet();
//            while (rs01.next()) {
//
//                objRtn = new SQP00942Filter();
//
//                objRtn.FECPRO = rs01.getString("FECPRO");
//                objRtn.QTYPXCM = rs01.getInt("QTYPXCM");
//                objRtn.QTYPXFA = rs01.getInt("QTYPXFA");
//                objRtn.QTYPXSC = rs01.getInt("QTYPXSC");
//                objRtn.QTYPXTX = rs01.getInt("QTYPXTX");
//                objRtn.QTYSAFAPR = rs01.getInt("QTYSAFAPR");
//                objRtn.QTYSAFAVO = rs01.getInt("QTYSAFAVO");
//                objRtn.QTYSAFAEX = rs01.getInt("QTYSAFAEX");
//                objRtn.QTYSATX = rs01.getInt("QTYSATX");
//                objRtn.QTYSACM = rs01.getInt("QTYSACM");
//                objRtn.QTYSASC = rs01.getInt("QTYSASC");
//                objRtn.DIFFARE = rs01.getInt("DIFFARE");
//                objRtn.DIFTAX = rs01.getInt("DIFTAX");
//                objRtn.DIFCOMM = rs01.getInt("DIFCOMM");
//                objRtn.DIFTAXC = rs01.getInt("DIFTAXC");
//                objRtn.FECSYS = rs01.getString("FECSYS");
//                objRtn.FLAGF = rs01.getString("STATUSF");
//                objRtn.FLAGD = rs01.getString("STATUSD");
//                objRtn.QTYSAMEMO = rs01.getInt("QTYSAMEMO");
//                objRtn.DESCR = rs01.getString("DESCR");
//
//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
//
//                lstRtn.add(objRtn);
//
//                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
//            }
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt01 != null) {
//                try {
//                    cstmt01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//        return lstRtn;
//    }
    
    public List<SQP00942Filter> Search(SQP00942Filter filter) throws SQLException, Exception {
        List<SQP00942Filter> lstRtn = new ArrayList<>(0);
        SQP00942Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00942XX(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            System.out.println("🔷 [INI] Iniciando Search(SQP00942Filter)");
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            // --- Parámetros OUT
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            // --- Parámetros IN
            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.DATEFROM);
            cstmt01.setString(4, filter.DATETO);
            cstmt01.setString(5, filter.CIA);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            // --- Ejecuta SP
            boolean hasResultSet = cstmt01.execute();
            

            // --- Actualiza parámetros de paginación después de ejecutar
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            // --- Manejo de múltiples ResultSets
            Map<Integer, List<Map<String, Object>>> resultadosExtra = new LinkedHashMap<>();
            int resultSetIndex = 0;

            while (hasResultSet) {
//                System.out.println("📊 Procesando ResultSet #" + resultSetIndex);
                try (ResultSet rs = cstmt01.getResultSet()) {
                    if (rs == null) {
                        System.out.println("ResultSet #" + resultSetIndex + " es nulo, se interrumpe.");
                        break;
                    }

                    rs.setFetchSize(1500);

                    if (resultSetIndex == 0) {
                        // Primera respuesta (grid principal)
                        int count = 0;
                        while (rs.next()) {
                            objRtn = new SQP00942Filter();

                            objRtn.FECPRO = rs.getString("FECPRO");
                            objRtn.QTYPXCM = rs.getInt("QTYPXCM");
                            objRtn.QTYPXFA = rs.getInt("QTYPXFA");
                            objRtn.QTYPXSC = rs.getInt("QTYPXSC");
                            objRtn.QTYPXTX = rs.getInt("QTYPXTX");
                            objRtn.QTYSAFAPR = rs.getInt("QTYSAFAPR");
                            objRtn.QTYSAFAVO = rs.getInt("QTYSAFAVO");
                            objRtn.QTYSAFAEX = rs.getInt("QTYSAFAEX");
                            objRtn.QTYSATX = rs.getInt("QTYSATX");
                            objRtn.QTYSACM = rs.getInt("QTYSACM");
                            objRtn.QTYSASC = rs.getInt("QTYSASC");
                            objRtn.DIFFARE = rs.getInt("DIFFARE");
                            objRtn.DIFTAX = rs.getInt("DIFTAX");
                            objRtn.DIFCOMM = rs.getInt("DIFCOMM");
                            objRtn.DIFTAXC = rs.getInt("DIFTAXC");
                            objRtn.FECSYS = rs.getString("FECSYS");
                            objRtn.FLAGF = rs.getString("STATUSF");
                            objRtn.FLAGD = rs.getString("STATUSD");
                            objRtn.QTYSAMEMO = rs.getInt("QTYSAMEMO");
                            objRtn.DESCR = rs.getString("DESCR");

                            objRtn.page.PAGNUM = filter.page.PAGNUM;
                            objRtn.page.PAGROW = filter.page.PAGROW;
                            objRtn.page.TOTPAG = filter.page.TOTPAG;
                            objRtn.page.TOTROW = filter.page.TOTROW;

                            lstRtn.add(objRtn);
                            count++;

                            // Muestra solo las primeras filas de ejemplo
//                            if (count <= 3) {
//                                System.out.println("➡️ Fila ejemplo " + count + " → FECPRO: "
//                                        + objRtn.FECPRO + ", QTYPXCM: " + objRtn.QTYPXCM);
//                            }
                        }
                        System.out.println("ResultSet principal cargado con " + count + " registros.");
                    } else {
                        // Nuevos resultados 
                        List<Map<String, Object>> filas = new ArrayList<>();
                        ResultSetMetaData meta = rs.getMetaData();
                        int columnCount = meta.getColumnCount();

                        while (rs.next()) {
                            Map<String, Object> fila = new LinkedHashMap<>();
                            for (int i = 1; i <= columnCount; i++) {
                                fila.put(meta.getColumnLabel(i), rs.getObject(i));
                            }
                            filas.add(fila);
                        }

                        resultadosExtra.put(resultSetIndex, filas);
//                        System.out.println("ResultSet extra #" + resultSetIndex + " con " + filas.size() + " filas");
                    }
                }

                hasResultSet = cstmt01.getMoreResults();
                resultSetIndex++;
            }

//            System.out.println("Total registros en lista principal: " + lstRtn.size());
//            System.out.println("Total ResultSets extra: " + resultadosExtra.size());
            
            if (!lstRtn.isEmpty()) {
                lstRtn.get(0).setExtraResults(resultadosExtra);
            }

        } catch (Exception e) {
            System.err.println("❌ Error en Search(): " + e.getMessage());
            e.printStackTrace();
            throw e;
        } finally {
            if (rs01 != null) try { rs01.close(); } catch (SQLException ignored) {}
            if (cstmt01 != null) try { cstmt01.close(); } catch (SQLException ignored) {}
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
            System.out.println("[FIN] Recursos cerrados y conexión liberada.");
        }

        return lstRtn;
    }

    public SQP00874Filter executeLoad(SQP00874Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        SQP00874Filter beanOra = null;
        SQP00874Filter listaData = new SQP00874Filter();

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01161(?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.VP_DATEFROM);

            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                beanOra = new SQP00874Filter();

                beanOra.VP_STATUS = rst.getString("RESULT");

                // listaData.add(beanOra);
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            session.getCNXIBMDB2().close();
        }

        return beanOra;
    }
}
