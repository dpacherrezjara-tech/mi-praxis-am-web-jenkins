/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.CMYKColor;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.praxis.eecta.SQP03976Filter;

/**
 *
 * @author vhidalgo
 */
public class ReportEdoCta {
    
    private String FILE = "ReportEdoCta.pdf";
    public final String FileTXT = "ReportEdoCta.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL); // 10
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD); //12
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private Font subFont_2 = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL);
    private int PYi = 0;
    private int Hlng = 12;
    private File fileTmp01, fileTmp02;
    private List<File> lstFileTmp = new ArrayList<File>();

    class TableHeader extends PdfPageEventHelper {

        /**
         * The header text.
         */
        String header;
        /**
         * The template with the total number of pages.
         */
        PdfTemplate total;

        /**
         * Allows us to change the content of the header.
         *
         * @param header The new header String
         */
        public void setHeader(String header) {
            this.header = header;
        }

        /**
         * Creates the PdfTemplate that will hold the total number of pages.
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onOpenDocument(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onOpenDocument(PdfWriter writer, Document document) {
            total = writer.getDirectContent().createTemplate(50, 16); //50, 16      
        }

        /**
         * Adds a header to every page
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onEndPage(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onEndPage(PdfWriter writer, Document document) {
            // int nt;
            PdfPTable table = new PdfPTable(3);
            try {
                table.setWidths(new int[]{24, 24, 2});
                table.setTotalWidth(590); //560
                table.setLockedWidth(true);
                table.getDefaultCell().setFixedHeight(10); // 20
                table.getDefaultCell().setBorder(Rectangle.BOTTOM);                                
                table.addCell(header);                
                table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);                         
                table.addCell(String.format("Página: %d de ", writer.getPageNumber())); 
                PdfPCell cell = new PdfPCell(Image.getInstance(total) );                
                cell.setBorder(Rectangle.BOTTOM);   
                table.addCell( cell );
                //Ubicacion COORDENA Y del contador de pagina
                table.writeSelectedRows(0, -1, 15, 790, writer.getDirectContent()); //34 790
                                
            } catch (DocumentException de) {
                throw new ExceptionConverter(de);
            }
        }

        /**
         * Fills out the total number of pages before the document is closed.
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onCloseDocument(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onCloseDocument(PdfWriter writer, Document document) {
            ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(String.valueOf(writer.getPageNumber() - 1)), 2, 2, 0);            

        }
    }
   
    
    public static final String[] RESOURCES = {
        "139X.jpg",
        "139X2.png"
    };

    public List<File> getFile() {
        return lstFileTmp;
    }

    public String formato_numero(double Number) {        
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(2);
        formato.setMaximumFractionDigits(2);
        String NumberFormated = formato.format(Number);        
        return NumberFormated;
    }
    public String formato_numeroInt (double dato) {    
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(0);
        formato.setMaximumFractionDigits(0);
        String NumberFormated = formato.format(dato);
        return NumberFormated;
   }
   

    public void colorRectangle(PdfContentByte under, BaseColor color, float x, float y, float width, float height) {
        under.saveState();
        under.setColorFill(color);
        under.rectangle(x, y, width, height);
        under.fillStroke();        
        under.restoreState();        
    }
    
    public void setHeader10(int PosX1, int PYi, PdfWriter writer ){
        //PYi = PYi - 25; //saldo entre bloque
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("VENTAS", subFontT)), PosX1, PYi, 0);        
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15); //700
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0);            
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nº Reporte", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Periodo", subFont_1)), 150, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ref. Bancaria", subFont_1)), 280, PYi, 0); //300
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }
    public void setHeader20(int PosX1, int PYi, PdfWriter writer ){
        //PYi = PYi - 25; //saldo entre bloque
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("REEMBOLSOS", subFontT)), PosX1, PYi, 0);
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0);            
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nº Reporte", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Periodo", subFont_1)), 150, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ref. Bancaria", subFont_1)), 280, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }    
    public void setHeader30(int PosX1, int PYi, PdfWriter writer ){
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PAGOS APLICADOS", subFontT)), PosX1, PYi, 0);        
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0); 
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Id Pago", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nº Reporte", subFont_1)), 120, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ref. bancaria", subFont_1)), 180, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Banco", subFont_1)), 280, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }
    public void setHeader40(int PosX1, int PYi, PdfWriter writer ){
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("REEMBOLSOS APLICADOS", subFontT)), PosX1, PYi, 0);        
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15);        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0); 
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nº Reporte", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Referencia", subFont_1)), 150, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Banco", subFont_1)), 230, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }
    public void setHeader50(int PosX1, int PYi, PdfWriter writer ){
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PAGOS NO APLICADOS", subFontT)), PosX1, PYi, 0);      
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0); 
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Id Recibo", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Referencia", subFont_1)), 150, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Banco", subFont_1)), 230, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }
    public void setHeader60(int PosX1, int PYi, PdfWriter writer ){
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PAGOS APLICADOS (RECIBOS)", subFontT)), PosX1, PYi, 0);     
        PYi = PYi - 14; //salto entre linea
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 15, PYi-5, 590, 15);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fecha", subFont_1)), PosX1, PYi, 0); 
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Id Pago", subFont_1)), 60, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Referencia", subFont_1)), 150, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Banco", subFont_1)), 230, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cant. Trx.", subFont_1)), 400, PYi, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFont_1)), 560, PYi, 0);
    }
    
    public String setColumnMulticell( String Cadena, Integer wcolumn  ){        
        //Obtner todas las cadenas de palabras completas
        String strMulticell = "";
        String[] cadena_nombre = Cadena.split(" "); 
        Integer ttl_arrg = cadena_nombre.length;
        String Line01="";String Line01_="";
        String Line02="";String Line02_="";
        String Line03="";
        //cada linea debe ser menor a "wcolumn" posiciones      
        for(int i=0;i<ttl_arrg;i++){
            Line01_ = Line01_ + cadena_nombre[i]+ " ";;
            if(Line01_.length() < wcolumn ){
                Line01 = Line01 + cadena_nombre[i] + " ";                      
            }else{
                Line02_ = Line02_ + cadena_nombre[i]+ " ";;
                if(Line02_.length() < wcolumn  ){
                    Line02 = Line02 + cadena_nombre[i]+ " ";;
                }else{                
                    Line03 = Line03 + cadena_nombre[i]+ " ";;
                }
            }            
        }        
        if (!Line01.equals("")) strMulticell = Line01;
        if (!Line02.equals("")) strMulticell = strMulticell + "|" + Line02;
        if (!Line03.equals("")) strMulticell = strMulticell + "|" + Line03;
        
        return strMulticell;
        
    }
   
    
    public File createReport(List<SQP03976Filter> Data, String Rutatmp ) {

        try {

            //C:\Program Files\Apache Software Foundation\Apache Tomcat 8.0.27\temp\tmp5401410828782100458RptVentaUATP.pdf
            fileTmp01 = File.createTempFile("tmp", FILE);
            lstFileTmp.add(fileTmp01);
            //fileTmp02 = File.createTempFile("tmp", FileTXT);            
            //lstFileTmp.add(fileTmp02);            
            PYi = 730; //780
            Hlng = 12;
            int PosX1 = 15;
            int ItemPage = 0;
            int getPageNumber = 0;
            int PoxT;

            int posNewPagex = 0;
            int posNewPagey = 0;
                
            //Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5); // 792, 612
            //Document document = new Document(PageSize.A4, 5, 5, 5, 5); //595,842
            Document document = new Document(PageSize.LETTER, 5, 5, 5, 5); //612,792
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            //titulo reporte
            PYi = PYi - 16; //7
            Phrase txtTitle = new Phrase(new Paragraph("ESTADO DE CUENTA", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, 240, PYi, 0); //300

            // Logo AEROMEXICO
            int pos_img = 710; //698
            Image img;
            img = Image.getInstance(String.format(Rutatmp+"%s", RESOURCES[0]));
            //img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, pos_img); //530
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            //datos AEROMEXICO
            PYi = PYi - 20; //32
            int py0 = PYi;
            Phrase txtAMInfo = new Phrase(new Paragraph(Data.get(1).tbl_misl.A3961DESC1, catFont)); //nombre AM
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMInfo, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            String[] strDireccion = Data.get(1).tbl_misl.A3961DESC2.split(",");            
            Phrase txtAMdir1 = new Phrase(new Paragraph( strDireccion[0] , NORMAL)); //Direccion AM1
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMdir1, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtAMdir2 = new Phrase(new Paragraph( strDireccion[1].trim() +", "+ strDireccion[2].trim() +", "+ strDireccion[3].trim(), NORMAL)); //Direccion AM2
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMdir2, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtAMInfo2 = new Phrase(new Paragraph(Data.get(1).tbl_misl.A3961COME1, NORMAL));  //Telf. AM          
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMInfo2, PosX1, PYi, 0);
            //PYi = PYi - Hlng;
            Phrase txtAMInfo3 = new Phrase(new Paragraph( "RFC: " +  Data.get(1).tbl_misl.A3961COME2, NORMAL));  //Clave CITA AM           
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT,  txtAMInfo3, 115, PYi, 0);

            int px1 = 400; //480 
            //LOGO CLIENTE   
            if (Data.get(0).tbl_client.A3953LOGO.equals("")){
                Data.get(0).tbl_client.A3953LOGO = "not_picture.png";
            }            
            img = Image.getInstance(String.format(Rutatmp+"%s", Data.get(0).tbl_client.A3953LOGO /*RESOURCES[0]*/ ));            
            //img = Image.getInstance(String.format("/Dumps/%s", Data.get(0).tbl_client.A3953LOGO /*RESOURCES[0]*/ ));            
            img.setAbsolutePosition(px1, pos_img); //520                       
            img.scaleToFit(280, 60);  
            document.add(new Paragraph(String.format("", Data.get(0).tbl_client.A3953LOGO/*RESOURCES[0]*/, img.getClass().getName())));
            document.add(img);            
            writer.setCompressionLevel(0);
            
            //datos CLIENTE                        
            PYi = py0;
            px1 = px1 - 25; //Inicia datos CLIENTE
            String VL_A3953RSOCI = Data.get(0).tbl_client.A3953RSOCI;
            if(VL_A3953RSOCI.length() < 30){               
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph( VL_A3953RSOCI, catFont)), px1, PYi, 0);
                PYi = PYi - Hlng;
            }else{                    
                String StrMulticell = this.setColumnMulticell(VL_A3953RSOCI, 30);                  
                String[] ArgMulticell = StrMulticell.split("\\|");                
                for(int j=0;j<ArgMulticell.length;j++){                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph( ArgMulticell[j], catFont)), px1, PYi, 0); 
                    PYi = PYi - Hlng;
                }
            }            
            
            Phrase DIRE1 = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953DIRE1, NORMAL)); //"AV. MARINA NACIONAL Nº. 329 INT C3 "
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, DIRE1, px1, PYi, 0);
            PYi = PYi - Hlng;            
            Phrase COLON = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953COLON, NORMAL)); //"COL. VERONICA ANZURES, CIUDAD DE MÉXICO "
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, COLON, px1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase DELEG = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953DELEG, NORMAL)); //"DELEGACIÓN MIGUEL HIDALGO "
                       
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, DELEG, px1, PYi, 0);
            PYi = PYi - Hlng;
            String TXTCP = "";
            if (!Data.get(0).tbl_client.A3953CP.trim().equals("")){
                TXTCP = "C.P. " + Data.get(0).tbl_client.A3953CP;
            }
            Phrase CP = new Phrase(new Paragraph(TXTCP , NORMAL)); //"C.P. 11300 "               
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, CP, px1, PYi, 0);
                    
            //datos  Contrato
            int PYi_c = 642; //680
            //colorRectangle(under, new GrayColor(0.825f), PosX1, PYi+10, 400, 0); //LINEA 
                        
            Phrase CONTR = new Phrase(new Paragraph("Contrato Nº: " + Data.get(0).rpteCab.A3981CONTR, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, CONTR, PosX1, PYi_c, 0);
            PYi_c = PYi_c - Hlng;            
            int Py_c = PYi_c;
            Phrase NRRPT = new Phrase(new Paragraph("Edo. Cuenta Nº: " + Data.get(0).rpteCab.A3981NREDO, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, NRRPT, PosX1, PYi_c, 0);
            PYi_c = PYi_c - Hlng;
            Phrase FEECC = new Phrase(new Paragraph("Fecha Emisión: " + Data.get(0).rpteCab.A3981FEDOC, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, FEECC, PosX1, PYi_c, 0);
            
            //Py_c; //vuelve a la altura de "REPORTE Nº:"
            int PosX1_ = 135;   //180         
//            Phrase TXTREFBC = new Phrase(new Paragraph("Nº Ref. Bancaria: XXXXXX "  /*+Data.get(0).rpteCab.A3957REFBC */ , NORMAL));                        
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, TXTREFBC, PosX1_, Py_c, 0);
//            
            Py_c = Py_c - Hlng;
//            String VL_PERIODO = "";
//            if(!Data.get(0).rpteCab.A3981INIPR.equals("")){
//                VL_PERIODO = Data.get(0).rpteCab.A3981INIPR + " Al " + Data.get(0).rpteCab.A3981FINPR; 
//            }            
            Phrase txtPERIODO = new Phrase(new Paragraph("Al cierre: " + Data.get(0).rpteCab.A3981FINPR  , NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPERIODO, PosX1_, Py_c, 0);                                    
            //Py_c = Py_c - Hlng;  
            PosX1_ = 270; //330
            colorRectangle(under, new GrayColor(0.825f), PosX1_-5, PYi_c, 70, 15); //120
            Phrase TXTNACIONAL = new Phrase(new Paragraph( Data.get(0).tbl_client.A3953TORGN , NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, TXTNACIONAL, PosX1_+6, Py_c+4, 0);
            
            // '00' = SALDO ANTERIOR             
            // '10' = REPORTE VTAS  - SALE/EXCH  
            // '20' = REPORTE VTAS  - RFND     
            //***
            // '30' = PAGOS  - FA
            // '30' = NOTAS_CREDITO  - NC
            // '40' = PAGOS  - RC
            
            // '50' = RECIBOS NO APLICADOS (NA)
            // '60' = RECIBOS APLICADOS (R)	 
            ////+++++++++++++++++++++++++++++++++++++++++++++
            //SALDO
            ////+++++++++++++++++++++++++++++++++++++++++++++
            PYi = PYi_c;
            PYi = PYi - 25;
            PosX1 = PosX1+1;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SALDO ANTERIOR", subFontT)), PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Importe", subFontT)), 560, PYi, 0); //670           
            colorRectangle(under, new GrayColor(0.825f), PosX1, PYi-5, 590, 0); //LINEA 700
            
            //TOTALES LINE
            Integer cont10_TTL = 0;
            Integer cont20_TTL = 0;
            Integer cont30_TTL = 0;
            Integer cont40_TTL = 0;
            Integer cont50_TTL = 0;
            Integer cont60_TTL = 0;            
            for (int i = 4; i < Data.size(); i++) {
                if( Data.get(i).rpteDet.A3982TREG.equals("10")) cont10_TTL++;
                if( Data.get(i).rpteDet.A3982TREG.equals("20")) cont20_TTL++;
                if( Data.get(i).rpteDet.A3982TREG.equals("30")) cont30_TTL++;
                if( Data.get(i).rpteDet.A3982TREG.equals("40")) cont40_TTL++;
                if( Data.get(i).rpteDet.A3982TREG.equals("50")) cont50_TTL++;
                if( Data.get(i).rpteDet.A3982TREG.equals("60")) cont60_TTL++;
            }
            
            PYi = PYi - 14;
            Integer cont10 = 0;
            Integer cont20 = 0;
            Integer cont30 = 0;
            Integer cont40 = 0;
            Integer cont50 = 0;
            Integer cont60 = 0;
            
            Double Subtotal_ventas = 0.0;
            Double Subtotal_refund = 0.0;
            Double subTotal_pago_FA = 0.0;
            Double subTotal_pago_RC = 0.0;  
            Double subTotal_pago_NA = 0.0;
            Double subTotal_pago_AP_REC = 0.0;
            
            //--Ubicacion "Y" para subtotales 
            int pos_sub_ttl = 460;
            int pos_sub_ttl_a = pos_sub_ttl + 135;
            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total saldo anterior* ", NORMAL)), PosX1, PYi, 0);           
            for (int i = 4; i < Data.size(); i++) {
                if( Data.get(i).rpteDet.A3982TREG.equals("00")){                    
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.get(i).rpteDet.A3982TOT) , NORMAL)), 595, PYi, 0); //700                    
                }                
                //+++++++++++++++++++++++++++++++++
                //++ VENTAS 
                //+++++++++++++++++++++++++++++++++
                if( Data.get(i).rpteDet.A3982TREG.equals("10")){
                    cont10 ++;
                    if( cont10 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader10(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    }  
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982IDPRO, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982INIPR.trim() +'-'+ Data.get(i).rpteDet.A3982FINPR.trim(), subFont)), 150, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 280, PYi, 0);  //300                              
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0); //700               
                    Subtotal_ventas = Subtotal_ventas + Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    //Sub Total cuando termine el registro 10 - ventas
                    if ( cont10_TTL == cont10 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Subtotal_ventas), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
                }
                //+++++++++++++++++++++++++++++++++
                //REEMBOLSOS
                //+++++++++++++++++++++++++++++++++
                if( Data.get(i).rpteDet.A3982TREG.equals("20")){
                    cont20 ++;
                    if( cont20 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader20(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    }
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982IDPRO, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982INIPR.trim() +'-'+ Data.get(i).rpteDet.A3982FINPR.trim(), subFont)), 150, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 280, PYi, 0);                                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0);                
                    Subtotal_refund = Subtotal_refund + Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    //Sub Total cuando termine el registro 10 - ventas
                    if ( cont20_TTL == cont20 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Subtotal_refund), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
               }
                //+++++++++++++++++++++++++++++++++
                //PAGOS APLICADOS - FA
                //+++++++++++++++++++++++++++++++++ 
                if( Data.get(i).rpteDet.A3982TREG.equals("30")){ 
                    cont30 ++;
                    if( cont30 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader30(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    }  
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982IDPRO, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.NRRPT, subFont)), 120, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 180, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982BANCO, subFont)), 280, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0);
                    subTotal_pago_FA = subTotal_pago_FA+ Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    //Sub Total cuando termine el registro 30
                    if ( cont30_TTL == cont30 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(subTotal_pago_FA), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
               }
                //+++++++++++++++++++++++++++++++++
                //PAGOS REALIZADOS CON NOTAS DE CREDITO (NC)
                //+++++++++++++++++++++++++++++++++                                
               if( Data.get(i).rpteDet.A3982TREG.equals("40")){
                    cont40 ++;   
                    if( cont40 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader40(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    } 
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.NRRPT, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 140, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982BANCO, subFont)), 230, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0);
                    subTotal_pago_RC = subTotal_pago_RC+ Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    //Sub Total cuando termine el registro
                    if ( cont40_TTL == cont40 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(subTotal_pago_RC), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
               }
               //++++++++++++++++++++++++++++++++++++++++
                //RECIBOS NO APLICADOS (NA)
                //++++++++++++++++++++++++++++++++++++++++                
                if( Data.get(i).rpteDet.A3982TREG.equals("50")){ 
                    cont50++;
                    if( cont50 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader50(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    }
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982IDPRO, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 140, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982BANCO, subFont)), 230, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0);
                    subTotal_pago_NA = subTotal_pago_NA+ Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    //Sub Total cuando termine el registro
                    if ( cont50_TTL == cont50 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(subTotal_pago_NA), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
                }
                //++++++++++++++++++++++++++++++++++++++++
                //PAGOS APLICADOS (RECIBOS)
                //++++++++++++++++++++++++++++++++++++++++                
                if( Data.get(i).rpteDet.A3982TREG.equals("60")){ 
                    cont60++; 
                    if( cont60 == 1 ){
                        PYi = PYi - 25;
                        this.setHeader60(PosX1, PYi, writer);
                        PYi = PYi - 28; 
                    }
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982FECPR, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982IDPRO, subFont)), 60, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982REFBC, subFont)), 140, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3982BANCO, subFont)), 230, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).rpteDet.A3982QTYTX), subFont)), 420, PYi, 0);                
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3982TOT), subFont)), 595, PYi, 0);
                    subTotal_pago_AP_REC = subTotal_pago_AP_REC + Data.get(i).rpteDet.A3982TOT;
                    PYi = PYi - 12;
                    if ( cont60_TTL == cont60 ){
                        PYi = PYi - 10;                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph( "SUBTOTAL: ", subFontT)), pos_sub_ttl, PYi, 0);                        
                        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(subTotal_pago_AP_REC), subFontT)), pos_sub_ttl_a, PYi, 0);
                    }
                }                                
               ItemPage++;
                if (ItemPage > 18 && getPageNumber < 1) { 
                    ItemPage = 0;
                    PYi = 761; //ubicacion del titulo en la pagi sig
                    getPageNumber++;
                    document.newPage();                    
                    posNewPagex = 15;
                    posNewPagey = PYi;                    
                    posNewPagex = 15;
                }
                // saltos en las demas pginas Page > 1
                if (getPageNumber > 0 && ItemPage > 40) {  
                    ItemPage = 0;
                    PYi = 761; 
                    getPageNumber++;
                    document.newPage();
                    // Set Title Next Page //
                    posNewPagey = PYi; // (PYi + 13);
                    // this.setTitle(posNewPagex, posNewPagey, writer );
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }
            }
                           
            PYi = PYi - 25;
            colorRectangle(under, new GrayColor(0.825f), 15, PYi + 9, 590, -40); //68
            //Double total_sub_totales = Subtotal_ventas + Subtotal_pagos+Subtotal_pagos_RC;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("GRAN TOTAL:", subFontT)), pos_sub_ttl, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.get(0).rpteCab.A3981TOT ), subFontT)), pos_sub_ttl_a, PYi, 0);            
            
            //REMARK  
            //PYi = PYi - 18;
            String TextRemark = Data.get(2).tbl_misl.A3961DESC1.replaceAll("}", Data.get(0).tbl_client.A3953PLZCR + " DIAS ");
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(TextRemark, subFont_2)), 17, PYi, 0);
            PYi = PYi - 10;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(2).tbl_misl.A3961DESC2, subFont_2)), 17, PYi, 0); 
            
            //TOTAL EN LETRAS
            //int posRemark = PYi-15; //25
            PYi = PYi-15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase( new Paragraph(Data.get(0).rpteCab.A3981TOTLT, NORMAL)), 590, PYi, 0); //540
            //PYi = PYi-15;
            //antiguedad de saldos
            int posRemark = PYi;
            posRemark = posRemark - 20;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ANTIGUEDAD DE SALDOS ", subFontT)), 15, posRemark, 0);
            posRemark = posRemark - 15;
            colorRectangle(under, new GrayColor(0.825f), 15, posRemark-7, 590, 20); //700 17
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Pendiente" , subFontT)), 80, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Corriente" , subFontT)), 160, posRemark, 0);            
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("01-30 Días", subFontT)), 240, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("31-60 Días", subFontT)), 320, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("61-90 Días", subFontT)), 400, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("91-120 Días", subFontT)), 480, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("+120 Días", subFontT)), 560, posRemark, 0);
            //data          
            posRemark = posRemark - 15;
            colorRectangle(under, GrayColor.GRAYWHITE, 15, posRemark-7, 590, 20); //700
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TOT) , NORMAL)), 80, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS0), NORMAL)), 160, posRemark, 0);            
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS1), NORMAL)), 240, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS2), NORMAL)), 320, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS3), NORMAL)), 400, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS4), NORMAL)), 480, posRemark, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(3).tbl_saldos.A3990TTLS5 + Data.get(3).tbl_saldos.A3990TTLS6 ), NORMAL)), 560, posRemark, 0);            
            //--linea final
            colorRectangle(under, new GrayColor(0.825f), PosX1, 15, 590, 0); //LINEA 700             
            // genera Data en txt
            //PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
            // Texto Header                        
            //out.println("IATA;Ticket;Trans;cpn;cjn;Issue Date;Carr.;Fare Basis;Class;Origen;Dest;IT Tour Cod.;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries Amount;Ancillaries Comm.;Agr. Code;Ancillaries %;Charge Amount;Charge Comm.;Charge Agr. Code;Charge %;Lote");            
            // No PDF, Just a text file                       
            //out.flush();
            //out.close();
            //this.onCloseDocument(writer, document);
            document.close();
            return fileTmp01;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
