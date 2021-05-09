
package net.sabre.miatech.praxis;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Tax" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;attribute name="TaxAmount" type="{http://www.w3.org/2001/XMLSchema}decimal" />
 *                 &lt;attribute name="TaxCode" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "tax"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax {

    @XmlElement(name = "Tax")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax.Tax> tax;

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
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax.Tax }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax.Tax> getTax() {
        if (tax == null) {
            tax = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemAncillariesAncillaryServiceTax.Tax>();
        }
        return this.tax;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;attribute name="TaxAmount" type="{http://www.w3.org/2001/XMLSchema}decimal" />
     *       &lt;attribute name="TaxCode" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "")
    public static class Tax {

        @XmlAttribute(name = "TaxAmount")
        protected BigDecimal taxAmount;
        @XmlAttribute(name = "TaxCode")
        protected String taxCode;

        /**
         * Gets the value of the taxAmount property.
         * 
         * @return
         *     possible object is
         *     {@link BigDecimal }
         *     
         */
        public BigDecimal getTaxAmount() {
            return taxAmount;
        }

        /**
         * Sets the value of the taxAmount property.
         * 
         * @param value
         *     allowed object is
         *     {@link BigDecimal }
         *     
         */
        public void setTaxAmount(BigDecimal value) {
            this.taxAmount = value;
        }

        /**
         * Gets the value of the taxCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTaxCode() {
            return taxCode;
        }

        /**
         * Sets the value of the taxCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTaxCode(String value) {
            this.taxCode = value;
        }

    }

}
