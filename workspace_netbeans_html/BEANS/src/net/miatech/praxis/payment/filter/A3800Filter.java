/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.payment.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A3800;

/**
 *
 * @author ctarazona
 */
public class A3800Filter extends A3800 {
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO = "";
    
    public Pagination page = new Pagination();
}
