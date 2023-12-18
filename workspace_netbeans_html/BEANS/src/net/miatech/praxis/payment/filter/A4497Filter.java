/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.entities.A4497;

/**
 *
 * @author zperez
 */
public class A4497Filter extends A4497 {

    public String IN_OPTION = "";
    public String IN_IATA = "";
    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_CIA = "";
    public String IN_FORMASERIE = "";
    public String IN_SEQ = "";
    public String IN_NUMBER = "";
    public String IN_COUTRY = "";
    public String IN_STATUS = "";
    public String IN_SOURCE = "";
    public String IN_CHANNEL = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
