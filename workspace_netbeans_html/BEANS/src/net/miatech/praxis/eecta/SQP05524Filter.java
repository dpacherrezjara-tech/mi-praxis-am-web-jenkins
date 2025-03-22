/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.eecta;

import com.google.gson.JsonArray;
import net.miatech.beans.DBException;

/**
 *
 * @author vhidalgo
 */
public class SQP05524Filter {

    public String VP_CCUST = "";
    public String VP_EMAILS = "";
//    public String VP_DATA = "";
    public JsonArray VP_DATA = new JsonArray(); // Usar JsonArray directamente
    public DBException dbException = new DBException();
}
