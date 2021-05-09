
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Amounts.Ticket complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Amounts.Ticket">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="New" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.New" minOccurs="0"/>
 *         &lt;element name="BulkTicket" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.BulkTicket" minOccurs="0"/>
 *         &lt;element name="InclusiveTour" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.InclusiveTour" minOccurs="0"/>
 *         &lt;element name="Net" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.Net" minOccurs="0"/>
 *         &lt;element name="Selling" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.WithTaxes" minOccurs="0"/>
 *         &lt;element name="Other" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.Other" minOccurs="0"/>
 *         &lt;element name="AdjustedSellingFare" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.AdditionalFare" minOccurs="0"/>
 *         &lt;element name="NetFare" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.AdditionalFare" minOccurs="0"/>
 *         &lt;element name="CommissionDetails" type="{http://www.sabre.com/ns/Ticketing/DC}Amounts.Commission" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Amounts.Ticket", propOrder = {
    "_new",
    "bulkTicket",
    "inclusiveTour",
    "net",
    "selling",
    "other",
    "adjustedSellingFare",
    "netFare",
    "commissionDetails"
})
public class TicketingDocumentAmountsTicket {

    @XmlElement(name = "New")
    protected AmountsNew _new;
    @XmlElement(name = "BulkTicket")
    protected AmountsBulkTicket bulkTicket;
    @XmlElement(name = "InclusiveTour")
    protected AmountsInclusiveTour inclusiveTour;
    @XmlElement(name = "Net")
    protected AmountsNet net;
    @XmlElement(name = "Selling")
    protected AmountsWithTaxes selling;
    @XmlElement(name = "Other")
    protected AmountsOther other;
    @XmlElement(name = "AdjustedSellingFare")
    protected AmountsAdditionalFare adjustedSellingFare;
    @XmlElement(name = "NetFare")
    protected AmountsAdditionalFare netFare;
    @XmlElement(name = "CommissionDetails")
    protected AmountsCommission commissionDetails;

    /**
     * Gets the value of the new property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsNew }
     *     
     */
    public AmountsNew getNew() {
        return _new;
    }

    /**
     * Sets the value of the new property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsNew }
     *     
     */
    public void setNew(AmountsNew value) {
        this._new = value;
    }

    /**
     * Gets the value of the bulkTicket property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsBulkTicket }
     *     
     */
    public AmountsBulkTicket getBulkTicket() {
        return bulkTicket;
    }

    /**
     * Sets the value of the bulkTicket property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsBulkTicket }
     *     
     */
    public void setBulkTicket(AmountsBulkTicket value) {
        this.bulkTicket = value;
    }

    /**
     * Gets the value of the inclusiveTour property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsInclusiveTour }
     *     
     */
    public AmountsInclusiveTour getInclusiveTour() {
        return inclusiveTour;
    }

    /**
     * Sets the value of the inclusiveTour property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsInclusiveTour }
     *     
     */
    public void setInclusiveTour(AmountsInclusiveTour value) {
        this.inclusiveTour = value;
    }

    /**
     * Gets the value of the net property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsNet }
     *     
     */
    public AmountsNet getNet() {
        return net;
    }

    /**
     * Sets the value of the net property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsNet }
     *     
     */
    public void setNet(AmountsNet value) {
        this.net = value;
    }

    /**
     * Gets the value of the selling property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsWithTaxes }
     *     
     */
    public AmountsWithTaxes getSelling() {
        return selling;
    }

    /**
     * Sets the value of the selling property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsWithTaxes }
     *     
     */
    public void setSelling(AmountsWithTaxes value) {
        this.selling = value;
    }

    /**
     * Gets the value of the other property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsOther }
     *     
     */
    public AmountsOther getOther() {
        return other;
    }

    /**
     * Sets the value of the other property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsOther }
     *     
     */
    public void setOther(AmountsOther value) {
        this.other = value;
    }

    /**
     * Gets the value of the adjustedSellingFare property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsAdditionalFare }
     *     
     */
    public AmountsAdditionalFare getAdjustedSellingFare() {
        return adjustedSellingFare;
    }

    /**
     * Sets the value of the adjustedSellingFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsAdditionalFare }
     *     
     */
    public void setAdjustedSellingFare(AmountsAdditionalFare value) {
        this.adjustedSellingFare = value;
    }

    /**
     * Gets the value of the netFare property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsAdditionalFare }
     *     
     */
    public AmountsAdditionalFare getNetFare() {
        return netFare;
    }

    /**
     * Sets the value of the netFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsAdditionalFare }
     *     
     */
    public void setNetFare(AmountsAdditionalFare value) {
        this.netFare = value;
    }

    /**
     * Gets the value of the commissionDetails property.
     * 
     * @return
     *     possible object is
     *     {@link AmountsCommission }
     *     
     */
    public AmountsCommission getCommissionDetails() {
        return commissionDetails;
    }

    /**
     * Sets the value of the commissionDetails property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountsCommission }
     *     
     */
    public void setCommissionDetails(AmountsCommission value) {
        this.commissionDetails = value;
    }

}
