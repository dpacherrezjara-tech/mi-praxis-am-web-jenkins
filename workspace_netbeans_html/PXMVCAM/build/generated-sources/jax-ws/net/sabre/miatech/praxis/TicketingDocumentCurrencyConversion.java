
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.CurrencyConversion complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.CurrencyConversion">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="BankerSellingRate" type="{http://www.sabre.com/ns/Ticketing/DC}CurrencyConversion.Details" minOccurs="0"/>
 *         &lt;element name="BankerBuyingRate" type="{http://www.sabre.com/ns/Ticketing/DC}CurrencyConversion.Details" minOccurs="0"/>
 *         &lt;element name="IataClearingHouseRate" type="{http://www.sabre.com/ns/Ticketing/DC}CurrencyConversion.Details" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.CurrencyConversion", propOrder = {
    "bankerSellingRate",
    "bankerBuyingRate",
    "iataClearingHouseRate"
})
public class TicketingDocumentCurrencyConversion {

    @XmlElement(name = "BankerSellingRate")
    protected CurrencyConversionDetails bankerSellingRate;
    @XmlElement(name = "BankerBuyingRate")
    protected CurrencyConversionDetails bankerBuyingRate;
    @XmlElement(name = "IataClearingHouseRate")
    protected CurrencyConversionDetails iataClearingHouseRate;

    /**
     * Gets the value of the bankerSellingRate property.
     * 
     * @return
     *     possible object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public CurrencyConversionDetails getBankerSellingRate() {
        return bankerSellingRate;
    }

    /**
     * Sets the value of the bankerSellingRate property.
     * 
     * @param value
     *     allowed object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public void setBankerSellingRate(CurrencyConversionDetails value) {
        this.bankerSellingRate = value;
    }

    /**
     * Gets the value of the bankerBuyingRate property.
     * 
     * @return
     *     possible object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public CurrencyConversionDetails getBankerBuyingRate() {
        return bankerBuyingRate;
    }

    /**
     * Sets the value of the bankerBuyingRate property.
     * 
     * @param value
     *     allowed object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public void setBankerBuyingRate(CurrencyConversionDetails value) {
        this.bankerBuyingRate = value;
    }

    /**
     * Gets the value of the iataClearingHouseRate property.
     * 
     * @return
     *     possible object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public CurrencyConversionDetails getIataClearingHouseRate() {
        return iataClearingHouseRate;
    }

    /**
     * Sets the value of the iataClearingHouseRate property.
     * 
     * @param value
     *     allowed object is
     *     {@link CurrencyConversionDetails }
     *     
     */
    public void setIataClearingHouseRate(CurrencyConversionDetails value) {
        this.iataClearingHouseRate = value;
    }

}
