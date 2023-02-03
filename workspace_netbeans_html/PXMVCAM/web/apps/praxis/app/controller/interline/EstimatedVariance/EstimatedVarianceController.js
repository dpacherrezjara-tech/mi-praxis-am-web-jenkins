Ext.define('Ext.Praxis.controller.interline.EstimatedVariance.EstimatedVarianceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EstimatedVarianceController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    objPermiso: {},
    PERMISO: false,
    me: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        me = this;
        prototype.id = 'EstimatedVarianceForm';
        prototype.url = CONTEXTPATH+'/EstimatedVariance';
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
//        this.btnSearch_click();
        this.verificarPermisos('PX00000384');
    },
    verificarPermisos: function(nprog) {
        Ext.Ajax.request({
            url: prototype.urlMaster+'/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.objPermiso = res.matrix;
                } else global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    mostrarFiltros: function(cmp, newValue, oldValue, eOpts) {
        this.limpiarFiltros();
        Ext.getCmp(prototype.id+'-boxDateFilter').hide();
        Ext.getCmp(prototype.id+'-boxPeriodFilter').show();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        console.log(".... year ......");
        console.log(storeComboDataYear);
        console.log(typeof(storeComboDataYear));
        Ext.getCmp(prototype.id+'-cmbDateYearFrom').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id+'-cmbDateYearTo').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateMonthFrom').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id+'-cmbDateMonthTo').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('M', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'M' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.interline.EstimatedVarianceForm.DataEntry', {
            id: 'DataEntryEstimatedVarianceForm',
            params: {
                action: action,
                rec: rec,
                objPermiso: me.objPermiso
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {

        var strPeriod = this.getValue('cmbDatePeriodFrom');
        var strDateYear = this.getValue('cmbDateYearFrom');
        var strDateMonth = this.getValue('cmbDateMonthFrom'); 
        
        if ( strDateMonth !== '' ){ 
            if (strPeriod !=='') {
                if (strDateYear !==''){
                    this.setFormatParameter();
                    this.setGridData();
                }else {
                    global.Msg({
                    msg: 'Please select Year.'
                    });
                    this.focus('cmbDateYearFrom');
                }
            } else {
                global.Msg({
                    msg: 'Please select Period'
                });
                this.focus('cmbDatePeriodFrom');
            }
        } else {
                global.Msg({
                    msg: 'Please select Month'
                });
                this.focus('cmbDateMonthFrom');
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function(obj, e) {
        this.limpiarFiltros();
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        
        // </editor-fold>
    },
    btnAdd_click: function() {
        this.winDataEntry('A');
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">        
        var fyear = Ext.getCmp(prototype.id+'-cmbDateYearFrom').getValue();
        var fmonth = Ext.getCmp(prototype.id+'-cmbDateMonthFrom').getValue();
        var fperiod = Ext.getCmp(prototype.id+'-cmbDatePeriodFrom').getValue();
        searchParams.IN_FECHA_PROCESO = fyear + fmonth;
        searchParams.IN_PERIOD = fperiod;
        searchParams.IN_MODULE = Ext.getCmp(prototype.id+'-cmbModuleVariance').getValue();
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        _path = prototype.url+'/getXLSX?' +
                'IN_MODULE='+searchParams.IN_MODULE+'&' +
                'IN_FECHA_PROCESO='+searchParams.IN_FECHA_PROCESO+'&' +
                'IN_PERIOD='+searchParams.IN_PERIOD;
        console.log(_path);
        console.log("Params");
        console.log(searchParams);
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.EstimatedVariance.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A1955");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        console.log("---- Data -----");
                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res.data);
                        var storeDataPivot = Ext.create('Ext.data.Store', {
                                data: res.data,
                                autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displaySAChart32').bindStore(storeDataPivot);
                        
                    }
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function() {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id+'-cmbDatePeriodFrom').setValue('');
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateMonthFrom').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateYearFrom').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue("txtDateFrom", "");
        this.setValue("txtDateTo", "");
        // </editor-fold>
//      
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxDateFilter').hide();
        Ext.getCmp(prototype.id+'-boxPeriodFilter').show();
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
