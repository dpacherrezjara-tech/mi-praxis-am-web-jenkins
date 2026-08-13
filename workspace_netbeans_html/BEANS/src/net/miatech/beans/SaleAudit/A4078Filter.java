/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.SaleAudit;

import net.miatech.beans.DBException;
import net.miatech.praxis.SaleAudit.A4078;

/**
 *
 * @author zperez
 */
public class A4078Filter extends A4078{

    public String IN_DATETO = "";
    public String IN_OPTION = "";
    public String IN_IATA = "";
    public String IN_COUNTRY = "";
    public String IN_TYPE = "";

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
