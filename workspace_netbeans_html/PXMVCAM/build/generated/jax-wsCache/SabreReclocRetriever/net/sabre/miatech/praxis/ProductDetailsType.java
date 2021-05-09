
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for ProductDetailsType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ProductDetailsType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ProductName" type="{http://services.sabre.com/res/or/v1_4}ProductNameType" minOccurs="0"/>
 *         &lt;choice>
 *           &lt;element name="GroundTransportation" type="{http://services.sabre.com/res/or/v1_4}GroundTransportationType" minOccurs="0"/>
 *           &lt;element name="Hotel" type="{http://services.sabre.com/res/or/v1_4}HotelProductType" minOccurs="0"/>
 *           &lt;element name="Rail" type="{http://services.sabre.com/res/or/v1_4}RailType" minOccurs="0"/>
 *           &lt;element name="Tour" type="{http://services.sabre.com/res/or/v1_4}TourType" minOccurs="0"/>
 *         &lt;/choice>
 *         &lt;element name="ExternalSystemReference" type="{http://services.sabre.com/res/or/v1_4}ExternalSystemReferenceType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="TransactionInfo" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="RequestorInfo" type="{http://services.sabre.com/res/or/v1_4}RequestorSourceType" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="LastUpdateTimeStamp" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="BillingInfo" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="BillingCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="CO2Value" type="{http://services.sabre.com/res/or/v1_4}CO2ValueType" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="startDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *       &lt;attribute name="startPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="endPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="normalizedIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="endDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *       &lt;attribute name="productType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="productCategory" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="vendorCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="previousStatusCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="statusCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ProductDetailsType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "productName",
    "groundTransportation",
    "hotel",
    "rail",
    "tour",
    "externalSystemReference",
    "transactionInfo",
    "billingInfo",
    "co2Value"
})
public class ProductDetailsType {

