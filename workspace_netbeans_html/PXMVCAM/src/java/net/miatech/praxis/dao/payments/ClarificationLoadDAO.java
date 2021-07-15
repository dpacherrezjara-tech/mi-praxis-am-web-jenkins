/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import net.miatech.beans.A1686Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class ClarificationLoadDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ClarificationLoadDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ClarificationLoadDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public String loadPX413SQP02535(String strBanco, String ruta) throws SQLException, IOException, Exception {

        BufferedReader br = null;
        CallableStatement cs = null;
        String strSQL = "", SEPARATOR = ",", QUOTE = "\"";
        String msj = "Operation Successful ", strTrama = "";
        int cantReg = 0;
        int cantReg1 = 0;

        strSQL = "{CALL PRAXIS.SQP02535(?,?,?,?,?)}";
        Connection cnx = null;

        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        cs = cnx.prepareCall(strSQL);
        cs.setString(1, strBanco.trim());
        //  cs.setInt(2, 0);
        cs.setString(2, session.getUserView().getUserInfo().USR);
        try {

            br = new BufferedReader(new FileReader(ruta));
            String line = br.readLine();

            for (int i = 0; i < line.length(); i++) {
                if (strBanco.equals("EL")) {
                    cantReg1++;
                } else {
                    if (!line.toUpperCase().contains("TOTAL")) {
                        cantReg1++;
                    }
                }
            }

            while (null != line) {

                cantReg++;
                String[] fields = line.split(SEPARATOR);
                fields = removeTrailingQuotes(fields, QUOTE);
                // System.out.println(Arrays.toString(fields));
                cs.setString(3, Arrays.toString(fields));
                cs.setString(4, (cantReg == 1) ? "Y" : "");
                cs.setInt(5, cantReg1);
                cs.execute();

                line = br.readLine();
            }

        } catch (Exception e) {
            e.printStackTrace();
            msj = "Error : " + e.getMessage();
        } finally {
            if (null != br) {
                br.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }
    
    public String loadPX413PRO10570(String strBanco, String strHora) throws SQLException, Exception {

        String msj = "SUCCESS";

        DatabaseMetaData dmd = null;
        CallableStatement cstmt = null;
        Connection cnx = null;
        String strBuffer = "", strPRO = "SPPRO10570";

        if (strBanco.trim().equals("AX")) {
            //AMEX MEX
            strPRO = "SPPRO10571";
        } else if (strBanco.trim().equals("ST")) {
            //SANTANDER
            strPRO = "SPPRO10572";
        } else if (strBanco.trim().equals("PP")) {
            //PAYPAL
            strPRO = "SPPRO10573";
            //SE CAMBIA LA HORA POR LA FECHA ACTUAL A PEDIDO DE JUGAZ 20190308
            strHora = Functions.getFechaActual();
        } else if (strBanco.trim().equals("EL")) {
            //ELAVON
            strPRO = "SPPRO10574";
        } else if (strBanco.trim().equals("US")) {
            //AMEX USA
            strPRO = "SPPRO10579";
        } else {
            //BANAMEX
            strPRO = "SPPRO10570";
        }

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            dmd = cnx.getMetaData();

            cstmt = cnx.prepareCall("{CALL PRAXIS".concat(dmd.getCatalogSeparator()).concat(strPRO + "(?)}"));
            strBuffer = "W " + Functions.fillString(strHora, 150);
            cstmt.setString(1, strBuffer);
            cstmt.registerOutParameter(1, Types.CHAR);
            cstmt.execute();

            String sBufferRes = cstmt.getString(1);

            if (sBufferRes.substring(1, 2).equals("1")) {
                //Error
                msj = "Error : " + sBufferRes.substring(2);
            }

        } catch (Exception e) {
            msj = "Error : " + e.getMessage();
            e.printStackTrace();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return msj;
    }
    
    public String loadPX413SQP03598(List<A1686Filter> lstExcel) throws SQLException, Exception {

        String strMsj = "An Unexpected Error Ocurred.";
        CallableStatement cs = null;
        Connection cnx = null;
        String strSQL;
        
        try {

            strSQL = "{CALL PRAXIS.SQP03598(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            for (int i = 0; i < lstExcel.size(); i++) {
                    
                    String Trama = lstExcel.get(i).strDescripcion;
                
                    cs.registerOutParameter(5, Types.VARCHAR);
                    //Para no incluir las ultimas lineas
                    cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs.setString(2, session.getUserView().getUserInfo().USR);
                    cs.setString(3, Trama);
                    if (i == 0) {
                        //Borra delivery
                        cs.setString(4, "D");
                    }else if (i == lstExcel.size() - 1 ) {
                        //Ejecuta PRO11440
                        cs.setString(4, "E");
                    } else {
                        cs.setString(4, "");
                    }
                    cs.setString(5, "");
                    cs.execute();
                    
                    strMsj = cs.getString(5);
            }

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = "Error : " + e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return strMsj;
    }
    
    private static String[] removeTrailingQuotes(String[] fields, String QUOTE) {

        String result[] = new String[fields.length];

        for (int i = 0; i < result.length; i++) {
            result[i] = fields[i].replaceAll("^" + QUOTE, "").replaceAll(QUOTE + "$", "");
        }
        return result;
    }
    
}
