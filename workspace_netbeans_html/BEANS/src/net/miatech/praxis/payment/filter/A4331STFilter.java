package net.miatech.praxis.payment.filter;

import lombok.Data;

/**
 *
 * @author Dvicente
 */
@Data
public class A4331STFilter{
    /*
    CAMPOS A TOMAR EN CUENTA PARA SETTLEMENT:
    
    LIQUIDACION
    tgrosamoun => monto liquidacion
    scurrency => moneda liquidacion
    tgrosampay => monto pago liquidacion
    pcurrency => moneda de pago liquidacion
    netopay => total pagado (monto que recibe am, restando comisiones,etc)

    COMISIONES
    discamoun => comision
    sfeeamou => comision (moneda de pago)
    discrate => % de comision
    discamouni => VAT  de comision
    ivacom12 => VAT de comision (moneda de pago)
    discratei => % VAT de comision

    MSI
    sfeerate => % de MSI
    servicefee => monto MSI
    servicfeep => monto MSI (moneda de pago)
    overcom12 => VAT msi
    overcom12p => VAT msi (moneda de pago)
    
    ADJUSTMENT
    adjustment => monto ADJ
    adjustmentp => monto ADJ (moneda de pago)
    */
    private String DESC_PROCTYPE,PAYDATE,PRDA,PCURRENCY,SCURRENCY,PROCTYPE,PROCTYPESQ,SCOUNTRY,PMERCHID;
    private Double TGROSAMOUN,TGROSAMOUN_WCA,TGROSAMPAY,TGROSAMPAY_WCA,
            NETAMOUN,NETOPAY,
            //COMISIONES
            DISCAMOUN,SFEEAMOU,DISCRATE,DISCAMOUNI,IVACOM12,DISCRATEI,
            //MSI
            SFEERATE,SERVICEFEE,SERVICFEEP,OVERCOM12,OVERCOM12P,
            //AJUSTES
            ADJUSTMENT,ADJUSTMENTP,
            TGROSAMOUN_CB,DISCAMOUN_CB,SFEEAMOU_CB,DISCAMOUNI_CB,IVACOM12_CB,
            DISCAMOUN_ADJ,SFEEAMOU_ADJ,DISCAMOUNI_ADJ,IVACOM12_ADJ,
            TAX,TAXP;
    private Integer QTYTRN;
}
