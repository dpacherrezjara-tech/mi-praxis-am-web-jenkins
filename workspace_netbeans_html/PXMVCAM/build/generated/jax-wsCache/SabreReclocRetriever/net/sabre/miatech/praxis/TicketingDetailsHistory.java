
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Ticketing.Details.History complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Ticketing.Details.History">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SupportingDocument" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OldReservation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="NewReservation" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="CouponBitMap" type="{http://www.w3.org/2001/XMLSchema}base64Binary" minOccurs="0"/>
 *         &lt;element name="AccountingCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="OldRemark" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="PreviousDocumentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DocumentPurgeTypeCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="InConnectionDocument" type="{http://www.sabre.com/ns/Ticketing/DC}Number.Document" minOccurs="0"/>
 *         &lt;element name="CurrentDocumentStatus" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="DocumentEventActivity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="AffectedCoupons" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Ticketing.Details.History", propOrder = {
    "supportingDocument",
    "oldReservation",
    "newReservation",
    "couponBitMap",
    "accountingCode",
    "oldRemark",
    "previousDocumentStatus",
    "documentPurgeTypeCode",
    "inConnectionDocument",
    "currentDocumentStatus",
    "documentEventActivity",
    "affectedCoupons"
})
public class TicketingDetailsHistory {

    @XmlElement(name = "SupportingDocument")
    protected String supportingDocument;
    @XmlElement(name = "OldReservation")
    protected String oldReservation;
    @XmlElement(name = "NewReservation")
    protected String newReservation;
    @XmlElement(name = "CouponBitMap")
    protected byte[] couponBitMap;
    @XmlElement(name = "AccountingCode")
    protected String accountingCode;
    @XmlElement(name = "OldRemark")
    protected String oldRemark;
    @XmlElement(name = "PreviousDocumentStatus")
    protected String previousDocumentStatus;
    @XmlElement(name = "DocumentPurgeTypeCode")
    protected String documentPurgeTypeCode;
    @XmlElement(name = "InConnectionDocument")
    protected NumberDocument inConnectionDocument;
    @XmlElement(name = "CurrentDocumentStatus")
    protected String currentDocumentStatus;
    @XmlElement(name = "DocumentEventActivity")
    protected String documentEventActivity;
    @XmlElement(name = "AffectedCoupons")
    protected String affectedCoupons;

    /**
     * Gets the value of the supportingDocument property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSupportingDocument() {
        return supportingDocument;
    }

    /**
     * Sets the value of the supportingDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSupportingDocument(String value) {
        this.supportingDocument = value;
    }

    /**
     * Gets the value of the oldReservation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOldReservation() {
        return oldReservation;
    }

    /**
     * Sets the value of the oldReservation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOldReservation(String value) {
        this.oldReservation = value;
    }

    /**
     * Gets the value of the newReservation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNewReservation() {
        return newReservation;
    }

    /**
     * Sets the value of the newReservation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNewReservation(String value) {
        this.newReservation = value;
    }

    /**
     * Gets the value of the couponBitMap property.
     * 
     * @return
     *     possible object is
     *     byte[]
     */
    public byte[] getCouponBitMap() {
        return couponBitMap;
    }

    /**
     * Sets the value of the couponBitMap property.
     * 
     * @param value
     *     allowed object is
     *     byte[]
     */
    public void setCouponBitMap(byte[] value) {
        this.couponBitMap = value;
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
     * Gets the value of the oldRemark property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOldRemark() {
        return oldRemark;
    }

    /**
     * Sets the value of the oldRemark property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOldRemark(String value) {
        this.oldRemark = value;
    }

    /**
     * Gets the value of the previousDocumentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPreviousDocumentStatus() {
        return previousDocumentStatus;
    }

    /**
     * Sets the value of the previousDocumentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPreviousDocumentStatus(String value) {
        this.previousDocumentStatus = value;
    }

    /**
     * Gets the value of the documentPurgeTypeCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentPurgeTypeCode() {
        return documentPurgeTypeCode;
    }

    /**
     * Sets the value of the documentPurgeTypeCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentPurgeTypeCode(String value) {
        this.documentPurgeTypeCode = value;
    }

    /**
     * Gets the value of the inConnectionDocument property.
     * 
     * @return
     *     possible object is
     *     {@link NumberDocument }
     *     
     */
    public NumberDocument getInConnectionDocument() {
        return inConnectionDocument;
    }

    /**
     * Sets the value of the inConnectionDocument property.
     * 
     * @param value
     *     allowed object is
     *     {@link NumberDocument }
     *     
     */
    public void setInConnectionDocument(NumberDocument value) {
        this.inConnectionDocument = value;
    }

    /**
     * Gets the value of the currentDocumentStatus property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentDocumentStatus() {
        return currentDocumentStatus;
    }

    /**
     * Sets the value of the currentDocumentStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentDocumentStatus(String value) {
        this.currentDocumentStatus = value;
    }

    /**
     * Gets the value of the documentEventActivity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDocumentEventActivity() {
        return documentEventActivity;
    }

    /**
     * Sets the value of the documentEventActivity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDocumentEventActivity(String value) {
        this.documentEventActivity = value;
    }

    /**
     * Gets the value of the affectedCoupons property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAffectedCoupons() {
        return affectedCoupons;
    }

    /**
     * Sets the value of the affectedCoupons property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAffectedCoupons(String value) {
        this.affectedCoupons = value;
    }

}
