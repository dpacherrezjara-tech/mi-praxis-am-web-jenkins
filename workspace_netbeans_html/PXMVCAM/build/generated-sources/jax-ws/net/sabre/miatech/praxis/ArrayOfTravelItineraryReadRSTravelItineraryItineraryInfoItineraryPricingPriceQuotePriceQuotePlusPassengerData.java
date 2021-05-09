
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PassengerData" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="NameNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
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
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "passengerData"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData {

    @XmlElement(name = "PassengerData")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData.PassengerData> passengerData;

    /**
     * Gets the value of the passengerData property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the passengerData property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPassengerData().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData.PassengerData }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData.PassengerData> getPassengerData() {
        if (passengerData == null) {
            passengerData = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItineraryPricingPriceQuotePriceQuotePlusPassengerData.PassengerData>();
        }
        return this.passengerData;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="NameNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "value"
    })
    public static class PassengerData {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "NameNumber")
        protected String nameNumber;

        /**
         * Gets the value of the value property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the nameNumber property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNameNumber() {
            return nameNumber;
        }

        /**
         * Sets the value of the nameNumber property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNameNumber(String value) {
            this.nameNumber = value;
        }

    }

}