    @XmlElement(name = "ProductName")
    protected ProductNameType productName;
    @XmlElement(name = "GroundTransportation")
    protected GroundTransportationType groundTransportation;
    @XmlElement(name = "Hotel")
    protected HotelProductType hotel;
    @XmlElement(name = "Rail")
    protected RailType rail;
    @XmlElement(name = "Tour")
    protected TourType tour;
    @XmlElement(name = "ExternalSystemReference")
    protected List<ExternalSystemReferenceType> externalSystemReference;
    @XmlElement(name = "TransactionInfo")
    protected ProductDetailsType.TransactionInfo transactionInfo;
    @XmlElement(name = "BillingInfo")
    protected ProductDetailsType.BillingInfo billingInfo;
    @XmlElement(name = "CO2Value")
    protected CO2ValueType co2Value;
    @XmlAttribute(name = "startDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar startDateTime;
    @XmlAttribute(name = "startPoint")
    protected String startPoint;
    @XmlAttribute(name = "endPoint")
    protected String endPoint;
    @XmlAttribute(name = "normalizedIndicator")
    protected Boolean normalizedIndicator;
    @XmlAttribute(name = "endDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar endDateTime;
    @XmlAttribute(name = "productType")
    protected String productType;
    @XmlAttribute(name = "productCategory")
    protected String productCategory;
    @XmlAttribute(name = "vendorCode")
    protected String vendorCode;
    @XmlAttribute(name = "previousStatusCode")
    protected String previousStatusCode;
    @XmlAttribute(name = "statusCode")
    protected String statusCode;

    /**
     * Gets the value of the productName property.
     * 
     * @return
     *     possible object is
     *     {@link ProductNameType }
     *     
     */
    public ProductNameType getProductName() {
        return productName;
    }

    /**
     * Sets the value of the productName property.
     * 
     * @param value
     *     allowed object is
     *     {@link ProductNameType }
     *     
     */
    public void setProductName(ProductNameType value) {
        this.productName = value;
    }

    /**
     * Gets the value of the groundTransportation property.
     * 
     * @return
     *     possible object is
     *     {@link GroundTransportationType }
     *     
     */
    public GroundTransportationType getGroundTransportation() {
        return groundTransportation;
    }

    /**
     * Sets the value of the groundTransportation property.
     * 
     * @param value
     *     allowed object is
     *     {@link GroundTransportationType }
     *     
     */
    public void setGroundTransportation(GroundTransportationType value) {
        this.groundTransportation = value;
    }

    /**
     * Gets the value of the hotel property.
     * 
     * @return
     *     possible object is
     *     {@link HotelProductType }
     *     
     */
    public HotelProductType getHotel() {
        return hotel;
    }

    /**
     * Sets the value of the hotel property.
     * 
     * @param value
     *     allowed object is
     *     {@link HotelProductType }
     *     
     */
    public void setHotel(HotelProductType value) {
        this.hotel = value;
    }

    /**
     * Gets the value of the rail property.
     * 
     * @return
     *     possible object is
     *     {@link RailType }
     *     
     */
    public RailType getRail() {
        return rail;
    }

    /**
     * Sets the value of the rail property.
     * 
     * @param value
     *     allowed object is
     *     {@link RailType }
     *     
     */
    public void setRail(RailType value) {
        this.rail = value;
    }

    /**
     * Gets the value of the tour property.
     * 
     * @return
     *     possible object is
     *     {@link TourType }
     *     
     */
    public TourType getTour() {
        return tour;
    }

    /**
     * Sets the value of the tour property.
     * 
     * @param value
     *     allowed object is
     *     {@link TourType }
     *     
     */
    public void setTour(TourType value) {
        this.tour = value;
    }

    /**
     * Gets the value of the externalSystemReference property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the externalSystemReference property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExternalSystemReference().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ExternalSystemReferenceType }
     * 
     * 
     */
    public List<ExternalSystemReferenceType> getExternalSystemReference() {
        if (externalSystemReference == null) {
            externalSystemReference = new ArrayList<ExternalSystemReferenceType>();
        }
        return this.externalSystemReference;
    }

    /**
     * Gets the value of the transactionInfo property.
     * 
     * @return
     *     possible object is
     *     {@link ProductDetailsType.TransactionInfo }
     *     
     */
    public ProductDetailsType.TransactionInfo getTransactionInfo() {
        return transactionInfo;
    }

    /**
     * Sets the value of the transactionInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link ProductDetailsType.TransactionInfo }
     *     
     */
    public void setTransactionInfo(ProductDetailsType.TransactionInfo value) {
        this.transactionInfo = value;
    }

    /**
     * Gets the value of the billingInfo property.
     * 
     * @return
     *     possible object is
     *     {@link ProductDetailsType.BillingInfo }
     *     
     */
    public ProductDetailsType.BillingInfo getBillingInfo() {
        return billingInfo;
    }

    /**
     * Sets the value of the billingInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link ProductDetailsType.BillingInfo }
     *     
     */
    public void setBillingInfo(ProductDetailsType.BillingInfo value) {
        this.billingInfo = value;
    }

    /**
     * Gets the value of the co2Value property.
     * 
     * @return
     *     possible object is
     *     {@link CO2ValueType }
     *     
     */
    public CO2ValueType getCO2Value() {
        return co2Value;
    }

    /**
     * Sets the value of the co2Value property.
     * 
     * @param value
     *     allowed object is
     *     {@link CO2ValueType }
     *     
     */
    public void setCO2Value(CO2ValueType value) {
        this.co2Value = value;
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
     * Gets the value of the startPoint property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStartPoint() {
        return startPoint;
    }

    /**
     * Sets the value of the startPoint property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartPoint(String value) {
        this.startPoint = value;
    }

    /**
     * Gets the value of the endPoint property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEndPoint() {
        return endPoint;
    }

    /**
     * Sets the value of the endPoint property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEndPoint(String value) {
        this.endPoint = value;
    }

    /**
     * Gets the value of the normalizedIndicator property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isNormalizedIndicator() {
        return normalizedIndicator;
    }

    /**
     * Sets the value of the normalizedIndicator property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setNormalizedIndicator(Boolean value) {
        this.normalizedIndicator = value;
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
     * Gets the value of the productType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProductType() {
        return productType;
    }

    /**
     * Sets the value of the productType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProductType(String value) {
        this.productType = value;
    }

    /**
     * Gets the value of the productCategory property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getProductCategory() {
        return productCategory;
    }

    /**
     * Sets the value of the productCategory property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setProductCategory(String value) {
        this.productCategory = value;
    }

    /**
     * Gets the value of the vendorCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVendorCode() {
        return vendorCode;
    }

    /**
     * Sets the value of the vendorCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVendorCode(String value) {
        this.vendorCode = value;
    }

    /**
     * Gets the value of the previousStatusCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreviousStatusCode() {
        return previousStatusCode;
    }

    /**
     * Sets the value of the previousStatusCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreviousStatusCode(String value) {
        this.previousStatusCode = value;
    }

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
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="BillingCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
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
        "billingCode"
    })
    public static class BillingInfo {

        @XmlElement(name = "BillingCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String billingCode;

        /**
         * Gets the value of the billingCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getBillingCode() {
            return billingCode;
        }

        /**
         * Sets the value of the billingCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setBillingCode(String value) {
            this.billingCode = value;
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
     *         &lt;element name="RequestorInfo" type="{http://services.sabre.com/res/or/v1_4}RequestorSourceType" minOccurs="0"/>
     *       &lt;/sequence>
     *       &lt;attribute name="LastUpdateTimeStamp" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "requestorInfo"
    })
    public static class TransactionInfo {

        @XmlElement(name = "RequestorInfo", namespace = "http://services.sabre.com/res/or/v1_4")
        protected RequestorSourceType requestorInfo;
        @XmlAttribute(name = "LastUpdateTimeStamp")
        @XmlSchemaType(name = "dateTime")
        protected XMLGregorianCalendar lastUpdateTimeStamp;

        /**
         * Gets the value of the requestorInfo property.
         * 
         * @return
         *     possible object is
         *     {@link RequestorSourceType }
         *     
         */
        public RequestorSourceType getRequestorInfo() {
            return requestorInfo;
        }

        /**
         * Sets the value of the requestorInfo property.
         * 
         * @param value
         *     allowed object is
         *     {@link RequestorSourceType }
         *     
         */
        public void setRequestorInfo(RequestorSourceType value) {
            this.requestorInfo = value;
        }

        /**
         * Gets the value of the lastUpdateTimeStamp property.
         * 
         * @return
         *     possible object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public XMLGregorianCalendar getLastUpdateTimeStamp() {
            return lastUpdateTimeStamp;
        }

        /**
         * Sets the value of the lastUpdateTimeStamp property.
         * 
         * @param value
         *     allowed object is
         *     {@link XMLGregorianCalendar }
         *     
         */
        public void setLastUpdateTimeStamp(XMLGregorianCalendar value) {
            this.lastUpdateTimeStamp = value;
        }

    }

}
