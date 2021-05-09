package net.miatech.praxis.controllers.program;

// <editor-fold defaultstate="collapsed" desc="import">
import com.google.gson.Gson;
//import com.itextpdf.text.Document;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.PX040S01A720Filter;
import net.miatech.beans.PX040S02A720Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A720;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.program.ProMasterTicketLogic;
import net.miatech.utils.Functions;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.sax.SAXTransformerFactory;
import javax.xml.transform.stream.StreamResult;
import net.miatech.praxis.exceptions.SpringLog;
import net.sabre.miatech.praxis.SabreRecordLocator;
import net.sabre.miatech.praxis.SabreRecordLocatorSoap;
import net.sabre.miatech.praxis.TicketREQ;
import net.sabre.miatech.praxis.TicketRES;
import net.sabre.miatech.praxis.TicketingDocumentInfoAllTypes;
import org.apache.commons.io.IOUtils;
import org.xml.sax.InputSource;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
@Controller
@Scope("request")
@RequestMapping("/ProMasterTicket")
public class ProMasterTicketController extends BaseController {

    private ProMasterTicketLogic logic;
    private PX040S02A720Filter filter2;

    @RequestMapping(value = "/loadTicket")
    public @ResponseBody
    String loadTicket(ModelMap map, HttpServletRequest request) {
        PX040S01A720Filter filter = new PX040S01A720Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ProMasterTicketLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            PX040S01A720Filter filterTKT;
            //PX040S01A720Filter filterTKT = logic.loadPX040S01A720(filter);
            //PX040S01A720Filter filterTKT = logic.loadPRO11013(filter);
            if (filter.IN_CIA.equals("139")){
                filterTKT = logic.loadPX040S01A720(filter);
//                filterTKT = logic.loadPRO11013(filter);
            }else{
                filterTKT = logic.loadSQP02665(filter);
            }

            map.put("success", true);
            map.put("filterTKT", filterTKT);
        } catch (Exception e) {
            map.put("success", false);
            new SpringLog(e.getMessage());
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadAccountig")
    public @ResponseBody
    String loadAccountig(ModelMap map, HttpServletRequest request) {
        PX040S01A1716Filter filter = new PX040S01A1716Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());
            
            logic = new ProMasterTicketLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<PX040S01A1716Filter> lst_Accounting = logic.loadPX040S01A1716(filter);
            
            map.put("success", true);
            map.put("lst_Accounting", lst_Accounting);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/loadSabre")
    public @ResponseBody
    String loadSabre(ModelMap map, HttpServletRequest request) {
        PX040S01A1716Filter filter = new PX040S01A1716Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanSabre"), filter.getClass());            
            
            SabreRecordLocator sabre = new SabreRecordLocator();
            SabreRecordLocatorSoap relocSOA = sabre.getSabreRecordLocatorSoap();
            TicketREQ ticketREQ = new TicketREQ();
            ticketREQ.setTicketNumber(filter.VP_A1716CIA + filter.VP_A1716FORMA + filter.VP_A1716SERIE);
            
            TicketRES ticketRES = relocSOA.getTicket(ticketREQ);
            
            TicketingDocumentInfoAllTypes ticketingDocumentInfoAllTypes = ticketRES.getTicketDataType();
            String txtFecVta = ticketingDocumentInfoAllTypes.getTransactionInfo().getLocalDateTime().toString();// dateFormat.format(ticketingDocumentInfoAllTypes.getTransactionInfo().getLocalDateTime());
            String resFecVta = txtFecVta.substring(0,4) + txtFecVta.substring(5,7) + txtFecVta.substring(8,10);
            map.put("success", true);
            map.put("resFecVta", resFecVta);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }  
       
    public static String prettyPrintXml(String sourceXml) {
        try {
            Transformer serializer = SAXTransformerFactory.newInstance().newTransformer();
            serializer.setOutputProperty(OutputKeys.INDENT, "yes");
            serializer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
            Source xmlSource = new SAXSource(new InputSource(new ByteArrayInputStream(sourceXml.getBytes())));
            StreamResult res = new StreamResult(new ByteArrayOutputStream());
            serializer.transform(xmlSource, res);
            return new String(((ByteArrayOutputStream) res.getOutputStream()).toByteArray());
        } catch (Exception e) {

            // TODO log error
            return sourceXml;
        }
    }
    
    @RequestMapping(value = "getSabreFile")
    public @ResponseBody
    void getSabreFile(HttpServletRequest request, HttpServletResponse response) {
        String strTicket = request.getParameter("TKT");
        String fileNameDownload = String.format("Sabre File-" + strTicket + "-" + Functions.getFechaActual(), UUID.randomUUID().toString().toLowerCase());
        String rutaFile = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString(); 
        try {
            
            //Get the endpoint
            String wsURL = serverSession.getServerSession().getPropertySession().get("SABRE_WS").toString(); // "http://10.101.2.137/SabreRecloc/SabreReclocRetriever.asmx" ;

            //Get the SOAP message request
            String xmlInput = "";
            xmlInput = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:aer=\"http://www.aeromexico.com/\" xmlns:aer1=\"http://www.aeromexico.com\">";
            xmlInput += "<soapenv:Header/>";
            xmlInput += "<soapenv:Body>";
               xmlInput += "<aer:GetTicket>";
                  xmlInput += "<aer1:TicketRequest>";
                     xmlInput += "<aer1:TicketNumber>"+strTicket+"</aer1:TicketNumber>";
                  xmlInput += "</aer1:TicketRequest>";
               xmlInput += "</aer:GetTicket>";
            xmlInput += "</soapenv:Body>";
            xmlInput += "</soapenv:Envelope>";
            
            //Code to make a webservice HTTP request
            URL url = new URL(wsURL);
            URLConnection connection = url.openConnection();
            HttpURLConnection httpConn = (HttpURLConnection)connection;
            String responseString = "";
            String outputString = "";
            ByteArrayOutputStream bout = new ByteArrayOutputStream();
            OutputStream out = null;
            InputStreamReader isr = null;
            BufferedReader in = null;
            byte[] buffer = new byte[xmlInput.length()];
            buffer = xmlInput.getBytes();
            bout.write(buffer);
            byte[] b = bout.toByteArray();

            // Set the appropriate HTTP parameters.
            httpConn.setRequestProperty("Content-Length",
            String.valueOf(b.length));
            httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");

            //Optional: set your action
            //httpConn.setRequestProperty("SOAPAction", SOAPAction);
            httpConn.setRequestMethod("POST");
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            out = httpConn.getOutputStream();

            // write the content of the request to the outputstream of the HTTP Connection.
            out.write(b);
            out.close();
            // ready with sending the request

            // Read the response.
            isr = new InputStreamReader(httpConn.getInputStream());
            in = new BufferedReader(isr);

            //Write the SOAP message response to a String.
            while ((responseString = in.readLine()) != null) {
            outputString =
            outputString + responseString;
            }           
            outputString = prettyPrintXml(outputString);
            
            File file = new File(rutaFile + "\\" + fileNameDownload + ".xml");
            if (file.exists()) {
                file.delete();
            }
            
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            writer.println("" + outputString);
            writer.flush();
            writer.close();
            
            if (!zip(fileNameDownload)) {
                response.setContentType("application/zip");
            }
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNameDownload+ ".zip"  + "\"");
            
            
            
            
            InputStream is = new FileInputStream(rutaFile + "\\" + fileNameDownload + ".zip");
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();

        } catch (IOException e) {
            System.out.println("" + e.getMessage());

        }

    }
    
