
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amount.Details.RateofExchange complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amount.Details.RateofExchange">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details">
 *       &lt;sequence>
 *         &lt;element name="RateOfExchange" type="{http://www.sabre.com/ns/Ticketing/DC}CurrencyConversion.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amount.Details.RateofExchange", propOrder = {
    "rateOfExchange"
})
public class AmountDetailsRateofExchange
    extends AmountDetails
{

    @XmlElement(name = "RateOfExchange")
    protected CurrencyConversionDetails rateOfExchange;

    /**
     * Gets the value of the rateOfExchange property.
     * 
     * @return
     *     possible object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public CurrencyConversionDetails getRateOfExchange() {
        return rateOfExchange;
    }

    /**
     * Sets the value of the rateOfExchange property.
     * 
     * @param value
     *     allowed object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public void setRateOfExchange(CurrencyConversionDetails value) {
        this.rateOfExchange = value;
    }

}
