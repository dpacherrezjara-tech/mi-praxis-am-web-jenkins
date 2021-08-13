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
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.praxis.payment.filter.A2290Filter;

/**
 *
 * @author ggutierrez
 */
public class ProReportLastConciliation {

    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD);
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private int PYi = 0;
    private int PYi_2 = 0;
    private int Hlng = 0;

    public void createReport(List<A2290Filter> Data, File file) {
        try {
            PYi = 520; // Para A4: 788
            Hlng = 12;
            int PosX1 = 15;
            int PosX1_2;
            int PosX5;
            int PosX9;
            int PosX13;
            int PosX2;
            int PosX6;
            int PosX10;
            int PosX14;
            int PosX3;
            int PosX7;
            int PosX11;
            int PosX15;
            int PosX4;
            int PosX8;
            int PosX12;
            int PosX16;
            int PosX17;
            int PosX18;
            int PosX19;
            int PosX20;
            int PosX21;
            int ItemPage = 0;
            int getPageNumber = 0;

            int posNewPagex = 0;
            int posNewPagey = 0;

            double TOT_A1776VCPLC = 0;
            double TOT_A1776ACSL = 0;
            double TOT_A1776GPAGC = 0;

            //Document document = new Document(new Rectangle(842, 595));
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            //Agregando logo de AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 540);  //530        
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);

            //Agregando título de AM
            PYi = PYi - 25; //10               
            Phrase txtTitle = new Phrase(new Paragraph("Aerovias de Mexico, S.A. de C.V.", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, txtTitle, PosX1 + 270, 550, 0);


           
            
            document.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

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
            total = writer.getDirectContent().createTemplate(50, 16); //55      
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
                table.setTotalWidth(700);
                table.setLockedWidth(true);
                table.getDefaultCell().setFixedHeight(20);
                table.getDefaultCell().setBorder(Rectangle.BOTTOM);
                table.addCell(header);
                table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(String.format("Page: %d of ", writer.getPageNumber()));

                PdfPCell cell = new PdfPCell(Image.getInstance(total));
                cell.setBorder(Rectangle.BOTTOM);
                table.addCell(cell);
                table.writeSelectedRows(0, -1, 34, 600, writer.getDirectContent());
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

    public String formato_numero(double Number) {
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(2);
        formato.setMaximumFractionDigits(2);
        String NumberFormated = formato.format(Number);
        return NumberFormated;
    }

    public String formato_numero_rate(double Number) {
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(6);
        formato.setMaximumFractionDigits(6);
        String NumberFormated = formato.format(Number);
        return NumberFormated;
    }

    public void colorRectangle(PdfContentByte under, BaseColor color, float x, float y, float width, float height) {
        under.saveState();
        under.setColorFill(color);
        under.rectangle(x, y, width, height);
        under.fillStroke();
        under.restoreState();

    }

    public void setTitle(int posNewPagex, int posNewPagey, PdfWriter writer) {
        int posNewPagex_2 = posNewPagex;
        int posNewPagey_2 = posNewPagey - 25;

        //Nivel 1
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey - 7, 760, 25);

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Moneda", subFont_1)), posNewPagex + 15, posNewPagey, 0);

        posNewPagex = posNewPagex + 40; //64        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Plazo", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 40; //19        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Fecha", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 67;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comercio", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 73; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Nro", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 75;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Nro", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cuotas", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 52; //28        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cuota", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 53; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Importe", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comisión del", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("IVA S/.", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60; //65        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Neto a", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Match", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Fuente de", subFont_1)), posNewPagex, posNewPagey, 0);

        //Nivel 2
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex_2, posNewPagey_2 - 7, 760, 25);

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("", subFont_1)), posNewPagex_2 + 15, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 40; //64        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Pago", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 40; //19        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Presentación", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 67;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Participante", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 73; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Tarjeta", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 75;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Autorización", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Plan", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 52; //28        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Vigente", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 53; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Total", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Banco", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comisión", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60; //65        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cobrar", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ventas", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

    }

    public static final String[] RESOURCES = {
        "logo_aeromexico.png",
        "logo_fd.png",
        "139X2.png",
        "139X.jpg"
    };

}
