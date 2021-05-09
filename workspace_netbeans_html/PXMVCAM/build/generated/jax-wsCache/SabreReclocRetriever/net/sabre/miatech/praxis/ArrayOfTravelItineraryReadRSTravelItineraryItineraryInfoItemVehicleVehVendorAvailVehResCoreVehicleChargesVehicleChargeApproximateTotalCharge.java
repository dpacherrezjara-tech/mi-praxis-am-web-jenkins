
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ApproximateTotalCharge" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="MileageAllowance" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="NumDays" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="NumHours" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="RateType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="TotalMandatoryCharges" type="{http://www.w3.org/2001/XMLSchema}string" />
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
@XmlType(name = "ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge", namespace = "http://services.sabre.com/res/tir/v3_6", propOrder = {
    "approximateTotalCharge"
})
public class ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge {

    @XmlElement(name = "ApproximateTotalCharge")
    protected List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge.ApproximateTotalCharge> approximateTotalCharge;

    /**
     * Gets the value of the approximateTotalCharge property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the approximateTotalCharge property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getApproximateTotalCharge().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge.ApproximateTotalCharge }
     * 
     * 
     */
    public List<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge.ApproximateTotalCharge> getApproximateTotalCharge() {
        if (approximateTotalCharge == null) {
            approximateTotalCharge = new ArrayList<ArrayOfTravelItineraryReadRSTravelItineraryItineraryInfoItemVehicleVehVendorAvailVehResCoreVehicleChargesVehicleChargeApproximateTotalCharge.ApproximateTotalCharge>();
        }
        return this.approximateTotalCharge;
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
     *       &lt;attribute name="Amount" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="MileageAllowance" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="NumDays" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="NumHours" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="RateType" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="TotalMandatoryCharges" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "")
    public static class ApproximateTotalCharge {

        @XmlAttribute(name = "Amount")
        protected String amount;
        @XmlAttribute(name = "MileageAllowance")
        protected String mileageAllowance;
        @XmlAttribute(name = "NumDays")
        protected String numDays;
        @XmlAttribute(name = "NumHours")
        protected String numHours;
        @XmlAttribute(name = "RateType")
        protected String rateType;
        @XmlAttribute(name = "TotalMandatoryCharges")
        protected String totalMandatoryCharges;

        /**
         * Gets the value of the amount property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getAmount() {
            return amount;
        }

        /**
         * Sets the value of the amount property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setAmount(String value) {
            this.amount = value;
        }

        /**
         * Gets the value of the mileageAllowance property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getMileageAllowance() {
            return mileageAllowance;
        }

        /**
         * Sets the value of the mileageAllowance property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setMileageAllowance(String value) {
            this.mileageAllowance = value;
        }

        /**
         * Gets the value of the numDays property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNumDays() {
            return numDays;
        }

        /**
         * Sets the value of the numDays property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNumDays(String value) {
            this.numDays = value;
        }

        /**
         * Gets the value of the numHours property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNumHours() {
            return numHours;
        }

        /**
         * Sets the value of the numHours property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNumHours(String value) {
            this.numHours = value;
        }

        /**
         * Gets the value of the rateType property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRateType() {
            return rateType;
        }

        /**
         * Sets the value of the rateType property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRateType(String value) {
            this.rateType = value;
        }

        /**
         * Gets the value of the totalMandatoryCharges property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTotalMandatoryCharges() {
            return totalMandatoryCharges;
        }

        /**
         * Sets the value of the totalMandatoryCharges property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTotalMandatoryCharges(String value) {
            this.totalMandatoryCharges = value;
        }

    }

}