    public Boolean zip(String fileName) {
        String path = serverSession.getServerSession().getPropertySession().get("RUTA_DOWNLOAD").toString();
        Boolean existe = false;
        try {
            File fileZip = new File(path + "\\" + fileName + ".zip");

            if (fileZip.exists()) {
                fileZip.delete();
            }

            zipFile(new File(path + "\\" + fileName + ".xml"), path + "\\" + fileName + ".zip");

            existe = true;

        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }
        return existe;
    }

    public static void zipFile(File inputFile, String zipFilePath) throws FileNotFoundException, IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        zipOutputStream.setMethod(ZipOutputStream.DEFLATED);
        ZipEntry zipEntry = new ZipEntry(inputFile.getName());
        zipOutputStream.putNextEntry(zipEntry);
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        byte[] buf = new byte[4096];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.flush();
        zipOutputStream.closeEntry();
        zipOutputStream.close();
        fileOutputStream.close();
    }
    
    @RequestMapping(value = "/searchPax")
    public @ResponseBody
    String searchPax(ModelMap map, HttpServletRequest request) {
        System.out.println("MasterTicketController : searchPax");
        filter2 = new PX040S02A720Filter();
        try {
            filter2.IN_TYPE = request.getParameter("IN_TYPE");
            filter2.IN_CIA = request.getParameter("IN_CIA");
            filter2.IN_PAX = request.getParameter("IN_PAX");

            logic = new ProMasterTicketLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            List<A720> lstPax = logic.loadPX040S02A720(filter2);

            map.put("success", true);
            map.put("lstPax", lstPax);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        SQP00697Filter filter = new SQP00697Filter();
        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
            filter = new Gson().fromJson(request.getParameter("beanString"), filter.getClass());

            ProMasterTicketLogic logic = new ProMasterTicketLogic();
            logic.setSession(this.serverSession.getServerSession());
            
            List<SQP00697Filter> listaData = logic.loadSQP00697(filter);

            map.put("success", true);
            map.put("data", listaData);
        } catch (SQLException ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "/searchPNR")
    public @ResponseBody
    String searchPNR(ModelMap map, HttpServletRequest request) {
        String FPROC = request.getParameter("FPROC");
        String TRNCU = request.getParameter("TRNCU");
        String TKT = request.getParameter("TKT");
        String rutaMemo = "\\\\PX\\am\\PDI\\" + FPROC + "\\" + TRNCU;
        
        Path dir = Paths.get(rutaMemo);
        if (!Files.exists(dir)) {
            rutaMemo = "\\\\PX\\am\\PDI\\" + FPROC + "\\SAEX" ;
        }
        
        String strArchivo = rutaMemo + "\\" + TKT + ".html";
        BufferedReader br = null;
        boolean bolContinue = false;
        try {
            br = new BufferedReader(new FileReader(strArchivo));
            String line;
            String text = "";
            while ((line = br.readLine()) != null) {
                if(line.toUpperCase().contains("</PRE>")){
                    break;
                }else if(line.toUpperCase().contains("<PRE>")){
                    text += line.substring(line.toUpperCase().indexOf("<PRE>") + 5) + "<BR>";
                    bolContinue = true;
                }else if(bolContinue){
                    text += line + "<BR>";
                }
            }
            map.put("strTexto", text);
        } catch (FileNotFoundException e) {
            map.put("strTexto", "File not found for ticket: " + TKT);
        } catch (IOException e) {
            map.put("strTexto", e.getMessage());
        }
        return new Gson().toJson(map);
    }
}
