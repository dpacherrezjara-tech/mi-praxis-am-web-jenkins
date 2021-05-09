
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for LocationDetailsType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LocationDetailsType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Address" type="{http://services.sabre.com/res/or/v1_4}AddressType" minOccurs="0"/>
 *         &lt;element name="DateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;choice>
 *           &lt;element name="AirportInfo" type="{http://services.sabre.com/res/or/v1_4}AirportInfoType" minOccurs="0"/>
 *           &lt;element name="RailwayStationInfo" minOccurs="0">
 *             &lt;complexType>
 *               &lt;complexContent>
 *                 &lt;extension base="{http://services.sabre.com/res/or/v1_4}RailwayStationInfoType">
 *                   &lt;sequence>
 *                     &lt;element name="StationName" minOccurs="0">
 *                       &lt;complexType>
 *                         &lt;simpleContent>
 *                           &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                             &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                           &lt;/extension>
 *                         &lt;/simpleContent>
 *                       &lt;/complexType>
 *                     &lt;/element>
 *                     &lt;element name="LocalStationName" minOccurs="0">
 *                       &lt;complexType>
 *                         &lt;simpleContent>
 *                           &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                             &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                           &lt;/extension>
 *                         &lt;/simpleContent>
 *                       &lt;/complexType>
 *                     &lt;/element>
 *                     &lt;element name="LocationCodes" type="{http://services.sabre.com/res/or/v1_4}ArrayOfLocationDetailsTypeRailwayStationInfoCode" minOccurs="0"/>
 *                     &lt;element name="Amenities" type="{http://services.sabre.com/res/or/v1_4}MyArrayOfString9" minOccurs="0"/>
 *                   &lt;/sequence>
 *                   &lt;attribute name="borderPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;/extension>
 *               &lt;/complexContent>
 *             &lt;/complexType>
 *           &lt;/element>
 *         &lt;/choice>
 *         &lt;element name="Comments" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LocationDetailsType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "address",
    "dateTime",
    "airportInfo",
    "railwayStationInfo",
    "comments"
})
public class LocationDetailsType {

