
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Reservation.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Reservation.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Sabre" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Reservation" minOccurs="0"/>
 *         &lt;element name="OtherSystem" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Reservation" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Reservation.Details", propOrder = {
    "sabre",
    "otherSystem"
})
public class ReservationDetails {

    @XmlElement(name = "Sabre")
    protected IdentifierReservation sabre;
    @XmlElement(name = "OtherSystem")
    protected IdentifierReservation otherSystem;

    /**
     * Gets the value of the sabre property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierReservation }
     *     
     */
    public IdentifierReservation getSabre() {
        return sabre;
    }

    /**
     * Sets the value of the sabre property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierReservation }
     *     
     */
    public void setSabre(IdentifierReservation value) {
        this.sabre = value;
    }

    /**
     * Gets the value of the otherSystem property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierReservation }
     *     
     */
    public IdentifierReservation getOtherSystem() {
        return otherSystem;
    }

    /**
     * Sets the value of the otherSystem property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierReservation }
     *     
     */
    public void setOtherSystem(IdentifierReservation value) {
        this.otherSystem = value;
    }

}
