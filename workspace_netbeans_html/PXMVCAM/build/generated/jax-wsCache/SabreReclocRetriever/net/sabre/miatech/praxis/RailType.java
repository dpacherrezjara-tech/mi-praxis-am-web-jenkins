
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RailType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RailType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="StatusCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Open" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="CrossBorder" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="Duration" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="MarketingCarrier" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;extension base="{http://services.sabre.com/res/or/v1_4}CompanyType">
 *               &lt;/extension>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="OperatingCarrier" type="{http://services.sabre.com/res/or/v1_4}ServiceProviderType" minOccurs="0"/>
 *         &lt;element name="Passengers" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Passenger" type="{http://services.sabre.com/res/or/v1_4}PassengerType" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="SupplementaryServices" type="{http://services.sabre.com/res/or/v1_4}ArrayOfSupplementaryServiceType" minOccurs="0"/>
 *         &lt;element name="TrainInfo" type="{http://services.sabre.com/res/or/v1_4}TrainDetailsType" minOccurs="0"/>
 *         &lt;element name="Accommodation" type="{http://services.sabre.com/res/or/v1_4}RailAccommodationType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="StartDetails" type="{http://services.sabre.com/res/or/v1_4}LocationDetailsType" minOccurs="0"/>
 *         &lt;element name="StopDetails" type="{http://services.sabre.com/res/or/v1_4}LocationDetailsType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="EndDetails" type="{http://services.sabre.com/res/or/v1_4}LocationDetailsType" minOccurs="0"/>
 *         &lt;element name="RailFares" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailFareTypeFare" minOccurs="0"/>
 *         &lt;element name="Documents" type="{http://services.sabre.com/res/or/v1_4}ArrayOfDocumentType" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailTypeDetail" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RailType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "statusCode",
    "open",
    "crossBorder",
    "duration",
    "marketingCarrier",
    "operatingCarrier",
    "passengers",
    "supplementaryServices",
    "trainInfo",
    "accommodation",
    "startDetails",
    "stopDetails",
    "endDetails",
    "railFares",
    "documents",
    "details"
})
public class RailType {

    @XmlElement(name = "StatusCode")
    protected String statusCode;
    @XmlElement(name = "Open")
    protected Boolean open;
    @XmlElement(name = "CrossBorder")
    protected Boolean crossBorder;
    @XmlElement(name = "Duration")
    protected String duration;
    @XmlElement(name = "MarketingCarrier")
    protected RailType.MarketingCarrier marketingCarrier;
    @XmlElement(name = "OperatingCarrier")
    protected ServiceProviderType operatingCarrier;
    @XmlElement(name = "Passengers")
    protected RailType.Passengers passengers;
    @XmlElement(name = "SupplementaryServices")
    protected ArrayOfSupplementaryServiceType supplementaryServices;
    @XmlElement(name = "TrainInfo")
    protected TrainDetailsType trainInfo;
    @XmlElement(name = "Accommodation")
    protected List<RailAccommodationType> accommodation;
    @XmlElement(name = "StartDetails")
    protected LocationDetailsType startDetails;
    @XmlElement(name = "StopDetails")
    protected List<LocationDetailsType> stopDetails;
    @XmlElement(name = "EndDetails")
    protected LocationDetailsType endDetails;
    @XmlElement(name = "RailFares")
    protected ArrayOfRailFareTypeFare railFares;
    @XmlElement(name = "Documents")
    protected ArrayOfDocumentType documents;
    @XmlElement(name = "Details")
    protected ArrayOfRailTypeDetail details;

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
     * Gets the value of the open property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isOpen() {
        return open;
    }

    /**
     * Sets the value of the open property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setOpen(Boolean value) {
        this.open = value;
    }

    /**
     * Gets the value of the crossBorder property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isCrossBorder() {
        return crossBorder;
    }

    /**
     * Sets the value of the crossBorder property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setCrossBorder(Boolean value) {
        this.crossBorder = value;
    }

    /**
     * Gets the value of the duration property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDuration() {
        return duration;
    }

    /**
     * Sets the value of the duration property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDuration(String value) {
        this.duration = value;
    }

    /**
     * Gets the value of the marketingCarrier property.
     * 
     * @return
     *     possible object is
     *     {@link RailType.MarketingCarrier }
     *     
     */
    public RailType.MarketingCarrier getMarketingCarrier() {
        return marketingCarrier;
    }

    /**
     * Sets the value of the marketingCarrier property.
     * 
     * @param value
     *     allowed object is
     *     {@link RailType.MarketingCarrier }
     *     
     */
    public void setMarketingCarrier(RailType.MarketingCarrier value) {
        this.marketingCarrier = value;
    }

    /**
     * Gets the value of the operatingCarrier property.
     * 
     * @return
     *     possible object is
     *     {@link ServiceProviderType }
     *     
     */
    public ServiceProviderType getOperatingCarrier() {
        return operatingCarrier;
    }

    /**
     * Sets the value of the operatingCarrier property.
     * 
     * @param value
     *     allowed object is
     *     {@link ServiceProviderType }
     *     
     */
    public void setOperatingCarrier(ServiceProviderType value) {
        this.operatingCarrier = value;
    }

    /**
     * Gets the value of the passengers property.
     * 
     * @return
     *     possible object is
     *     {@link RailType.Passengers }
     *     
     */
    public RailType.Passengers getPassengers() {
        return passengers;
    }

    /**
     * Sets the value of the passengers property.
     * 
     * @param value
     *     allowed object is
     *     {@link RailType.Passengers }
     *     
     */
    public void setPassengers(RailType.Passengers value) {
        this.passengers = value;
    }

    /**
     * Gets the value of the supplementaryServices property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfSupplementaryServiceType }
     *     
     */
    public ArrayOfSupplementaryServiceType getSupplementaryServices() {
        return supplementaryServices;
    }

    /**
     * Sets the value of the supplementaryServices property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfSupplementaryServiceType }
     *     
     */
    public void setSupplementaryServices(ArrayOfSupplementaryServiceType value) {
        this.supplementaryServices = value;
    }

    /**
     * Gets the value of the trainInfo property.
     * 
     * @return
     *     possible object is
     *     {@link TrainDetailsType }
     *     
     */
    public TrainDetailsType getTrainInfo() {
        return trainInfo;
    }

    /**
     * Sets the value of the trainInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link TrainDetailsType }
     *     
     */
    public void setTrainInfo(TrainDetailsType value) {
        this.trainInfo = value;
    }

    /**
     * Gets the value of the accommodation property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the accommodation property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAccommodation().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RailAccommodationType }
     * 
     * 
     */
    public List<RailAccommodationType> getAccommodation() {
        if (accommodation == null) {
            accommodation = new ArrayList<RailAccommodationType>();
        }
        return this.accommodation;
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
     * Gets the value of the stopDetails property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the stopDetails property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getStopDetails().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link LocationDetailsType }
     * 
     * 
     */
    public List<LocationDetailsType> getStopDetails() {
        if (stopDetails == null) {
            stopDetails = new ArrayList<LocationDetailsType>();
        }
        return this.stopDetails;
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
     * Gets the value of the railFares property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfRailFareTypeFare }
     *     
     */
    public ArrayOfRailFareTypeFare getRailFares() {
        return railFares;
    }

    /**
     * Sets the value of the railFares property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfRailFareTypeFare }
     *     
     */
    public void setRailFares(ArrayOfRailFareTypeFare value) {
        this.railFares = value;
    }

    /**
     * Gets the value of the documents property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDocumentType }
     *     
     */
    public ArrayOfDocumentType getDocuments() {
        return documents;
    }

    /**
     * Sets the value of the documents property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDocumentType }
     *     
     */
    public void setDocuments(ArrayOfDocumentType value) {
        this.documents = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfRailTypeDetail }
     *     
     */
    public ArrayOfRailTypeDetail getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfRailTypeDetail }
     *     
     */
    public void setDetails(ArrayOfRailTypeDetail value) {
        this.details = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;extension base="{http://services.sabre.com/res/or/v1_4}CompanyType">
     *     &lt;/extension>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "")
    public static class MarketingCarrier
        extends CompanyType
    {


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
     *       &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        protected String quantity;

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
         *     {@link String }
         *     
         */
        public String getQuantity() {
            return quantity;
        }

        /**
         * Sets the value of the quantity property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setQuantity(String value) {
            this.quantity = value;
        }

    }

}
