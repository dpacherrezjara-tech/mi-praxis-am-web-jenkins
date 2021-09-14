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
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class MassiveRefunduatpFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public MassiveRefunduatpFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public MassiveRefunduatpFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public String subirExcel(ArrayList<A4076Filter> filter) throws SQLException, ClassNotFoundException, Exception {

        String mensaje = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL LIBSAP26.SQP04177(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //SQP01904
        Connection cnx = null;
        ResultSet rst = null;
        String valida = "Y";
        int Cant = 0;
        int PREME = 0;
        session.getCNXIBMDB2().open();
        //cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            //cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A4076Filter obj : filter) {
                //INSERTAR DATOS A LA TABLA
                cstmt01.registerOutParameter(86, Types.VARCHAR);
                cstmt01.registerOutParameter(87, Types.VARCHAR);
                cstmt01.registerOutParameter(88, Types.VARCHAR);

                cstmt01.setString(1, obj.A4076CCUST);
                cstmt01.setString(2, obj.A4076TYPE);
                cstmt01.setString(3, obj.A4076TICKET);
                cstmt01.setString(4, obj.A4076REFE);
                cstmt01.setString(5, obj.A4076IATA);
                cstmt01.setString(6, obj.A4076MDA);
                cstmt01.setString(7, obj.A4076TRNCO);
                cstmt01.setString(8, obj.A4076TDOC);
                cstmt01.setString(9, obj.A4076FVTA);
                cstmt01.setString(10, obj.A4076CPN);
                cstmt01.setString(11, obj.A4076FP1);
                cstmt01.setString(12, obj.A4076TCARD1);
                cstmt01.setString(13, obj.A4076CARD1);
                cstmt01.setDouble(14, obj.A4076MONTCARD1);
                cstmt01.setString(15, obj.A4076FP2);
                cstmt01.setString(16, obj.A4076TCARD2);
                cstmt01.setString(17, obj.A4076CARD2);
                cstmt01.setDouble(18, obj.A4076MONTCARD2);
                cstmt01.setString(19, obj.A4076MONTT);
                cstmt01.setDouble(20, obj.A4076TARTK);
                cstmt01.setString(21, obj.A4076MONET);
                cstmt01.setDouble(22, obj.A4076EQVTK);
                cstmt01.setString(23, obj.A4076TAX1);
                cstmt01.setString(24, obj.A4076ATO1);
                cstmt01.setDouble(25, obj.A4076MONTAX1);
                cstmt01.setString(26, obj.A4076TAX2);
                cstmt01.setString(27, obj.A4076ATO2);
                cstmt01.setDouble(28, obj.A4076MONTAX2);
                cstmt01.setString(29, obj.A4076TAX3);
                cstmt01.setString(30, obj.A4076ATO3);
                cstmt01.setDouble(31, obj.A4076MONTAX3);
                cstmt01.setString(32, obj.A4076TAX4);
                cstmt01.setString(33, obj.A4076ATO4);
                cstmt01.setDouble(34, obj.A4076MONTAX4);
                cstmt01.setString(35, obj.A4076TAX5);
                cstmt01.setString(36, obj.A4076ATO5);
                cstmt01.setDouble(37, obj.A4076MONTAX5);
                cstmt01.setString(38, obj.A4076TAX6);
                cstmt01.setString(39, obj.A4076ATO6);
                cstmt01.setDouble(40, obj.A4076MONTAX6);
                cstmt01.setString(41, obj.A4076TAX7);
                cstmt01.setString(42, obj.A4076ATO7);
                cstmt01.setDouble(43, obj.A4076MONTAX7);
                cstmt01.setString(44, obj.A4076TAX8);
                cstmt01.setString(45, obj.A4076ATO8);
                cstmt01.setDouble(46, obj.A4076MONTAX8);
                cstmt01.setString(47, obj.A4076TAX9);
                cstmt01.setString(48, obj.A4076ATO9);
                cstmt01.setDouble(49, obj.A4076MONTAX9);
                cstmt01.setString(50, obj.A4076TAX10);
                cstmt01.setString(51, obj.A4076ATO10);
                cstmt01.setDouble(52, obj.A4076MONTAX10);
                cstmt01.setString(53, obj.A4076TAX11);
                cstmt01.setString(54, obj.A4076ATO11);
                cstmt01.setDouble(55, obj.A4076MONTAX11);
                cstmt01.setString(56, obj.A4076TAX12);
                cstmt01.setString(57, obj.A4076ATO12);
                cstmt01.setDouble(58, obj.A4076MONTAX12);
                cstmt01.setString(59, obj.A4076TAX13);
                cstmt01.setString(60, obj.A4076ATO13);
                cstmt01.setDouble(61, obj.A4076MONTAX13);
                cstmt01.setString(62, obj.A4076TAX14);
                cstmt01.setString(63, obj.A4076ATO14);
                cstmt01.setDouble(64, obj.A4076MONTAX14);
                cstmt01.setString(65, obj.A4076TAX15);
                cstmt01.setString(66, obj.A4076ATO15);
                cstmt01.setDouble(67, obj.A4076MONTAX15);
                cstmt01.setString(68, obj.A4076TAX16);
                cstmt01.setString(69, obj.A4076ATO16);
                cstmt01.setDouble(70, obj.A4076MONTAX16);
                cstmt01.setString(71, obj.A4076TAX17);
                cstmt01.setString(72, obj.A4076ATO17);
                cstmt01.setDouble(73, obj.A4076MONTAX17);

                cstmt01.setString(74, obj.A4076TAX18);
                cstmt01.setString(75, obj.A4076ATO18);
                cstmt01.setDouble(76, obj.A4076MONTAX18);
                cstmt01.setDouble(77, obj.A4076NETO);
                cstmt01.setDouble(78, obj.A4076TCMBC);
                cstmt01.setDouble(79, obj.A4076COMI);
                cstmt01.setDouble(80, obj.A4076TCMBT);
                cstmt01.setDouble(81, obj.A4076TAXCO);
                cstmt01.setString(82, obj.A4076BASE);

                cstmt01.setInt(83, Cant);
                cstmt01.setString(84, valida);
                cstmt01.setInt(85, PREME);

                cstmt01.execute();
                Cant++;
                valida = "N";
                obj.dbException.SQLCODE = cstmt01.getString(86);
                obj.dbException.MESSAGE = cstmt01.getString(87);
                PREME = cstmt01.getInt(88);
                mensaje = obj.dbException.MESSAGE;

                if (!obj.dbException.SQLCODE.equals("0")) {
                    mensaje = obj.dbException.MESSAGE;
                    break;
                }
            }
            cstmt01.close();

        } catch (SQLException e) {
            if (cnx != null) {
                cnx.rollback();
            }
            mensaje = "ERROR DE INSERCION";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            mensaje = "ERROR DE INSERCION";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }

        return mensaje;

    }

}
