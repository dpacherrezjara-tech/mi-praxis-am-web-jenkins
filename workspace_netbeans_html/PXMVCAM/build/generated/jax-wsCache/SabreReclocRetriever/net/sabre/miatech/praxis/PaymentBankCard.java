
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Payment.BankCard complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Payment.BankCard">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="MaskedCardNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ExpireDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ApprovalCode" type="{http://www.sabre.com/ns/Ticketing/DC}Code.Approval" minOccurs="0"/>
 *         &lt;element name="ExtendedPayment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ApprovalSource" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="ApprovalType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CardBinNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Authorized" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="AddressVerification" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="TransactionId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CorporateContract" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DynamicCurrencyConversion" type="{http://www.sabre.com/ns/Ticketing/DC}DynamicCurrencyConversion" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="accb" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cardType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cardName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Payment.BankCard", propOrder = {
    "maskedCardNumber",
    "expireDate",
    "approvalCode",
    "extendedPayment",
    "details",
    "approvalSource",
    "approvalType",
    "cardBinNumber",
    "authorized",
    "addressVerification",
    "transactionId",
    "corporateContract",
    "dynamicCurrencyConversion"
})
public class PaymentBankCard {

    @XmlElement(name = "MaskedCardNumber")
    protected String maskedCardNumber;
    @XmlElement(name = "ExpireDate")
    protected String expireDate;
    @XmlElement(name = "ApprovalCode")
    protected CodeApproval approvalCode;
    @XmlElement(name = "ExtendedPayment")
    protected String extendedPayment;
    @XmlElement(name = "Details")
    protected String details;
    @XmlElement(name = "ApprovalSource")
    protected String approvalSource;
    @XmlElement(name = "ApprovalType")
    protected String approvalType;
    @XmlElement(name = "CardBinNumber")
    protected String cardBinNumber;
    @XmlElement(name = "Authorized")
    protected AmountBasic authorized;
    @XmlElement(name = "AddressVerification")
    protected String addressVerification;
    @XmlElement(name = "TransactionId")
    protected String transactionId;
    @XmlElement(name = "CorporateContract")
    protected String corporateContract;
    @XmlElement(name = "DynamicCurrencyConversion")
    protected DynamicCurrencyConversion dynamicCurrencyConversion;
    @XmlAttribute(name = "accb")
    protected String accb;
    @XmlAttribute(name = "cardType")
    protected String cardType;
    @XmlAttribute(name = "cardName")
    protected String cardName;

    /**
     * Gets the value of the maskedCardNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMaskedCardNumber() {
        return maskedCardNumber;
    }

    /**
     * Sets the value of the maskedCardNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMaskedCardNumber(String value) {
        this.maskedCardNumber = value;
    }

    /**
     * Gets the value of the expireDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExpireDate() {
        return expireDate;
    }

    /**
     * Sets the value of the expireDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExpireDate(String value) {
        this.expireDate = value;
    }

    /**
     * Gets the value of the approvalCode property.
     * 
     * @return
     *     possible object is
     *     {@link CodeApproval }
     *     
     */
    public CodeApproval getApprovalCode() {
        return approvalCode;
    }

    /**
     * Sets the value of the approvalCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link CodeApproval }
     *     
     */
    public void setApprovalCode(CodeApproval value) {
        this.approvalCode = value;
    }

    /**
     * Gets the value of the extendedPayment property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExtendedPayment() {
        return extendedPayment;
    }

    /**
     * Sets the value of the extendedPayment property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExtendedPayment(String value) {
        this.extendedPayment = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDetails(String value) {
        this.details = value;
    }

    /**
     * Gets the value of the approvalSource property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApprovalSource() {
        return approvalSource;
    }

    /**
     * Sets the value of the approvalSource property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApprovalSource(String value) {
        this.approvalSource = value;
    }

    /**
     * Gets the value of the approvalType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getApprovalType() {
        return approvalType;
    }

    /**
     * Sets the value of the approvalType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setApprovalType(String value) {
        this.approvalType = value;
    }

    /**
     * Gets the value of the cardBinNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCardBinNumber() {
        return cardBinNumber;
    }

    /**
     * Sets the value of the cardBinNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCardBinNumber(String value) {
        this.cardBinNumber = value;
    }

    /**
     * Gets the value of the authorized property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getAuthorized() {
        return authorized;
    }

    /**
     * Sets the value of the authorized property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setAuthorized(AmountBasic value) {
        this.authorized = value;
    }

    /**
     * Gets the value of the addressVerification property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAddressVerification() {
        return addressVerification;
    }

    /**
     * Sets the value of the addressVerification property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAddressVerification(String value) {
        this.addressVerification = value;
    }

    /**
     * Gets the value of the transactionId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransactionId() {
        return transactionId;
    }

    /**
     * Sets the value of the transactionId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransactionId(String value) {
        this.transactionId = value;
    }

    /**
     * Gets the value of the corporateContract property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCorporateContract() {
        return corporateContract;
    }

    /**
     * Sets the value of the corporateContract property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCorporateContract(String value) {
        this.corporateContract = value;
    }

    /**
     * Gets the value of the dynamicCurrencyConversion property.
     * 
     * @return
     *     possible object is
     *     {@link DynamicCurrencyConversion }
     *     
     */
    public DynamicCurrencyConversion getDynamicCurrencyConversion() {
        return dynamicCurrencyConversion;
    }

    /**
     * Sets the value of the dynamicCurrencyConversion property.
     * 
     * @param value
     *     allowed object is
     *     {@link DynamicCurrencyConversion }
     *     
     */
    public void setDynamicCurrencyConversion(DynamicCurrencyConversion value) {
        this.dynamicCurrencyConversion = value;
    }

    /**
     * Gets the value of the accb property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccb() {
        return accb;
    }

    /**
     * Sets the value of the accb property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccb(String value) {
        this.accb = value;
    }

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
     * Gets the value of the cardName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCardName() {
        return cardName;
    }

    /**
     * Sets the value of the cardName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCardName(String value) {
        this.cardName = value;
    }

}
