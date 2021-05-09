
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amount.Commission.Category35 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amount.Commission.Category35">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Commission" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Commission" minOccurs="0"/>
 *         &lt;element name="MarkUp" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Commission" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amount.Commission.Category35", propOrder = {
    "commission",
    "markUp"
})
public class AmountCommissionCategory35 {

    @XmlElement(name = "Commission")
    protected AmountCommission commission;
    @XmlElement(name = "MarkUp")
    protected AmountCommission markUp;

    /**
     * Gets the value of the commission property.
     * 
     * @return
     *     possible object is
     *     {@link AmountCommission }
     *     
     */
    public AmountCommission getCommission() {
        return commission;
    }

    /**
     * Sets the value of the commission property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountCommission }
     *     
     */
    public void setCommission(AmountCommission value) {
        this.commission = value;
    }

    /**
     * Gets the value of the markUp property.
     * 
     * @return
     *     possible object is
     *     {@link AmountCommission }
     *     
     */
    public AmountCommission getMarkUp() {
        return markUp;
    }

    /**
     * Sets the value of the markUp property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountCommission }
     *     
     */
    public void setMarkUp(AmountCommission value) {
        this.markUp = value;
    }

}
