
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
 * <p>Java class for DocumentType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DocumentType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="DocumentID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AgencyAccountNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CreationChannel" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PassengerReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfDocumentTypePassengerRef" minOccurs="0"/>
 *         &lt;element name="SegmentReferences" type="{http://services.sabre.com/res/or/v1_4}ArrayOfDocumentTypeSegmentRef" minOccurs="0"/>
 *         &lt;element name="IssueTimeLimit" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="IssueDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="DocumentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Charges" type="{http://services.sabre.com/res/or/v1_4}ChargesType" minOccurs="0"/>
 *         &lt;element name="FormOfPayment" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="CreditCard" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="Number" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Issuer" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="ExpirationMonth" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="ExpirationYear" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="CardHolder" minOccurs="0">
 *                               &lt;complexType>
 *                                 &lt;complexContent>
 *                                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                                     &lt;sequence>
 *                                       &lt;element name="PersonName" type="{http://services.sabre.com/res/or/v1_4}PersonNameType" minOccurs="0"/>
 *                                       &lt;element name="Address" type="{http://services.sabre.com/res/or/v1_4}AddressType" minOccurs="0"/>
 *                                       &lt;element name="Telephone" type="{http://services.sabre.com/res/or/v1_4}PhoneType" maxOccurs="unbounded" minOccurs="0"/>
 *                                       &lt;element name="Email" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                                     &lt;/sequence>
 *                                   &lt;/restriction>
 *                                 &lt;/complexContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                   &lt;element name="Cash" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="Check" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="Voucher" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="Other" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="transactionID" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="File" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Representation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="URL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="coding" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="IssueType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DocumentRules" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Exchangable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="Refundable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="Rule" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;simpleContent>
 *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                           &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                         &lt;/extension>
 *                       &lt;/simpleContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *       &lt;attribute name="codeContext" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DocumentType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "documentID",
    "agencyAccountNumber",
    "creationChannel",
    "passengerReferences",
    "segmentReferences",
    "issueTimeLimit",
    "issueDateTime",
    "documentStatus",
    "charges",
    "formOfPayment",
    "file",
    "issueType",
    "documentRules"
})
public class DocumentType {

    @XmlElement(name = "DocumentID")
    protected String documentID;
    @XmlElement(name = "AgencyAccountNumber")
    protected String agencyAccountNumber;
    @XmlElement(name = "CreationChannel")
    protected String creationChannel;
    @XmlElement(name = "PassengerReferences")
    protected ArrayOfDocumentTypePassengerRef passengerReferences;
    @XmlElement(name = "SegmentReferences")
    protected ArrayOfDocumentTypeSegmentRef segmentReferences;
    @XmlElement(name = "IssueTimeLimit")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar issueTimeLimit;
    @XmlElement(name = "IssueDateTime")
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar issueDateTime;
    @XmlElement(name = "DocumentStatus")
    protected String documentStatus;
    @XmlElement(name = "Charges")
    protected ChargesType charges;
    @XmlElement(name = "FormOfPayment")
    protected DocumentType.FormOfPayment formOfPayment;
    @XmlElement(name = "File")
    protected DocumentType.File file;
    @XmlElement(name = "IssueType")
    protected String issueType;
    @XmlElement(name = "DocumentRules")
    protected DocumentType.DocumentRules documentRules;
    @XmlAttribute(name = "codeContext")
    protected String codeContext;
    @XmlAttribute(name = "code")
    protected String code;
    @XmlAttribute(name = "type")
    protected String type;

    /**
     * Gets the value of the documentID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentID() {
        return documentID;
    }

    /**
     * Sets the value of the documentID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentID(String value) {
        this.documentID = value;
    }

    /**
     * Gets the value of the agencyAccountNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAgencyAccountNumber() {
        return agencyAccountNumber;
    }

    /**
     * Sets the value of the agencyAccountNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAgencyAccountNumber(String value) {
        this.agencyAccountNumber = value;
    }

    /**
     * Gets the value of the creationChannel property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCreationChannel() {
        return creationChannel;
    }

    /**
     * Sets the value of the creationChannel property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCreationChannel(String value) {
        this.creationChannel = value;
    }

    /**
     * Gets the value of the passengerReferences property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDocumentTypePassengerRef }
     *     
     */
    public ArrayOfDocumentTypePassengerRef getPassengerReferences() {
        return passengerReferences;
    }

    /**
     * Sets the value of the passengerReferences property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDocumentTypePassengerRef }
     *     
     */
    public void setPassengerReferences(ArrayOfDocumentTypePassengerRef value) {
        this.passengerReferences = value;
    }

