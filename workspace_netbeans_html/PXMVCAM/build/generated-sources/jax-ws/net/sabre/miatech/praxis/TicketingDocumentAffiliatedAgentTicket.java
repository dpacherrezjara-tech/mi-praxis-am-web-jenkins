
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.AffiliatedAgent.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.AffiliatedAgent.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Booking" type="{http://www.sabre.com/ns/Ticketing/DC}AffiliatedAgent.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.AffiliatedAgent.Ticket", propOrder = {
    "booking"
})
public class TicketingDocumentAffiliatedAgentTicket {

    @XmlElement(name = "Booking")
    protected AffiliatedAgentDetails booking;

    /**
     * Gets the value of the booking property.
     * 
     * @return
     *     possible object is
     *     {@link AffiliatedAgentDetails }
     *     
     */
    public AffiliatedAgentDetails getBooking() {
        return booking;
    }

    /**
     * Sets the value of the booking property.
     * 
     * @param value
     *     allowed object is
     *     {@link AffiliatedAgentDetails }
     *     
     */
    public void setBooking(AffiliatedAgentDetails value) {
        this.booking = value;
    }

}
