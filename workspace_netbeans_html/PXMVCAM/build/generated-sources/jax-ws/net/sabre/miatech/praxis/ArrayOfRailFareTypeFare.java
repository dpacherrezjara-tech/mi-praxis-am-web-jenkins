
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
 * <p>Java class for ArrayOfRailFareTypeFare complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfRailFareTypeFare">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Fare" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="PassengerReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailFareTypeFarePassengerRef" minOccurs="0"/>
 *                   &lt;element name="SegmentReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailFareTypeFareSegmentRef" minOccurs="0"/>
 *                   &lt;element name="ClassOfService" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                           &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="ClassCode" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                           &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="FareDescription" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Detail" maxOccurs="unbounded" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;simpleContent>
 *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                     &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                     &lt;attribute name="codeContext" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/extension>
 *                                 &lt;/simpleContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="Condition" maxOccurs="unbounded" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;simpleContent>
 *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                     &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/extension>
 *                                 &lt;/simpleContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                             &lt;element name="Fees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfFeeType" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="FarePrice" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
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
@XmlType(name = "ArrayOfRailFareTypeFare", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "fare"
})
public class ArrayOfRailFareTypeFare {

    @XmlElement(name = "Fare")
    protected List<ArrayOfRailFareTypeFare.Fare> fare;

