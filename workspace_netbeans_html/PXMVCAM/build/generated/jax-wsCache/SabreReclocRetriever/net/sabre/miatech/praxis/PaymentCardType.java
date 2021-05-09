
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
 * <p>Java class for PaymentCardType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="PaymentCardType">
 *   &lt;complexContent>
 *     &lt;extension base="{http://services.sabre.com/res/or/v1_4}AbstractFOPElementType">
 *       &lt;sequence>
 *         &lt;element name="CardType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CardCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CardNumber" minOccurs="0">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="tokenized" type="{http://www.w3.org/2001/XMLSchema}boolean" default="true" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="ExpiryMonth" type="{http://www.w3.org/2001/XMLSchema}gMonth" minOccurs="0"/>
 *         &lt;element name="ExpiryYear" type="{http://www.w3.org/2001/XMLSchema}gYear" minOccurs="0"/>
 *         &lt;element name="ExtendPayment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ApprovalList" type="{http://services.sabre.com/res/or/v1_4}ArrayOfPaymentCardApprovalType" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PaymentCardType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "cardType",
    "cardCode",
    "cardNumber",
    "expiryMonth",
    "expiryYear",
    "extendPayment",
    "approvalList"
})
public class PaymentCardType
    extends AbstractFOPElementType
{

    @XmlElement(name = "CardType")
    protected String cardType;
    @XmlElement(name = "CardCode")
    protected String cardCode;
    @XmlElement(name = "CardNumber")
    protected PaymentCardType.CardNumber cardNumber;
    @XmlElement(name = "ExpiryMonth")
    @XmlSchemaType(name = "gMonth")
    protected XMLGregorianCalendar expiryMonth;
    @XmlElement(name = "ExpiryYear")
    @XmlSchemaType(name = "gYear")
    protected XMLGregorianCalendar expiryYear;
    @XmlElement(name = "ExtendPayment")
    protected String extendPayment;
    @XmlElement(name = "ApprovalList")
    protected ArrayOfPaymentCardApprovalType approvalList;

    /**
     * Gets the value of the cardType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCardType() {
        return cardType;
    }

    /**
     * Sets the value of the cardType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCardType(String value) {
        this.cardType = value;
    }

    /**
     * Gets the value of the cardCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCardCode() {
        return cardCode;
    }

    /**
     * Sets the value of the cardCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCardCode(String value) {
        this.cardCode = value;
    }

    /**
     * Gets the value of the cardNumber property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentCardType.CardNumber }
     *     
     */
    public PaymentCardType.CardNumber getCardNumber() {
        return cardNumber;
    }

    /**
     * Sets the value of the cardNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentCardType.CardNumber }
     *     
     */
    public void setCardNumber(PaymentCardType.CardNumber value) {
        this.cardNumber = value;
    }

    /**
     * Gets the value of the expiryMonth property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExpiryMonth() {
        return expiryMonth;
    }

    /**
     * Sets the value of the expiryMonth property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExpiryMonth(XMLGregorianCalendar value) {
        this.expiryMonth = value;
    }

    /**
     * Gets the value of the expiryYear property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getExpiryYear() {
        return expiryYear;
    }

    /**
     * Sets the value of the expiryYear property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setExpiryYear(XMLGregorianCalendar value) {
        this.expiryYear = value;
    }

    /**
     * Gets the value of the extendPayment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExtendPayment() {
        return extendPayment;
    }

    /**
     * Sets the value of the extendPayment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExtendPayment(String value) {
        this.extendPayment = value;
    }

    /**
     * Gets the value of the approvalList property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfPaymentCardApprovalType }
     *     
     */
    public ArrayOfPaymentCardApprovalType getApprovalList() {
        return approvalList;
    }

    /**
     * Sets the value of the approvalList property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfPaymentCardApprovalType }
     *     
     */
    public void setApprovalList(ArrayOfPaymentCardApprovalType value) {
        this.approvalList = value;
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
     *       &lt;attribute name="tokenized" type="{http://www.w3.org/2001/XMLSchema}boolean" default="true" />
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
    public static class CardNumber {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "tokenized")
        protected Boolean tokenized;

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
         * Gets the value of the tokenized property.
         * 
         * @return
         *     possible object is
         *     {@link Boolean }
         *     
         */
        public boolean isTokenized() {
            if (tokenized == null) {
                return true;
            } else {
                return tokenized;
            }
        }

        /**
         * Sets the value of the tokenized property.
         * 
         * @param value
         *     allowed object is
         *     {@link Boolean }
         *     
         */
        public void setTokenized(Boolean value) {
            this.tokenized = value;
        }

    }

}
