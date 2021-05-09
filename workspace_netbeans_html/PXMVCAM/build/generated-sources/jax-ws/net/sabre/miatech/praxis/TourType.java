
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TourType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TourType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="StatusCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MessageStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TravelType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Vendor" type="{http://services.sabre.com/res/or/v1_4}CompanyType" minOccurs="0"/>
 *         &lt;element name="StartDetails" type="{http://services.sabre.com/res/or/v1_4}LocationDetailsType" minOccurs="0"/>
 *         &lt;element name="EndDetails" type="{http://services.sabre.com/res/or/v1_4}LocationDetailsType" minOccurs="0"/>
 *         &lt;element name="Price" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Total" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
 *                   &lt;element name="Breakdown" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="References" type="{http://services.sabre.com/res/or/v1_4}ArrayOfTourTypePriceBreakdownPassengerRef" minOccurs="0"/>
 *                             &lt;element name="Price" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="Customer" type="{http://services.sabre.com/res/or/v1_4}PassengerType" minOccurs="0"/>
 *         &lt;element name="Passengers" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Passenger" type="{http://services.sabre.com/res/or/v1_4}PassengerType" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}int" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="Services" type="{http://services.sabre.com/res/or/v1_4}ArrayOfServiceRefType" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TourType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "statusCode",
    "messageStatus",
    "travelType",
    "vendor",
    "startDetails",
    "endDetails",
    "price",
    "customer",
    "passengers",
    "services"
})
public class TourType {

    @XmlElement(name = "StatusCode")
    protected String statusCode;
    @XmlElement(name = "MessageStatus")
    protected String messageStatus;
    @XmlElement(name = "TravelType")
    protected String travelType;
    @XmlElement(name = "Vendor")
    protected CompanyType vendor;
    @XmlElement(name = "StartDetails")
    protected LocationDetailsType startDetails;
    @XmlElement(name = "EndDetails")
    protected LocationDetailsType endDetails;
    @XmlElement(name = "Price")
    protected TourType.Price price;
    @XmlElement(name = "Customer")
    protected PassengerType customer;
    @XmlElement(name = "Passengers")
    protected TourType.Passengers passengers;
    @XmlElement(name = "Services")
    protected ArrayOfServiceRefType services;

    /**
     * Gets the value of the statusCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStatusCode() {
        return statusCode;
    }

    /**
     * Sets the value of the statusCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStatusCode(String value) {
        this.statusCode = value;
    }

    /**
     * Gets the value of the messageStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMessageStatus() {
        return messageStatus;
    }

    /**
     * Sets the value of the messageStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMessageStatus(String value) {
        this.messageStatus = value;
    }

    /**
     * Gets the value of the travelType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTravelType() {
        return travelType;
    }

    /**
     * Sets the value of the travelType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTravelType(String value) {
        this.travelType = value;
    }

    /**
     * Gets the value of the vendor property.
     * 
     * @return
     *     possible object is
     *     {@link CompanyType }
     *     
     */
    public CompanyType getVendor() {
        return vendor;
    }

    /**
     * Sets the value of the vendor property.
     * 
     * @param value
     *     allowed object is
     *     {@link CompanyType }
     *     
     */
    public void setVendor(CompanyType value) {
        this.vendor = value;
    }

    /**
     * Gets the value of the startDetails property.
     * 
     * @return
     *     possible object is
     *     {@link LocationDetailsType }
     *     
     */
    public LocationDetailsType getStartDetails() {
        return startDetails;
    }

    /**
     * Sets the value of the startDetails property.
     * 
     * @param value
     *     allowed object is
     *     {@link LocationDetailsType }
     *     
     */
    public void setStartDetails(LocationDetailsType value) {
        this.startDetails = value;
    }

    /**
     * Gets the value of the endDetails property.
     * 
     * @return
     *     possible object is
     *     {@link LocationDetailsType }
     *     
     */
    public LocationDetailsType getEndDetails() {
        return endDetails;
    }

    /**
     * Sets the value of the endDetails property.
     * 
     * @param value
     *     allowed object is
     *     {@link LocationDetailsType }
     *     
     */
    public void setEndDetails(LocationDetailsType value) {
        this.endDetails = value;
    }

    /**
     * Gets the value of the price property.
     * 
     * @return
     *     possible object is
     *     {@link TourType.Price }
     *     
     */
    public TourType.Price getPrice() {
        return price;
    }

    /**
     * Sets the value of the price property.
     * 
     * @param value
     *     allowed object is
     *     {@link TourType.Price }
     *     
     */
    public void setPrice(TourType.Price value) {
        this.price = value;
    }

    /**
     * Gets the value of the customer property.
     * 
     * @return
     *     possible object is
     *     {@link PassengerType }
     *     
     */
    public PassengerType getCustomer() {
        return customer;
    }

