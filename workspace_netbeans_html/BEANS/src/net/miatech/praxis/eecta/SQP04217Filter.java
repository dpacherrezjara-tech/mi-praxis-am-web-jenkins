/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import net.miatech.beans.Pagination;

/**
 *
 * @author vhidalgo
 */
public class SQP04217Filter extends A4102 {

    public String VP_CCUST = "";
    public String VP_FDATE1 = "";
    public String VP_FDATE2 = "";
    public String VP_IDRCB = "";
    public String VP_STAT = "";
    public String VP_TRXOR = "";
    public String VP_CDCLI = "";
    public String VP_VPARM = "";
     //JOIN:Clientes
    public String A3953RSOCI = "";   
    public Pagination page = new Pagination();
}
