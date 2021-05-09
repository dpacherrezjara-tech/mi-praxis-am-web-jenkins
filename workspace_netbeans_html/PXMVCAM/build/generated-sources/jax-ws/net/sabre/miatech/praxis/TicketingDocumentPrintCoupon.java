
package net.sabre.miatech.praxis;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for TicketingDocument.PrintCoupon complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="TicketingDocument.PrintCoupon">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SCN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Lniata" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="StockProvider" type="{http://www.sabre.com/ns/Ticketing/DC}Identifier.Provider" minOccurs="0"/>
 *         &lt;element name="ScnCheckDigit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="couponType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="printerType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="stockType" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="quantity" type="{http://www.w3.org/2001/XMLSchema}integer" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "TicketingDocument.PrintCoupon", propOrder = {
    "scn",
    "lniata",
    "stockProvider",
    "scnCheckDigit"
})
public class TicketingDocumentPrintCoupon {

    @XmlElement(name = "SCN")
    protected String scn;
    @XmlElement(name = "Lniata")
    protected String lniata;
    @XmlElement(name = "StockProvider")
    protected IdentifierProvider stockProvider;
    @XmlElement(name = "ScnCheckDigit")
    protected String scnCheckDigit;
    @XmlAttribute(name = "couponType")
    protected String couponType;
    @XmlAttribute(name = "printerType")
    protected String printerType;
    @XmlAttribute(name = "stockType")
    protected String stockType;
    @XmlAttribute(name = "quantity")
    protected BigInteger quantity;

    /**
     * Gets the value of the scn property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSCN() {
        return scn;
    }

    /**
     * Sets the value of the scn property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSCN(String value) {
        this.scn = value;
    }

    /**
     * Gets the value of the lniata property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLniata() {
        return lniata;
    }

    /**
     * Sets the value of the lniata property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLniata(String value) {
        this.lniata = value;
    }

    /**
     * Gets the value of the stockProvider property.
     * 
     * @return
     *     possible object is
     *     {@link IdentifierProvider }
     *     
     */
    public IdentifierProvider getStockProvider() {
        return stockProvider;
    }

    /**
     * Sets the value of the stockProvider property.
     * 
     * @param value
     *     allowed object is
     *     {@link IdentifierProvider }
     *     
     */
    public void setStockProvider(IdentifierProvider value) {
        this.stockProvider = value;
    }

    /**
     * Gets the value of the scnCheckDigit property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScnCheckDigit() {
        return scnCheckDigit;
    }

    /**
     * Sets the value of the scnCheckDigit property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScnCheckDigit(String value) {
        this.scnCheckDigit = value;
    }

    /**
     * Gets the value of the couponType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCouponType() {
        return couponType;
    }

    /**
     * Sets the value of the couponType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCouponType(String value) {
        this.couponType = value;
    }

    /**
     * Gets the value of the printerType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrinterType() {
        return printerType;
    }

    /**
     * Sets the value of the printerType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrinterType(String value) {
        this.printerType = value;
    }

    /**
     * Gets the value of the stockType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStockType() {
        return stockType;
    }

    /**
     * Sets the value of the stockType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStockType(String value) {
        this.stockType = value;
    }

    /**
     * Gets the value of the quantity property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getQuantity() {
        return quantity;
    }

    /**
     * Sets the value of the quantity property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setQuantity(BigInteger value) {
        this.quantity = value;
    }

}
