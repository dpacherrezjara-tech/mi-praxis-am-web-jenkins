package net.miatech.utils;

import java.awt.Color;

/**
 *
 * @author Dvicente
 */
public class CustomExcelCell {
    private Object value;
    private Color customStyle;

    public CustomExcelCell(Object value, Color customStyle) {
        this.value = value;
        this.customStyle = customStyle;
    }
    
    public CustomExcelCell(Object value) {
        this.value = value;
        this.customStyle = null;
    }
    
    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Color getCustomStyle() {
        return customStyle;
    }

    public void setCustomStyle(Color customStyle) {
        this.customStyle = customStyle;
    }
    
}
