/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.elavon;

/**
 *
 * @author Dvicente
 */
public enum ElavonFilesEnum {
    USAGE_REPORT_REFUND,
    USAGE_REPORT,
    REBOOKEDTICKETS,
    Voucherissuance;
    
    public static String getById(int id) {
        for(ElavonFilesEnum e : values()) {
            if (e.ordinal() == id) {
                return e.name();
            }
        }
        return null;
    }
}
