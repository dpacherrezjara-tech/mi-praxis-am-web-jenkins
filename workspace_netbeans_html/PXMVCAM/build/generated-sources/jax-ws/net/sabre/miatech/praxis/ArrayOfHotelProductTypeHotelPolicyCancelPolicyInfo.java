
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="CancelPolicyInfo" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="VersionId" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *                   &lt;element name="CancelTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="StartWindowHours" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="NightCount" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
 *                   &lt;element name="Percent" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *                   &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
 *                   &lt;element name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="TimeZoneDescription" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                 &lt;/sequence>
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
@XmlType(name = "ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "cancelPolicyInfo"
})
public class ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo {

    @XmlElement(name = "CancelPolicyInfo")
    protected List<ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo.CancelPolicyInfo> cancelPolicyInfo;

    /**
     * Gets the value of the cancelPolicyInfo property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the cancelPolicyInfo property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCancelPolicyInfo().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo.CancelPolicyInfo }
     * 
     * 
     */
    public List<ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo.CancelPolicyInfo> getCancelPolicyInfo() {
        if (cancelPolicyInfo == null) {
            cancelPolicyInfo = new ArrayList<ArrayOfHotelProductTypeHotelPolicyCancelPolicyInfo.CancelPolicyInfo>();
        }
        return this.cancelPolicyInfo;
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
     *       &lt;sequence>
     *         &lt;element name="VersionId" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
     *         &lt;element name="CancelTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="StartWindowHours" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="NightCount" type="{http://www.w3.org/2001/XMLSchema}unsignedShort" minOccurs="0"/>
     *         &lt;element name="Percent" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
     *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}float" minOccurs="0"/>
     *         &lt;element name="CurrencyCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="TimeZoneDescription" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "versionId",
        "cancelTime",
        "startWindowHours",
        "nightCount",
        "percent",
        "amount",
        "currencyCode",
        "timeZoneDescription"
    })
    public static class CancelPolicyInfo {

        @XmlElement(name = "VersionId", namespace = "http://services.sabre.com/res/or/v1_4")
        protected Integer versionId;
        @XmlElement(name = "CancelTime", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String cancelTime;
        @XmlElement(name = "StartWindowHours", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String startWindowHours;
        @XmlElement(name = "NightCount", namespace = "http://services.sabre.com/res/or/v1_4")
        @XmlSchemaType(name = "unsignedShort")
        protected Integer nightCount;
        @XmlElement(name = "Percent", namespace = "http://services.sabre.com/res/or/v1_4")
        protected Float percent;
        @XmlElement(name = "Amount", namespace = "http://services.sabre.com/res/or/v1_4")
        protected Float amount;
        @XmlElement(name = "CurrencyCode", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String currencyCode;
        @XmlElement(name = "TimeZoneDescription", namespace = "http://services.sabre.com/res/or/v1_4")
        protected String timeZoneDescription;

        /**
         * Gets the value of the versionId property.
         * 
         * @return
         *     possible object is
         *     {@link Integer }
         *     
         */
        public Integer getVersionId() {
            return versionId;
        }

        /**
         * Sets the value of the versionId property.
         * 
         * @param value
         *     allowed object is
         *     {@link Integer }
         *     
         */
        public void setVersionId(Integer value) {
            this.versionId = value;
        }

        /**
         * Gets the value of the cancelTime property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCancelTime() {
            return cancelTime;
        }

        /**
         * Sets the value of the cancelTime property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCancelTime(String value) {
            this.cancelTime = value;
        }

        /**
         * Gets the value of the startWindowHours property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getStartWindowHours() {
            return startWindowHours;
        }

        /**
         * Sets the value of the startWindowHours property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setStartWindowHours(String value) {
            this.startWindowHours = value;
        }

        /**
         * Gets the value of the nightCount property.
         * 
         * @return
         *     possible object is
         *     {@link Integer }
         *     
         */
        public Integer getNightCount() {
            return nightCount;
        }

        /**
         * Sets the value of the nightCount property.
         * 
         * @param value
         *     allowed object is
         *     {@link Integer }
         *     
         */
        public void setNightCount(Integer value) {
            this.nightCount = value;
        }

        /**
         * Gets the value of the percent property.
         * 
         * @return
         *     possible object is
         *     {@link Float }
         *     
         */
        public Float getPercent() {
            return percent;
        }

        /**
         * Sets the value of the percent property.
         * 
         * @param value
         *     allowed object is
         *     {@link Float }
         *     
         */
        public void setPercent(Float value) {
            this.percent = value;
        }

        /**
         * Gets the value of the amount property.
         * 
         * @return
         *     possible object is
         *     {@link Float }
         *     
         */
        public Float getAmount() {
            return amount;
        }

        /**
         * Sets the value of the amount property.
         * 
         * @param value
         *     allowed object is
         *     {@link Float }
         *     
         */
        public void setAmount(Float value) {
            this.amount = value;
        }

        /**
         * Gets the value of the currencyCode property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCurrencyCode() {
            return currencyCode;
        }

        /**
         * Sets the value of the currencyCode property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCurrencyCode(String value) {
            this.currencyCode = value;
        }

        /**
         * Gets the value of the timeZoneDescription property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTimeZoneDescription() {
            return timeZoneDescription;
        }

        /**
         * Sets the value of the timeZoneDescription property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTimeZoneDescription(String value) {
            this.timeZoneDescription = value;
        }

    }

}
