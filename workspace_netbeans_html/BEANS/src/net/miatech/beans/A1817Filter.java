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
    public String DATE = "";
    public String IN_TYPE = "";
    public String DRILL = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String strDate = "";
    public String strFormatDate = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strFormatDate5 = "";
    public String strFormatDate6 = "";
    public String strFormatDate7 = "";
    public String strFormatDate8 = "";
    public String IN_TKT = "";
    public String IN_SEQRO = "";
    public String strTicket = "";
    
    public String RESULT = "";
    public String ROUTF = "";
    
    public String CODE = "";
    public String NAME = "";
    public String DSALES = "";
    public String FVTA = "";
    public String FECVAL = "";
    public String FCONTS = "";
    public String DVCR = "";
    public String descFVTA = "";
    public String descFECVAL = "";
    public String descFCONTS = "";
    public String descDVCR = "";
    public String descFCONT = "";
    public String IN_TIPO = "";
    public String IN_DATE = "";
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_STVAL = "";
    public String IN_COUNTRY = "";
    public String IN_TICKET = "";
    public String SCOUNTRY = "";
    public String AGENTE = "";
    public String ORIG = "";
    public String DEST = "";
    public String CLAS = "";
    public String PERIODO = "";
    public String SEQ = "";
    public String SEQRO = "";
    public String SEQROP = "";
    public String CARR = "";
    public String FCONTFL = "";
    public String FSTOCK = "";
    public String MATRICUL = "";
    public String EQUIPO = "";
    public String FOPER = "";
    
    //Informacion del CCD
    public String PAXNAME = "";
    public String SPNR = "";
    public String CRPNRL = "";
    public String FNAC = "";
    public String DOCIDEN = "";
    public String NDOCIDEN = "";
    public String CCOUNTRY = "";
    public String TTRANS = "";
    public String ETIQUETA = "";
    public String COMMENTS = "";
    public String RUTA = "";
    
    public double TAXAMOUNT = 0;
    public String FARECAL = "";
    public String ARGUME = "";
    public String STATAX = "";
    public String CDTAX = "";
    public String MONTAX = "";
    public double VALTAX = 0;
    public String CDTAXS = "";
    public String MONTAXS = "";
    public double VALTAXS = 0;
    public String RESTAX = "";
    public double TOT_TAXAMOUNT = 0;
    public int TOT_QTYPAX = 0;
    public double TOT_VALTAXS = 0;
    public double TOT_VALTAX = 0;
    public double TOT_STOTAL = 0;
    public double TOT_ATOTAL = 0;
    public double VCPN = 0;
    public double VCPMX = 0;
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
    public String TN16 = "";
    public String TN00 = "";
    
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
    
    public int QTYUSED = 0;
    public int QTYCONCI = 0;
    public int QTYPOLIZA = 0;
    
    //TEMPORAL
    public int QTYSALED = 0;
    public int QTYUSESD = 0;
    public int QTYSALEP = 0;
    public int QTYUSESP = 0;
    public int QTYEMDAU = 0;
    public int QTYEMDMA = 0;
    public int QTYEMDCT = 0;

    public int TOT_QTYUSED = 0;
    public int TOT_QTYCONCI = 0;
    public int TOT_QTYPEND = 0;
    public int TOT_QTYPOLIZA = 0;
    
    //TEMPORAL 2
    public int TOT_QTYSALED = 0;
    public int TOT_QTYUSESD = 0;
    public int TOT_QTYSALEP = 0;
    public int TOT_QTYUSESP = 0;
    public int TOT_QTYEMDAU = 0;
    public int TOT_QTYEMDMA = 0;
    public int TOT_QTYEMDCT = 0;

    //NRT-MEX
    public int QTYTOTAL = 0;
    public int QTYPEND = 0;
    public int QTYCONC = 0;
    public int QTYPAY = 0;
    public int QTYNOPAY = 0;
    public int QTYTOT = 0;
    public int QTYAPLI = 0;
    public int QTYNOAPLI = 0;
    public int QTYEXON = 0;
    public int QTYTAT = 0;
    
    public int TOT_QTYTOTAL = 0;
    public int TOT_QTYCONC = 0;
    public int TOT_QTYPAY = 0;
    public int TOT_QTYNOPAY = 0;
    public int TOT_QTYTOT = 0;
    public int TOT_QTYAPLI = 0;
    public int TOT_QTYNOAPLI = 0;
    public int TOT_QTYEXON = 0;
    public int TOT_QTYTAT = 0;
    
    public Pagination page = new Pagination();
}