    /**
     * Gets the value of the segmentReferences property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfDocumentTypeSegmentRef }
     *     
     */
    public ArrayOfDocumentTypeSegmentRef getSegmentReferences() {
        return segmentReferences;
    }

    /**
     * Sets the value of the segmentReferences property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfDocumentTypeSegmentRef }
     *     
     */
    public void setSegmentReferences(ArrayOfDocumentTypeSegmentRef value) {
        this.segmentReferences = value;
    }

    /**
     * Gets the value of the issueTimeLimit property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getIssueTimeLimit() {
        return issueTimeLimit;
    }

    /**
     * Sets the value of the issueTimeLimit property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setIssueTimeLimit(XMLGregorianCalendar value) {
        this.issueTimeLimit = value;
    }

    /**
     * Gets the value of the issueDateTime property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getIssueDateTime() {
        return issueDateTime;
    }

    /**
     * Sets the value of the issueDateTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setIssueDateTime(XMLGregorianCalendar value) {
        this.issueDateTime = value;
    }

    /**
     * Gets the value of the documentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentStatus() {
        return documentStatus;
    }

    /**
     * Sets the value of the documentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentStatus(String value) {
        this.documentStatus = value;
    }

    /**
     * Gets the value of the charges property.
     * 
     * @return
     *     possible object is
     *     {@link ChargesType }
     *     
     */
    public ChargesType getCharges() {
        return charges;
    }

    /**
     * Sets the value of the charges property.
     * 
     * @param value
     *     allowed object is
     *     {@link ChargesType }
     *     
     */
    public void setCharges(ChargesType value) {
        this.charges = value;
    }

    /**
     * Gets the value of the formOfPayment property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentType.FormOfPayment }
     *     
     */
    public DocumentType.FormOfPayment getFormOfPayment() {
        return formOfPayment;
    }

    /**
     * Sets the value of the formOfPayment property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentType.FormOfPayment }
     *     
     */
    public void setFormOfPayment(DocumentType.FormOfPayment value) {
        this.formOfPayment = value;
    }

    /**
     * Gets the value of the file property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentType.File }
     *     
     */
    public DocumentType.File getFile() {
        return file;
    }

    /**
     * Sets the value of the file property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentType.File }
     *     
     */
    public void setFile(DocumentType.File value) {
        this.file = value;
    }

    /**
     * Gets the value of the issueType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIssueType() {
        return issueType;
    }

    /**
     * Sets the value of the issueType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIssueType(String value) {
        this.issueType = value;
    }

    /**
     * Gets the value of the documentRules property.
     * 
     * @return
     *     possible object is
     *     {@link DocumentType.DocumentRules }
     *     
     */
    public DocumentType.DocumentRules getDocumentRules() {
        return documentRules;
    }

