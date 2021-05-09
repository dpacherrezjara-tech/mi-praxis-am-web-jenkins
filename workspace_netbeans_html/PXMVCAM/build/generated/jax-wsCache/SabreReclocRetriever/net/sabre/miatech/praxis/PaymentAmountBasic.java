
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for PaymentAmount.Basic complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentAmount.Basic">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Amount" type="{http://www.sabre.com/ns/Ticketing/DC}PaymentAmount" minOccurs="0"/>
 *         &lt;element name="ApplyCreditInd" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentAmount.Basic", propOrder = {
    "amount",
    "applyCreditInd"
})
public class PaymentAmountBasic {

    @XmlElement(name = "Amount")
    protected PaymentAmount amount;
    @XmlElement(name = "ApplyCreditInd")
    protected Boolean applyCreditInd;

    /**
     * Gets the value of the amount property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentAmount }
     *     
     */
    public PaymentAmount getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentAmount }
     *     
     */
    public void setAmount(PaymentAmount value) {
        this.amount = value;
    }

    /**
     * Gets the value of the applyCreditInd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isApplyCreditInd() {
        return applyCreditInd;
    }

    /**
     * Sets the value of the applyCreditInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setApplyCreditInd(Boolean value) {
        this.applyCreditInd = value;
    }

}
