
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Taxes.AdditionalFare complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Taxes.AdditionalFare">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Airport" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details.Airport" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Domestic" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details.Airport" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="AdjustedTax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="manual" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Taxes.AdditionalFare", propOrder = {
    "tax",
    "airport",
    "domestic",
    "adjustedTax"
})
public class TaxesAdditionalFare {

    @XmlElement(name = "Tax")
    protected List<TaxDetails> tax;
    @XmlElement(name = "Airport")
    protected List<TaxDetailsAirport> airport;
    @XmlElement(name = "Domestic")
    protected List<TaxDetailsAirport> domestic;
    @XmlElement(name = "AdjustedTax")
    protected List<TaxDetails> adjustedTax;
    @XmlAttribute(name = "manual")
    protected Boolean manual;

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
     * {@link TaxDetailsAirport }
     * 
     * 
     */
    public List<TaxDetailsAirport> getDomestic() {
        if (domestic == null) {
            domestic = new ArrayList<TaxDetailsAirport>();
        }
        return this.domestic;
    }

    /**
     * Gets the value of the adjustedTax property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the adjustedTax property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAdjustedTax().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxDetails }
     * 
     * 
     */
    public List<TaxDetails> getAdjustedTax() {
        if (adjustedTax == null) {
            adjustedTax = new ArrayList<TaxDetails>();
        }
        return this.adjustedTax;
    }

    /**
     * Gets the value of the manual property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManual() {
        return manual;
    }

    /**
     * Sets the value of the manual property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManual(Boolean value) {
        this.manual = value;
    }

}
