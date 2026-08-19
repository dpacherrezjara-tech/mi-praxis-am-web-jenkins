/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.sql.Array;
import net.miatech.praxis.flown.A1971;

/**
 *
 * @author jtorres
 */
public class A1971Filter extends A1971 {

    public long RN = 0;
    public String FLAG_VNR = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String IN_CABI = "";
    public String IN_NFLIGHT = "";
    public String IN_CPAIR = "";
    public String strFormatDate = "";
    public String strFormatDate1 = "";
    public String strFormatDate2 = "";
    public String strFormatDate3 = "";
    public String strFormatDate4 = "";
    public String strDescripcion = "";
    public String strDescripcion1 = "";
    public String strDescripcion2 = "";
    public String strDescripcion3 = "";
    public String strDescripcion4 = "";
    public String strRuta = "";
    public String strZona = "";
    public String strTop = "";
    public String strTipoQTY = "";
    public String strTipoInfo = "";
    public String TPAX = "";
    public String strDescTPAX = "";
    public long QTYFlight = 0;
    public long KMS_1 = 0;
    //CLASE F
    public long CAPF = 0;
    public long QTYPAX_F = 0;
    public double VCPN_F = 0;
    public double AVG_F = 0;
    public long totQTYPAX_F = 0;
    public double totVCPN_F = 0;
    public double totAVG_F = 0;
    //CLASE Y
    public long CAPY = 0;
    public long QTYPAX_Y = 0;
    public double VCPN_Y = 0;
    public double AVG_Y = 0;
    public long totQTYPAX_Y = 0;
    public double totVCPN_Y = 0;
    public double totAVG_Y = 0;
    //CLASE J
    public long CAPJ = 0;
    public long QTYPAX_J = 0;
    public double VCPN_J = 0;
    public double AVG_J = 0;
    public long totQTYPAX_J = 0;
    public long totVCPNB = 0;
    public long totQTYPAXB = 0;
    public long totVCPN_YB = 0;
    public long totQTYPAX_YB = 0;
    public long totVCPN_JB = 0;
    public long totQTYPAX_JB = 0;
    public double totVCPN_J = 0;
    public double totAVG_J = 0;
    public long totKMS = 0;
    public long totKMS_1 = 0;
    public long totQTYPAX = 0;
    public double totVCPN = 0;
    public double totREVENUE = 0;
    public double totYIELD = 0;
    public long totQTYFlight = 0;
    public long totQTYVNR = 0;
    public long totQTYNRE = 0;
    public double AVG = 0;
    public double totAVG = 0;
    public long QEXCEP = 0;
    public long totQEXCEP = 0;
    //A1972
    public long CAPTOT = 0;
    public long DiffCap = 0;
    public long DiffCapJ = 0;
    public long DiffCapY = 0;
    public long DiffCapF = 0;
    //Porcentajes
    public double PerJ = 0;
    public double PerY = 0;
    public double PerF = 0;
    public double PerCAP = 0;
    public double Per1 = 0;
    public double Per2 = 0;
    public double Per3 = 0;
    public double Per4 = 0;
    public double totPer1 = 0;
    public double totPer2 = 0;
    public double totPer3 = 0;
    public double totPer4 = 0;
    public double VCPNRE = 0;
    public double totVCPNRE = 0;
    //Booking Netos Not Flown
    public long QBNPAX = 0;
    public double AMTBN = 0;
    public long totQBNPAX = 0;
    public double totAMTBN = 0;
    
    //Online , OAL
    public long QCPNON = 0;
    public double VCPNON = 0;
    public long QCPNOAL = 0;
    public double VCPNOAL = 0;

    public long totQCPNON = 0;
    public double totVCPNON = 0;
    public long totQCPNOAL = 0;
    public long totQFLIGHTB = 0;
    public long totQCPNOALB = 0;
    public long totVCPNOALB = 0;
    public long totQCPNONB = 0;
    public long totVCPNONB = 0;
    public long totQCPNNFB = 0;
    public long totVCPNNFB = 0;
    public long totQFLIGHT = 0;
    public long totVCPNOAL = 0;
    public long totQCPNNF = 0;
    public long totVCPNNF = 0;
    
    public double totTBASICM = 0;
    public long totBASICM = 0;
    public long totQCPNVAL= 0;
    public String strMonth = "";
    public String strYear = "";
    public String strValue = "";
    public String IN_FECHA_FROMB = "";
    public String IN_FECHA_TOB = "";
    public String strMonthB = "";
    public String strYearB = "";
    public String strValueB = "";
    public double Angle = 0;
    public double AngleB = 0;
    public String DFLIGHTB = "";
    public double VCPN_JB = 0;
    public long QTYPAX_JB = 0;
    public double VCPN_YB = 0;
    public long QTYPAX_YB = 0;
    public double VCPNB = 0;
    public long QTYPAXB = 0;
    public long QFLIGHTB = 0;
    public double VCPNONB = 0;
    public long QCPNONB = 0;
    public double VCPNOALB = 0;
    public long QCPNOALB = 0;
    public double VCPNNFB = 0;
    public long QCPNNFB = 0;
    public double VCPNNF = 0;
    public long QCPNNF = 0;
    public long QFLIGHT = 0;
    public int MESES = 0;
    public String strFormatDateB = "";
    public double TOVCPNONB = 0;
    public double TOVCPNON = 0;
    public double TOVCPNOALB = 0;
    public double TOVCPNOAL = 0;
    
