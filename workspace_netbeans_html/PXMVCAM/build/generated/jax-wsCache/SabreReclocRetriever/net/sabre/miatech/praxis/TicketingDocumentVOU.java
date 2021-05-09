
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Ticketing.Document.VOU complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Document.VOU">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Indicators" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Indicators.VOU" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Details.VOU" minOccurs="0"/>
 *         &lt;element name="Customer" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Customer" minOccurs="0"/>
 *         &lt;element name="ServiceCoupon" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.ServiceCoupon.VOU" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Amounts" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Amounts.VOU" minOccurs="0"/>
 *         &lt;element name="Taxes" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Taxes.VOU" minOccurs="0"/>
 *         &lt;element name="Remark" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Remark" minOccurs="0"/>
 *         &lt;element name="AffiliatedAgent" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.AffiliatedAgent.Ticket" minOccurs="0"/>
 *         &lt;element name="RelatedDocument" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Related.VOU" minOccurs="0"/>
 *         &lt;element name="PrintCoupon" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.PrintCoupon" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Payment" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Payment" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="History" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.History" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="number" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="accountingCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="formNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="serialNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="checkDigit" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="service" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.Document.VOU", propOrder = {
    "indicators",
    "details",
    "customer",
    "serviceCoupon",
    "amounts",
    "taxes",
    "remark",
    "affiliatedAgent",
    "relatedDocument",
    "printCoupon",
    "payment",
    "history"
})
public class TicketingDocumentVOU {

