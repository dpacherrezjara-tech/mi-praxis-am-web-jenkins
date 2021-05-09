
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Taxes.New complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Taxes.New">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Airport" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details.Airport" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Domestic" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details.Domestic" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="ChangeFee" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="TicketFee" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Taxes.New", propOrder = {
    "tax",
    "airport",
    "domestic",
    "changeFee",
    "ticketFee"
})
public class TicketingDocumentTaxesNew {

    @XmlElement(name = "Tax")
    protected List<TaxDetails> tax;
    @XmlElement(name = "Airport")
    protected List<TaxDetailsAirport> airport;
    @XmlElement(name = "Domestic")
    protected List<TaxDetailsDomestic> domestic;
    @XmlElement(name = "ChangeFee")
    protected List<TaxDetails> changeFee;
    @XmlElement(name = "TicketFee")
    protected TaxDetails ticketFee;

    /**
     * Gets the value of the tax property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the tax property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTax().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetails }
     * 
     * 
     */
    public List<TaxDetails> getTax() {
        if (tax == null) {
            tax = new ArrayList<TaxDetails>();
        }
        return this.tax;
    }

    /**
     * Gets the value of the airport property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the airport property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAirport().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetailsAirport }
     * 
     * 
     */
    public List<TaxDetailsAirport> getAirport() {
        if (airport == null) {
            airport = new ArrayList<TaxDetailsAirport>();
        }
        return this.airport;
    }

    /**
     * Gets the value of the domestic property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the domestic property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDomestic().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetailsDomestic }
     * 
     * 
     */
    public List<TaxDetailsDomestic> getDomestic() {
        if (domestic == null) {
            domestic = new ArrayList<TaxDetailsDomestic>();
        }
        return this.domestic;
    }

    /**
     * Gets the value of the changeFee property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the changeFee property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getChangeFee().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetails }
     * 
     * 
     */
    public List<TaxDetails> getChangeFee() {
        if (changeFee == null) {
            changeFee = new ArrayList<TaxDetails>();
        }
        return this.changeFee;
    }

    /**
     * Gets the value of the ticketFee property.
     * 
     * @return
     *     possible object is
     *     {@link TaxDetails }
     *     
     */
    public TaxDetails getTicketFee() {
        return ticketFee;
    }

    /**
     * Sets the value of the ticketFee property.
     * 
     * @param value
     *     allowed object is
     *     {@link TaxDetails }
     *     
     */
    public void setTicketFee(TaxDetails value) {
        this.ticketFee = value;
    }

}
