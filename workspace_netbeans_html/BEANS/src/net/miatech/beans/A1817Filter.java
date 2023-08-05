/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.flown.A1817;

/**
 *
 * @author jtorres
 */
public class A1817Filter extends A1817 {

    public int RN = 0;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String strTicket = "";
    
    public String DSALES = "";
    public String FVTA = "";
    public String descFVTA = "";
    public String IN_TIPO = "";
    public String IN_DATE = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_STVAL = "";
    public String IN_TICKET = "";
    public String SCOUNTRY = "";
    public String AGENTE = "";
    public String ORIG = "";
    public String DEST = "";
    public String SEQ = "";
    public String SEQRO = "";
    public String CARR = "";
    public double VCPN = 0;
    public String RFIC = "";
    public String RECODE = "";
    public String DESC_RECODE = "";
    public String RDATE = "";
    public String descRDATE = "";
    public String TPAX = "";
    public String FBASE = "";
    public String RBD = "";
    public String TOPUS = "";
    public int QTYPAX = 0;
    public String strDescAgente = "";
    public String CURRENCY = "";
    public double VFOP = 0;
    public String TDOC = "";
    public String strDesc1 = "";
    public long QCPNDIFF = 0;
    //totales
    public long totQCPNOAL = 0;
    public long totQCPNON = 0;
    public long totQCPNCON = 0;
    public long totQCPNEMD = 0;
    public long totQCPNSTAS = 0;
    public long totQCPNUSEA = 0;
    public long totQCPNOTHU = 0;
    public long totQCPNVAL = 0;
    public long totQCPNDIFF = 0;
    //cerrado,procesado,standby
    public long lngQSTB = 0;
    public long lngQPROC = 0;
    public long lngQCLO = 0;
    public long lngQREC = 0;
    
    public int QTYSALED = 0;
    public int QTYUSESD = 0;
    public int QTYSALEP = 0;
    public int QTYUSESP = 0;
    public int QTYEMDAU = 0;
    public int QTYEMDMA = 0;
    public int CONTABIL = 0;
    
    public int TOT_QTYSALED = 0;
    public int TOT_QTYUSESD = 0;
    public int TOT_QTYSALEP = 0;
    public int TOT_QTYUSESP = 0;
    public int TOT_QTYEMDAU = 0;
    public int TOT_QTYEMDMA = 0;
    public int TOT_CONTABIL = 0;
    
    public Pagination page = new Pagination();
}
