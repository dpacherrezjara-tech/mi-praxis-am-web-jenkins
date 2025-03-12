/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package net.miatech.praxis.logic.payments;

import net.miatech.praxis.payment.filter.SQP05047Filter;
import net.miatech.praxis.payment.filter.SQP05046Filter;

/**
 *
 * @author Dvicente
 */
public interface ChargebackSabreStatusLogic {
    //obtiene lista de usos chargeback
    SQP05046Filter getSQP05046Filter(SQP05046Filter filter)throws Exception;
    SQP05047Filter getSQP00697Filter(SQP05047Filter filter)throws Exception;
}
