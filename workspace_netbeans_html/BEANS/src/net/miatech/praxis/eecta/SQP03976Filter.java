/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

/**
 *
 * @author vhidalgo
 */
public class SQP03976Filter  {
    public String VP_A3981CCUST = "";
    public String VP_A3981NREDO = "";
    public String VP_A3981CDCLI = ""; 
    //    
    public A3981 rpteCab = new A3981();
    public A3982 rpteDet = new A3982();
    public A3961 tbl_misl= new A3961();
    public A3953 tbl_client = new A3953();
    
    //info antigueda de saldos
    public double ICORRIENTE = 0.00; 
    public double I1_30 = 0.00; 
    public double I31_60 = 0.00; 
    public double I61_90 = 0.00; 
    public double I91_120 = 0.00; 
    public double I121_MAS = 0.00; 
    
}
