
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AssociatedPNRSummary" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="RecordLocator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="NumberOfSeats" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="TicketingTimeLimitInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="FreeText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "associatedPNRSummary"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary {

    @XmlElement(name = "AssociatedPNRSummary")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary.AssociatedPNRSummary> associatedPNRSummary;

    /**
     * Gets the value of the associatedPNRSummary property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the associatedPNRSummary property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAssociatedPNRSummary().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary.AssociatedPNRSummary }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary.AssociatedPNRSummary> getAssociatedPNRSummary() {
        if (associatedPNRSummary == null) {
            associatedPNRSummary = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryCustomerInfoPersonNameGroupInfoAssociatedReferenceInformationAssociatedPNRSummary.AssociatedPNRSummary>();
        }
        return this.associatedPNRSummary;
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
     *         &lt;element name="RecordLocator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="NumberOfSeats" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="TicketingTimeLimitInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="FreeText" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
        "recordLocator",
        "numberOfSeats",
        "ticketingTimeLimitInfo",
        "freeText"
    })
    public static class AssociatedPNRSummary {

        @XmlElement(name = "RecordLocator", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String recordLocator;
        @XmlElement(name = "NumberOfSeats", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String numberOfSeats;
        @XmlElement(name = "TicketingTimeLimitInfo", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String ticketingTimeLimitInfo;
        @XmlElement(name = "FreeText", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected String freeText;

        /**
         * Gets the value of the recordLocator property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRecordLocator() {
            return recordLocator;
        }

        /**
         * Sets the value of the recordLocator property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRecordLocator(String value) {
            this.recordLocator = value;
        }

        /**
         * Gets the value of the numberOfSeats property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNumberOfSeats() {
            return numberOfSeats;
        }

        /**
         * Sets the value of the numberOfSeats property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNumberOfSeats(String value) {
            this.numberOfSeats = value;
        }

        /**
         * Gets the value of the ticketingTimeLimitInfo property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTicketingTimeLimitInfo() {
            return ticketingTimeLimitInfo;
        }

        /**
         * Sets the value of the ticketingTimeLimitInfo property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTicketingTimeLimitInfo(String value) {
            this.ticketingTimeLimitInfo = value;
        }

        /**
         * Gets the value of the freeText property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getFreeText() {
            return freeText;
        }

        /**
         * Sets the value of the freeText property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setFreeText(String value) {
            this.freeText = value;
        }

    }

}
