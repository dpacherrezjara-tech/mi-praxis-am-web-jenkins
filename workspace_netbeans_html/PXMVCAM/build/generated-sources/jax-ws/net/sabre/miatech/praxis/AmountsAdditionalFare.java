
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.AdditionalFare complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.AdditionalFare">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Equivalent" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="TotalTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Commission" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Rate" minOccurs="0"/>
 *         &lt;element name="MarkUp" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="AdjustedSelling" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="HandlingFee" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" maxOccurs="unbounded" minOccurs="0"/>
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
@XmlType(name = "Amounts.AdditionalFare", propOrder = {
    "base",
    "equivalent",
    "totalTax",
    "total",
    "tax",
    "commission",
    "markUp",
    "adjustedSelling",
    "handlingFee"
})
public class AmountsAdditionalFare {

    @XmlElement(name = "Base")
    protected AmountDetails base;
    @XmlElement(name = "Equivalent")
    protected AmountDetails equivalent;
    @XmlElement(name = "TotalTax")
    protected AmountDetails totalTax;
    @XmlElement(name = "Total")
    protected AmountDetails total;
    @XmlElement(name = "Tax")
    protected List<TaxDetails> tax;
    @XmlElement(name = "Commission")
    protected AmountRate commission;
    @XmlElement(name = "MarkUp")
    protected AmountDetails markUp;
    @XmlElement(name = "AdjustedSelling")
    protected AmountDetails adjustedSelling;
    @XmlElement(name = "HandlingFee")
    protected List<AmountBasic> handlingFee;
    @XmlAttribute(name = "manual")
    protected Boolean manual;

    /**
     * Gets the value of the base property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getBase() {
        return base;
    }

    /**
     * Sets the value of the base property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setBase(AmountDetails value) {
        this.base = value;
    }

    /**
     * Gets the value of the equivalent property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getEquivalent() {
        return equivalent;
    }

    /**
     * Sets the value of the equivalent property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setEquivalent(AmountDetails value) {
        this.equivalent = value;
    }

    /**
     * Gets the value of the totalTax property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getTotalTax() {
        return totalTax;
    }

    /**
     * Sets the value of the totalTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setTotalTax(AmountDetails value) {
        this.totalTax = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setTotal(AmountDetails value) {
        this.total = value;
    }

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
     * Gets the value of the commission property.
     * 
     * @return
     *     possible object is
     *     {@link AmountRate }
     *     
     */
    public AmountRate getCommission() {
        return commission;
    }

    /**
     * Sets the value of the commission property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountRate }
     *     
     */
    public void setCommission(AmountRate value) {
        this.commission = value;
    }

    /**
     * Gets the value of the markUp property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getMarkUp() {
        return markUp;
    }

    /**
     * Sets the value of the markUp property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setMarkUp(AmountDetails value) {
        this.markUp = value;
    }

    /**
     * Gets the value of the adjustedSelling property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getAdjustedSelling() {
        return adjustedSelling;
    }

    /**
     * Sets the value of the adjustedSelling property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setAdjustedSelling(AmountDetails value) {
        this.adjustedSelling = value;
    }

    /**
     * Gets the value of the handlingFee property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the handlingFee property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHandlingFee().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link AmountBasic }
     * 
     * 
     */
    public List<AmountBasic> getHandlingFee() {
        if (handlingFee == null) {
            handlingFee = new ArrayList<AmountBasic>();
        }
        return this.handlingFee;
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
