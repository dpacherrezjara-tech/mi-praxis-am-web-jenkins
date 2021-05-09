
Ext.define('Ext.Praxis.controller.discharges.ParametersNoShow.CatPrestacionesEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-dataEntryController',    
    url: CONTEXTPATH + '/ParametersNoShow',    
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs        
        this.get_load_grid_ticket_d();
    },   
    get_load_grid_ticket_d: function () {        
        var bean = {};
        var p = this.view.params;    
        //console.log(p);
        //console.log(p.A3975KEY1.split('|'));        
        bean.VP_OPCION = "0";
        bean.VP_A3975KEY1 = p.A3975KEY1.split('|')[1];
        bean.VP_A3975KEY2 = "";
        bean.VP_A3975DESC1 = "";
        bean.limit = "-1";
        bean.page = "-1";
        //console.log('get_load_grid_ticket_d...');
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {        
            proxy: {
                url: prototype.url + '/search_tbl_micelanea'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id01 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id01 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });        
        Ext.getCmp(prototype.id02 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id02 + '-paggin').setStore(storeGridDatas);
    
    },
    onCancelClick01: function (btn) {        
        Ext.getCmp(prototype.id02 + '-CatPrestacionesEntry').close();
    }
     
});
