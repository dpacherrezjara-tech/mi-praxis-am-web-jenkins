/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

/**
 *
 * @author Dvicente
 */
public class A4264Filter extends A4264{
    
    private String IN_FROMDATE;
    private String IN_TODATE;
    private String IN_IDFILE;
    private String OUT_SQLCODE;
    private String OUT_MESSAGE;

    public String getOUT_SQLCODE() {
        return OUT_SQLCODE;
    }

    public void setOUT_SQLCODE(String OUT_SQLCODE) {
        this.OUT_SQLCODE = OUT_SQLCODE;
    }

    public String getOUT_MESSAGE() {
        return OUT_MESSAGE;
    }

    public void setOUT_MESSAGE(String OUT_MESSAGE) {
        this.OUT_MESSAGE = OUT_MESSAGE;
    }

    public String getIN_FROMDATE() {
        return IN_FROMDATE;
    }

    public void setIN_FROMDATE(String IN_FROMDATE) {
        this.IN_FROMDATE = IN_FROMDATE;
    }

    public String getIN_TODATE() {
        return IN_TODATE;
    }

    public void setIN_TODATE(String IN_TODATE) {
        this.IN_TODATE = IN_TODATE;
    }

    public String getIN_IDFILE() {
        return IN_IDFILE;
    }

    public void setIN_IDFILE(String IN_IDFILE) {
        this.IN_IDFILE = IN_IDFILE;
    }
    
    
    
}