    @XmlElement(name = "Indicators")
    protected TicketingDocumentIndicatorsVOU indicators;
    @XmlElement(name = "Details")
    protected TicketingDocumentDetailsVOU details;
    @XmlElement(name = "Customer")
    protected TicketingDocumentCustomer customer;
    @XmlElement(name = "ServiceCoupon")
    protected List<TicketingDocumentServiceCouponVOU> serviceCoupon;
    @XmlElement(name = "Amounts")
    protected TicketingDocumentAmountsVOU amounts;
    @XmlElement(name = "Taxes")
    protected TicketingDocumentTaxesVOU taxes;
    @XmlElement(name = "Remark")
    protected TicketingDocumentRemark remark;
    @XmlElement(name = "AffiliatedAgent")
    protected TicketingDocumentAffiliatedAgentTicket affiliatedAgent;
    @XmlElement(name = "RelatedDocument")
    protected TicketingDocumentRelatedVOU relatedDocument;
    @XmlElement(name = "PrintCoupon")
    protected List<TicketingDocumentPrintCoupon> printCoupon;
    @XmlElement(name = "Payment")
    protected List<TicketingDocumentPayment> payment;
    @XmlElement(name = "History")
    protected List<TicketingDocumentHistory> history;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "number")
    protected String number;
    @XmlAttribute(name = "accountingCode")
    protected String accountingCode;
    @XmlAttribute(name = "formNumber")
    protected String formNumber;
    @XmlAttribute(name = "serialNumber")
    protected String serialNumber;
    @XmlAttribute(name = "checkDigit")
    protected String checkDigit;
    @XmlAttribute(name = "service")
    protected String service;

    /**
     * Gets the value of the indicators property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentIndicatorsVOU }
     *     
     */
    public TicketingDocumentIndicatorsVOU getIndicators() {
        return indicators;
    }

    /**
     * Sets the value of the indicators property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentIndicatorsVOU }
     *     
     */
    public void setIndicators(TicketingDocumentIndicatorsVOU value) {
        this.indicators = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentDetailsVOU }
     *     
     */
    public TicketingDocumentDetailsVOU getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentDetailsVOU }
     *     
     */
    public void setDetails(TicketingDocumentDetailsVOU value) {
        this.details = value;
    }

    /**
     * Gets the value of the customer property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentCustomer }
     *     
     */
    public TicketingDocumentCustomer getCustomer() {
        return customer;
    }

    /**
     * Sets the value of the customer property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentCustomer }
     *     
     */
    public void setCustomer(TicketingDocumentCustomer value) {
        this.customer = value;
    }

    /**
     * Gets the value of the serviceCoupon property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the serviceCoupon property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getServiceCoupon().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentServiceCouponVOU }
     * 
     * 
     */
    public List<TicketingDocumentServiceCouponVOU> getServiceCoupon() {
        if (serviceCoupon == null) {
            serviceCoupon = new ArrayList<TicketingDocumentServiceCouponVOU>();
        }
        return this.serviceCoupon;
    }

    /**
     * Gets the value of the amounts property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentAmountsVOU }
     *     
     */
    public TicketingDocumentAmountsVOU getAmounts() {
        return amounts;
    }

    /**
     * Sets the value of the amounts property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentAmountsVOU }
     *     
     */
    public void setAmounts(TicketingDocumentAmountsVOU value) {
        this.amounts = value;
    }

    /**
     * Gets the value of the taxes property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTaxesVOU }
     *     
     */
    public TicketingDocumentTaxesVOU getTaxes() {
        return taxes;
    }

    /**
     * Sets the value of the taxes property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTaxesVOU }
     *     
     */
    public void setTaxes(TicketingDocumentTaxesVOU value) {
        this.taxes = value;
    }

    /**
     * Gets the value of the remark property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentRemark }
     *     
     */
    public TicketingDocumentRemark getRemark() {
        return remark;
    }

    /**
     * Sets the value of the remark property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentRemark }
     *     
     */
    public void setRemark(TicketingDocumentRemark value) {
        this.remark = value;
    }

    /**
     * Gets the value of the affiliatedAgent property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentAffiliatedAgentTicket }
     *     
     */
    public TicketingDocumentAffiliatedAgentTicket getAffiliatedAgent() {
        return affiliatedAgent;
    }

    /**
     * Sets the value of the affiliatedAgent property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentAffiliatedAgentTicket }
     *     
     */
    public void setAffiliatedAgent(TicketingDocumentAffiliatedAgentTicket value) {
        this.affiliatedAgent = value;
    }

    /**
     * Gets the value of the relatedDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentRelatedVOU }
     *     
     */
    public TicketingDocumentRelatedVOU getRelatedDocument() {
        return relatedDocument;
    }

    /**
     * Sets the value of the relatedDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentRelatedVOU }
     *     
     */
    public void setRelatedDocument(TicketingDocumentRelatedVOU value) {
        this.relatedDocument = value;
    }

    /**
     * Gets the value of the printCoupon property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the printCoupon property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPrintCoupon().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentPrintCoupon }
     * 
     * 
     */
    public List<TicketingDocumentPrintCoupon> getPrintCoupon() {
        if (printCoupon == null) {
            printCoupon = new ArrayList<TicketingDocumentPrintCoupon>();
        }
        return this.printCoupon;
    }

    /**
     * Gets the value of the payment property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the payment property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPayment().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentPayment }
     * 
     * 
     */
    public List<TicketingDocumentPayment> getPayment() {
        if (payment == null) {
            payment = new ArrayList<TicketingDocumentPayment>();
        }
        return this.payment;
    }

    /**
     * Gets the value of the history property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the history property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHistory().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentHistory }
     * 
     * 
     */
    public List<TicketingDocumentHistory> getHistory() {
        if (history == null) {
            history = new ArrayList<TicketingDocumentHistory>();
        }
        return this.history;
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
     * Gets the value of the accountingCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccountingCode() {
        return accountingCode;
    }

    /**
     * Sets the value of the accountingCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccountingCode(String value) {
        this.accountingCode = value;
    }

    /**
     * Gets the value of the formNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormNumber() {
        return formNumber;
    }

    /**
     * Sets the value of the formNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormNumber(String value) {
        this.formNumber = value;
    }

    /**
     * Gets the value of the serialNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSerialNumber() {
        return serialNumber;
    }

    /**
     * Sets the value of the serialNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSerialNumber(String value) {
        this.serialNumber = value;
    }

    /**
     * Gets the value of the checkDigit property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCheckDigit() {
        return checkDigit;
    }

    /**
     * Sets the value of the checkDigit property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCheckDigit(String value) {
        this.checkDigit = value;
    }

    /**
     * Gets the value of the service property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getService() {
        return service;
    }

    /**
     * Sets the value of the service property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setService(String value) {
        this.service = value;
    }

}