    /**
     * Sets the value of the documentRules property.
     * 
     * @param value
     *     allowed object is
     *     {@link DocumentType.DocumentRules }
     *     
     */
    public void setDocumentRules(DocumentType.DocumentRules value) {
        this.documentRules = value;
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
     *         &lt;element name="Exchangable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="Refundable" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="Rule" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;simpleContent>
     *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                 &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
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
    @XmlType(name = "", propOrder = {
        "exchangable",
        "refundable",
        "rule"
    })
    public static class DocumentRules {

        @XmlElement(name = "Exchangable", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String exchangable;
        @XmlElement(name = "Refundable", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String refundable;
        @XmlElement(name = "Rule", namespace = "http://services.sabre.com/res/or/v1_4")
        protected List<DocumentType.DocumentRules.Rule> rule;

        /**
         * Gets the value of the exchangable property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getExchangable() {
            return exchangable;
        }

        /**
         * Sets the value of the exchangable property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setExchangable(String value) {
            this.exchangable = value;
        }

        /**
         * Gets the value of the refundable property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRefundable() {
            return refundable;
        }

        /**
         * Sets the value of the refundable property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRefundable(String value) {
            this.refundable = value;
        }

        /**
         * Gets the value of the rule property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the rule property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getRule().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link DocumentType.DocumentRules.Rule }
         * 
         * 
         */
        public List<DocumentType.DocumentRules.Rule> getRule() {
            if (rule == null) {
                rule = new ArrayList<DocumentType.DocumentRules.Rule>();
            }
            return this.rule;
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
        public static class Rule {

            @XmlValue
            protected String value;
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
     *         &lt;element name="Representation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="URL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *       &lt;/sequence>
     *       &lt;attribute name="coding" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "representation",
        "url"
    })
    public static class File {

        @XmlElement(name = "Representation", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String representation;
        @XmlElement(name = "URL", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String url;
        @XmlAttribute(name = "coding")
        protected String coding;
        @XmlAttribute(name = "type")
        protected String type;

        /**
         * Gets the value of the representation property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRepresentation() {
            return representation;
        }

        /**
         * Sets the value of the representation property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRepresentation(String value) {
            this.representation = value;
        }

        /**
         * Gets the value of the url property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getURL() {
            return url;
        }

        /**
         * Sets the value of the url property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setURL(String value) {
            this.url = value;
        }

        /**
         * Gets the value of the coding property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCoding() {
            return coding;
        }

        /**
         * Sets the value of the coding property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCoding(String value) {
            this.coding = value;
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
     *         &lt;element name="CreditCard" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="Number" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Issuer" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="ExpirationMonth" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="ExpirationYear" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="CardHolder" minOccurs="0">
     *                     &lt;complexType>
     *                       &lt;complexContent>
     *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                           &lt;sequence>
     *                             &lt;element name="PersonName" type="{http://services.sabre.com/res/or/v1_4}PersonNameType" minOccurs="0"/>
     *                             &lt;element name="Address" type="{http://services.sabre.com/res/or/v1_4}AddressType" minOccurs="0"/>
     *                             &lt;element name="Telephone" type="{http://services.sabre.com/res/or/v1_4}PhoneType" maxOccurs="unbounded" minOccurs="0"/>
     *                             &lt;element name="Email" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
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
     *         &lt;element name="Cash" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="Check" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="Voucher" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="Other" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *       &lt;/sequence>
     *       &lt;attribute name="transactionID" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "creditCard",
        "cash",
        "check",
        "voucher",
        "other"
    })
    public static class FormOfPayment {

        @XmlElement(name = "CreditCard", namespace = "http://services.sabre.com/res/or/v1_4")
        protected DocumentType.FormOfPayment.CreditCard creditCard;
        @XmlElement(name = "Cash", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String cash;
        @XmlElement(name = "Check", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String check;
        @XmlElement(name = "Voucher", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String voucher;
        @XmlElement(name = "Other", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String other;
        @XmlAttribute(name = "transactionID")
        protected String transactionID;

        /**
         * Gets the value of the creditCard property.
         * 
         * @return
         *     possible object is
         *     {@link DocumentType.FormOfPayment.CreditCard }
         *     
         */
        public DocumentType.FormOfPayment.CreditCard getCreditCard() {
            return creditCard;
        }

        /**
         * Sets the value of the creditCard property.
         * 
         * @param value
         *     allowed object is
         *     {@link DocumentType.FormOfPayment.CreditCard }
         *     
         */
        public void setCreditCard(DocumentType.FormOfPayment.CreditCard value) {
            this.creditCard = value;
        }

        /**
         * Gets the value of the cash property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCash() {
            return cash;
        }

        /**
         * Sets the value of the cash property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCash(String value) {
            this.cash = value;
        }

        /**
         * Gets the value of the check property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCheck() {
            return check;
        }

        /**
         * Sets the value of the check property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCheck(String value) {
            this.check = value;
        }

        /**
         * Gets the value of the voucher property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getVoucher() {
            return voucher;
        }

        /**
         * Sets the value of the voucher property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setVoucher(String value) {
            this.voucher = value;
        }

        /**
         * Gets the value of the other property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getOther() {
            return other;
        }

        /**
         * Sets the value of the other property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setOther(String value) {
            this.other = value;
        }

        /**
         * Gets the value of the transactionID property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTransactionID() {
            return transactionID;
        }

        /**
         * Sets the value of the transactionID property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTransactionID(String value) {
            this.transactionID = value;
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
         *         &lt;element name="Number" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Issuer" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="ExpirationMonth" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="ExpirationYear" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="CardHolder" minOccurs="0">
         *           &lt;complexType>
         *             &lt;complexContent>
         *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *                 &lt;sequence>
         *                   &lt;element name="PersonName" type="{http://services.sabre.com/res/or/v1_4}PersonNameType" minOccurs="0"/>
         *                   &lt;element name="Address" type="{http://services.sabre.com/res/or/v1_4}AddressType" minOccurs="0"/>
         *                   &lt;element name="Telephone" type="{http://services.sabre.com/res/or/v1_4}PhoneType" maxOccurs="unbounded" minOccurs="0"/>
         *                   &lt;element name="Email" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
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
            "number",
            "issuer",
            "expirationMonth",
            "expirationYear",
            "cardHolder"
        })
        public static class CreditCard {

            @XmlElement(name = "Number", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String number;
            @XmlElement(name = "Issuer", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String issuer;
            @XmlElement(name = "ExpirationMonth", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String expirationMonth;
            @XmlElement(name = "ExpirationYear", namespace = "http://services.sabre.com/res/or/v1_4")
            protected String expirationYear;
            @XmlElement(name = "CardHolder", namespace = "http://services.sabre.com/res/or/v1_4")
            protected DocumentType.FormOfPayment.CreditCard.CardHolder cardHolder;

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
             * Gets the value of the issuer property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getIssuer() {
                return issuer;
            }

            /**
             * Sets the value of the issuer property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setIssuer(String value) {
                this.issuer = value;
            }

            /**
             * Gets the value of the expirationMonth property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getExpirationMonth() {
                return expirationMonth;
            }

            /**
             * Sets the value of the expirationMonth property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setExpirationMonth(String value) {
                this.expirationMonth = value;
            }

            /**
             * Gets the value of the expirationYear property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getExpirationYear() {
                return expirationYear;
            }

            /**
             * Sets the value of the expirationYear property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setExpirationYear(String value) {
                this.expirationYear = value;
            }

            /**
             * Gets the value of the cardHolder property.
             * 
             * @return
             *     possible object is
             *     {@link DocumentType.FormOfPayment.CreditCard.CardHolder }
             *     
             */
            public DocumentType.FormOfPayment.CreditCard.CardHolder getCardHolder() {
                return cardHolder;
            }

            /**
             * Sets the value of the cardHolder property.
             * 
             * @param value
             *     allowed object is
             *     {@link DocumentType.FormOfPayment.CreditCard.CardHolder }
             *     
             */
            public void setCardHolder(DocumentType.FormOfPayment.CreditCard.CardHolder value) {
                this.cardHolder = value;
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
             *         &lt;element name="PersonName" type="{http://services.sabre.com/res/or/v1_4}PersonNameType" minOccurs="0"/>
             *         &lt;element name="Address" type="{http://services.sabre.com/res/or/v1_4}AddressType" minOccurs="0"/>
             *         &lt;element name="Telephone" type="{http://services.sabre.com/res/or/v1_4}PhoneType" maxOccurs="unbounded" minOccurs="0"/>
             *         &lt;element name="Email" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
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
                "personName",
                "address",
                "telephone",
                "email"
            })
            public static class CardHolder {

                @XmlElement(name = "PersonName", namespace = "http://services.sabre.com/res/or/v1_4")
                protected PersonNameType personName;
                @XmlElement(name = "Address", namespace = "http://services.sabre.com/res/or/v1_4")
                protected AddressType address;
                @XmlElement(name = "Telephone", namespace = "http://services.sabre.com/res/or/v1_4")
                protected List<PhoneType> telephone;
                @XmlElement(name = "Email", namespace = "http://services.sabre.com/res/or/v1_4")
                protected List<String> email;

                /**
                 * Gets the value of the personName property.
                 * 
                 * @return
                 *     possible object is
                 *     {@link PersonNameType }
                 *     
                 */
                public PersonNameType getPersonName() {
                    return personName;
                }

                /**
                 * Sets the value of the personName property.
                 * 
                 * @param value
                 *     allowed object is
                 *     {@link PersonNameType }
                 *     
                 */
                public void setPersonName(PersonNameType value) {
                    this.personName = value;
                }

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
                 * Gets the value of the telephone property.
                 * 
                 * <p>
                 * This accessor method returns a reference to the live list,
                 * not a snapshot. Therefore any modification you make to the
                 * returned list will be present inside the JAXB object.
                 * This is why there is not a <CODE>set</CODE> method for the telephone property.
                 * 
                 * <p>
                 * For example, to add a new item, do as follows:
                 * <pre>
                 *    getTelephone().add(newItem);
                 * </pre>
                 * 
                 * 
                 * <p>
                 * Objects of the following type(s) are allowed in the list
                 * {@link PhoneType }
                 * 
                 * 
                 */
                public List<PhoneType> getTelephone() {
                    if (telephone == null) {
                        telephone = new ArrayList<PhoneType>();
                    }
                    return this.telephone;
                }

                /**
                 * Gets the value of the email property.
                 * 
                 * <p>
                 * This accessor method returns a reference to the live list,
                 * not a snapshot. Therefore any modification you make to the
                 * returned list will be present inside the JAXB object.
                 * This is why there is not a <CODE>set</CODE> method for the email property.
                 * 
                 * <p>
                 * For example, to add a new item, do as follows:
                 * <pre>
                 *    getEmail().add(newItem);
                 * </pre>
                 * 
                 * 
                 * <p>
                 * Objects of the following type(s) are allowed in the list
                 * {@link String }
                 * 
                 * 
                 */
                public List<String> getEmail() {
                    if (email == null) {
                        email = new ArrayList<String>();
                    }
                    return this.email;
                }

            }

        }

    }

}
