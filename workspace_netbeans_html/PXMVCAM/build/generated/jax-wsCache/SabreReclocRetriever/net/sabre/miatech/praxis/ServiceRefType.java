
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for ServiceRefType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ServiceRefType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Description" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="PassengerReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfServiceRefTypePassengerRef" minOccurs="0"/>
 *         &lt;element name="Accommodation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Occupancy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="NoOfServices" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="TravellerAllocation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ServicePrice" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
 *         &lt;element name="StealBoarding" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="endPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="startDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *       &lt;attribute name="endDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" />
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="normalizedIndicator" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="startPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
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
@XmlType(name = "ServiceRefType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "description",
    "passengerReferences",
    "accommodation",
    "occupancy",
    "noOfServices",
    "travellerAllocation",
    "servicePrice",
    "stealBoarding"
})
public class ServiceRefType {

    @XmlElement(name = "Description")
    protected List<ServiceRefType.Description> description;
    @XmlElement(name = "PassengerReferences")
    protected ArrayOfServiceRefTypePassengerRef passengerReferences;
    @XmlElement(name = "Accommodation")
    protected String accommodation;
    @XmlElement(name = "Occupancy")
    protected String occupancy;
    @XmlElement(name = "NoOfServices")
    protected Integer noOfServices;
    @XmlElement(name = "TravellerAllocation")
    protected String travellerAllocation;
    @XmlElement(name = "ServicePrice")
    protected PriceType servicePrice;
    @XmlElement(name = "StealBoarding")
    protected String stealBoarding;
    @XmlAttribute(name = "endPoint")
    protected String endPoint;
    @XmlAttribute(name = "startDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar startDateTime;
    @XmlAttribute(name = "endDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar endDateTime;
    @XmlAttribute(name = "id")
    protected String id;
    @XmlAttribute(name = "normalizedIndicator")
    protected Boolean normalizedIndicator;
    @XmlAttribute(name = "startPoint")
    protected String startPoint;
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
     * Gets the value of the description property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the description property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDescription().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ServiceRefType.Description }
     * 
     * 
     */
    public List<ServiceRefType.Description> getDescription() {
        if (description == null) {
            description = new ArrayList<ServiceRefType.Description>();
        }
        return this.description;
    }

    /**
     * Gets the value of the passengerReferences property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfServiceRefTypePassengerRef }
     *     
     */
    public ArrayOfServiceRefTypePassengerRef getPassengerReferences() {
        return passengerReferences;
    }

    /**
     * Sets the value of the passengerReferences property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfServiceRefTypePassengerRef }
     *     
     */
    public void setPassengerReferences(ArrayOfServiceRefTypePassengerRef value) {
        this.passengerReferences = value;
    }

    /**
     * Gets the value of the accommodation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccommodation() {
        return accommodation;
    }

    /**
     * Sets the value of the accommodation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccommodation(String value) {
        this.accommodation = value;
    }

    /**
     * Gets the value of the occupancy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOccupancy() {
        return occupancy;
    }

    /**
     * Sets the value of the occupancy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOccupancy(String value) {
        this.occupancy = value;
    }

    /**
     * Gets the value of the noOfServices property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNoOfServices() {
        return noOfServices;
    }

    /**
     * Sets the value of the noOfServices property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNoOfServices(Integer value) {
        this.noOfServices = value;
    }

    /**
     * Gets the value of the travellerAllocation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTravellerAllocation() {
        return travellerAllocation;
    }

    /**
     * Sets the value of the travellerAllocation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTravellerAllocation(String value) {
        this.travellerAllocation = value;
    }

    /**
     * Gets the value of the servicePrice property.
     * 
     * @return
     *     possible object is
     *     {@link PriceType }
     *     
     */
    public PriceType getServicePrice() {
        return servicePrice;
    }

    /**
     * Sets the value of the servicePrice property.
     * 
     * @param value
     *     allowed object is
     *     {@link PriceType }
     *     
     */
    public void setServicePrice(PriceType value) {
        this.servicePrice = value;
    }

    /**
     * Gets the value of the stealBoarding property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStealBoarding() {
        return stealBoarding;
    }

    /**
     * Sets the value of the stealBoarding property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStealBoarding(String value) {
        this.stealBoarding = value;
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
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
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
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    public static class Description {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "lang")
        protected String lang;

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
         * Gets the value of the lang property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getLang() {
            return lang;
        }

        /**
         * Sets the value of the lang property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setLang(String value) {
            this.lang = value;
        }

    }

}
