/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A2318;

/**
 *
 * @author ctarazona
 */
public class A2318Filter extends A2318{
    public long RN = 0;
    public String strFecFiltro = "";
    public String strFormatDate = "";
    public String IN_TDOC = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    public String DATE = "";
    public String desSTVAL = "";
    public String IN_PNR = "";
    public String descSTVAL = "";
    public String descTREG = "";
    
    
    public Pagination page = new Pagination();
}
