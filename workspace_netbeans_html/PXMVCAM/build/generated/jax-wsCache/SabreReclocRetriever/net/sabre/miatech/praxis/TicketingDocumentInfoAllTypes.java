
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocumentInfo.AllTypes complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocumentInfo.AllTypes">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Agent" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Agent" minOccurs="0"/>
 *         &lt;element name="TransactionInfo" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.TransactionInfo" minOccurs="0"/>
 *         &lt;element name="Ticket" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.Ticket" minOccurs="0"/>
 *         &lt;element name="ElectronicMiscDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.EMD" minOccurs="0"/>
 *         &lt;element name="Voucher" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.VOU" minOccurs="0"/>
 *         &lt;element name="MiscellaneousDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.Miscellaneous" minOccurs="0"/>
 *         &lt;element name="RefundDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.Refund" minOccurs="0"/>
 *         &lt;element name="OtherDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Ticketing.Document.Other" minOccurs="0"/>
 *         &lt;element name="Message" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocumentInfo.AllTypes", propOrder = {
    "agent",
    "transactionInfo",
    "ticket",
    "electronicMiscDocument",
    "voucher",
    "miscellaneousDocument",
    "refundDocument",
    "otherDocument",
    "message"
})
public class TicketingDocumentInfoAllTypes {

    @XmlElement(name = "Agent")
    protected TicketingAgent agent;
    @XmlElement(name = "TransactionInfo")
    protected TicketingTransactionInfo transactionInfo;
    @XmlElement(name = "Ticket")
    protected TicketingDocumentTicket ticket;
    @XmlElement(name = "ElectronicMiscDocument")
    protected TicketingDocumentEMD electronicMiscDocument;
    @XmlElement(name = "Voucher")
    protected TicketingDocumentVOU voucher;
    @XmlElement(name = "MiscellaneousDocument")
    protected TicketingDocumentMiscellaneous miscellaneousDocument;
    @XmlElement(name = "RefundDocument")
    protected TicketingDocumentRefund refundDocument;
    @XmlElement(name = "OtherDocument")
    protected TicketingDocumentOther otherDocument;
    @XmlElement(name = "Message")
    protected String message;

    /**
     * Gets the value of the agent property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingAgent }
     *     
     */
    public TicketingAgent getAgent() {
        return agent;
    }

    /**
     * Sets the value of the agent property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingAgent }
     *     
     */
    public void setAgent(TicketingAgent value) {
        this.agent = value;
    }

    /**
     * Gets the value of the transactionInfo property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingTransactionInfo }
     *     
     */
    public TicketingTransactionInfo getTransactionInfo() {
        return transactionInfo;
    }

    /**
     * Sets the value of the transactionInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingTransactionInfo }
     *     
     */
    public void setTransactionInfo(TicketingTransactionInfo value) {
        this.transactionInfo = value;
    }

    /**
     * Gets the value of the ticket property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentTicket }
     *     
     */
    public TicketingDocumentTicket getTicket() {
        return ticket;
    }

    /**
     * Sets the value of the ticket property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentTicket }
     *     
     */
    public void setTicket(TicketingDocumentTicket value) {
        this.ticket = value;
    }

    /**
     * Gets the value of the electronicMiscDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentEMD }
     *     
     */
    public TicketingDocumentEMD getElectronicMiscDocument() {
        return electronicMiscDocument;
    }

    /**
     * Sets the value of the electronicMiscDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentEMD }
     *     
     */
    public void setElectronicMiscDocument(TicketingDocumentEMD value) {
        this.electronicMiscDocument = value;
    }

    /**
     * Gets the value of the voucher property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentVOU }
     *     
     */
    public TicketingDocumentVOU getVoucher() {
        return voucher;
    }

    /**
     * Sets the value of the voucher property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentVOU }
     *     
     */
    public void setVoucher(TicketingDocumentVOU value) {
        this.voucher = value;
    }

    /**
     * Gets the value of the miscellaneousDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentMiscellaneous }
     *     
     */
    public TicketingDocumentMiscellaneous getMiscellaneousDocument() {
        return miscellaneousDocument;
    }

    /**
     * Sets the value of the miscellaneousDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentMiscellaneous }
     *     
     */
    public void setMiscellaneousDocument(TicketingDocumentMiscellaneous value) {
        this.miscellaneousDocument = value;
    }

    /**
     * Gets the value of the refundDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentRefund }
     *     
     */
    public TicketingDocumentRefund getRefundDocument() {
        return refundDocument;
    }

    /**
     * Sets the value of the refundDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentRefund }
     *     
     */
    public void setRefundDocument(TicketingDocumentRefund value) {
        this.refundDocument = value;
    }

    /**
     * Gets the value of the otherDocument property.
     * 
     * @return
     *     possible object is
     *     {@link TicketingDocumentOther }
     *     
     */
    public TicketingDocumentOther getOtherDocument() {
        return otherDocument;
    }

    /**
     * Sets the value of the otherDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link TicketingDocumentOther }
     *     
     */
    public void setOtherDocument(TicketingDocumentOther value) {
        this.otherDocument = value;
    }

    /**
     * Gets the value of the message property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the value of the message property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMessage(String value) {
        this.message = value;
    }

}
