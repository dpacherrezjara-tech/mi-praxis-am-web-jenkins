
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.Indicators complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.Indicators">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="commisionable" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="electronic" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="interlineable" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="refundable" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="retransmit" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="reservarionPurge" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="selfSale" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="historical" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="reverseVoid" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="ASR" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="manualAdd" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="manualUpdate" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="presentCreditCard" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="netReporting" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="endorsable" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="penaltyRestriction" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="exchangeable" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="refundCalculation" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="residentDiscount" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="nonInteractive" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="plainPaper" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="NUC_Suppression" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *       &lt;attribute name="payLater" type="{http://www.w3.org/2001/XMLSchema}boolean" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.Indicators")
public class TicketingDocumentIndicators {

    @XmlAttribute(name = "commisionable")
    protected String commisionable;
    @XmlAttribute(name = "electronic")
    protected Boolean electronic;
    @XmlAttribute(name = "interlineable")
    protected String interlineable;
    @XmlAttribute(name = "refundable")
    protected String refundable;
    @XmlAttribute(name = "retransmit")
    protected Boolean retransmit;
    @XmlAttribute(name = "reservarionPurge")
    protected Boolean reservarionPurge;
    @XmlAttribute(name = "selfSale")
    protected Boolean selfSale;
    @XmlAttribute(name = "historical")
    protected Boolean historical;
    @XmlAttribute(name = "reverseVoid")
    protected Boolean reverseVoid;
    @XmlAttribute(name = "ASR")
    protected Boolean asr;
    @XmlAttribute(name = "manualAdd")
    protected Boolean manualAdd;
    @XmlAttribute(name = "manualUpdate")
    protected Boolean manualUpdate;
    @XmlAttribute(name = "presentCreditCard")
    protected Boolean presentCreditCard;
    @XmlAttribute(name = "netReporting")
    protected Boolean netReporting;
    @XmlAttribute(name = "endorsable")
    protected Boolean endorsable;
    @XmlAttribute(name = "penaltyRestriction")
    protected Boolean penaltyRestriction;
    @XmlAttribute(name = "exchangeable")
    protected Boolean exchangeable;
    @XmlAttribute(name = "refundCalculation")
    protected Boolean refundCalculation;
    @XmlAttribute(name = "residentDiscount")
    protected Boolean residentDiscount;
    @XmlAttribute(name = "nonInteractive")
    protected Boolean nonInteractive;
    @XmlAttribute(name = "plainPaper")
    protected Boolean plainPaper;
    @XmlAttribute(name = "NUC_Suppression")
    protected Boolean nucSuppression;
    @XmlAttribute(name = "payLater")
    protected Boolean payLater;

    /**
     * Gets the value of the commisionable property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCommisionable() {
        return commisionable;
    }

    /**
     * Sets the value of the commisionable property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCommisionable(String value) {
        this.commisionable = value;
    }

    /**
     * Gets the value of the electronic property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isElectronic() {
        return electronic;
    }

    /**
     * Sets the value of the electronic property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setElectronic(Boolean value) {
        this.electronic = value;
    }

    /**
     * Gets the value of the interlineable property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInterlineable() {
        return interlineable;
    }

    /**
     * Sets the value of the interlineable property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInterlineable(String value) {
        this.interlineable = value;
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
     * Gets the value of the retransmit property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isRetransmit() {
        return retransmit;
    }

    /**
     * Sets the value of the retransmit property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setRetransmit(Boolean value) {
        this.retransmit = value;
    }

    /**
     * Gets the value of the reservarionPurge property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isReservarionPurge() {
        return reservarionPurge;
    }

    /**
     * Sets the value of the reservarionPurge property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setReservarionPurge(Boolean value) {
        this.reservarionPurge = value;
    }

    /**
     * Gets the value of the selfSale property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isSelfSale() {
        return selfSale;
    }

    /**
     * Sets the value of the selfSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setSelfSale(Boolean value) {
        this.selfSale = value;
    }

    /**
     * Gets the value of the historical property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isHistorical() {
        return historical;
    }

    /**
     * Sets the value of the historical property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setHistorical(Boolean value) {
        this.historical = value;
    }

    /**
     * Gets the value of the reverseVoid property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isReverseVoid() {
        return reverseVoid;
    }

    /**
     * Sets the value of the reverseVoid property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setReverseVoid(Boolean value) {
        this.reverseVoid = value;
    }

    /**
     * Gets the value of the asr property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isASR() {
        return asr;
    }

    /**
     * Sets the value of the asr property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setASR(Boolean value) {
        this.asr = value;
    }

    /**
     * Gets the value of the manualAdd property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManualAdd() {
        return manualAdd;
    }

    /**
     * Sets the value of the manualAdd property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManualAdd(Boolean value) {
        this.manualAdd = value;
    }

    /**
     * Gets the value of the manualUpdate property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isManualUpdate() {
        return manualUpdate;
    }

    /**
     * Sets the value of the manualUpdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setManualUpdate(Boolean value) {
        this.manualUpdate = value;
    }

    /**
     * Gets the value of the presentCreditCard property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPresentCreditCard() {
        return presentCreditCard;
    }

    /**
     * Sets the value of the presentCreditCard property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPresentCreditCard(Boolean value) {
        this.presentCreditCard = value;
    }

    /**
     * Gets the value of the netReporting property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isNetReporting() {
        return netReporting;
    }

    /**
     * Sets the value of the netReporting property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setNetReporting(Boolean value) {
        this.netReporting = value;
    }

    /**
     * Gets the value of the endorsable property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isEndorsable() {
        return endorsable;
    }

    /**
     * Sets the value of the endorsable property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setEndorsable(Boolean value) {
        this.endorsable = value;
    }

    /**
     * Gets the value of the penaltyRestriction property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPenaltyRestriction() {
        return penaltyRestriction;
    }

    /**
     * Sets the value of the penaltyRestriction property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPenaltyRestriction(Boolean value) {
        this.penaltyRestriction = value;
    }

    /**
     * Gets the value of the exchangeable property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isExchangeable() {
        return exchangeable;
    }

    /**
     * Sets the value of the exchangeable property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setExchangeable(Boolean value) {
        this.exchangeable = value;
    }

    /**
     * Gets the value of the refundCalculation property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isRefundCalculation() {
        return refundCalculation;
    }

    /**
     * Sets the value of the refundCalculation property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setRefundCalculation(Boolean value) {
        this.refundCalculation = value;
    }

    /**
     * Gets the value of the residentDiscount property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isResidentDiscount() {
        return residentDiscount;
    }

    /**
     * Sets the value of the residentDiscount property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setResidentDiscount(Boolean value) {
        this.residentDiscount = value;
    }

    /**
     * Gets the value of the nonInteractive property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isNonInteractive() {
        return nonInteractive;
    }

    /**
     * Sets the value of the nonInteractive property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setNonInteractive(Boolean value) {
        this.nonInteractive = value;
    }

    /**
     * Gets the value of the plainPaper property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPlainPaper() {
        return plainPaper;
    }

    /**
     * Sets the value of the plainPaper property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPlainPaper(Boolean value) {
        this.plainPaper = value;
    }

    /**
     * Gets the value of the nucSuppression property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isNUCSuppression() {
        return nucSuppression;
    }

    /**
     * Sets the value of the nucSuppression property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setNUCSuppression(Boolean value) {
        this.nucSuppression = value;
    }

    /**
     * Gets the value of the payLater property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isPayLater() {
        return payLater;
    }

    /**
     * Sets the value of the payLater property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPayLater(Boolean value) {
        this.payLater = value;
    }

}
