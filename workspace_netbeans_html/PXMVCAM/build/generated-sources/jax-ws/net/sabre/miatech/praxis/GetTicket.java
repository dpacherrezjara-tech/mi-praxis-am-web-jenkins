
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.aeromexico.com}TicketRequest"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "ticketRequest"
})
@XmlRootElement(name = "GetTicket", namespace = "http://www.aeromexico.com/")
public class GetTicket {

    @XmlElement(name = "TicketRequest", namespace = "http://www.aeromexico.com", required = true, nillable = true)
    protected TicketREQ ticketRequest;

    /**
     * Gets the value of the ticketRequest property.
     * 
     * @return
     *     possible object is
     *     {@link TicketREQ }
     *     
     */
    public TicketREQ getTicketRequest() {
        return ticketRequest;
    }

    /**
     * Sets the value of the ticketRequest property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketREQ }
     *     
     */
    public void setTicketRequest(TicketREQ value) {
        this.ticketRequest = value;
    }

}
