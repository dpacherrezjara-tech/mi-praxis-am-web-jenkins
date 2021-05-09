
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Ticketing.Document.EMD complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Document.EMD">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Indicators" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Indicators.EMD" minOccurs="0"/>
 *         &lt;element name="Details" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Details.EMD" minOccurs="0"/>
 *         &lt;element name="Customer" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Customer" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Affinity" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Affinity" minOccurs="0"/>
 *         &lt;element name="Miscellaneous" type="{http://www.sabre.com/ns/Ticketing/DC}MyTicketingDocument.Miscellaneous" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Amounts" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Amounts.EMD" minOccurs="0"/>
 *         &lt;element name="Taxes" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Taxes.EMD" minOccurs="0"/>
 *         &lt;element name="Remark" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Remark.EMD" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="ValueCalculation" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.ValueCalculation" minOccurs="0"/>
 *         &lt;element name="RelatedDocument" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Related" minOccurs="0"/>
 *         &lt;element name="Payment" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Payment" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="History" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.History" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="number" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="accountingCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="formNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="serialNumber" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="checkDigit" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.Document.EMD", propOrder = {
    "indicators",
    "details",
    "customer",
    "affinity",
    "miscellaneous",
    "amounts",
    "taxes",
    "remark",
    "valueCalculation",
    "relatedDocument",
    "payment",
    "history"
})
public class TicketingDocumentEMD {

    @XmlElement(name = "Indicators")
    protected TicketingDocumentIndicatorsEMD indicators;
    @XmlElement(name = "Details")
    protected TicketingDocumentDetailsEMD details;
    @XmlElement(name = "Customer")
    protected List<TicketingDocumentCustomer> customer;
    @XmlElement(name = "Affinity")
    protected TicketingDocumentAffinity affinity;
    @XmlElement(name = "Miscellaneous")
    protected List<MyTicketingDocumentMiscellaneous> miscellaneous;
    @XmlElement(name = "Amounts")
    protected TicketingDocumentAmountsEMD amounts;
    @XmlElement(name = "Taxes")
    protected TicketingDocumentTaxesEMD taxes;
    @XmlElement(name = "Remark")
    protected List<TicketingDocumentRemarkEMD> remark;
    @XmlElement(name = "ValueCalculation")
    protected TicketingDocumentValueCalculation valueCalculation;
    @XmlElement(name = "RelatedDocument")
    protected TicketingDocumentRelated relatedDocument;
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

    /**
     * Gets the value of the indicators property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentIndicatorsEMD }
     *     
     */
    public TicketingDocumentIndicatorsEMD getIndicators() {
        return indicators;
    }

    /**
     * Sets the value of the indicators property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentIndicatorsEMD }
     *     
     */
    public void setIndicators(TicketingDocumentIndicatorsEMD value) {
        this.indicators = value;
    }

    /**
     * Gets the value of the details property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentDetailsEMD }
     *     
     */
    public TicketingDocumentDetailsEMD getDetails() {
        return details;
    }

    /**
     * Sets the value of the details property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentDetailsEMD }
     *     
     */
    public void setDetails(TicketingDocumentDetailsEMD value) {
        this.details = value;
    }

    /**
     * Gets the value of the customer property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the customer property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCustomer().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentCustomer }
     * 
     * 
     */
    public List<TicketingDocumentCustomer> getCustomer() {
        if (customer == null) {
            customer = new ArrayList<TicketingDocumentCustomer>();
        }
        return this.customer;
    }

    /**
     * Gets the value of the affinity property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentAffinity }
     *     
     */
    public TicketingDocumentAffinity getAffinity() {
        return affinity;
    }

    /**
     * Sets the value of the affinity property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentAffinity }
     *     
     */
    public void setAffinity(TicketingDocumentAffinity value) {
        this.affinity = value;
    }

    /**
     * Gets the value of the miscellaneous property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the miscellaneous property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMiscellaneous().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MyTicketingDocumentMiscellaneous }
     * 
     * 
     */
    public List<MyTicketingDocumentMiscellaneous> getMiscellaneous() {
        if (miscellaneous == null) {
            miscellaneous = new ArrayList<MyTicketingDocumentMiscellaneous>();
        }
        return this.miscellaneous;
    }

    /**
     * Gets the value of the amounts property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentAmountsEMD }
     *     
     */
    public TicketingDocumentAmountsEMD getAmounts() {
        return amounts;
    }

    /**
     * Sets the value of the amounts property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentAmountsEMD }
     *     
     */
    public void setAmounts(TicketingDocumentAmountsEMD value) {
        this.amounts = value;
    }

    /**
     * Gets the value of the taxes property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTaxesEMD }
     *     
     */
    public TicketingDocumentTaxesEMD getTaxes() {
        return taxes;
    }

    /**
     * Sets the value of the taxes property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTaxesEMD }
     *     
     */
    public void setTaxes(TicketingDocumentTaxesEMD value) {
        this.taxes = value;
    }

    /**
     * Gets the value of the remark property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the remark property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRemark().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TicketingDocumentRemarkEMD }
     * 
     * 
     */
    public List<TicketingDocumentRemarkEMD> getRemark() {
        if (remark == null) {
            remark = new ArrayList<TicketingDocumentRemarkEMD>();
        }
        return this.remark;
    }

    /**
     * Gets the value of the valueCalculation property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentValueCalculation }
     *     
     */
    public TicketingDocumentValueCalculation getValueCalculation() {
        return valueCalculation;
    }

    /**
     * Sets the value of the valueCalculation property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentValueCalculation }
     *     
     */
    public void setValueCalculation(TicketingDocumentValueCalculation value) {
        this.valueCalculation = value;
    }

    /**
     * Gets the value of the relatedDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentRelated }
     *     
     */
    public TicketingDocumentRelated getRelatedDocument() {
        return relatedDocument;
    }

    /**
     * Sets the value of the relatedDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentRelated }
     *     
     */
    public void setRelatedDocument(TicketingDocumentRelated value) {
        this.relatedDocument = value;
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

}
