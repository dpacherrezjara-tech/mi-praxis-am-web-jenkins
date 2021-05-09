
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for TicketingDocument.ServiceCoupon.EMD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.ServiceCoupon.EMD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MarketingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="MarketingFlightNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OperatingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="OperatingFlightNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ClassOfService" type="{http://www.sabre.com/ns/Ticketing/DC}ClassOfService.Details" minOccurs="0"/>
 *         &lt;element name="Cabin" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="FareBasis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StartLocation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="StartDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="EndLocation" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="EndDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="NotValidBeforeDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="NotValidAfterDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="SettlementAuthorization" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CurrentControllingProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.ControllingProvider" minOccurs="0"/>
 *         &lt;element name="InvoluntaryReroute" type="{http://www.sabre.com/ns/Ticketing/DC}ServiceCoupon.InvoluntaryReroute" minOccurs="0"/>
 *         &lt;element name="AssociatedFareBasis" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="coupon" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.ServiceCoupon.EMD", propOrder = {
    "marketingProvider",
    "marketingFlightNumber",
    "operatingProvider",
    "operatingFlightNumber",
    "classOfService",
    "cabin",
    "fareBasis",
    "startLocation",
    "startDateTime",
    "endLocation",
    "endDateTime",
    "notValidBeforeDate",
    "notValidAfterDate",
    "settlementAuthorization",
    "currentStatus",
    "previousStatus",
    "currentControllingProvider",
    "involuntaryReroute",
    "associatedFareBasis"
})
public class TicketingDocumentServiceCouponEMD {

