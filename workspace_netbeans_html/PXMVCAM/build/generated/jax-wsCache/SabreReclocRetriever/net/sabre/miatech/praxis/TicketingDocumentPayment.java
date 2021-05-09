
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for TicketingDocument.Payment complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Payment">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Base" type="{http://www.sabre.com/ns/Ticketing/DC}PaymentAmount.Basic" minOccurs="0"/>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}PaymentAmount.Basic" minOccurs="0"/>
 *         &lt;element name="Total" type="{http://www.sabre.com/ns/Ticketing/DC}PaymentAmount.Basic" minOccurs="0"/>
 *         &lt;element name="Remarks" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AccountCode" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.PaymentAccount" minOccurs="0"/>
 *         &lt;element name="DeploymentId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Card" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.BankCard" minOccurs="0"/>
 *         &lt;element name="Cash" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Cash" minOccurs="0"/>
 *         &lt;element name="Check" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.BankCheck" minOccurs="0"/>
 *         &lt;element name="TravelDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.TravelDocument" minOccurs="0"/>
 *         &lt;element name="Voucher" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Voucher" minOccurs="0"/>
 *         &lt;element name="GovernmentTravel" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.GovernmentTravel" minOccurs="0"/>
 *         &lt;element name="Invoice" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Invoice" minOccurs="0"/>
 *         &lt;element name="PrepaidTicketAdvice" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.PrepaidTicketAdvise" minOccurs="0"/>
 *         &lt;element name="Certficate" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Certficate" minOccurs="0"/>
 *         &lt;element name="Miscellaneous" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Miscellaneous" minOccurs="0"/>
 *         &lt;element name="RevenueAccounting" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.RevenueAccounting" minOccurs="0"/>
 *         &lt;element name="Other" type="{http://www.sabre.com/ns/Ticketing/DC}Payment.Other" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}ID" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="sequence" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *       &lt;attribute name="code" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="missingPayAmtInd" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="paymentConfirmation" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Payment", propOrder = {
    "base",
    "tax",
    "total",
    "remarks",
    "accountCode",
    "deploymentId",
    "card",
    "cash",
    "check",
    "travelDocument",
    "voucher",
    "governmentTravel",
    "invoice",
    "prepaidTicketAdvice",
    "certficate",
    "miscellaneous",
    "revenueAccounting",
    "other"
})
public class TicketingDocumentPayment {

