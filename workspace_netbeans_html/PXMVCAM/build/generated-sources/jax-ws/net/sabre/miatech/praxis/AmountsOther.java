
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Amounts.Other complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Amounts.Other">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="AddCollect" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details.SourceLREC" minOccurs="0"/>
 *         &lt;element name="NonRefundable" type="{http://www.sabre.com/ns/Ticketing/DC}AmountExtended.Details" minOccurs="0"/>
 *         &lt;element name="ChangeFee" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="OtherFee" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details" minOccurs="0"/>
 *         &lt;element name="Commission" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Rate" minOccurs="0"/>
 *         &lt;element name="FullCommission" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Rate" minOccurs="0"/>
 *         &lt;element name="GrandTotal" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Residual" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="Waived" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="NUC" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Details.RateofExchange" minOccurs="0"/>
 *         &lt;element name="OBFee" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic.OBFee" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="OBFeesTotal" type="{http://www.sabre.com/ns/Ticketing/DC}Amount.Basic" minOccurs="0"/>
 *         &lt;element name="TotalFees" type="{http://www.sabre.com/ns/Ticketing/DC}Amount1" minOccurs="0"/>
 *         &lt;element name="TotalBaseFees" type="{http://www.sabre.com/ns/Ticketing/DC}Amount1" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Amounts.Other", propOrder = {
    "addCollect",
    "nonRefundable",
    "changeFee",
    "otherFee",
    "commission",
    "fullCommission",
    "grandTotal",
    "residual",
    "waived",
    "nuc",
    "obFee",
    "obFeesTotal",
    "totalFees",
    "totalBaseFees"
})
public class AmountsOther {

    @XmlElement(name = "AddCollect")
    protected AmountDetailsSourceLREC addCollect;
    @XmlElement(name = "NonRefundable")
    protected AmountExtendedDetails nonRefundable;
    @XmlElement(name = "ChangeFee")
    protected AmountDetails changeFee;
    @XmlElement(name = "OtherFee")
    protected AmountDetails otherFee;
    @XmlElement(name = "Commission")
    protected AmountRate commission;
    @XmlElement(name = "FullCommission")
    protected AmountRate fullCommission;
    @XmlElement(name = "GrandTotal")
    protected AmountBasic grandTotal;
    @XmlElement(name = "Residual")
    protected AmountBasic residual;
    @XmlElement(name = "Waived")
    protected AmountBasic waived;
    @XmlElement(name = "NUC")
    protected AmountDetailsRateofExchange nuc;
    @XmlElement(name = "OBFee")
    protected List<AmountBasicOBFee> obFee;
    @XmlElement(name = "OBFeesTotal")
    protected AmountBasic obFeesTotal;
    @XmlElement(name = "TotalFees")
    protected Amount1 totalFees;
    @XmlElement(name = "TotalBaseFees")
    protected Amount1 totalBaseFees;

    /**
     * Gets the value of the addCollect property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetailsSourceLREC }
     *     
     */
    public AmountDetailsSourceLREC getAddCollect() {
        return addCollect;
    }

    /**
     * Sets the value of the addCollect property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetailsSourceLREC }
     *     
     */
    public void setAddCollect(AmountDetailsSourceLREC value) {
        this.addCollect = value;
    }

    /**
     * Gets the value of the nonRefundable property.
     * 
     * @return
     *     possible object is
     *     {@link AmountExtendedDetails }
     *     
     */
    public AmountExtendedDetails getNonRefundable() {
        return nonRefundable;
    }

    /**
     * Sets the value of the nonRefundable property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountExtendedDetails }
     *     
     */
    public void setNonRefundable(AmountExtendedDetails value) {
        this.nonRefundable = value;
    }

    /**
     * Gets the value of the changeFee property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getChangeFee() {
        return changeFee;
    }

    /**
     * Sets the value of the changeFee property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setChangeFee(AmountDetails value) {
        this.changeFee = value;
    }

    /**
     * Gets the value of the otherFee property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetails }
     *     
     */
    public AmountDetails getOtherFee() {
        return otherFee;
    }

