/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2324;

/**
 *
 * @author ggutierrez
 */
public class A2324Filter extends A2324 {

    public long RN = 0;
    public String strFecFiltro = "";
    public String IN_TDOC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String DATE = "";
    public String desSTVAL = "";
    public String IN_PNR = "";
    public String IN_REFNUMBER = "";
    public String IN_STVAL = "";

    // Qty
    public long QMATCH = 0;
    public long QPAYMENT_WO = 0;
    public long QSALES_WO = 0;
    public long QMATCH_DIFF = 0;
    public long QTOTSAL = 0;

    // tot
    public long totQMATCH = 0;
    public long totQPAYMENT_WO = 0;
    public long totQSALES_WO = 0;
    public long totQMATCH_DIFF = 0;
    public long totQTOTSAL = 0;

    public String strFormatDate = "";
    public long totSVFOP = 0;

    //CAMPOS PARA SETTLEMENT VS BOOMER
    public String IN_SDATE = "";
    public String IN_REFNBR = "";

    //SETTLEMENT
    public String TDOCA = "";
    public String descTDOCA = "";
    public double SVFOPA = 0.0;
    public double totSVFOPA = 0.0;
    public String SCARCODA = "";
    public String CUR = "";
    public String SCARDNA = "";
    public String SAUTHOCA = "";
    public String TPAYA = "";
    public String BANKA = "";
    public String ABCDA = "";
    public String SCURRENCYA = "";
    public String FSELECA = "";

    //BOOMER
    public String TDOCB = "";
    public String SCURRENCYB = "";
    public double SVFOPB = 0.0;
    public double totSVFOPB = 0.0;
    public String DOCTYPEB = "";
    public String CCIAB = "";
    public String CHANNELID = "";
    public String FORMAB = "";
    public String SERIEB = "";
    public String TKT = "";
    public String SCARCODB = "";
    public String SCARDNB = "";
    public String SAUTHOCB = "";
    public String SPNRB = "";
    public String estadoTitulo = "";

    //TABLA PNR
    public String TICKET = "";
    public String A1531NREF = "";
    public String A720AGENTE = "";
    public double A1531VFOP = 0.0;

    public Pagination page = new Pagination();

}
