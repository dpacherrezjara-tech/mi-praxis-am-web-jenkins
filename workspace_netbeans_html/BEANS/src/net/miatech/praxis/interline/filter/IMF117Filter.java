/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.interline.filter;
import net.miatech.beans.Pagination;
import net.miatech.praxis.interline.IMF117;
/**
 *
 * @author andrea
 */
public class IMF117Filter extends IMF117 {
    
    
    public int RN;
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public int IN_TIPOFECHA = 0;
    public String IN_SOURCE = "";
    public String IN_AIRLINE = "";
    public String IN_COUNTRY = "";
    public String IN_AVG = "";
    public String IN_REJECT = "";
    public String IN_CURRENCY = "";
    public int IN_GROUPBY = 0;
    public String IN_TYPEDOC="";
    public String IN_PERIOD = "";
    public String strFormatDate="";
    public String strFormatDate1="";
    public String strFormatDate2="";
    public String strFormatDate3="";
    public String strFormatDate4="";
    public String strFormatDate5="";
    public String strDescripcion="";
    public String strDescripcion1="";
    public String strDescripcion2="";
    public String strDescripcion3="";
    public String strDescripcion4="";
    public String strDescripcion5="";
    
    //TOTALES
    public long totQCPNS  = 0;
    public double totVALOR  = 0;
    public double totVCOMIS = 0;
    public double totVALORYQ = 0;
    public long totQCPNST  = 0;
    public double totVALORTAX = 0;
    
    //AVG
    public long perQCPNS  = 0;
    public double perVALOR  = 0;
    public double perVCOMIS = 0;
    public double perVALORYQ = 0;
    public long perQCPNST  = 0;
    public double perVALORTAX = 0;
     //AVG TOT
    public long totPerQCPNS  = 0;
    public double totPerVALOR  = 0;
    public double totPerVCOMIS = 0;
    public double totPerVALORYQ = 0;
    public long totPerQCPNST  = 0;
    public double totPperVALORTAX = 0;
    
    //IATA
    public String IN_ANIO_FROM = "";
    public String IN_ANIO_TO = "";
    public String IN_TIPO = "";
    public String YEAR = "";
    public String CODE = "";
    public String COUNTRY = "";
    public double SALES = 0;
    public double NOSALES = 0;
    public double ALLSALES = 0;
    public double EFFECTIVITY = 0;
    public double AMOUNT = 0;
    public double TOTAL_SALES = 0;
    public double TOTAL_NOSALES = 0;
    public double TOTAL_ALLSALES = 0;
    public double TOTAL_AMOUNT = 0;
    
    //TNU
    public String IN_PER = "";
    public String PER = "";
    public String MES = "";
    public String MES2 = "";
    public double SALE = 0;
    public double ENE = 0;
    public double FEB = 0;
    public double MAR = 0;
    public double ABR = 0;
    public double MAY = 0;
    public double JUN = 0;
    public double JUL = 0;
    public double AGO = 0;
    public double SET = 0;
    public double OCT = 0;
    public double NOV = 0;
    public double DIC = 0;
    public double SALDO = 0;
    public double LAST = 0;
    public double POST = 0;
    
    //FORECAST
    public String IN_FECHA_FROM_FORE = "";
    public String IN_FECHA_TO_FORE = "";
    
