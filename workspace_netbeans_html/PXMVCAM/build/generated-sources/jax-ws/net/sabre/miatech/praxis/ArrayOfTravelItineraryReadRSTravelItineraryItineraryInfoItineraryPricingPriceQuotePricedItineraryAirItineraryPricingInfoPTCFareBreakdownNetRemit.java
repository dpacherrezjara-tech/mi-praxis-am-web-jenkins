
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownNetRemit complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownNetRemit">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="NetRemit" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownNetRemit", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "netRemit"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownNetRemit {

    @XmlElement(name = "NetRemit")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownNetRemit.NetRemit> netRemit;

    /**
     * Gets the value of the netRemit property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the netRemit property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getNetRemit().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownNetRemit.NetRemit }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownNetRemit.NetRemit> getNetRemit() {
        if (netRemit == null) {
            netRemit = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownNetRemit.NetRemit>();
        }
        return this.netRemit;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "text"
    })
    public static class NetRemit {

        @XmlElement(name = "Text", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String text;

        /**
         * Gets the value of the text property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getText() {
            return text;
        }

        /**
         * Sets the value of the text property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setText(String value) {
            this.text = value;
        }

    }

}