    @XmlElement(name = "Base")
    protected PaymentAmountBasic base;
    @XmlElement(name = "Tax")
    protected PaymentAmountBasic tax;
    @XmlElement(name = "Total")
    protected PaymentAmountBasic total;
    @XmlElement(name = "Remarks")
    protected String remarks;
    @XmlElement(name = "AccountCode")
    protected IdentifierPaymentAccount accountCode;
    @XmlElement(name = "DeploymentId")
    protected String deploymentId;
    @XmlElement(name = "Card")
    protected PaymentBankCard card;
    @XmlElement(name = "Cash")
    protected PaymentCash cash;
    @XmlElement(name = "Check")
    protected PaymentBankCheck check;
    @XmlElement(name = "TravelDocument")
    protected PaymentTravelDocument travelDocument;
    @XmlElement(name = "Voucher")
    protected PaymentVoucher voucher;
    @XmlElement(name = "GovernmentTravel")
    protected PaymentGovernmentTravel governmentTravel;
    @XmlElement(name = "Invoice")
    protected PaymentInvoice invoice;
    @XmlElement(name = "PrepaidTicketAdvice")
    protected PaymentPrepaidTicketAdvise prepaidTicketAdvice;
    @XmlElement(name = "Certficate")
    protected PaymentCertficate certficate;
    @XmlElement(name = "Miscellaneous")
    protected PaymentMiscellaneous miscellaneous;
    @XmlElement(name = "RevenueAccounting")
    protected PaymentRevenueAccounting revenueAccounting;
    @XmlElement(name = "Other")
    protected PaymentOther other;
    @XmlAttribute(name = "id")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlID
    @XmlSchemaType(name = "ID")
    protected String id;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "sequence")
    protected BigInteger sequence;
    @XmlAttribute(name = "code")
    protected String code;
    @XmlAttribute(name = "missingPayAmtInd")
    protected Boolean missingPayAmtInd;
    @XmlAttribute(name = "paymentConfirmation")
    protected Boolean paymentConfirmation;

    /**
     * Gets the value of the base property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public PaymentAmountBasic getBase() {
        return base;
    }

    /**
     * Sets the value of the base property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public void setBase(PaymentAmountBasic value) {
        this.base = value;
    }

    /**
     * Gets the value of the tax property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public PaymentAmountBasic getTax() {
        return tax;
    }

    /**
     * Sets the value of the tax property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public void setTax(PaymentAmountBasic value) {
        this.tax = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public PaymentAmountBasic getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentAmountBasic }
     *     
     */
    public void setTotal(PaymentAmountBasic value) {
        this.total = value;
    }

    /**
     * Gets the value of the remarks property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRemarks() {
        return remarks;
    }

    /**
     * Sets the value of the remarks property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRemarks(String value) {
        this.remarks = value;
    }

    /**
     * Gets the value of the accountCode property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierPaymentAccount }
     *     
     */
    public IdentifierPaymentAccount getAccountCode() {
        return accountCode;
    }

    /**
     * Sets the value of the accountCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierPaymentAccount }
     *     
     */
    public void setAccountCode(IdentifierPaymentAccount value) {
        this.accountCode = value;
    }

    /**
     * Gets the value of the deploymentId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDeploymentId() {
        return deploymentId;
    }

    /**
     * Sets the value of the deploymentId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDeploymentId(String value) {
        this.deploymentId = value;
    }

    /**
     * Gets the value of the card property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentBankCard }
     *     
     */
    public PaymentBankCard getCard() {
        return card;
    }

    /**
     * Sets the value of the card property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentBankCard }
     *     
     */
    public void setCard(PaymentBankCard value) {
        this.card = value;
    }

    /**
     * Gets the value of the cash property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentCash }
     *     
     */
    public PaymentCash getCash() {
        return cash;
    }

    /**
     * Sets the value of the cash property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentCash }
     *     
     */
    public void setCash(PaymentCash value) {
        this.cash = value;
    }

    /**
     * Gets the value of the check property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentBankCheck }
     *     
     */
    public PaymentBankCheck getCheck() {
        return check;
    }

    /**
     * Sets the value of the check property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentBankCheck }
     *     
     */
    public void setCheck(PaymentBankCheck value) {
        this.check = value;
    }

    /**
     * Gets the value of the travelDocument property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentTravelDocument }
     *     
     */
    public PaymentTravelDocument getTravelDocument() {
        return travelDocument;
    }

    /**
     * Sets the value of the travelDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentTravelDocument }
     *     
     */
    public void setTravelDocument(PaymentTravelDocument value) {
        this.travelDocument = value;
    }

    /**
     * Gets the value of the voucher property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentVoucher }
     *     
     */
    public PaymentVoucher getVoucher() {
        return voucher;
    }

    /**
     * Sets the value of the voucher property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentVoucher }
     *     
     */
    public void setVoucher(PaymentVoucher value) {
        this.voucher = value;
    }

    /**
     * Gets the value of the governmentTravel property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentGovernmentTravel }
     *     
     */
    public PaymentGovernmentTravel getGovernmentTravel() {
        return governmentTravel;
    }

    /**
     * Sets the value of the governmentTravel property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentGovernmentTravel }
     *     
     */
    public void setGovernmentTravel(PaymentGovernmentTravel value) {
        this.governmentTravel = value;
    }

    /**
     * Gets the value of the invoice property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentInvoice }
     *     
     */
    public PaymentInvoice getInvoice() {
        return invoice;
    }

    /**
     * Sets the value of the invoice property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentInvoice }
     *     
     */
    public void setInvoice(PaymentInvoice value) {
        this.invoice = value;
    }

    /**
     * Gets the value of the prepaidTicketAdvice property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentPrepaidTicketAdvise }
     *     
     */
    public PaymentPrepaidTicketAdvise getPrepaidTicketAdvice() {
        return prepaidTicketAdvice;
    }

    /**
     * Sets the value of the prepaidTicketAdvice property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentPrepaidTicketAdvise }
     *     
     */
    public void setPrepaidTicketAdvice(PaymentPrepaidTicketAdvise value) {
        this.prepaidTicketAdvice = value;
    }

    /**
     * Gets the value of the certficate property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentCertficate }
     *     
     */
    public PaymentCertficate getCertficate() {
        return certficate;
    }

    /**
     * Sets the value of the certficate property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentCertficate }
     *     
     */
    public void setCertficate(PaymentCertficate value) {
        this.certficate = value;
    }

    /**
     * Gets the value of the miscellaneous property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentMiscellaneous }
     *     
     */
    public PaymentMiscellaneous getMiscellaneous() {
        return miscellaneous;
    }

    /**
     * Sets the value of the miscellaneous property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentMiscellaneous }
     *     
     */
    public void setMiscellaneous(PaymentMiscellaneous value) {
        this.miscellaneous = value;
    }

    /**
     * Gets the value of the revenueAccounting property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentRevenueAccounting }
     *     
     */
    public PaymentRevenueAccounting getRevenueAccounting() {
        return revenueAccounting;
    }

    /**
     * Sets the value of the revenueAccounting property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentRevenueAccounting }
     *     
     */
    public void setRevenueAccounting(PaymentRevenueAccounting value) {
        this.revenueAccounting = value;
    }

    /**
     * Gets the value of the other property.
     * 
     * @return
     *     possible object is
     *     {@link PaymentOther }
     *     
     */
    public PaymentOther getOther() {
        return other;
    }

    /**
     * Sets the value of the other property.
     * 
     * @param value
     *     allowed object is
     *     {@link PaymentOther }
     *     
     */
    public void setOther(PaymentOther value) {
        this.other = value;
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
     * Gets the value of the sequence property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSequence() {
        return sequence;
    }

    /**
     * Sets the value of the sequence property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSequence(BigInteger value) {
        this.sequence = value;
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
     * Gets the value of the missingPayAmtInd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isMissingPayAmtInd() {
        return missingPayAmtInd;
    }

    /**
     * Sets the value of the missingPayAmtInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setMissingPayAmtInd(Boolean value) {
        this.missingPayAmtInd = value;
    }

    /**
     * Gets the value of the paymentConfirmation property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPaymentConfirmation() {
        return paymentConfirmation;
    }

    /**
     * Sets the value of the paymentConfirmation property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPaymentConfirmation(Boolean value) {
        this.paymentConfirmation = value;
    }

}
