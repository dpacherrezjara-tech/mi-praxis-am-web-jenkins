/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.controllers.salesAudit;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.SQP00768;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.gerencial.BusinessToolsLogic;
import net.miatech.praxis.logic.salesAudit.AuditTWLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jtorres
 */
@Controller
@Scope("request")
@RequestMapping("/AuditTw")
public class AuditTWController  extends BaseController{
    

    private static final Logger logError = Logger.getLogger("errorLog");

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        System.out.println("-------------- AuditTWController : index-------------");
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "salesaudit/AuditTW/form_index";
    }
    
    

    @RequestMapping(value = "obtainFiles")
    public @ResponseBody
    String loadFiles(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- obtainFiles");
        BusinessToolsLogic logic = new BusinessToolsLogic();
        List<A1248> lstFiles = new ArrayList<>(0);
        List<A1248> lstOperadores = new ArrayList<>(0);
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla").toString().trim();

            lstFiles = logic.loadFiles(tabla);
            lstOperadores = logic.loadOperadores();
            //lstOperadores
          
            map.put("success", true);
            map.put("lstFiles", lstFiles);
            map.put("lstOperadores", lstOperadores);
            map.put("Usuario", this.serverSession.getServerSession().getUserView().getUserInfo().USR);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }


        return new Gson().toJson(map);
    }
    

    @RequestMapping(value = "obtainData")
    public @ResponseBody
    String obtainData(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- obtainData");
        BusinessToolsLogic logic = new BusinessToolsLogic();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla1 = request.getParameter("tabla1").toString().trim();
            String tabla2 = request.getParameter("tabla2").toString().trim();

            List<A1248> lstCampos = logic.loadPX275SQP01033(tabla1, tabla2);//loadColumns
            //lstOperadores
          
            map.put("success", true);
            map.put("lstCampos", lstCampos);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }


        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "obtainListFavoritos")
    public @ResponseBody
    String obtainListFavoritos(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- obtainListFavoritos");
        BusinessToolsLogic logic = new BusinessToolsLogic();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla").toString().trim();
            

            List<SQP00768> lstFavoritos = logic.loadPX275SQP01034(tabla);
            //lstOperadores
          
            map.put("success", true);
            map.put("lstFavoritos", lstFavoritos);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }


        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "obtainDataFavoritos")
    public @ResponseBody
    String obtainDataFavoritos(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- obtainDataFavoritos");
        AuditTWLogic logic = new AuditTWLogic();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String tabla = request.getParameter("tabla").toString().trim();
            String codigo = request.getParameter("codigo").toString().trim();
            String flag = request.getParameter("flag").toString().trim();
            

            //Carga Favoritos
            List<SQP00768> lstFavoritos = logic.loadPX449SQP02655(tabla, codigo,flag);
          
            map.put("success", true);
            map.put("lstFavoritos", lstFavoritos);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }


        return new Gson().toJson(map);
    }

    @RequestMapping(value = "searchFields")
    public @ResponseBody
    String searchFields(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- searchFields");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        Gson gson = new Gson();
        boolean dw_excel = Boolean.parseBoolean(request.getParameter("dw_excel"));
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            
            int limit = request.getParameter("limit") == null ? -1 : Integer.parseInt(request.getParameter("limit").toString());
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start").toString());
            if (!dw_excel) {
                filter.page.PAGROW = 20;
                start = (start != 0 ? start : 0);
                filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            } else {
                filter.page.PAGROW = -1;
                filter.page.PAGNUM = 1;
            }

            /*if (!filter.strSelect.equals("")) {
                listaData = logic.loadPXPRUEBA2(filter);
            } else {*/
                List<SQP00768> listaData = logic.loadPX282SQP02561(filter);
            //}
          
            map.put("success", true);
            map.put("data", listaData);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "SaveQuery")
    public @ResponseBody
    String SaveQuery(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- SaveQuery");
        BusinessToolsLogic logic = new BusinessToolsLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX282SQP00777(filter);
          
            map.put("success", true);
            map.put("Mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }

    @RequestMapping(value = "obtainRelacionComentarios")
    public @ResponseBody
    String obtainRelacionComentarios(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- obtainRelacionComentarios");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            List<SQP00768> lstRelacionCom = logic.loadPX449SQP02688();
          
            map.put("success", true);
            map.put("lstRelacionCom", lstRelacionCom);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "UpdateFareBase")
    public @ResponseBody
    String UpdateFareBase(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- UpdateFareBase");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02560(filter);
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "UpdateFareATPCOByAgent")
    public @ResponseBody
    String UpdateFareATPCOByAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- UpdateFareATPCOByAgent");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02586(filter);
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "MatchTaxes")
    public @ResponseBody
    String MatchTaxes(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- MatchTaxes");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02637(filter);
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ProcessTaxesXO")
    public @ResponseBody
    String ProcessTaxesXO(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- ProcessTaxesXO");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP03587(filter);
//            msj = "YRAH ProcessTaxesXO";
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "UpdateADMReason")
    public @ResponseBody
    String UpdateADMReason(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- UpdateADMReason");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02689(filter);
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "UpdateQATPCOByAgent")
    public @ResponseBody
    String UpdateQATPCOByAgent(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- UpdateQATPCOByAgent");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02690(filter);
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "CreateTaxesUK")
    public @ResponseBody
    String CreateTaxesUK(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- CreateTaxesUK");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02744(filter);
//            msj = "YEAH ForseMatch";
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    @RequestMapping(value = "ForseMatch")
    public @ResponseBody
    String ForseMatch(ModelMap map, HttpServletRequest request) {
        System.out.println("AuditTWController ---- ForseMatch");
        AuditTWLogic logic = new AuditTWLogic();
        SQP00768 filter = new SQP00768(); 
        String msj = "";
        Gson gson = new Gson();
        
        try {
            logic.setSession(this.serverSession.getServerSession());

            String beanString = request.getParameter("beanString");
            filter = gson.fromJson(beanString, SQP00768.class);
            

            msj = logic.loadPX449SQP02936(filter);
//            msj = "YEAH ForseMatch";
          
            map.put("success", true);
            map.put("mensaje", msj);
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
//    
//    
////    //ForseMatch desde Excel
////    public JavaToFlexResponse uploadfromExcel(List<SQP00768> lstExcel) {
////
////        JavaToFlexResponse resp = new JavaToFlexResponse();
////        Functions.msjConsola("PRAXIS", serverSession.getUserView().getUserInfo().USR, BwrAuditTW.class.getCanonicalName() + " : upload");
////
////        try {
////
////            String msj = "", strHora = Functions.getHoraActual();
////            
////            BwrAuditTWLogic logic = new BwrAuditTWLogic();
////            logic.setSession(serverSession);
////            
////            msj = logic.loadPX449SQP002XXZZ(lstExcel);
////                
////            resp.vars.put("msj", msj);
////
////        } catch (Exception e) {
////            resp.vars.put("sesion", "Se produjo un error al intentar subir el archivo.");
////            resp.info.add(e.getMessage());
////            logError.error(e.getMessage());
////        }
////
////        return resp;
////    }
//    
    //ForseMatch desde Excel
    
    @RequestMapping(value = "uploadfromExcel")
    public @ResponseBody
    String uploadfromExcel(ModelMap map, HttpServletRequest request, @RequestParam("CSVfile") MultipartFile CSVfile) {

        System.out.println("AuditTWController ---- uploadfromExcel");
        AuditTWLogic logic = new AuditTWLogic();
        String mensaje = "";
        try {
            byte[] bytes = CSVfile.getBytes();
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = CSVfile.getOriginalFilename() + strSesion + ".csv";
            
            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            fs.write(bytes);
            fs.flush();
            fs.close();
         
            logic.setSession(this.serverSession.getServerSession());
            mensaje = logic.loadPX449SQP02937(strArchivo);
            
            
            map.put("success", true);
            map.put("mensaje", mensaje);
            
            //Eliminar temporal           
            archivo.delete();

        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
    
    
    @RequestMapping(value = "uploadTaxF31fromExcel")
    public @ResponseBody
    String uploadTaxF31fromExcel(ModelMap map, HttpServletRequest request, @RequestParam("CSVfile") MultipartFile CSVfile) {
        System.out.println("AuditTWController ---- uploadTaxF31fromExcel");
        AuditTWLogic logic = new AuditTWLogic();
        
        
        String mensaje = "", strHora = Functions.getHoraActual();
        try {
            byte[] bytes = CSVfile.getBytes();
                    
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = CSVfile.getOriginalFilename() + strSesion + ".csv";
//            
            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);
            
            
            
            fs.write(bytes);
            fs.flush();
            fs.close();
            
            logic.setSession(this.serverSession.getServerSession());

            
            mensaje = logic.loadPX449SQP03744(strArchivo);
          
            map.put("success", true);
            map.put("mensaje", mensaje);
            
            //Eliminar temporal           
            archivo.delete();
            
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
            throw new SpringException(e);
        }

        return new Gson().toJson(map);
    }
}
