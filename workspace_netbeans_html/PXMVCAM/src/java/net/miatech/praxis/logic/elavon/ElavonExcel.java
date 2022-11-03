/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.elavon;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import net.miatech.praxis.elavon.ElavonExcelFile;
import org.apache.commons.io.IOUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Dvicente
 */
@Component
public class ElavonExcel {
    
    //comprime la cantidad indicada de exceles en un archivo zip
    @Transactional
    public void compressFiles(OutputStream os, List<ElavonExcelFile> listeOfObject) throws IOException {
        try (ZipOutputStream zipstream = new ZipOutputStream(os)) {
            for (ElavonExcelFile file: listeOfObject) {
                
                //crea libro excel xlsx
                XSSFWorkbook wb = new XSSFWorkbook();
                final XSSFCellStyle cellStyle = wb.createCellStyle();
                XSSFColor color = new XSSFColor(new Color(43,150,150));
                cellStyle.setFillForegroundColor(color);
                cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                cellStyle.setAlignment(HorizontalAlignment.CENTER);
                Sheet sheet = wb.createSheet("result");
                final Row row = sheet.createRow(0);
                
                
                //obtiene las cabeceras del map y agrega a la primera fila
                Set<String> keys = file.getFileObjects().get(0).keySet();
                final AtomicInteger contkeys= new AtomicInteger();
                keys.forEach(new Consumer<String>() {
                    @Override
                    public void accept(String t) {
                        Cell cell = row.createCell(contkeys.get());
                        cell.setCellValue(t.toUpperCase());
                        cell.setCellStyle(cellStyle);
                        contkeys.getAndIncrement();
                    }
                });
                
                //recorre todos los objetos de la lista y añade al excel
                for(int i = 0;i<file.getFileObjects().size();i++){
                    Row rw = sheet.createRow(i+1);
                    Map<String,Object> map = file.getFileObjects().get(i);
                    int rv = 0;
                    for (Object obj: map.values()) {
                        Cell cll = rw.createCell(rv);
                        cll.setCellValue(obj.toString());
                        rv++;
                    }
                }
                
                int noOfColumns = sheet.getRow(0).getPhysicalNumberOfCells();
                for(int i=0;i<noOfColumns;i++){
                    sheet.autoSizeColumn(i);
                }
                
                //agrega excel al archivo zip
                zipstream.putNextEntry(new ZipEntry(file.getFileName()+ ".xlsx"));
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                wb.write(bos);
                bos.writeTo(zipstream);
                //cierra archivo y comieza otro
                zipstream.closeEntry();
            }
        }
    }
    
    //comprime la cantidad indicada de textos en un archivo zip
    @Transactional
    public void compressFilesTxt(OutputStream os, List<ElavonExcelFile> listeOfObject) throws IOException {
        try (ZipOutputStream zipstream = new ZipOutputStream(os)) {
            for (ElavonExcelFile file: listeOfObject) {
                File fil = new File(file.getFileName() + ".txt");
                try (FileWriter fw = new FileWriter(fil)) {
                    final StringBuilder sbHeader = new StringBuilder();
                    //obtiene las cabeceras del map y agrega a la primera fila
                    Set<String> keys = file.getFileObjects().get(0).keySet();
                    final AtomicInteger contkeys= new AtomicInteger();
                    keys.forEach(new Consumer<String>() {
                        @Override
                        public void accept(String t) {
                            sbHeader.append(t).append("|");
                            contkeys.getAndIncrement();
                        }
                    });
                    sbHeader.deleteCharAt(sbHeader.length()-1);
                    sbHeader.append("\n");
                    fw.append(sbHeader.toString());
                    
                    //recorre todos los objetos de la lista y añade al texto
                    for(int i = 0;i<file.getFileObjects().size();i++){
                        final StringBuilder sbLine = new StringBuilder();
                        Map<String,Object> map = file.getFileObjects().get(i);
                        for (Object obj: map.values()) {
                            sbLine.append(obj.toString()).append("|");
                        }
                        sbLine.deleteCharAt(sbLine.length()-1);
                        sbLine.append("\n");
                        fw.append(sbLine.toString());
                    }
                }
                FileInputStream in = new FileInputStream(fil);
                zipstream.putNextEntry(new ZipEntry(file.getFileName()+ ".txt"));
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                bos.write(IOUtils.toByteArray(in));
                bos.writeTo(zipstream);
                zipstream.closeEntry();
            }
        }
    }
    
}
