
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Customer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Customer">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Traveler" type="{http://www.sabre.com/ns/Ticketing/DC}Customer.Traveler.Details" minOccurs="0"/>
 *         &lt;element name="Purchaser" type="{http://www.sabre.com/ns/Ticketing/DC}Customer.Purchaser.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Customer", propOrder = {
    "traveler",
    "purchaser"
})
public class TicketingDocumentCustomer {

    @XmlElement(name = "Traveler")
    protected CustomerTravelerDetails traveler;
    @XmlElement(name = "Purchaser")
    protected CustomerPurchaserDetails purchaser;

    /**
     * Gets the value of the traveler property.
     * 
     * @return
     *     possible object is
     *     {@link CustomerTravelerDetails }
     *     
     */
    public CustomerTravelerDetails getTraveler() {
        return traveler;
    }

    /**
     * Sets the value of the traveler property.
     * 
     * @param value
     *     allowed object is
     *     {@link CustomerTravelerDetails }
     *     
     */
    public void setTraveler(CustomerTravelerDetails value) {
        this.traveler = value;
    }

    /**
     * Gets the value of the purchaser property.
     * 
     * @return
     *     possible object is
     *     {@link CustomerPurchaserDetails }
     *     
     */
    public CustomerPurchaserDetails getPurchaser() {
        return purchaser;
    }

    /**
     * Sets the value of the purchaser property.
     * 
     * @param value
     *     allowed object is
     *     {@link CustomerPurchaserDetails }
     *     
     */
    public void setPurchaser(CustomerPurchaserDetails value) {
        this.purchaser = value;
    }

}