    @XmlElement(name = "Address")
    protected AddressType address;
    @XmlElement(name = "DateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar dateTime;
    @XmlElement(name = "AirportInfo")
    protected AirportInfoType airportInfo;
    @XmlElement(name = "RailwayStationInfo")
    protected LocationDetailsType.RailwayStationInfo railwayStationInfo;
    @XmlElement(name = "Comments")
    protected String comments;

    /**
     * Gets the value of the address property.
     * 
     * @return
     *     possible object is
     *     {@link AddressType }
     *     
     */
    public AddressType getAddress() {
        return address;
    }

    /**
     * Sets the value of the address property.
     * 
     * @param value
     *     allowed object is
     *     {@link AddressType }
     *     
     */
    public void setAddress(AddressType value) {
        this.address = value;
    }

    /**
     * Gets the value of the dateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getDateTime() {
        return dateTime;
    }

    /**
     * Sets the value of the dateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setDateTime(XMLGregorianCalendar value) {
        this.dateTime = value;
    }

    /**
     * Gets the value of the airportInfo property.
     * 
     * @return
     *     possible object is
     *     {@link AirportInfoType }
     *     
     */
    public AirportInfoType getAirportInfo() {
        return airportInfo;
    }

    /**
     * Sets the value of the airportInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link AirportInfoType }
     *     
     */
    public void setAirportInfo(AirportInfoType value) {
        this.airportInfo = value;
    }

    /**
     * Gets the value of the railwayStationInfo property.
     * 
     * @return
     *     possible object is
     *     {@link LocationDetailsType.RailwayStationInfo }
     *     
     */
    public LocationDetailsType.RailwayStationInfo getRailwayStationInfo() {
        return railwayStationInfo;
    }

    /**
     * Sets the value of the railwayStationInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link LocationDetailsType.RailwayStationInfo }
     *     
     */
    public void setRailwayStationInfo(LocationDetailsType.RailwayStationInfo value) {
        this.railwayStationInfo = value;
    }

    /**
     * Gets the value of the comments property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComments() {
        return comments;
    }

    /**
     * Sets the value of the comments property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComments(String value) {
        this.comments = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;extension base="{http://services.sabre.com/res/or/v1_4}RailwayStationInfoType">
     *       &lt;sequence>
     *         &lt;element name="StationName" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="LocalStationName" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="LocationCodes" type="{http://services.sabre.com/res/or/v1_4}ArrayOfLocationDetailsTypeRailwayStationInfoCode" minOccurs="0"/>
     *         &lt;element name="Amenities" type="{http://services.sabre.com/res/or/v1_4}MyArrayOfString9" minOccurs="0"/>
     *       &lt;/sequence>
     *       &lt;attribute name="borderPoint" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "stationName",
        "localStationName",
        "locationCodes",
        "amenities"
    })
    public static class RailwayStationInfo
        extends RailwayStationInfoType
    {

        @XmlElement(name = "StationName", namespace = "http://services.sabre.com/res/or/v1_4")
        protected LocationDetailsType.RailwayStationInfo.StationName stationName;
        @XmlElement(name = "LocalStationName", namespace = "http://services.sabre.com/res/or/v1_4")
        protected LocationDetailsType.RailwayStationInfo.LocalStationName localStationName;
        @XmlElement(name = "LocationCodes", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfLocationDetailsTypeRailwayStationInfoCode locationCodes;
        @XmlElement(name = "Amenities", namespace = "http://services.sabre.com/res/or/v1_4")
        protected MyArrayOfString9 amenities;
        @XmlAttribute(name = "borderPoint")
        protected String borderPoint;

        /**
         * Gets the value of the stationName property.
         * 
         * @return
         *     possible object is
         *     {@link LocationDetailsType.RailwayStationInfo.StationName }
         *     
         */
        public LocationDetailsType.RailwayStationInfo.StationName getStationName() {
            return stationName;
        }

        /**
         * Sets the value of the stationName property.
         * 
         * @param value
         *     allowed object is
         *     {@link LocationDetailsType.RailwayStationInfo.StationName }
         *     
         */
        public void setStationName(LocationDetailsType.RailwayStationInfo.StationName value) {
            this.stationName = value;
        }

        /**
         * Gets the value of the localStationName property.
         * 
         * @return
         *     possible object is
         *     {@link LocationDetailsType.RailwayStationInfo.LocalStationName }
         *     
         */
        public LocationDetailsType.RailwayStationInfo.LocalStationName getLocalStationName() {
            return localStationName;
        }

        /**
         * Sets the value of the localStationName property.
         * 
         * @param value
         *     allowed object is
         *     {@link LocationDetailsType.RailwayStationInfo.LocalStationName }
         *     
         */
        public void setLocalStationName(LocationDetailsType.RailwayStationInfo.LocalStationName value) {
            this.localStationName = value;
        }

        /**
         * Gets the value of the locationCodes property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfLocationDetailsTypeRailwayStationInfoCode }
         *     
         */
        public ArrayOfLocationDetailsTypeRailwayStationInfoCode getLocationCodes() {
            return locationCodes;
        }

        /**
         * Sets the value of the locationCodes property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfLocationDetailsTypeRailwayStationInfoCode }
         *     
         */
        public void setLocationCodes(ArrayOfLocationDetailsTypeRailwayStationInfoCode value) {
            this.locationCodes = value;
        }

        /**
         * Gets the value of the amenities property.
         * 
         * @return
         *     possible object is
         *     {@link MyArrayOfString9 }
         *     
         */
        public MyArrayOfString9 getAmenities() {
            return amenities;
        }

        /**
         * Sets the value of the amenities property.
         * 
         * @param value
         *     allowed object is
         *     {@link MyArrayOfString9 }
         *     
         */
        public void setAmenities(MyArrayOfString9 value) {
            this.amenities = value;
        }

        /**
         * Gets the value of the borderPoint property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getBorderPoint() {
            return borderPoint;
        }

        /**
         * Sets the value of the borderPoint property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setBorderPoint(String value) {
            this.borderPoint = value;
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
        public static class LocalStationName {

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
        public static class StationName {

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

}