    /**
     * Sets the value of the customer property.
     * 
     * @param value
     *     allowed object is
     *     {@link PassengerType }
     *     
     */
    public void setCustomer(PassengerType value) {
        this.customer = value;
    }

    /**
     * Gets the value of the passengers property.
     * 
     * @return
     *     possible object is
     *     {@link TourType.Passengers }
     *     
     */
    public TourType.Passengers getPassengers() {
        return passengers;
    }

    /**
     * Sets the value of the passengers property.
     * 
     * @param value
     *     allowed object is
     *     {@link TourType.Passengers }
     *     
     */
    public void setPassengers(TourType.Passengers value) {
        this.passengers = value;
    }

    /**
     * Gets the value of the services property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfServiceRefType }
     *     
     */
    public ArrayOfServiceRefType getServices() {
        return services;
    }

    /**
     * Sets the value of the services property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfServiceRefType }
     *     
     */
    public void setServices(ArrayOfServiceRefType value) {
        this.services = value;
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
     *         &lt;element name="Passenger" type="{http://services.sabre.com/res/or/v1_4}PassengerType" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *       &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}int" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "passenger"
    })
    public static class Passengers {

        @XmlElement(name = "Passenger", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<PassengerType> passenger;
        @XmlAttribute(name = "quantity")
        protected Integer quantity;

        /**
         * Gets the value of the passenger property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the passenger property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getPassenger().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link PassengerType }
         * 
         * 
         */
        public List<PassengerType> getPassenger() {
            if (passenger == null) {
                passenger = new ArrayList<PassengerType>();
            }
            return this.passenger;
        }

        /**
         * Gets the value of the quantity property.
         * 
         * @return
         *     possible object is
         *     {@link Integer }
         *     
         */
        public Integer getQuantity() {
            return quantity;
        }

        /**
         * Sets the value of the quantity property.
         * 
         * @param value
         *     allowed object is
         *     {@link Integer }
         *     
         */
        public void setQuantity(Integer value) {
            this.quantity = value;
        }

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
     *         &lt;element name="Total" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
     *         &lt;element name="Breakdown" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="References" type="{http://services.sabre.com/res/or/v1_4}ArrayOfTourTypePriceBreakdownPassengerRef" minOccurs="0"/>
     *                   &lt;element name="Price" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
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
    @XmlType(name = "", propOrder = {
        "total",
        "breakdown"
    })
    public static class Price {

        @XmlElement(name = "Total", namespace = "http://services.sabre.com/res/or/v1_4")
        protected PriceType total;
        @XmlElement(name = "Breakdown", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<TourType.Price.Breakdown> breakdown;

        /**
         * Gets the value of the total property.
         * 
         * @return
         *     possible object is
         *     {@link PriceType }
         *     
         */
        public PriceType getTotal() {
            return total;
        }

        /**
         * Sets the value of the total property.
         * 
         * @param value
         *     allowed object is
         *     {@link PriceType }
         *     
         */
        public void setTotal(PriceType value) {
            this.total = value;
        }

        /**
         * Gets the value of the breakdown property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the breakdown property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getBreakdown().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link TourType.Price.Breakdown }
         * 
         * 
         */
        public List<TourType.Price.Breakdown> getBreakdown() {
            if (breakdown == null) {
                breakdown = new ArrayList<TourType.Price.Breakdown>();
            }
            return this.breakdown;
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
         *         &lt;element name="References" type="{http://services.sabre.com/res/or/v1_4}ArrayOfTourTypePriceBreakdownPassengerRef" minOccurs="0"/>
         *         &lt;element name="Price" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
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
            "references",
            "price"
        })
        public static class Breakdown {

            @XmlElement(name = "References", namespace = "http://services.sabre.com/res/or/v1_4")
            protected ArrayOfTourTypePriceBreakdownPassengerRef references;
            @XmlElement(name = "Price", namespace = "http://services.sabre.com/res/or/v1_4")
            protected PriceType price;

            /**
             * Gets the value of the references property.
             * 
             * @return
             *     possible object is
             *     {@link ArrayOfTourTypePriceBreakdownPassengerRef }
             *     
             */
            public ArrayOfTourTypePriceBreakdownPassengerRef getReferences() {
                return references;
            }

            /**
             * Sets the value of the references property.
             * 
             * @param value
             *     allowed object is
             *     {@link ArrayOfTourTypePriceBreakdownPassengerRef }
             *     
             */
            public void setReferences(ArrayOfTourTypePriceBreakdownPassengerRef value) {
                this.references = value;
            }

            /**
             * Gets the value of the price property.
             * 
             * @return
             *     possible object is
             *     {@link PriceType }
             *     
             */
            public PriceType getPrice() {
                return price;
            }

            /**
             * Sets the value of the price property.
             * 
             * @param value
             *     allowed object is
             *     {@link PriceType }
             *     
             */
            public void setPrice(PriceType value) {
                this.price = value;
            }

        }

    }

}
