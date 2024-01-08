package net.miatech.praxis.payment.filter;

import net.miatech.praxis.payment.entities.A4482;

/**
 *
 * @author Dvicente
 */
public class A4482Filter extends A4482{
    private String SFECHA,TICKET,TICKETP;

    public String getSFECHA() {
        return SFECHA;
    }

    public void setSFECHA(String SFECHA) {
        this.SFECHA = SFECHA;
    }

    public String getTICKET() {
        return TICKET;
    }

    public void setTICKET(String TICKET) {
        this.TICKET = TICKET;
    }

    public String getTICKETP() {
        return TICKETP;
    }

    public void setTICKETP(String TICKETP) {
        this.TICKETP = TICKETP;
    }
    
}