    public String ZONAB = "";
    public double QCFLOW = 0;
    public double QCPAX = 0;
    public double QCFLOWB = 0;
    public double QCPAXB = 0;
    public double AVGB = 0;
    public String strDescripcionB = "";
    
    public Pagination page = new Pagination();
    
    public String IN_DATE = "";
    public String IN_TIPO = "";
    
    public String DATE = "";
    public double AM = 0;
    public double CINCOD = 0;
    public double AM_OTRO = 0;
    public double CINCOD_OTRO = 0;
    public double TOTAL = 0;
    public double AMM = 0;
    public double CINCODM = 0;
    public double AM_OTROM = 0;
    public double CINCOD_OTROM = 0;
    public double TOTALM = 0;
    public double totAM = 0;
    public double totCINCOD = 0;
    public double totAM_OTRO = 0;
    public double totCINCOD_OTRO = 0;
    public double totTOTAL = 0;
    public double totAMM = 0;
    public double totCINCODM = 0;
    public double totAM_OTROM = 0;
    public double totCINCOD_OTROM = 0;
    public double totTOTALM = 0;
    public double TOTALAM = 0;
    public double TOTALOT = 0;
    public double totTOTALAM = 0;
    public double totTOTALOT = 0;
    
    public String DATE0 = "";
    public String strFormatDate0 = "";
    public double AM0 = 0;
    public double CINCOD0 = 0;
    public double AM_OTRO0 = 0;
    public double CINCOD_OTRO0 = 0;
    public double TOTAL0 = 0;
    public double AMM0 = 0;
    public double CINCODM0 = 0;
    public double AM_OTROM0 = 0;
    public double CINCOD_OTROM0 = 0;
    public double TOTALM0 = 0;
    public double totAM0 = 0;
    public double totCINCOD0 = 0;
    public double totAM_OTRO0 = 0;
    public double totCINCOD_OTRO0 = 0;
    public double totTOTAL0 = 0;
    public double totAMM0 = 0;
    public double totCINCODM0 = 0;
    public double totAM_OTROM0 = 0;
    public double totCINCOD_OTROM0 = 0;
    public double totTOTALM0 = 0;
    public double TOTALAM0 = 0;
    public double TOTALOT0 = 0;
    public double totTOTALAM0 = 0;
    public double totTOTALOT0 = 0;
    
    
    
    public String IN_DATE_FROM = "";
    public String IN_DATE_TO = "";
    public String IN_TUSO = "";
    public String IN_TDOC = "";
    public String IN_CURRENP = "";
    public String STVAL = "";
    public String IN_TOP = "";
    public String IN_SPA = "";
    public String IN_TYPE = "";
    public String IN_ORDER = "";
    public String AIRLINE = "";
    public String strAirlineName = "";
    public String FINVOICE = "";
    public String strDATE = "";
    public String INVOICE = "";
    public String CURRENP = "";
    public double NETI = 0;
    public double NETO = 0;
    public String FMETHOD = "";
    public double QCPN = 0;
//    public double FMETHOD = 0;
    public double QRM = 0;
    public double QRMSPA = 0;
    public double QSPA = 0;
    public int QSPANA = 0;
    public double VALMPA = 0;
    public double dblAMTSPAA = 0;
    public double dblPorc = 0;
    public double lngTotQCPN = 0;
    public double dblTotAMTSPAA = 0;
    public double dblTotVALOR = 0;
    public double dblTotVALSRP = 0;
    public double dblTotVALMPA = 0;
    public double VALSPA = 0;
    public double VALOR = 0;
    public double VALSRP = 0;
    public double dblPorcSPA = 0;
    public String strColor = "";
    public String strImagen = "";
    public String TAGCODE = "";
    public String TAGDESC = "";
    public String CURRENC = "";
    public double RMVSPA = 0;
    public double QCUPON = 0;
    public double QAUDI = 0;
    public long lngPROF = 0;
    public double dblPROF = 0;
    public double dbAVG = 0;
    public double perQSPA = 0;
    public double perQRMSPA = 0;
    public double dblPerRec = 0;
    public double dblEfecSRP = 0;
    public double dblEfecMPA = 0;
    public double dblAmtEffecSRP = 0;
    public double dblAmtEffecMPA = 0;
    public double lnQCUPON = 0;
    public double lnQSFIM = 0;
    public double lnQAUDI = 0;
    public double lnQSUPAUD = 0;
    public double lnQRMSPA = 0;
    public double lnVALMPA = 0;
    public double lnQSPA = 0;
    public double lnQSPANA = 0;
    public double lnPROF = 0;
    public double dbQRM = 0;
    public double dbNETI = 0;
    public double dbRMVSPA = 0;
    public double dbNETO = 0;
    public double dbVALSRP = 0;
    public double dbVALSPA = 0;
    
    public String IN_AIRLINE = "";
    public String NROPRT = "";
    public String TICKET = "";
    public String strTICKET = "";
    public String RUTA = "";
    public String FECVTA = "";
    public String FBASIS = "";
    public String INDPR = "";
    public String strINDAC = "";
    public String CODAC = "";
    public String INDAC = "";
    public String VRSAC = "";
    public String CURRENF = "";
    public double FARE = 0;
    public String TDOC = "";
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String CUPON = "";
    public String IN_TKT = "";
    public double NETM = 0;
    public String RMACCEPT = "";
    public String TUSO = "";
    public String strASIGNED = "";
    public String DES_FTE = "";
    public String COMME1 = "";
    public String GRUPO = "";
    public String RUTAP = "";
    public String strFDWORK = "";
    
    
}
