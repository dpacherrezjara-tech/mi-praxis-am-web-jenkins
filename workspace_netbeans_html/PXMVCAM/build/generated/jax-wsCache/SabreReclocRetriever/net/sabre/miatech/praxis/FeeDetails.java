
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Fee.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Fee.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Equivalent" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="TotalTax" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="description" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}int" />
 *       &lt;attribute name="taxCalculation" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="coupon" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Fee.Details", propOrder = {
    "base",
    "equivalent",
    "totalTax",
    "total"
})
public class FeeDetails {

    @XmlElement(name = "Base")
    protected AmountBasic base;
    @XmlElement(name = "Equivalent")
    protected AmountBasic equivalent;
    @XmlElement(name = "TotalTax")
    protected AmountBasic totalTax;
    @XmlElement(name = "Total")
    protected AmountBasic total;
    @XmlAttribute(name = "code")
    protected String code;
    @XmlAttribute(name = "description")
    protected String description;
    @XmlAttribute(name = "quantity")
    protected Integer quantity;
    @XmlAttribute(name = "taxCalculation")
    protected String taxCalculation;
    @XmlAttribute(name = "coupon")
    protected BigInteger coupon;

    /**
     * Gets the value of the base property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getBase() {
        return base;
    }

    /**
     * Sets the value of the base property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setBase(AmountBasic value) {
        this.base = value;
    }

    /**
     * Gets the value of the equivalent property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getEquivalent() {
        return equivalent;
    }

    /**
     * Sets the value of the equivalent property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setEquivalent(AmountBasic value) {
        this.equivalent = value;
    }

    /**
     * Gets the value of the totalTax property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getTotalTax() {
        return totalTax;
    }

    /**
     * Sets the value of the totalTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setTotalTax(AmountBasic value) {
        this.totalTax = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setTotal(AmountBasic value) {
        this.total = value;
    }

    /**
     * Gets the value of the code property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets the value of the code property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCode(String value) {
        this.code = value;
    }

    /**
     * Gets the value of the description property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescription(String value) {
        this.description = value;
    }

    /**
     * Gets the value of the quantity property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * Sets the value of the quantity property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setQuantity(Integer value) {
        this.quantity = value;
    }

    /**
     * Gets the value of the taxCalculation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTaxCalculation() {
        return taxCalculation;
    }

    /**
     * Sets the value of the taxCalculation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTaxCalculation(String value) {
        this.taxCalculation = value;
    }

    /**
     * Gets the value of the coupon property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getCoupon() {
        return coupon;
    }

    /**
     * Sets the value of the coupon property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setCoupon(BigInteger value) {
        this.coupon = value;
    }

}
