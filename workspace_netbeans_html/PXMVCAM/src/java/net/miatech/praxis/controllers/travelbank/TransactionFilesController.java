package net.miatech.praxis.controllers.travelbank;

import com.google.gson.Gson;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.travelbank.TransactionFilesLogic;
import net.miatech.praxis.travelbank.SQP04806Filter;
import net.miatech.praxis.travelbank.SQP04807Filter;
import net.miatech.praxis.travelbank.SQP04808Filter;
import net.miatech.praxis.travelbank.SQP04809Filter;
import net.miatech.praxis.travelbank.SQP04810Filter;
import net.miatech.praxis.travelbank.SQP04819Filter;
import net.miatech.praxis.travelbank.SQP04820Filter;
import net.miatech.praxis.travelbank.SQP04821Filter;
import net.miatech.praxis.travelbank.SQP04822Filter;
import net.miatech.praxis.travelbank.SQP04823Filter;
import net.miatech.praxis.travelbank.SQP04824Filter;
import net.miatech.praxis.travelbank.SQP04970Filter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author vhidalgo
 */
@Controller
@Scope("request")
@RequestMapping("/TransactionFiles")
public class TransactionFilesController extends BaseController {

    private TransactionFilesLogic logic;

    // <editor-fold defaultstate="collapsed" desc="ISSUES">
    @RequestMapping(value = "/search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        List<SQP04806Filter> listaData;
        SQP04806Filter filter;
        filter = new SQP04806Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            filter.VP_STS = request.getParameter("VP_STS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04806Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchDetalle")
    public @ResponseBody
    String searchDetalle(ModelMap map, HttpServletRequest request) {
        List<SQP04807Filter> listaData;
        SQP04807Filter filter;
        filter = new SQP04807Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_MDA = request.getParameter("VP_MDA");
            filter.VP_SQDIA = request.getParameter("VP_SQDIA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            filter.VP_Document = request.getParameter("VP_Document");
            filter.VP_IDISR = request.getParameter("VP_IDISR");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04807Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchIDISS")
    public @ResponseBody
    String searchIDISS(ModelMap map, HttpServletRequest request) {
        List<SQP04970Filter> listaData;
        SQP04970Filter filter;
        filter = new SQP04970Filter();
        try {
            filter.VP_A4281IDISS = request.getParameter("VP_A4281IDISS");
            filter.VP_A4281SQISS = request.getParameter("VP_A4281SQISS");
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04970Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size());
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="USED">
    @RequestMapping(value = "/searchUsed")
    public @ResponseBody
    String searchUsed(ModelMap map, HttpServletRequest request) {
        List<SQP04808Filter> listaData;
        SQP04808Filter filter;
        filter = new SQP04808Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            filter.VP_STS = request.getParameter("VP_STS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04808Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchUsedDetalle")
    public @ResponseBody
    String searchUsedDetalle(ModelMap map, HttpServletRequest request) {
        List<SQP04809Filter> listaData;
        SQP04809Filter filter;
        filter = new SQP04809Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_MDA = request.getParameter("VP_MDA");
            filter.VP_SQDIA = request.getParameter("VP_SQDIA");
            filter.VP_IDUSE = request.getParameter("VP_IDUSE");
            filter.VP_Document = request.getParameter("VP_Document");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04809Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchUsedDetalleN2")
    public @ResponseBody
    String searchUsedDetalleN2(ModelMap map, HttpServletRequest request) {
        List<SQP04810Filter> listaData;
        SQP04810Filter filter;
        filter = new SQP04810Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_MDA = request.getParameter("VP_MDA");
            filter.VP_SQDIA = request.getParameter("VP_SQDIA");
            filter.VP_IDUSE = request.getParameter("VP_IDUSE");
            filter.VP_Document = request.getParameter("VP_Document");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04810Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="EXPIRE">
    @RequestMapping(value = "/searchExpire")
    public @ResponseBody
    String searchExpire(ModelMap map, HttpServletRequest request) {
        List<SQP04819Filter> listaData;
        SQP04819Filter filter;
        filter = new SQP04819Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_IDEXP = request.getParameter("VP_IDEXP");
            filter.VP_STS = request.getParameter("VP_STS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04819Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchExpireDetalle")
    public @ResponseBody
    String searchExpireDetalle(ModelMap map, HttpServletRequest request) {
        List<SQP04820Filter> listaData;
        SQP04820Filter filter;
        filter = new SQP04820Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_MDA = request.getParameter("VP_MDA");
            filter.VP_SQDIA = request.getParameter("VP_SQDIA");
            filter.VP_IDEXP = request.getParameter("VP_IDEXP");
            filter.VP_Document = request.getParameter("VP_Document");
            //filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_IDISS = request.getParameter("VP_IDISS");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04820Filter(filter);
            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LOSSES">
    @RequestMapping(value = "/searchLosses")
    public @ResponseBody
    String searchLosses(ModelMap map, HttpServletRequest request) {
        List<SQP04821Filter> listaData;
        SQP04821Filter filter;
        filter = new SQP04821Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IDLOS = request.getParameter("VP_IDLOS");
            filter.VP_TICKET = request.getParameter("VP_TICKET");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");

            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04821Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="MERGE">
    @RequestMapping(value = "/searchMerge")
    public @ResponseBody
    String searchMerge(ModelMap map, HttpServletRequest request) {
        List<SQP04822Filter> listaData;
        SQP04822Filter filter;
        filter = new SQP04822Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_NCTAF = request.getParameter("VP_NCTAF");
            filter.VP_NCTAT = request.getParameter("VP_NCTAT");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04822Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    @RequestMapping(value = "/searchMergeDetalle")
    public @ResponseBody
    String searchMergeDetalle(ModelMap map, HttpServletRequest request) {
        List<SQP04823Filter> listaData;
        SQP04823Filter filter;
        filter = new SQP04823Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_NCTA = request.getParameter("VP_NCTA");
            filter.VP_PRDA = request.getParameter("VP_PRDA");
            filter.VP_TRAN = request.getParameter("VP_TRAN");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04823Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="LIABILITY">
    @RequestMapping(value = "/searchLiability")
    public @ResponseBody
    String searchLiability(ModelMap map, HttpServletRequest request) {
        List<SQP04824Filter> listaData;
        SQP04824Filter filter;
        filter = new SQP04824Filter();
        filter.page.TOTROW = -1;
        filter.page.START = 0;
        filter.page.LIMIT = 0;
        try {
            filter.VP_OPCION = request.getParameter("VP_OPCION");
            filter.VP_IDMER = request.getParameter("VP_IDMER");
            filter.VP_NCTAT = request.getParameter("VP_NCTAT");
            filter.VP_DESDE = request.getParameter("VP_DESDE");
            filter.VP_HASTA = request.getParameter("VP_HASTA");
            filter.VP_IDFIL1 = request.getParameter("VP_IDFIL1");
            filter.VP_IDFIL2 = request.getParameter("VP_IDFIL2");
            int start = request.getParameter("start") == null ? 0 : Integer.parseInt(request.getParameter("start"));
            filter.page.PAGROW = 20;
            start = (start != 0 ? start : 0);
            filter.page.PAGNUM = (start / filter.page.PAGROW) + 1;
            logic = new TransactionFilesLogic();
            logic.setSession((IServerSession) serverSession.getServerSession());
            listaData = logic.getSQP04824Filter(filter);

            map.put("success", true);
            map.put("total", listaData.size() > 0 ? listaData.get(0).page.TOTROW : 0);
            map.put("data", listaData);
        } catch (NumberFormatException ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        } catch (Exception ex) {
            map.put("success", false);
            map.put("sesion", ex.getMessage());
        }
        return new Gson().toJson(map);
    }

    // </editor-fold>    
}
