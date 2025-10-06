/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.beans;

import net.miatech.libmiatec.SQP05739;

/**
 *
 * @author zperez
 */
public class SQP05739Filter extends SQP05739{

    public String IN_DATEFROM = "";
    public String IN_DATETO = "";
    public String IN_USER = "";
    public String IN_PROCESADOR = "";
    public String IN_OPTION = "";
    public net.miatech.beans.Pagination page = new net.miatech.beans.Pagination();
    public DBException dbException = new DBException();
}
