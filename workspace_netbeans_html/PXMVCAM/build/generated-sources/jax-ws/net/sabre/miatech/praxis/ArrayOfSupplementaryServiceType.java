
package net.sabre.miatech.praxis;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ArrayOfSupplementaryServiceType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ArrayOfSupplementaryServiceType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SupplementaryService" type="{http://services.sabre.com/res/or/v1_4}SupplementaryServiceType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfSupplementaryServiceType", namespace = "http://services.sabre.com/res/or/v1_4", propOrder = {
    "supplementaryService"
})
public class ArrayOfSupplementaryServiceType {

    @XmlElement(name = "SupplementaryService")
    protected List<SupplementaryServiceType> supplementaryService;

    /**
     * Gets the value of the supplementaryService property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the supplementaryService property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSupplementaryService().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SupplementaryServiceType }
     * 
     * 
     */
    public List<SupplementaryServiceType> getSupplementaryService() {
        if (supplementaryService == null) {
            supplementaryService = new ArrayList<SupplementaryServiceType>();
        }
        return this.supplementaryService;
    }

}
