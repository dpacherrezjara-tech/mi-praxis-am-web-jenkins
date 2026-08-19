/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import net.miatech.beans.DBException;

/**
 *
 * @author vhidalgo
 */
public class SQP05245Filter {
    public String VP_CCUST = ""; // CHAR(3),
    public Integer VP_IDANT = 0; //INT,
    public String VP_FDESDE = ""; //VARCHAR(8), --no_usado
    public String VP_FHASTA = ""; //VARCHAR(8), --no_usado
    public String VP_CDCLI = ""; //VARCHAR(9),  --no_usado    
//  Out Message SQL
    public DBException dbException = new DBException();
}
