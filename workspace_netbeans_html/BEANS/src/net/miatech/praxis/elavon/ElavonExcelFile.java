/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.elavon;

import java.util.List;
import java.util.Map;

/**
 *
 * @author Dvicente
 */
public class ElavonExcelFile {
    private String fileName;
    private List<Map<String,Object>> fileObjects;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<Map<String, Object>> getFileObjects() {
        return fileObjects;
    }

    public void setFileObjects(List<Map<String, Object>> fileObjects) {
        this.fileObjects = fileObjects;
    }
    
}
