/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.A4306;

/**
 *
 * @author zperez
 */
public class A4306Filter extends A4306 {

    public String IN_MODULE = "";
    public String IN_TYPE = "";
    public String IN_EMAIL = "";
    public String IN_STATUS = "";
    public String IN_OPCION = "";
    public String IN_LABL = "";

    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();

}
