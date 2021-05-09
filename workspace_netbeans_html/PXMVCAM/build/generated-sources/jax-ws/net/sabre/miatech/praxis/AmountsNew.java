
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.New complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.New">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Equivalent" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details.CurrencyConversion" minOccurs="0"/>
 *         &lt;element name="TotalTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details.RateofExchange" minOccurs="0"/>
 *         &lt;element name="Net" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Details" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.New", propOrder = {
    "base",
    "equivalent",
    "totalTax",
    "total",
    "net",
    "tax"
})
public class AmountsNew {

    @XmlElement(name = "Base")
    protected AmountDetails base;
    @XmlElement(name = "Equivalent")
    protected AmountDetailsCurrencyConversion equivalent;
    @XmlElement(name = "TotalTax")
    protected AmountDetails totalTax;
    @XmlElement(name = "Total")
    protected AmountDetailsRateofExchange total;
    @XmlElement(name = "Net")
    protected AmountDetails net;
    @XmlElement(name = "Tax")
    protected List<TaxDetails> tax;

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
     *     {@link AmountDetailsCurrencyConversion }
     *     
     */
    public AmountDetailsCurrencyConversion getEquivalent() {
        return equivalent;
    }

    /**
     * Sets the value of the equivalent property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetailsCurrencyConversion }
     *     
     */
    public void setEquivalent(AmountDetailsCurrencyConversion value) {
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
     *     {@link AmountDetailsRateofExchange }
     *     
     */
    public AmountDetailsRateofExchange getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetailsRateofExchange }
     *     
     */
    public void setTotal(AmountDetailsRateofExchange value) {
        this.total = value;
    }

    /**
     * Gets the value of the net property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getNet() {
        return net;
    }

    /**
     * Sets the value of the net property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setNet(AmountDetails value) {
        this.net = value;
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

}