    /**
     * Gets the value of the fare property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fare property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFare().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfRailFareTypeFare.Fare }
     * 
     * 
     */
    public List<ArrayOfRailFareTypeFare.Fare> getFare() {
        if (fare == null) {
            fare = new ArrayList<ArrayOfRailFareTypeFare.Fare>();
        }
        return this.fare;
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
     *         &lt;element name="PassengerReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailFareTypeFarePassengerRef" minOccurs="0"/>
     *         &lt;element name="SegmentReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfRailFareTypeFareSegmentRef" minOccurs="0"/>
     *         &lt;element name="ClassOfService" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="ClassCode" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
     *               &lt;/extension>
     *             &lt;/simpleContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="FareDescription" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Detail" maxOccurs="unbounded" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;simpleContent>
     *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                           &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                           &lt;attribute name="codeContext" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/extension>
     *                       &lt;/simpleContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="Condition" maxOccurs="unbounded" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;simpleContent>
     *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                           &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/extension>
     *                       &lt;/simpleContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                   &lt;element name="Fees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfFeeType" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *         &lt;element name="FarePrice" type="{http://services.sabre.com/res/or/v1_4}PriceType" minOccurs="0"/>
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
        "passengerReferences",
        "segmentReferences",
        "classOfService",
        "classCode",
        "fareDescription",
        "farePrice"
    })
    public static class Fare {

        @XmlElement(name = "PassengerReferences", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfRailFareTypeFarePassengerRef passengerReferences;
        @XmlElement(name = "SegmentReferences", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfRailFareTypeFareSegmentRef segmentReferences;
        @XmlElement(name = "ClassOfService", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfRailFareTypeFare.Fare.ClassOfService classOfService;
        @XmlElement(name = "ClassCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfRailFareTypeFare.Fare.ClassCode classCode;
        @XmlElement(name = "FareDescription", namespace = "http://services.sabre.com/res/or/v1_4")
        protected ArrayOfRailFareTypeFare.Fare.FareDescription fareDescription;
        @XmlElement(name = "FarePrice", namespace = "http://services.sabre.com/res/or/v1_4")
        protected PriceType farePrice;

        /**
         * Gets the value of the passengerReferences property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfRailFareTypeFarePassengerRef }
         *     
         */
        public ArrayOfRailFareTypeFarePassengerRef getPassengerReferences() {
            return passengerReferences;
        }

        /**
         * Sets the value of the passengerReferences property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfRailFareTypeFarePassengerRef }
         *     
         */
        public void setPassengerReferences(ArrayOfRailFareTypeFarePassengerRef value) {
            this.passengerReferences = value;
        }

        /**
         * Gets the value of the segmentReferences property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfRailFareTypeFareSegmentRef }
         *     
         */
        public ArrayOfRailFareTypeFareSegmentRef getSegmentReferences() {
            return segmentReferences;
        }

        /**
         * Sets the value of the segmentReferences property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfRailFareTypeFareSegmentRef }
         *     
         */
        public void setSegmentReferences(ArrayOfRailFareTypeFareSegmentRef value) {
            this.segmentReferences = value;
        }

        /**
         * Gets the value of the classOfService property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfRailFareTypeFare.Fare.ClassOfService }
         *     
         */
        public ArrayOfRailFareTypeFare.Fare.ClassOfService getClassOfService() {
            return classOfService;
        }

        /**
         * Sets the value of the classOfService property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfRailFareTypeFare.Fare.ClassOfService }
         *     
         */
        public void setClassOfService(ArrayOfRailFareTypeFare.Fare.ClassOfService value) {
            this.classOfService = value;
        }

        /**
         * Gets the value of the classCode property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfRailFareTypeFare.Fare.ClassCode }
         *     
         */
        public ArrayOfRailFareTypeFare.Fare.ClassCode getClassCode() {
            return classCode;
        }

        /**
         * Sets the value of the classCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfRailFareTypeFare.Fare.ClassCode }
         *     
         */
        public void setClassCode(ArrayOfRailFareTypeFare.Fare.ClassCode value) {
            this.classCode = value;
        }

        /**
         * Gets the value of the fareDescription property.
         * 
         * @return
         *     possible object is
         *     {@link ArrayOfRailFareTypeFare.Fare.FareDescription }
         *     
         */
        public ArrayOfRailFareTypeFare.Fare.FareDescription getFareDescription() {
            return fareDescription;
        }

        /**
         * Sets the value of the fareDescription property.
         * 
         * @param value
         *     allowed object is
         *     {@link ArrayOfRailFareTypeFare.Fare.FareDescription }
         *     
         */
        public void setFareDescription(ArrayOfRailFareTypeFare.Fare.FareDescription value) {
            this.fareDescription = value;
        }

        /**
         * Gets the value of the farePrice property.
         * 
         * @return
         *     possible object is
         *     {@link PriceType }
         *     
         */
        public PriceType getFarePrice() {
            return farePrice;
        }

        /**
         * Sets the value of the farePrice property.
         * 
         * @param value
         *     allowed object is
         *     {@link PriceType }
         *     
         */
        public void setFarePrice(PriceType value) {
            this.farePrice = value;
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
         *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
         *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        public static class ClassCode {

            @XmlValue
            protected String value;
            @XmlAttribute(name = "code")
            protected String code;
            @XmlAttribute(name = "type")
            protected String type;

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
             * Gets the value of the code property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCode() {
                return code;
            }

            /**
             * Sets the value of the code property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCode(String value) {
                this.code = value;
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


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;simpleContent>
         *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
         *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
        public static class ClassOfService {

            @XmlValue
            protected String value;
            @XmlAttribute(name = "code")
            protected String code;
            @XmlAttribute(name = "type")
            protected String type;

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
             * Gets the value of the code property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCode() {
                return code;
            }

            /**
             * Sets the value of the code property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCode(String value) {
                this.code = value;
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
         *         &lt;element name="Name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Code" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Detail" maxOccurs="unbounded" minOccurs="0">
         *           &lt;complexType>
         *             &lt;simpleContent>
         *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
         *                 &lt;attribute name="codeContext" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/extension>
         *             &lt;/simpleContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="Condition" maxOccurs="unbounded" minOccurs="0">
         *           &lt;complexType>
         *             &lt;simpleContent>
         *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                 &lt;attribute name="lang" type="{http://www.w3.org/2001/XMLSchema}string" />
         *               &lt;/extension>
         *             &lt;/simpleContent>
         *           &lt;/complexType>
         *         &lt;/element>
         *         &lt;element name="Fees" type="{http://services.sabre.com/res/or/v1_4}ArrayOfFeeType" minOccurs="0"/>
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
            "name",
            "code",
            "detail",
            "condition",
            "fees"
        })
        public static class FareDescription {

            @XmlElement(name = "Name", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String name;
            @XmlElement(name = "Code", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String code;
            @XmlElement(name = "Detail", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<ArrayOfRailFareTypeFare.Fare.FareDescription.Detail> detail;
            @XmlElement(name = "Condition", namespace = "http://services.sabre.com/res/or/v1_4")
            protected List<ArrayOfRailFareTypeFare.Fare.FareDescription.Condition> condition;
            @XmlElement(name = "Fees", namespace = "http://services.sabre.com/res/or/v1_4")
            protected ArrayOfFeeType fees;

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

            /**
             * Gets the value of the code property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getCode() {
                return code;
            }

            /**
             * Sets the value of the code property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setCode(String value) {
                this.code = value;
            }

            /**
             * Gets the value of the detail property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the detail property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getDetail().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link ArrayOfRailFareTypeFare.Fare.FareDescription.Detail }
             * 
             * 
             */
            public List<ArrayOfRailFareTypeFare.Fare.FareDescription.Detail> getDetail() {
                if (detail == null) {
                    detail = new ArrayList<ArrayOfRailFareTypeFare.Fare.FareDescription.Detail>();
                }
                return this.detail;
            }

            /**
             * Gets the value of the condition property.
             * 
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the condition property.
             * 
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getCondition().add(newItem);
             * </pre>
             * 
             * 
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link ArrayOfRailFareTypeFare.Fare.FareDescription.Condition }
             * 
             * 
             */
            public List<ArrayOfRailFareTypeFare.Fare.FareDescription.Condition> getCondition() {
                if (condition == null) {
                    condition = new ArrayList<ArrayOfRailFareTypeFare.Fare.FareDescription.Condition>();
                }
                return this.condition;
            }

            /**
             * Gets the value of the fees property.
             * 
             * @return
             *     possible object is
             *     {@link ArrayOfFeeType }
             *     
             */
            public ArrayOfFeeType getFees() {
                return fees;
            }

            /**
             * Sets the value of the fees property.
             * 
             * @param value
             *     allowed object is
             *     {@link ArrayOfFeeType }
             *     
             */
            public void setFees(ArrayOfFeeType value) {
                this.fees = value;
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
            public static class Condition {

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
             *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
             *       &lt;attribute name="codeContext" type="{http://www.w3.org/2001/XMLSchema}string" />
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
            public static class Detail {

                @XmlValue
                protected String value;
                @XmlAttribute(name = "type")
                protected String type;
                @XmlAttribute(name = "codeContext")
                protected String codeContext;

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
                 * Gets the value of the codeContext property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link String }
                 *     
                 */
                public String getCodeContext() {
                    return codeContext;
                }

                /**
                 * Sets the value of the codeContext property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link String }
                 *     
                 */
                public void setCodeContext(String value) {
                    this.codeContext = value;
                }

            }

        }

    }

}
