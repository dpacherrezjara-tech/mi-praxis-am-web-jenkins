package net.miatech.praxis.controllers.elavon;


import com.google.gson.Gson;
import com.monitorjbl.xlsx.StreamingReader;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import jdk.jshell.execution.StreamingExecutionControl;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.elavon.X3147temp;
import net.miatech.praxis.logic.elavon.InputLoadLogic;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.eventusermodel.XSSFReader;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Dvicente
 */
@Controller
@Scope("request")
@RequestMapping("/InputLoad")
public class InputLoadController extends BaseController{
    
    private InputLoadLogic logic;
    
    @RequestMapping(value = "/uploadExcelRecon",method = RequestMethod.POST,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody String uploadExcelRecon(ModelMap map,@RequestParam(value = "excelfile",required = true) MultipartFile excelfile,HttpServletRequest request)throws IOException{
        System.out.println("Ejecuta");
        List<X3147temp> temp = new ArrayList<>();
        try {
            logic = new InputLoadLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            Double filesize = excelfile.getSize() * 0.00000095367432;
            System.out.println("Achivo actual Pesa: " + filesize + " MB.");
            if (filesize>15) {
                throw new Exception("Archivo demasiado grande para procesar");
            }
            
//            OPCPackage pkg = OPCPackage.open(excelfile.getInputStream());
//            XSSFReader rd = new XSSFReader(pkg);
//            Iterator<InputStream> it = rd.getSheetsData();
            StreamingReader sr = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .sheetIndex(0)
                    .read(excelfile.getInputStream());
            for(Row fila : sr){
                //fila empieza a contar desde 0 (la fila 0 es cabecera)
                //se omite la cabecera
                if (fila.getRowNum()>0) {
                    if (fila.getCell(0) != null) {
                        X3147temp x = new X3147temp();
                        x.setSYSTEM(fila.getCell(0)==null?"":fila.getCell(0).getStringCellValue());
                        //si primera fila vacia no se procesa
                        if (x.getSYSTEM().equals("")) {
                            break;
                        }
                        x.setBATCH_DATE(fila.getCell(1)==null?"":fila.getCell(1).getStringCellValue());
                        x.setEXT_MID(fila.getCell(2)==null?"":fila.getCell(2).getStringCellValue());
                        x.setGLOBAL_NAME(fila.getCell(3)==null?"":fila.getCell(3).getStringCellValue());
                        x.setFUNDED_CCY(fila.getCell(4)==null?"":fila.getCell(4).getStringCellValue());
                        x.setUSD_RATE(fila.getCell(5)==null?0:fila.getCell(5).getNumericCellValue());
                        x.setSALES_TYPE(fila.getCell(6)==null?"":fila.getCell(6).getStringCellValue());
                        x.setCARD(fila.getCell(7)==null?"":fila.getCell(7).getStringCellValue());
                        x.setROC_TEXT(fila.getCell(8)==null?"":fila.getCell(8).getStringCellValue());
                        x.setCOMBTIC_NUM(fila.getCell(9)==null?"":fila.getCell(9).getStringCellValue());
                        x.setTKT(fila.getCell(10)==null?"":fila.getCell(10).getStringCellValue());
                        x.setTRX_DEPART_DTE(fila.getCell(11)==null?"":fila.getCell(11).getStringCellValue());
                        x.setTRN_AMT(fila.getCell(12)==null?0:fila.getCell(12).getNumericCellValue());
                        x.setCONV_TRN_AMT(fila.getCell(13)==null?0:fila.getCell(13).getNumericCellValue());
                        x.setCPT_ID(fila.getCell(14)==null?"":fila.getCell(14).getStringCellValue());
                        temp.add(x);
                    }
                }
            }
            
//            int limite = 300;
//            XSSFWorkbook wb = new XSSFWorkbook(excelfile.getInputStream());
//            SXSSFWorkbook workbook = new SXSSFWorkbook(wb,limite);
//            Sheet hoja = workbook.getSheetAt(0);
//            Iterator<Row> it = hoja.iterator();
//            Integer rowCount = 0;
//            List<X3147temp> temp = new ArrayList<>();
//            
//            while(it.hasNext()){
//                rowCount++;
//                Row fila = it.next();
//                if (rowCount>1) {
//                    if (fila.getCell(0) != null) {
//                        X3147temp x = new X3147temp();
//                        x.setSYSTEM(fila.getCell(0)==null?"":fila.getCell(0).toString());
//                        //si primera fila vacia no se procesa
//                        if (x.getSYSTEM().equals("")) {
//                            break;
//                        }
//                        x.setBATCH_DATE(fila.getCell(0)==null?"":fila.getCell(1).toString());
//                        x.setEXT_MID(fila.getCell(0)==null?"":fila.getCell(2).toString());
//                        x.setGLOBAL_NAME(fila.getCell(0)==null?"":fila.getCell(3).toString());
//                        x.setFUNDED_CCY(fila.getCell(0)==null?"":fila.getCell(4).toString());
//                        x.setUSD_RATE(fila.getCell(0)==null?0:fila.getCell(5).getNumericCellValue());
//                        x.setSALES_TYPE(fila.getCell(0)==null?"":fila.getCell(6).toString());
//                        x.setCARD(fila.getCell(0)==null?"":fila.getCell(7).toString());
//                        x.setROC_TEXT(fila.getCell(0)==null?"":fila.getCell(8).toString());
//                        x.setCOMBTIC_NUM(fila.getCell(0)==null?"":fila.getCell(9).toString());
//                        x.setTKT(fila.getCell(0)==null?"":fila.getCell(10).toString());
//                        x.setTRX_DEPART_DTE(fila.getCell(0)==null?"":fila.getCell(12).toString());
//                        x.setTRN_AMT(fila.getCell(0)==null?0:fila.getCell(13).getNumericCellValue());
//                        x.setCONV_TRN_AMT(fila.getCell(0)==null?0:fila.getCell(14).getNumericCellValue());
//                        x.setCPT_ID(fila.getCell(0)==null?"":fila.getCell(15).toString());
//                        temp.add(x);
//                    }
//                }
//            }
            boolean saveTemp = logic.saveX3147(temp);
            if (saveTemp) {
                map.put("success", saveTemp);
                map.put("response","execution was successfull");
            }
        } catch (SQLException e) {
            map.put("success", false);
            map.put("response","error in sql");
        }catch(Exception e){
            map.put("success", false);
            map.put("response",e.getMessage());
        }
        return new Gson().toJson(map);
    }
}
