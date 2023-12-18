package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.miatech.praxis.payment.entities.CustomPageImpl;

/**
 *
 * @author Dvicente
 */
public class SQP05033Filter extends CustomPageImpl{
    private String TIPO;
    private String COMPLEMENTO;
    private String FECHA_FROM;
    private List<Map<String,Object>> lst = new ArrayList<>();

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String TIPO) {
        this.TIPO = TIPO;
    }

    public String getCOMPLEMENTO() {
        return COMPLEMENTO;
    }

    public void setCOMPLEMENTO(String COMPLEMENTO) {
        this.COMPLEMENTO = COMPLEMENTO;
    }

    public String getFECHA_FROM() {
        return FECHA_FROM;
    }

    public void setFECHA_FROM(String FECHA_FROM) {
        this.FECHA_FROM = FECHA_FROM;
    }

    public List<Map<String, Object>> getLst() {
        return lst;
    }

    public void setLst(List<Map<String, Object>> lst) {
        this.lst = lst;
    }
    
}
