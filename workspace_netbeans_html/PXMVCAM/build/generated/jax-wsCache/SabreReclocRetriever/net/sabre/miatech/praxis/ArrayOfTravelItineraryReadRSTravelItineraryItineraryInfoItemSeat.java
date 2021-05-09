
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Seat" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="FlightSegment" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="DestinationLocation" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="OriginLocation" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *                 &lt;attribute name="Status" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="SmokingPreference" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="Type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="TypeTwo" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="NameNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="Changed" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="Number" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="SegmentStatus" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="SegmentNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
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
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "seat"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat {

    @XmlElement(name = "Seat")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat> seat;

    /**
     * Gets the value of the seat property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the seat property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSeat().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat> getSeat() {
        if (seat == null) {
            seat = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat>();
        }
        return this.seat;
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
     *         &lt;element name="FlightSegment" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="DestinationLocation" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="OriginLocation" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/restriction>
     *                       &lt;/complexContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *       &lt;/sequence>
     *       &lt;attribute name="Status" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="SmokingPreference" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="Type" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="Id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="TypeTwo" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="NameNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="Changed" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="Number" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="SegmentStatus" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="SegmentNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "flightSegment"
    })
    public static class Seat {

        @XmlElement(name = "FlightSegment", namespace = "http://services.sabre.com/res/tir/v3_6")
        protected ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment flightSegment;
        @XmlAttribute(name = "Status")
        protected String status;
        @XmlAttribute(name = "SmokingPreference")
        protected String smokingPreference;
        @XmlAttribute(name = "Type")
        protected String type;
        @XmlAttribute(name = "Id")
        protected String id;
        @XmlAttribute(name = "TypeTwo")
        protected String typeTwo;
        @XmlAttribute(name = "NameNumber")
        protected String nameNumber;
        @XmlAttribute(name = "Changed")
        protected String changed;
        @XmlAttribute(name = "Number")
        protected String number;
        @XmlAttribute(name = "SegmentStatus")
        protected String segmentStatus;
        @XmlAttribute(name = "SegmentNumber")
        protected String segmentNumber;

        /**
         * Gets the value of the flightSegment property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment }
         *     
         */
        public ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment getFlightSegment() {
            return flightSegment;
        }

        /**
         * Sets the value of the flightSegment property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment }
         *     
         */
        public void setFlightSegment(ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment value) {
            this.flightSegment = value;
        }

        /**
         * Gets the value of the status property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getStatus() {
            return status;
        }

        /**
         * Sets the value of the status property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setStatus(String value) {
            this.status = value;
        }

        /**
         * Gets the value of the smokingPreference property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSmokingPreference() {
            return smokingPreference;
        }

        /**
         * Sets the value of the smokingPreference property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSmokingPreference(String value) {
            this.smokingPreference = value;
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
         * Gets the value of the typeTwo property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTypeTwo() {
            return typeTwo;
        }

        /**
         * Sets the value of the typeTwo property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTypeTwo(String value) {
            this.typeTwo = value;
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

        /**
         * Gets the value of the changed property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getChanged() {
            return changed;
        }

        /**
         * Sets the value of the changed property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setChanged(String value) {
            this.changed = value;
        }

        /**
         * Gets the value of the number property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNumber() {
            return number;
        }

        /**
         * Sets the value of the number property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNumber(String value) {
            this.number = value;
        }

        /**
         * Gets the value of the segmentStatus property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSegmentStatus() {
            return segmentStatus;
        }

        /**
         * Sets the value of the segmentStatus property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSegmentStatus(String value) {
            this.segmentStatus = value;
        }

        /**
         * Gets the value of the segmentNumber property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSegmentNumber() {
            return segmentNumber;
        }

        /**
         * Sets the value of the segmentNumber property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSegmentNumber(String value) {
            this.segmentNumber = value;
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
         *         &lt;element name="DestinationLocation" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/restriction>
         *             &lt;/complexContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="OriginLocation" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
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
            "destinationLocation",
            "originLocation"
        })
        public static class FlightSegment {

            @XmlElement(name = "DestinationLocation", namespace = "http://services.sabre.com/res/tir/v3_6")
            protected ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.DestinationLocation destinationLocation;
            @XmlElement(name = "OriginLocation", namespace = "http://services.sabre.com/res/tir/v3_6")
            protected ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.OriginLocation originLocation;

            /**
             * Gets the value of the destinationLocation property.
             * 
             * @return
             *     possible object is
             *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.DestinationLocation }
             *     
             */
            public ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.DestinationLocation getDestinationLocation() {
                return destinationLocation;
            }

            /**
             * Sets the value of the destinationLocation property.
             * 
             * @param value
             *     allowed object is
             *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.DestinationLocation }
             *     
             */
            public void setDestinationLocation(ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.DestinationLocation value) {
                this.destinationLocation = value;
            }

            /**
             * Gets the value of the originLocation property.
             * 
             * @return
             *     possible object is
             *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.OriginLocation }
             *     
             */
            public ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.OriginLocation getOriginLocation() {
                return originLocation;
            }

            /**
             * Sets the value of the originLocation property.
             * 
             * @param value
             *     allowed object is
             *     {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.OriginLocation }
             *     
             */
            public void setOriginLocation(ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemSeat.Seat.FlightSegment.OriginLocation value) {
                this.originLocation = value;
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
             *       &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "")
            public static class DestinationLocation {

                @XmlAttribute(name = "LocationCode")
                protected String locationCode;

                /**
                 * Gets the value of the locationCode property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getLocationCode() {
                    return locationCode;
                }

                /**
                 * Sets the value of the locationCode property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setLocationCode(String value) {
                    this.locationCode = value;
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
             *       &lt;attribute name="LocationCode" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/restriction>
             *   &lt;/complexContent>
             * &lt;/complexType>
             * </pre>
             * 
             * 
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "")
            public static class OriginLocation {

                @XmlAttribute(name = "LocationCode")
                protected String locationCode;

                /**
                 * Gets the value of the locationCode property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getLocationCode() {
                    return locationCode;
                }

                /**
                 * Sets the value of the locationCode property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setLocationCode(String value) {
                    this.locationCode = value;
                }

            }

        }

    }

}
