
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for MyTicketingDocument.MiscellaneousBasic complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="MyTicketingDocument.MiscellaneousBasic">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Fee" type="{http://www.sabre.com/ns/Ticketing/DC}Fee.Details" minOccurs="0"/>
 *         &lt;element name="OptionalService" type="{http://www.sabre.com/ns/Ticketing/DC}OptionalServiceOTH" minOccurs="0"/>
 *         &lt;element name="ServiceCoupon" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.ServiceCoupon.EMD" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Tax" type="{http://www.sabre.com/ns/Ticketing/DC}Tax.Misc" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="AssociatedTicketNumber" type="{http://www.sabre.com/ns/Ticketing/DC}Number.AssociatedDocument" minOccurs="0"/>
 *         &lt;element name="Affinity" type="{http://www.sabre.com/ns/Ticketing/DC}TicketingDocument.Affinity" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "MyTicketingDocument.MiscellaneousBasic", propOrder = {
    "fee",
    "optionalService",
    "serviceCoupon",
    "tax",
    "associatedTicketNumber",
    "affinity"
})
public class MyTicketingDocumentMiscellaneousBasic {

    @XmlElement(name = "Fee")
    protected FeeDetails fee;
    @XmlElement(name = "OptionalService")
    protected OptionalServiceOTH optionalService;
    @XmlElement(name = "ServiceCoupon")
    protected List<TicketingDocumentServiceCouponEMD> serviceCoupon;
    @XmlElement(name = "Tax")
    protected List<TaxMisc> tax;
    @XmlElement(name = "AssociatedTicketNumber")
    protected NumberAssociatedDocument associatedTicketNumber;
    @XmlElement(name = "Affinity")
    protected TicketingDocumentAffinity affinity;

    /**
     * Gets the value of the fee property.
     * 
     * @return
     *     possible object is
     *     {@link FeeDetails }
     *     
     */
    public FeeDetails getFee() {
        return fee;
    }

    /**
     * Sets the value of the fee property.
     * 
     * @param value
     *     allowed object is
     *     {@link FeeDetails }
     *     
     */
    public void setFee(FeeDetails value) {
        this.fee = value;
    }

    /**
     * Gets the value of the optionalService property.
     * 
     * @return
     *     possible object is
     *     {@link OptionalServiceOTH }
     *     
     */
    public OptionalServiceOTH getOptionalService() {
        return optionalService;
    }

    /**
     * Sets the value of the optionalService property.
     * 
     * @param value
     *     allowed object is
     *     {@link OptionalServiceOTH }
     *     
     */
    public void setOptionalService(OptionalServiceOTH value) {
        this.optionalService = value;
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
     * {@link TicketingDocumentServiceCouponEMD }
     * 
     * 
     */
    public List<TicketingDocumentServiceCouponEMD> getServiceCoupon() {
        if (serviceCoupon == null) {
            serviceCoupon = new ArrayList<TicketingDocumentServiceCouponEMD>();
        }
        return this.serviceCoupon;
    }

    /**
     * Gets the value of the tax property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the tax property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTax().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link TaxMisc }
     * 
     * 
     */
    public List<TaxMisc> getTax() {
        if (tax == null) {
            tax = new ArrayList<TaxMisc>();
        }
        return this.tax;
    }

    /**
     * Gets the value of the associatedTicketNumber property.
     * 
     * @return
     *     possible object is
     *     {@link NumberAssociatedDocument }
     *     
     */
    public NumberAssociatedDocument getAssociatedTicketNumber() {
        return associatedTicketNumber;
    }

    /**
     * Sets the value of the associatedTicketNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link NumberAssociatedDocument }
     *     
     */
    public void setAssociatedTicketNumber(NumberAssociatedDocument value) {
        this.associatedTicketNumber = value;
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

}
