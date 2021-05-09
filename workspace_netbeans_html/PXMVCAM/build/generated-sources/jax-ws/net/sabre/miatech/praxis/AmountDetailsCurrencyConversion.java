
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amount.Details.CurrencyConversion complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amount.Details.CurrencyConversion">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details">
 *       &lt;sequence>
 *         &lt;element name="CurrencyConversion" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.CurrencyConversion" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amount.Details.CurrencyConversion", propOrder = {
    "currencyConversion"
})
public class AmountDetailsCurrencyConversion
    extends AmountDetails
{

    @XmlElement(name = "CurrencyConversion")
    protected TicketingDocumentCurrencyConversion currencyConversion;

    /**
     * Gets the value of the currencyConversion property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentCurrencyConversion }
     *     
     */
    public TicketingDocumentCurrencyConversion getCurrencyConversion() {
        return currencyConversion;
    }

    /**
     * Sets the value of the currencyConversion property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentCurrencyConversion }
     *     
     */
    public void setCurrencyConversion(TicketingDocumentCurrencyConversion value) {
        this.currencyConversion = value;
    }

}
