package net.miatech.praxis.payment.filter;

import lombok.Data;

/**
 *
 * @author Dvicente
 */
@Data
public class SQP04974Filter {
    //INPUTS
    private String TIPO;
    private String NPROCESADOR;
    private String FECHA_FROM;
    private String FECHA_TO;
    
    //OUTPUTS
    private String RN;
    private String REGIS;
    private String FREGIS;
    private Integer RECEIVED;
    private Integer LOADED;
    private Integer EXONERADO;
    private String PRDA;
    private String PROCESADOR;
    private String PROSEQ;
    private String NOMBREPROC;
}
