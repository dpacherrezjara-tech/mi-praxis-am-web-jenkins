Ext.define('Ext.Praxis.controller.eecta.ControlUATP.ControlUATPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlUATPController',
//    requires: [
//        'Ext.Praxis.view.eecta.ControlUATPForm.InfoGrid'
//    ],
    beanXLS: {},       
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        me = this;
    },
    afterRender: function () {
//        this.setStoreDataGrid(); //del grid selected
//        this.cmbfiltro_clickHandler();
//        this.Onsearch();
    },
    cmbfiltro_clickHandler: function () {
        
    },
    setStoreDataGrid: function () {
        //del grid selected
        //Ext.create('Ext.Praxis.store.eecta.ControlUATP.GridData', {});
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        this.Onsearch();
    },
    btnFilter_click: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function (obj, e) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    global.getFile(prototype.url + '/getXLSXAPI?beanString=' + encodeURI(JSON.stringify(this.beanXLS)));
//                }
//            }
//        });
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        }        
    },
    // </editor-fold>    
    onTxtFilterKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    Onsearch: function () {
        this.search();
    },
    search: function ()
    {
        me = this;
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        var bean = {};
        bean.VP_OPCION = "1"; //Ext.getCmp(prototype.id + '-cmbfiltro').getValue();
        bean.VP_FDATE1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        bean.VP_FDATE2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        bean.VP_CDCLI = Ext.getCmp(prototype.id + '-CDCLI').getValue();
        bean.VP_RSOCI = Ext.getCmp(prototype.id + '-RSOCI').getValue();
        bean.VP_NRRPT = Ext.getCmp(prototype.id + '-NRRPT').getValue();
        bean.VP_REFPG = Ext.getCmp(prototype.id + '-REFPG').getValue();
        bean.VP_CTABC = Ext.getCmp(prototype.id + '-CTABC').getValue();
        bean.VP_STSPG = Ext.getCmp(prototype.id + '-STSPG').getValue();
        bean.VP_BOLET = "";
        var t_NUMBER_CIA = Ext.getCmp(prototype.id + '-TICKET_NUMBER_CIA').getValue();
        var t_NUMBER = Ext.getCmp(prototype.id + '-TICKET_NUMBER').getValue();
        var t_NUMBER_SEQ = Ext.getCmp(prototype.id + '-TICKET_NUMBER_SEQ').getValue();        
        if( t_NUMBER !== ''){            
            if(t_NUMBER_CIA === ''){
               global.Msg({msg: 'Ingrese la CIA'});
               return; 
            }
            if(t_NUMBER_SEQ === ''){
               global.Msg({msg: 'Ingrese la secuencia'});
               return; 
            }
            bean.VP_BOLET = t_NUMBER_CIA + t_NUMBER + t_NUMBER_SEQ;            
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.SalesList.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3957");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    if (obj.data.length === 1) {                    
                        //console.log('abrir ventana en automatico');
                        //seleccionar el registro
                        var grid = Ext.getCmp(prototype.id + '-gridData');
                        me.onDetailClick( grid , 0, 0 );
                    }
                    
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onReportVentaUATP_PDF: function (grid, rowIndex, colIndex) {
        if (Ext.getCmp(prototype.id + '-gridData')) {
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            this.gridData = rec;
        }
        var bean = {};
        bean.VP_A3957NRRPT = this.gridData.get('A3957NRRPT');
        bean.VP_A3957CDCLI = this.gridData.get('A3957CDCLI');
        this.exportPdf(prototype.url + '/pdf_reportVentaUATP/?beanString=' + encodeURI(JSON.stringify(bean)));
    },
    exportPdf: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download report Pdf ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Data entry">
    btnApl_pay_click: function () {
        this.winDataEntry('I');
    },
    btnControlUATPBatch: function () {
        this.winDataEntry03('I');
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry01('U', rec);
    },
    onDetailPagoClick:function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry02('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var rec_selected = new Array();
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                //console.log(row.get('A3957CDCLI'));
                rec_selected.push(row.data);
            }
        }else{
            global.Msg({
                msg: 'Debe seleccionar un registro'
            });
            return;
        }
        // console.log(rec_selected);
        Ext.create('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPEntry', {
            id: prototype.id + '-ControlUATPEntry',
            params: {
                action: action,
                rec: rec,
                rec_selected: rec_selected
            }
        }).show();
    },    
    //detalle de reporte/Aplicacion pago
    winDataEntry01:function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        Ext.create('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPBoletoEntry', {
            id: prototype.id + '-ControlUATPBoletoEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    //detalle de pago aplicado
    winDataEntry02:function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        Ext.create('Ext.Praxis.view.eecta.ControlUATPForm.AppliedPaymentsForm', {
            id: prototype.id + '-AppliedPaymentsForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    winDataEntry03:function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        Ext.create('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPBatch', {
            id: prototype.id03 + '-ControlUATPBatch',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onCmbByOrder: function () {
//        var option_order = Ext.getCmp(prototype.id + '-cmbByOrder').getValue();
//        Ext.getCmp(prototype.id + '-txt-filter').show();
//        Ext.getCmp(prototype.id + '-txt-filter').focus();
//        Ext.getCmp(prototype.id + '-txt-filter-num').hide();
//        if (option_order === '03' || option_order === '04') {
//            Ext.getCmp(prototype.id + '-txt-filter').hide();
//            Ext.getCmp(prototype.id + '-txt-filter-num').show();
//            Ext.getCmp(prototype.id + '-txt-filter-num').focus();
//        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">
    onStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
//            case 1:
//                value = value;
//            break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                break;
//            default:
//                value = value;
        }
        return value;
    },
    onAmountRenderer01: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000.00');
                value = parseInt(value) === 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000.00');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000.00');
        }
        return value;
    },
    onAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onMonthStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log(value.substring(4,6));
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        var valor = m[parseInt(value.substring(4, 6)) - 1] + ' - ' + value.substring(0, 4);
        return valor;
        //return '<a href="#gds_analysis" onclick="Ext.getCmp(\'App-Gds_analysis-Contenedor\').getController().onDetailFlownClick00(' + rowIndex + ');">' + valor + '</a>';
    }
    // </editor-fold>
});



