
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for MandateInfo.Details complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="MandateInfo.Details">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Mandate" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Basic" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="Disclaimer" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Basic" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="HazardousMaterials" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Basic" minOccurs="0"/>
 *         &lt;element name="Fiscal" type="{http://www.sabre.com/ns/Ticketing/DC}MandateInfo.Basic" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "MandateInfo.Details", propOrder = {
    "mandate",
    "disclaimer",
    "hazardousMaterials",
    "fiscal"
})
public class MandateInfoDetails {

    @XmlElement(name = "Mandate")
    protected List<MandateInfoBasic> mandate;
    @XmlElement(name = "Disclaimer")
    protected List<MandateInfoBasic> disclaimer;
    @XmlElement(name = "HazardousMaterials")
    protected MandateInfoBasic hazardousMaterials;
    @XmlElement(name = "Fiscal")
    protected MandateInfoBasic fiscal;

    /**
     * Gets the value of the mandate property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the mandate property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMandate().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MandateInfoBasic }
     * 
     * 
     */
    public List<MandateInfoBasic> getMandate() {
        if (mandate == null) {
            mandate = new ArrayList<MandateInfoBasic>();
        }
        return this.mandate;
    }

    /**
     * Gets the value of the disclaimer property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the disclaimer property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDisclaimer().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link MandateInfoBasic }
     * 
     * 
     */
    public List<MandateInfoBasic> getDisclaimer() {
        if (disclaimer == null) {
            disclaimer = new ArrayList<MandateInfoBasic>();
        }
        return this.disclaimer;
    }

    /**
     * Gets the value of the hazardousMaterials property.
     * 
     * @return
     *     possible object is
     *     {@link MandateInfoBasic }
     *     
     */
    public MandateInfoBasic getHazardousMaterials() {
        return hazardousMaterials;
    }

    /**
     * Sets the value of the hazardousMaterials property.
     * 
     * @param value
     *     allowed object is
     *     {@link MandateInfoBasic }
     *     
     */
    public void setHazardousMaterials(MandateInfoBasic value) {
        this.hazardousMaterials = value;
    }

    /**
     * Gets the value of the fiscal property.
     * 
     * @return
     *     possible object is
     *     {@link MandateInfoBasic }
     *     
     */
    public MandateInfoBasic getFiscal() {
        return fiscal;
    }

    /**
     * Sets the value of the fiscal property.
     * 
     * @param value
     *     allowed object is
     *     {@link MandateInfoBasic }
     *     
     */
    public void setFiscal(MandateInfoBasic value) {
        this.fiscal = value;
    }

}
