/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.Sales;

import net.miatech.beans.Pagination;

/**
 *
 * @author ovasquez
 */
public class A4373Filter {
            
    public String TICKET = "";
    public String CPNS = "";
    public String CONJUNCTION = "";
    
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIA = "";

    public int TOTROW = 0;
    public int START = 0;
    public int LIMIT = 0;
    
    public String A4373AIRLI = ""; //"A4373AIRLI" CHAR(3) CCSID 284 NOT NULL,
    public String A4373CIA = ""; //"A4373CIA" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373FORMA = ""; //"A4373FORMA" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373SERIE = ""; //"A4373SERIE" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373DCHEQ = ""; //"A4373DCHEQ" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373TPTKT = ""; //"A4373TPTKT" CHAR(2) CCSID 284 NOT NULL, 
    public Integer A4373NRCUP = 0; //"A4373NRCUP" NUMERIC(2 , 0) NOT NULL, 
    public Integer A4373TOTCU = 0; //"A4373TOTCU" NUMERIC(2 , 0) NOT NULL, 
    public String A4373TFORM = ""; //"A4373TFORM" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373UFORM = ""; //"A4373UFORM" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373INDSC = ""; //"A4373INDSC" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CIAI = ""; //"A4373CIAI" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373FORMI = ""; //"A4373FORMI" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373SERII = ""; //A4373SERII" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373FLAG = ""; //"A4373FLAG" CHAR(1) CCSID 284 NOT NULL, 
    public Integer A4373NSEQ = 0; //"A4373NSEQ" NUMERIC(2 , 0) NOT NULL, 
    public Integer A4373CTKTC = 0; //"A4373CTKTC" NUMERIC(2 , 0) NOT NULL, 
    public String A4373NSTCK = ""; //"A4373NSTCK" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373DSTCK = ""; //"A4373DSTCK" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373AGENT = ""; //"A4373AGENT" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373TVENT = ""; //"A4373TVENT" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373ORIG = ""; //"A4373ORIG" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CODIT = ""; //"A4373CODIT" CHAR(20) CCSID 284 NOT NULL, 
    public String A4373FECVT = ""; //"A4373FECVT" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373PAIVT = ""; //"A4373PAIVT" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373CIUVT = ""; //"A4373CIUVT" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373PAIEM = ""; //"A4373PAIEM" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373CIUEM = ""; //"A4373CIUEM" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373PAIS = ""; //"A4373PAIS" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373RPDA = ""; //"A4373RPDA" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373GRUPO = ""; //"A4373GRUPO" CHAR(9) CCSID 284 NOT NULL, 
    public String A4373STAT = ""; //"A4373STAT" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CIPER = ""; //"A4373CIPER" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373MIAER = ""; //"A4373MIAER" CHAR(6) CCSID 284 NOT NULL, 
    public double A4373TCARE = 0; //"A4373TCARE" DECIMAL(8 , 6) NOT NULL, 
    public String A4373MONRE = ""; //"A4373MONRE" CHAR(3) CCSID 284 NOT NULL, 
    public double A4373TCASY = 0; //"A4373TCASY" DECIMAL(8 , 6) NOT NULL, 
    public String A4373MONSY = ""; //"A4373MONSY" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373PRO = ""; //"A4373PRO" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373BASE = ""; //"A4373BASE" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373INDMO = ""; //"A4373INDMO" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373REGIS = ""; //"A4373REGIS" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373FREGI = ""; //"A4373FREGI" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373HREGI = ""; //"A4373HREGI" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373CRTRE = ""; //"A4373CRTRE" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373REVIS = ""; //"A4373REVIS" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373FREVI = ""; //"A4373FREVI" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373HREVI = ""; //"A4373HREVI" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373CRTRV = ""; //"A4373CRTRV" CHAR(10) CCSID 284 NOT NULL, 
    public double A4373TYQ = 0; //"A4373TYQ" DECIMAL(13 , 2) NOT NULL, 
    public String A4373MDAYQ = ""; //"A4373MDAYQ" CHAR(3) CCSID 284 NOT NULL, 
    public Integer A4373TCAMB = 0; //"A4373TCAMB" NUMERIC(13 , 6) NOT NULL, 
    public String A4373MDARV = ""; //"A4373MDARV" CHAR(3) CCSID 284 NOT NULL, 
    public double A4373TYQRV = 0; //"A4373TYQRV" DECIMAL(13 , 2) NOT NULL, 
    public double A4373YQ1 = 0; //"A4373YQ1" DECIMAL(13 , 2) NOT NULL, 
    public double A4373YQ2 = 0; //"A4373YQ2" DECIMAL(13 , 2) NOT NULL, 
    public double A4373YQ3 = 0; //"A4373YQ3" DECIMAL(13 , 2) NOT NULL, 
    public double A4373YQ4 = 0; //"A4373YQ4" DECIMAL(13 , 2) NOT NULL, 
    public String A4373FTURB = ""; //"A4373FTURB" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373HTURB = ""; //"A4373HTURB" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373FLAGB = ""; //"A4373FLAGB" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373FENVB = ""; //"A4373FENVB" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373FLAGT = ""; //"A4373FLAGT" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373PRDA = ""; //"A4373PRDA" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373CUPN1 = ""; //"A4373CUPN1" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CUPN2 = ""; //"A4373CUPN2" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CUPN3 = ""; //"A4373CUPN3" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CUPN4 = ""; //"A4373CUPN4" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373SEQ = ""; //"A4373SEQ" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373IDFIL = ""; //"A4373IDFIL" CHAR(9) CCSID 284 NOT NULL, 
    public String A4373TRNN = ""; //"A4373TRNN" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373TRNSQ = ""; //"A4373TRNSQ" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373TRNCO = ""; //"A4373TRNCO" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373TRNCU = ""; //"A4373TRNCU" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373TDOC = ""; //"A4373TDOC" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373RFIC = ""; //"A4373RFIC" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373RFIS = ""; //"A4373RFIS" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373TICAP = ""; //"A4373TICAP" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373CPUI = ""; //"A4373CPUI" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373PNR = ""; //"A4373PNR" CHAR(13) CCSID 284 NOT NULL, 
    public String A4373ETKT = ""; //"A4373ETKT" CHAR(1) CCSID 284 NOT NULL, 
    public double A4373TFOP = 0; //"A4373TFOP" DECIMAL(13 , 2) NOT NULL, 
    public String A4373MDAFP = ""; //"A4373MDAFP" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373TTAX = ""; //"A4373TTAX" DECIMAL(13 , 2) NOT NULL, 
    public String A4373MDTX = ""; //"A4373MDTX" CHAR(3) CCSID 284 NOT NULL, 
    public double A4373TFOPR = 0; //"A4373TFOPR" DECIMAL(13 , 2) NOT NULL, 
    public double A4373TTAXR = 0; //"A4373TTAXR" DECIMAL(13 , 2) NOT NULL, 
    public String A4373WAIVR = ""; //"A4373WAIVR" CHAR(14) CCSID 284 NOT NULL, 
    public String A4373CIAS = ""; //"A4373CIAS" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373FORMS = ""; //"A4373FORMS" CHAR(4) CCSID 284 NOT NULL, 
    public String A4373SERIS = ""; //"A4373SERIS" CHAR(6) CCSID 284 NOT NULL, 
    public double A4373LYQ1 = 0; //"A4373LYQ1" DECIMAL(13 , 2) NOT NULL, 
    public double A4373LYQ2 = 0; //"A4373LYQ2" DECIMAL(13 , 2) NOT NULL, 
    public double A4373LYQ3 = 0; //"A4373LYQ3" DECIMAL(13 , 2) NOT NULL, 
    public double A4373LYQ4 = 0; //"A4373LYQ4" DECIMAL(13 , 2) NOT NULL, 
    public String A4373VRIC = ""; //"A4373VRIC" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373FERFN = ""; //"A4373FERFN" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373SEQD = ""; //"A4373SEQD" CHAR(2) CCSID 284 NOT NULL, 
    public String A4373INOAL = ""; //"A4373INOAL" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373UTRAS = ""; //"A4373UTRAS" CHAR(10) CCSID 284 NOT NULL, 
    public String A4373FTRAS = ""; //"A4373FTRAS" CHAR(8) CCSID 284 NOT NULL, 
    public String A4373HTRAS = ""; //"A4373HTRAS" CHAR(6) CCSID 284 NOT NULL, 
    public String A4373DISI = ""; //"A4373DISI" CHAR(1) CCSID 284 NOT NULL, 
    public String A4373YQMT1 = ""; //"A4373YQMT1" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373YQMT2 = ""; //"A4373YQMT2" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373YQMT3 = ""; //"A4373YQMT3" CHAR(3) CCSID 284 NOT NULL, 
    public String A4373YQMT4 = ""; //"A4373YQMT4" CHAR(3) CCSID 284 NOT NULL
    
    public double A1530TCAMB = 0; 
    public String A1530MDA = ""; 
    public String A1530FUENT = ""; 
    public String A1530PSVTA = ""; 
    public String A1530IDFIL = ""; 
    public String A1530FECCO = "";
    
    public long RN = 0; 
    public Pagination page = new Pagination();
}