    public String DFLIGHT1 = "";
    public long QTYFLY1 = 0;
    public double FLYAMO1 = 0;
    public String DFLIGHT2 = "";
    public long QTYFLY2 = 0;
    public double FLYAMO2 = 0;
    public String DFLIGHT3 = "";
    public long QTYFLY3 = 0;
    public double FLYAMO3 = 0;
    public String DFLIGHT4 = "";
    public long QTYFLY4 = 0;
    public double FLYAMO4 = 0;
    public String DFLIGHT5 = "";
    public long QTYFLY5 = 0;
    public double FLYAMO5 = 0;
    public String DFLIGHT6 = "";
    public long QTYFLY6 = 0;
    public double FLYAMO6 = 0;
    public String DFLIGHT7 = "";
    public long QTYFLY7 = 0;
    public double FLYAMO7 = 0;
    public String DFLIGHT8 = "";
    public long QTYFLY8 = 0;
    public double FLYAMO8 = 0;
    public String DFLIGHT9 = "";
    public long QTYFLY9 = 0;
    public double FLYAMO9 = 0;
    public String DFLIGHT10 = "";
    public long QTYFLY10 = 0;
    public double FLYAMO10 = 0;
    public String DFLIGHT11 = "";
    public long QTYFLY11 = 0;
    public double FLYAMO11 = 0;
    public String DFLIGHT12 = "";
    public long QTYFLY12 = 0;
    public double FLYAMO12 = 0;
    
    public long QTYSALE = 0;
    public double AMOSALE = 0;
    public long QTYFLOWN = 0;
    public double AMOFLOWN = 0;
    
    public long TOT_QTYFLY1 = 0;
    public double TOT_FLYAMO1 = 0;
    public long TOT_QTYFLY2 = 0;
    public double TOT_FLYAMO2 = 0;
    public long TOT_QTYFLY3 = 0;
    public double TOT_FLYAMO3 = 0;
    public long TOT_QTYFLY4 = 0;
    public double TOT_FLYAMO4 = 0;
    public long TOT_QTYFLY5 = 0;
    public double TOT_FLYAMO5 = 0;
    public long TOT_QTYFLY6 = 0;
    public double TOT_FLYAMO6 = 0;
    public long TOT_QTYFLY7 = 0;
    public double TOT_FLYAMO7 = 0;
    public long TOT_QTYFLY8 = 0;
    public double TOT_FLYAMO8 = 0;
    public long TOT_QTYFLY9 = 0;
    public double TOT_FLYAMO9 = 0;
    public long TOT_QTYFLY10 = 0;
    public double TOT_FLYAMO10 = 0;
    public long TOT_QTYFLY11 = 0;
    public double TOT_FLYAMO11 = 0;
    public long TOT_QTYFLY12 = 0;
    public double TOT_FLYAMO12 = 0;
    public long TOT_QTYSALE = 0;
    public double TOT_AMOSALE = 0;
    public long TOT_QTYFLOWN = 0;
    public double TOT_AMOFLOWN = 0;
    
    public String PERIODO = "";
    public String ORDEN = "";
    public String CODIGO = "";
    public String CONCEPTO = "";
    public double TOT = 0;
    
    public String FVTA = "";
    public String CURR = "";
    public double AMTS = 0;
    public long QCPNV = 0;
    public double AMTV = 0;
    public long QCPNE = 0;
    public double AMTE = 0;
    public long QCPNR = 0;
    public double AMTR = 0;
    public long QCPNI = 0;
    public double AMTI = 0;
    public long QCPNC = 0;
    public double AMTC = 0;
    public long QCPNM = 0;
    public double AMTM = 0;
    public double QCPNP = 0;
    public double AMTP = 0;
    
    public long TOTAL_QCPNS = 0;
    public double TOTAL_AMTS = 0;
    public long TOTAL_QCPNV = 0;
    public double TOTAL_AMTV = 0;
    public long TOTAL_QCPNE = 0;
    public double TOTAL_AMTE = 0;
    public long TOTAL_QCPNR = 0;
    public double TOTAL_AMTR = 0;
    public long TOTAL_QCPNI = 0;
    public double TOTAL_AMTI = 0;
    public long TOTAL_QCPNC = 0;
    public double TOTAL_AMTC = 0;
    public long TOTAL_QCPNM = 0;
    public double TOTAL_AMTM = 0;
    public double TOTAL_QCPNP = 0;
    public double TOTAL_AMTP = 0;
    
     public Pagination page = new Pagination();
}