    @XmlElement(name = "MarketingProvider")
    protected IdentifierProvider marketingProvider;
    @XmlElement(name = "MarketingFlightNumber")
    protected String marketingFlightNumber;
    @XmlElement(name = "OperatingProvider")
    protected IdentifierProvider operatingProvider;
    @XmlElement(name = "OperatingFlightNumber")
    protected String operatingFlightNumber;
    @XmlElement(name = "ClassOfService")
    protected ClassOfServiceDetails classOfService;
    @XmlElement(name = "Cabin")
    protected TicketingDocumentServiceCouponEMD.Cabin cabin;
    @XmlElement(name = "FareBasis")
    protected String fareBasis;
    @XmlElement(name = "StartLocation")
    protected TicketingDocumentServiceCouponEMD.StartLocation startLocation;
    @XmlElement(name = "StartDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar startDateTime;
    @XmlElement(name = "EndLocation")
    protected TicketingDocumentServiceCouponEMD.EndLocation endLocation;
    @XmlElement(name = "EndDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar endDateTime;
    @XmlElement(name = "NotValidBeforeDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar notValidBeforeDate;
    @XmlElement(name = "NotValidAfterDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar notValidAfterDate;
    @XmlElement(name = "SettlementAuthorization")
    protected String settlementAuthorization;
    @XmlElement(name = "CurrentStatus")
    protected String currentStatus;
    @XmlElement(name = "PreviousStatus")
    protected String previousStatus;
    @XmlElement(name = "CurrentControllingProvider")
    protected IdentifierControllingProvider currentControllingProvider;
    @XmlElement(name = "InvoluntaryReroute")
    protected ServiceCouponInvoluntaryReroute involuntaryReroute;
    @XmlElement(name = "AssociatedFareBasis")
    protected String associatedFareBasis;
    @XmlAttribute(name = "coupon")
    protected BigInteger coupon;

    /**
     * Gets the value of the marketingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getMarketingProvider() {
        return marketingProvider;
    }

    /**
     * Sets the value of the marketingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setMarketingProvider(IdentifierProvider value) {
        this.marketingProvider = value;
    }

    /**
     * Gets the value of the marketingFlightNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMarketingFlightNumber() {
        return marketingFlightNumber;
    }

    /**
     * Sets the value of the marketingFlightNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMarketingFlightNumber(String value) {
        this.marketingFlightNumber = value;
    }

    /**
     * Gets the value of the operatingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getOperatingProvider() {
        return operatingProvider;
    }

    /**
     * Sets the value of the operatingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setOperatingProvider(IdentifierProvider value) {
        this.operatingProvider = value;
    }

    /**
     * Gets the value of the operatingFlightNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOperatingFlightNumber() {
        return operatingFlightNumber;
    }

    /**
     * Sets the value of the operatingFlightNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOperatingFlightNumber(String value) {
        this.operatingFlightNumber = value;
    }

    /**
     * Gets the value of the classOfService property.
     * 
     * @return
     *     possible object is
     *     {@link ClassOfServiceDetails }
     *     
     */
    public ClassOfServiceDetails getClassOfService() {
        return classOfService;
    }

    /**
     * Sets the value of the classOfService property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClassOfServiceDetails }
     *     
     */
    public void setClassOfService(ClassOfServiceDetails value) {
        this.classOfService = value;
    }

    /**
     * Gets the value of the cabin property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponEMD.Cabin }
     *     
     */
    public TicketingDocumentServiceCouponEMD.Cabin getCabin() {
        return cabin;
    }

    /**
     * Sets the value of the cabin property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponEMD.Cabin }
     *     
     */
    public void setCabin(TicketingDocumentServiceCouponEMD.Cabin value) {
        this.cabin = value;
    }

    /**
     * Gets the value of the fareBasis property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFareBasis() {
        return fareBasis;
    }

    /**
     * Sets the value of the fareBasis property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFareBasis(String value) {
        this.fareBasis = value;
    }

    /**
     * Gets the value of the startLocation property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponEMD.StartLocation }
     *     
     */
    public TicketingDocumentServiceCouponEMD.StartLocation getStartLocation() {
        return startLocation;
    }

    /**
     * Sets the value of the startLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponEMD.StartLocation }
     *     
     */
    public void setStartLocation(TicketingDocumentServiceCouponEMD.StartLocation value) {
        this.startLocation = value;
    }

    /**
     * Gets the value of the startDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getStartDateTime() {
        return startDateTime;
    }

    /**
     * Sets the value of the startDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setStartDateTime(XMLGregorianCalendar value) {
        this.startDateTime = value;
    }

    /**
     * Gets the value of the endLocation property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentServiceCouponEMD.EndLocation }
     *     
     */
    public TicketingDocumentServiceCouponEMD.EndLocation getEndLocation() {
        return endLocation;
    }

    /**
     * Sets the value of the endLocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentServiceCouponEMD.EndLocation }
     *     
     */
    public void setEndLocation(TicketingDocumentServiceCouponEMD.EndLocation value) {
        this.endLocation = value;
    }

    /**
     * Gets the value of the endDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getEndDateTime() {
        return endDateTime;
    }

    /**
     * Sets the value of the endDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setEndDateTime(XMLGregorianCalendar value) {
        this.endDateTime = value;
    }

    /**
     * Gets the value of the notValidBeforeDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNotValidBeforeDate() {
        return notValidBeforeDate;
    }

    /**
     * Sets the value of the notValidBeforeDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNotValidBeforeDate(XMLGregorianCalendar value) {
        this.notValidBeforeDate = value;
    }

    /**
     * Gets the value of the notValidAfterDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getNotValidAfterDate() {
        return notValidAfterDate;
    }

    /**
     * Sets the value of the notValidAfterDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setNotValidAfterDate(XMLGregorianCalendar value) {
        this.notValidAfterDate = value;
    }

    /**
     * Gets the value of the settlementAuthorization property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSettlementAuthorization() {
        return settlementAuthorization;
    }

    /**
     * Sets the value of the settlementAuthorization property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSettlementAuthorization(String value) {
        this.settlementAuthorization = value;
    }

    /**
     * Gets the value of the currentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentStatus() {
        return currentStatus;
    }

    /**
     * Sets the value of the currentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentStatus(String value) {
        this.currentStatus = value;
    }

    /**
     * Gets the value of the previousStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreviousStatus() {
        return previousStatus;
    }

    /**
     * Sets the value of the previousStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreviousStatus(String value) {
        this.previousStatus = value;
    }

    /**
     * Gets the value of the currentControllingProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierControllingProvider }
     *     
     */
    public IdentifierControllingProvider getCurrentControllingProvider() {
        return currentControllingProvider;
    }

    /**
     * Sets the value of the currentControllingProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierControllingProvider }
     *     
     */
    public void setCurrentControllingProvider(IdentifierControllingProvider value) {
        this.currentControllingProvider = value;
    }

    /**
     * Gets the value of the involuntaryReroute property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceCouponInvoluntaryReroute }
     *     
     */
    public ServiceCouponInvoluntaryReroute getInvoluntaryReroute() {
        return involuntaryReroute;
    }

    /**
     * Sets the value of the involuntaryReroute property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceCouponInvoluntaryReroute }
     *     
     */
    public void setInvoluntaryReroute(ServiceCouponInvoluntaryReroute value) {
        this.involuntaryReroute = value;
    }

    /**
     * Gets the value of the associatedFareBasis property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAssociatedFareBasis() {
        return associatedFareBasis;
    }

    /**
     * Sets the value of the associatedFareBasis property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAssociatedFareBasis(String value) {
        this.associatedFareBasis = value;
    }

    /**
     * Gets the value of the coupon property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getCoupon() {
        return coupon;
    }

    /**
     * Sets the value of the coupon property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setCoupon(BigInteger value) {
        this.coupon = value;
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
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class Cabin {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

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
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

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
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class EndLocation {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

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
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

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
     *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class StartLocation {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "name")
        protected String name;

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
         * Gets the value of the name property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getName() {
            return name;
        }

        /**
         * Sets the value of the name property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setName(String value) {
            this.name = value;
        }

    }

}
