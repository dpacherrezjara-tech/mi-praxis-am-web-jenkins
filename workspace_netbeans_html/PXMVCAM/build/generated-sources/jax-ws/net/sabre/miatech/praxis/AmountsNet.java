
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.Net complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.Net">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SellingFare" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Credit" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Discount" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.Net", propOrder = {
    "sellingFare",
    "credit",
    "discount"
})
public class AmountsNet {

    @XmlElement(name = "SellingFare")
    protected AmountBasic sellingFare;
    @XmlElement(name = "Credit")
    protected AmountBasic credit;
    @XmlElement(name = "Discount")
    protected AmountBasic discount;

    /**
     * Gets the value of the sellingFare property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getSellingFare() {
        return sellingFare;
    }

    /**
     * Sets the value of the sellingFare property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setSellingFare(AmountBasic value) {
        this.sellingFare = value;
    }

    /**
     * Gets the value of the credit property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getCredit() {
        return credit;
    }

    /**
     * Sets the value of the credit property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setCredit(AmountBasic value) {
        this.credit = value;
    }

    /**
     * Gets the value of the discount property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getDiscount() {
        return discount;
    }

    /**
     * Sets the value of the discount property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setDiscount(AmountBasic value) {
        this.discount = value;
    }

}
