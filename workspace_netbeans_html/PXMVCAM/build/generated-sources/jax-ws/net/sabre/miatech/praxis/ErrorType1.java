
package net.sabre.miatech.praxis;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ErrorType1.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="ErrorType1">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="Transport"/>
 *     &lt;enumeration value="Validation"/>
 *     &lt;enumeration value="Application"/>
 *     &lt;enumeration value="BusinessLogic"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "ErrorType1", namespace = "http://services.sabre.com/STL_Header/v120")
@XmlEnum
public enum ErrorType1 {

    @XmlEnumValue("Transport")
    TRANSPORT("Transport"),
    @XmlEnumValue("Validation")
    VALIDATION("Validation"),
    @XmlEnumValue("Application")
    APPLICATION("Application"),
    @XmlEnumValue("BusinessLogic")
    BUSINESS_LOGIC("BusinessLogic");
    private final String value;

    ErrorType1(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static ErrorType1 fromValue(String v) {
        for (ErrorType1 c: ErrorType1 .values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