    /**
     * Sets the value of the otherFee property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetails }
     *     
     */
    public void setOtherFee(AmountDetails value) {
        this.otherFee = value;
    }

    /**
     * Gets the value of the commission property.
     * 
     * @return
     *     possible object is
     *     {@link AmountRate }
     *     
     */
    public AmountRate getCommission() {
        return commission;
    }

    /**
     * Sets the value of the commission property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountRate }
     *     
     */
    public void setCommission(AmountRate value) {
        this.commission = value;
    }

    /**
     * Gets the value of the fullCommission property.
     * 
     * @return
     *     possible object is
     *     {@link AmountRate }
     *     
     */
    public AmountRate getFullCommission() {
        return fullCommission;
    }

    /**
     * Sets the value of the fullCommission property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountRate }
     *     
     */
    public void setFullCommission(AmountRate value) {
        this.fullCommission = value;
    }

    /**
     * Gets the value of the grandTotal property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getGrandTotal() {
        return grandTotal;
    }

    /**
     * Sets the value of the grandTotal property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setGrandTotal(AmountBasic value) {
        this.grandTotal = value;
    }

    /**
     * Gets the value of the residual property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getResidual() {
        return residual;
    }

    /**
     * Sets the value of the residual property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setResidual(AmountBasic value) {
        this.residual = value;
    }

    /**
     * Gets the value of the waived property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getWaived() {
        return waived;
    }

    /**
     * Sets the value of the waived property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setWaived(AmountBasic value) {
        this.waived = value;
    }

    /**
     * Gets the value of the nuc property.
     * 
     * @return
     *     possible object is
     *     {@link AmountDetailsRateofExchange }
     *     
     */
    public AmountDetailsRateofExchange getNUC() {
        return nuc;
    }

    /**
     * Sets the value of the nuc property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountDetailsRateofExchange }
     *     
     */
    public void setNUC(AmountDetailsRateofExchange value) {
        this.nuc = value;
    }

    /**
     * Gets the value of the obFee property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the obFee property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getOBFee().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link AmountBasicOBFee }
     * 
     * 
     */
    public List<AmountBasicOBFee> getOBFee() {
        if (obFee == null) {
            obFee = new ArrayList<AmountBasicOBFee>();
        }
        return this.obFee;
    }

    /**
     * Gets the value of the obFeesTotal property.
     * 
     * @return
     *     possible object is
     *     {@link AmountBasic }
     *     
     */
    public AmountBasic getOBFeesTotal() {
        return obFeesTotal;
    }

    /**
     * Sets the value of the obFeesTotal property.
     * 
     * @param value
     *     allowed object is
     *     {@link AmountBasic }
     *     
     */
    public void setOBFeesTotal(AmountBasic value) {
        this.obFeesTotal = value;
    }

    /**
     * Gets the value of the totalFees property.
     * 
     * @return
     *     possible object is
     *     {@link Amount1 }
     *     
     */
    public Amount1 getTotalFees() {
        return totalFees;
    }

    /**
     * Sets the value of the totalFees property.
     * 
     * @param value
     *     allowed object is
     *     {@link Amount1 }
     *     
     */
    public void setTotalFees(Amount1 value) {
        this.totalFees = value;
    }

    /**
     * Gets the value of the totalBaseFees property.
     * 
     * @return
     *     possible object is
     *     {@link Amount1 }
     *     
     */
    public Amount1 getTotalBaseFees() {
        return totalBaseFees;
    }

    /**
     * Sets the value of the totalBaseFees property.
     * 
     * @param value
     *     allowed object is
     *     {@link Amount1 }
     *     
     */
    public void setTotalBaseFees(Amount1 value) {
        this.totalBaseFees = value;
    }

}
