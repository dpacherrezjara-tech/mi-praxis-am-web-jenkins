package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Dvicente
 */
public class SQP04972Filter {
    private String CCUST;
    private String TIPO;
    private String FROM_YEAR;
    //OUT
    private int numFiles;
    private String STS;
    
    private List<Map<String,String>> lstFechas = new ArrayList<>();
    //private List<Map<String,String>> lstFiles = new ArrayList<>();

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getFROM_YEAR() {
        return FROM_YEAR;
    }

    public void setFROM_YEAR(String FROM_YEAR) {
        this.FROM_YEAR = FROM_YEAR;
    }

    public String getSTS() {
        return STS;
    }

    public void setSTS(String STS) {
        this.STS = STS;
    }

    public List<Map<String, String>> getLstFechas() {
        return lstFechas;
    }

    public void setLstFechas(List<Map<String, String>> lstFechas) {
        this.lstFechas = lstFechas;
    }

    public int getNumFiles() {
        return numFiles;
    }

    public void setNumFiles(int numFiles) {
        this.numFiles = numFiles;
    }

    
    
    
}
