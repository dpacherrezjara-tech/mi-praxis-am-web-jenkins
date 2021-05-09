
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Taxes.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Taxes.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="New" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Taxes.New" minOccurs="0"/>
 *         &lt;element name="Other" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Taxes.Other" minOccurs="0"/>
 *         &lt;element name="AdjustedSellingFare" type="{http://www.sabre.com/ns/Ticketing/DC}Taxes.AdditionalFare" minOccurs="0"/>
 *         &lt;element name="NetFare" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Taxes.New" minOccurs="0"/>
 *         &lt;element name="Selling" type="{http://www.sabre.com/ns/Ticketing/DC}ArrayOfTaxDetails" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Taxes.Ticket", propOrder = {
    "_new",
    "other",
    "adjustedSellingFare",
    "netFare",
    "selling"
})
public class TicketingDocumentTaxesTicket {

    @XmlElement(name = "New")
    protected TicketingDocumentTaxesNew _new;
    @XmlElement(name = "Other")
    protected TicketingDocumentTaxesOther other;
    @XmlElement(name = "AdjustedSellingFare")
    protected TaxesAdditionalFare adjustedSellingFare;
    @XmlElement(name = "NetFare")
    protected TicketingDocumentTaxesNew netFare;
    @XmlElement(name = "Selling")
    protected ArrayOfTaxDetails selling;

    /**
     * Gets the value of the new property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTaxesNew }
     *     
     */
    public TicketingDocumentTaxesNew getNew() {
        return _new;
    }

    /**
     * Sets the value of the new property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTaxesNew }
     *     
     */
    public void setNew(TicketingDocumentTaxesNew value) {
        this._new = value;
    }

    /**
     * Gets the value of the other property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTaxesOther }
     *     
     */
    public TicketingDocumentTaxesOther getOther() {
        return other;
    }

    /**
     * Sets the value of the other property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTaxesOther }
     *     
     */
    public void setOther(TicketingDocumentTaxesOther value) {
        this.other = value;
    }

    /**
     * Gets the value of the adjustedSellingFare property.
     * 
     * @return
     *     possible object is
     *     {@link TaxesAdditionalFare }
     *     
     */
    public TaxesAdditionalFare getAdjustedSellingFare() {
        return adjustedSellingFare;
    }

    /**
     * Sets the value of the adjustedSellingFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaxesAdditionalFare }
     *     
     */
    public void setAdjustedSellingFare(TaxesAdditionalFare value) {
        this.adjustedSellingFare = value;
    }

    /**
     * Gets the value of the netFare property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTaxesNew }
     *     
     */
    public TicketingDocumentTaxesNew getNetFare() {
        return netFare;
    }

    /**
     * Sets the value of the netFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTaxesNew }
     *     
     */
    public void setNetFare(TicketingDocumentTaxesNew value) {
        this.netFare = value;
    }

    /**
     * Gets the value of the selling property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfTaxDetails }
     *     
     */
    public ArrayOfTaxDetails getSelling() {
        return selling;
    }

    /**
     * Sets the value of the selling property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfTaxDetails }
     *     
     */
    public void setSelling(ArrayOfTaxDetails value) {
        this.selling = value;
    }

}
