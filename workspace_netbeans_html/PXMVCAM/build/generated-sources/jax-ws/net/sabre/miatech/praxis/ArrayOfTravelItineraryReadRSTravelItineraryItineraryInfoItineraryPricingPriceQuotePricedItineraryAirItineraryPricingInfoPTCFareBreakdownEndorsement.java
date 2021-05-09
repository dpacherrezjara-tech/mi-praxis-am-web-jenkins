
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownEndorsement complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownEndorsement">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Endorsement" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTC_FareBreakdownEndorsement", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "endorsement"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownEndorsement {

    @XmlElement(name = "Endorsement")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownEndorsement.Endorsement> endorsement;

    /**
     * Gets the value of the endorsement property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the endorsement property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEndorsement().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownEndorsement.Endorsement }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownEndorsement.Endorsement> getEndorsement() {
        if (endorsement == null) {
            endorsement = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePricedItineraryAirItineraryPricingInfoPTCFareBreakdownEndorsement.Endorsement>();
        }
        return this.endorsement;
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
     *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class Endorsement {

        @XmlElement(name = "Text", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String text;
        @XmlAttribute(name = "type")
        protected String type;

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

        /**
         * Gets the value of the type property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getType() {
            return type;
        }

        /**
         * Sets the value of the type property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setType(String value) {
            this.type = value;
        }

    }

}
