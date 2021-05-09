
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.FareCalculation.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.FareCalculation.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="New" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="BulkTicket" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="InclusiveTour" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="Exchange" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="AdjustedSellingFare" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details.AdditionalFare" minOccurs="0"/>
 *         &lt;element name="NetFare" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="OriginalFareWithFees" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *         &lt;element name="OriginalFareWithHandlingFees" type="{http://www.sabre.com/ns/Ticketing/DC}FareCalculation.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.FareCalculation.Ticket", propOrder = {
    "_new",
    "bulkTicket",
    "inclusiveTour",
    "exchange",
    "adjustedSellingFare",
    "netFare",
    "originalFareWithFees",
    "originalFareWithHandlingFees"
})
public class TicketingDocumentFareCalculationTicket {

    @XmlElement(name = "New")
    protected FareCalculationDetails _new;
    @XmlElement(name = "BulkTicket")
    protected FareCalculationDetails bulkTicket;
    @XmlElement(name = "InclusiveTour")
    protected FareCalculationDetails inclusiveTour;
    @XmlElement(name = "Exchange")
    protected FareCalculationDetails exchange;
    @XmlElement(name = "AdjustedSellingFare")
    protected FareCalculationDetailsAdditionalFare adjustedSellingFare;
    @XmlElement(name = "NetFare")
    protected FareCalculationDetails netFare;
    @XmlElement(name = "OriginalFareWithFees")
    protected FareCalculationDetails originalFareWithFees;
    @XmlElement(name = "OriginalFareWithHandlingFees")
    protected FareCalculationDetails originalFareWithHandlingFees;
    @XmlAttribute(name = "type")
    protected String type;

    /**
     * Gets the value of the new property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getNew() {
        return _new;
    }

    /**
     * Sets the value of the new property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setNew(FareCalculationDetails value) {
        this._new = value;
    }

    /**
     * Gets the value of the bulkTicket property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getBulkTicket() {
        return bulkTicket;
    }

    /**
     * Sets the value of the bulkTicket property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setBulkTicket(FareCalculationDetails value) {
        this.bulkTicket = value;
    }

    /**
     * Gets the value of the inclusiveTour property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getInclusiveTour() {
        return inclusiveTour;
    }

    /**
     * Sets the value of the inclusiveTour property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setInclusiveTour(FareCalculationDetails value) {
        this.inclusiveTour = value;
    }

    /**
     * Gets the value of the exchange property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getExchange() {
        return exchange;
    }

    /**
     * Sets the value of the exchange property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setExchange(FareCalculationDetails value) {
        this.exchange = value;
    }

    /**
     * Gets the value of the adjustedSellingFare property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetailsAdditionalFare }
     *     
     */
    public FareCalculationDetailsAdditionalFare getAdjustedSellingFare() {
        return adjustedSellingFare;
    }

    /**
     * Sets the value of the adjustedSellingFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetailsAdditionalFare }
     *     
     */
    public void setAdjustedSellingFare(FareCalculationDetailsAdditionalFare value) {
        this.adjustedSellingFare = value;
    }

    /**
     * Gets the value of the netFare property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getNetFare() {
        return netFare;
    }

    /**
     * Sets the value of the netFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setNetFare(FareCalculationDetails value) {
        this.netFare = value;
    }

    /**
     * Gets the value of the originalFareWithFees property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getOriginalFareWithFees() {
        return originalFareWithFees;
    }

    /**
     * Sets the value of the originalFareWithFees property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setOriginalFareWithFees(FareCalculationDetails value) {
        this.originalFareWithFees = value;
    }

    /**
     * Gets the value of the originalFareWithHandlingFees property.
     * 
     * @return
     *     possible object is
     *     {@link FareCalculationDetails }
     *     
     */
    public FareCalculationDetails getOriginalFareWithHandlingFees() {
        return originalFareWithHandlingFees;
    }

    /**
     * Sets the value of the originalFareWithHandlingFees property.
     * 
     * @param value
     *     allowed object is
     *     {@link FareCalculationDetails }
     *     
     */
    public void setOriginalFareWithHandlingFees(FareCalculationDetails value) {
        this.originalFareWithHandlingFees = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

}
