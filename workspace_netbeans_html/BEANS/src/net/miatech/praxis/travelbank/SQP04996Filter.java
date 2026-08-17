/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.travelbank;

import net.miatech.beans.Pagination;

/**
 *
 * @author vhidalgo
 */
public class SQP04996Filter extends A4467 {

    public String VP_CCUST = "";
    public String VP_OPCION = "";
    public String VP_NCTA = "";
    public String VP_MONED = "";
    public String VP_CRDID = "";
    public String VP_DESDE = "";
    public String VP_HASTA = "";
    public String VP_SERVC = "";
    public String VP_STAT = ""; // -- 1: Muestra saldos>0 / 0=All
    public String VP_LSTA = ""; //-- Status: TB vs Precont. 	// MATCH/DIFF/ALL(SPACES)
    public String VP_PSTA = "";
    
    public String RN = "";
        
    public Pagination page = new Pagination();
}
