package net.miatech.praxis.payment.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *
 * @author Dvicente
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class A4581Filter extends A4581{
    private String DESC_PROCTYPE;
    private String SCARDN,SAUTHOC,PMERCHID,SMERCHID,
            SCURRENCY,SPNR,TICKET,STVAL;
    private Double TGROSAMOUN;
}
