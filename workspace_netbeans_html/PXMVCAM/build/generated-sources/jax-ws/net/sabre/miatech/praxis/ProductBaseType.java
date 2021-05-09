
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for ProductBaseType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ProductBaseType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice maxOccurs="unbounded" minOccurs="0">
 *           &lt;element name="EndDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *           &lt;element name="EndPoint" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *           &lt;element name="ProductType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *           &lt;element name="SegmentReference" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *           &lt;element name="StartDateTime" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *           &lt;element name="StartPoint" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *           &lt;element name="StatusCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *           &lt;element name="Text" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *           &lt;element name="VendorCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ProductBaseType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "endDateTimeOrEndPointOrProductType"
})
public class ProductBaseType {

    @XmlElementRefs({
        @XmlElementRef(name = "EndDateTime", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "StatusCode", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "VendorCode", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "StartPoint", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "Text", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "StartDateTime", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "SegmentReference", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "ProductType", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "EndPoint", namespace = "http://services.sabre.com/res/or/v1_4", type = JAXBElement.class, required = false)
    })
    protected List<JAXBElement<?>> endDateTimeOrEndPointOrProductType;

    /**
     * Gets the value of the endDateTimeOrEndPointOrProductType property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the endDateTimeOrEndPointOrProductType property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEndDateTimeOrEndPointOrProductType().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}
     * {@link JAXBElement }{@code <}{@link Integer }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * 
     */
    public List<JAXBElement<?>> getEndDateTimeOrEndPointOrProductType() {
        if (endDateTimeOrEndPointOrProductType == null) {
            endDateTimeOrEndPointOrProductType = new ArrayList<JAXBElement<?>>();
        }
        return this.endDateTimeOrEndPointOrProductType;
    }

}
