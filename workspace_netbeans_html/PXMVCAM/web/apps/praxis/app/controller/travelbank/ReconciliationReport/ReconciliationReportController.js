/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.travelbank.ReconciliationReport.ReconciliationReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReconciliationReportController',        
    searchParams: {},
    donwloadParams: {},
    init: function ( ) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        //prototype.id = 'FilesIssuesUsesForm';
        prototype.id = 'ReconciliationReportForm';
        prototype.url = CONTEXTPATH + '/ReconciliationReport';
        //prototype.widthContenedor = 1300;
        //prototype.widthGrid = 863;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
//        this.setStoreData();
//        this.btnClear_click();
//        this.btnSearch_click();
    },
    onMostrarFiltrosChange: function (cmp, newValue, oldValue, eOpts) {
        this.limpiarFiltros();
        var strOpcion = this.getValue('cmbfiltro');
        Ext.getCmp(prototype.id + '-BoxFechasDesdeHasta').hide();
        Ext.getCmp(prototype.id + '-BoxAccountNumber').hide();
        Ext.getCmp(prototype.id + '-BoxCreditId').hide();
        Ext.getCmp(prototype.id + '-BoxEstadoSaldo').hide();
        Ext.getCmp(prototype.id + '-BoxMoneda').hide();
        this.setGrid(strOpcion);
        switch (strOpcion) {
            case "1" :
                Ext.getCmp(prototype.id + '-BoxAccountNumber').show();
                Ext.getCmp(prototype.id + '-BoxEstadoSaldo').show();
                Ext.getCmp(prototype.id + '-BoxMoneda').show();
                Ext.getCmp(prototype.id + '-BoxEstadoSaldo').show();
                Ext.getCmp(prototype.id + '-NCTA').focus();
                break;
            case "2" :
                Ext.getCmp(prototype.id + '-BoxAccountNumber').show();
                Ext.getCmp(prototype.id + '-BoxFechasDesdeHasta').show();
                Ext.getCmp(prototype.id + '-BoxCreditId').show();
                Ext.getCmp(prototype.id + '-BoxMoneda').show();
                Ext.getCmp(prototype.id + '-BoxEstadoSaldo').show();
                Ext.getCmp(prototype.id + '-CreditID').focus();
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Detalle de transacciones-Credit ID">
    onEditClick: function (grid, rowIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.ReconciliationReportForm.DetalleTransaccionesForm', {
            id: 'DetalleTransaccionesForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // </editor-fold>
    // 
    // <editor-fold defaultstate="collapsed" desc="Estado de cuenta">
    onDetailAccountStatamentClick: function (grid, rowIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);                
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.ReconciliationReportForm.AccountStatementForm', {
            id: 'ReconciliationReportForm_AccountStatementForm',
            params: {
                action: 'U',
                rec: rec
            }
        }).show();
    },
     // </editor-fold>
    
    setGrid: function (op) {
        var panel = Ext.getCmp(prototype.id + '-centerC-panel01');
        panel.removeAll();
        //console.log(op);
        switch (op) {
            case '2':
                var me = this;
                var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
                    proxy: {
                        url: prototype.url + '/searchDetalle'
                    },
                    listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = me.searchParams;
                        },
                        load: function (obj) {
                            win.lblUser_toolTip("Estructura: A4467");
                            // <editor-fold defaultstate="collapsed" desc="paggin">
//                            var pag = Ext.getCmp(prototype.id1 + '-paggin');
//                            var pagData = pag.getPageData();
//                            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                            var total = Ext.util.Format.number(pagData.total, '0,000');
//                            Ext.getCmp(prototype.id1 + '-lbl-currentPage').setText(currentPage);
//                            Ext.getCmp(prototype.id1 + '-lbl-pageCount').setText(pageCount);
//                            Ext.getCmp(prototype.id1 + '-lbl-total').setText(total);
                            // </editor-fold>
                            if (obj.data.length === 0) {
                                Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                            }
                        }
                    }
                });
                var gridPanel = Ext.create({
                    region: 'center',
                    xtype: prototype.id1 + '-infoDetail',
                    id: prototype.id1 + '-contentInfo'
                });
                panel.add(gridPanel);
                Ext.getCmp(prototype.id1 + '-gridData').setStore(storeGridDatas);
                Ext.getCmp(prototype.id1 + '-gridData').getStore().reload();
                Ext.getCmp(prototype.id1 + '-paggin').setStore(storeGridDatas);

                break;
            default:
                var me = this;
                var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
                    proxy: {
                        url: prototype.url + '/search'
                    },
                    listeners: {
                        beforeload: function (obj) {
                            obj.proxy.extraParams = me.searchParams;
                        },
                        load: function (obj) {
                            win.lblUser_toolTip("Estructura: A4460");
                            // <editor-fold defaultstate="collapsed" desc="paggin">
//                            var pag = Ext.getCmp(prototype.id + '-paggin');
//                            var pagData = pag.getPageData();
//                            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                            var total = Ext.util.Format.number(pagData.total, '0,000');
//                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                            // </editor-fold>
                            if (obj.data.length === 0) {
                                Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                            }
                        }
                    }
                });
                var gridPanel = Ext.create({
                    region: 'center',
                    xtype: prototype.id + '-info',
                    id: prototype.id + '-contentInfo'
                });
                panel.add(gridPanel);
                Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
                Ext.getCmp(prototype.id + '-gridData').getStore().reload();
                Ext.getCmp(prototype.id + '-paggin').setStore(storeGridDatas);
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
//        alert('btnSearch_click of FormFileUsedController ');
        var strOpcion = this.getValue('cmbfiltro');
//        var VP_ACCNBR = Ext.getCmp(prototype.id + '-NCTA').getValue();
//        var VP_TICKET = Ext.getCmp(prototype.id + '-TicketNumber').getValue();
//        if (VP_ACCNBR === '') {
//            global.Msg({
//                msg: 'Enter account number.'
//            });
//            return;
//        }
//        if (VP_TICKET === '') {
//            global.Msg({
//                msg: 'Enter credit ID'
//            });
//            return;
//        }

//        if (strFiltro !== '') {
//            console.log(Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd'))
//            //me.searchParams.VP_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
//        }
        this.setFormatParameter(strOpcion);
        this.setGrid(strOpcion);
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function (obj, e) {
        this.limpiarFiltros();
        this.setValue("cmbfiltro", "");
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id + '-boxMainData').show();
        // </editor-fold>
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (Opcion) {
        var me = this;
        me.searchParams = {
            VP_OPCION: '',
            VP_NCTA: '',
            VP_MONED: '',
            VP_CRDID: '',
            VP_DESDE: '',
            VP_HASTA: '',
            VP_SERVC: '',
            VP_STAT: '',
            VP_LSTA: '',
            VP_PSTA: ''
        };
        me.searchParams.VP_OPCION = Opcion;
        switch (Opcion) {
            case '1':                
                me.searchParams.VP_NCTA = Ext.getCmp(prototype.id + '-NCTA').getValue();
                me.searchParams.VP_MONED = Ext.getCmp(prototype.id + '-MDA').getValue();
                me.searchParams.VP_STAT = Ext.getCmp(prototype.id + '-SALDOS_chk').getValue() ? 1 : 0;
                break;
                
            case '2':   
                me.searchParams.VP_NCTA = Ext.getCmp(prototype.id + '-NCTA').getValue();
                me.searchParams.VP_MONED = Ext.getCmp(prototype.id + '-MDA').getValue();
                me.searchParams.VP_CRDID = Ext.getCmp(prototype.id + '-CreditID').getValue();
                if(Ext.getCmp(prototype.id + '-Fechas_chk').getValue()){
                    me.searchParams.VP_DESDE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
                    me.searchParams.VP_HASTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
                }                                
                me.searchParams.VP_SERVC = ''; //Ext.getCmp(prototype.id + '-MDA').getValue();                
                me.searchParams.VP_STAT = Ext.getCmp(prototype.id + '-SALDOS_chk').getValue() ? 1 : 0;
                me.searchParams.VP_LSTA = ''; // Ext.getCmp(prototype.id + '-LSTA_chk').getValue() ? 1 : 0;
                me.searchParams.VP_PSTA = ''; //Ext.getCmp(prototype.id + '-PSTA_chk').getValue() ? 1 : 0;
                break;
        }        
    },
    // </editor-fold>
    
//    exportExcel: function () {
//        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            global.getFile(_path);
//        }
//    },
    limpiarFiltros: function () {
        //        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        //        Ext.getCmp(prototype.id+'-cmbDatePeriodFrom').setValue('');
        //        Ext.getCmp(prototype.id+'-cmbDatePeriodTo').setValue('');
        //        var mes = new Date().getMonth()+1;
        //        if(mes < 10) mes = "0"+mes;
        //        Ext.getCmp(prototype.id+'-cmbDateMonthFrom').setValue(mes);
        //        Ext.getCmp(prototype.id+'-cmbDateMonthTo').setValue(mes);
        //        Ext.getCmp(prototype.id+'-cmbDateYearFrom').setValue(new Date().getFullYear());
        //        Ext.getCmp(prototype.id+'-cmbDateYearTo').setValue(new Date().getFullYear());
        //        // </editor-fold>
        //        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        //        this.setValue("cboEstado", "");        
        //        this.setValue("txtDateFrom", "");
        //        this.setValue("txtDateTo", "");
        //        // </editor-fold>
        //        // <editor-fold defaultstate="collapsed" desc="show">
        //        Ext.getCmp(prototype.id+'-boxDateFilter').hide();
        //        Ext.getCmp(prototype.id+'-boxPeriodFilter').hide();
        //        // </editor-fold>
    },
    imgTexto_clickHandler: function(obj, e) {
        
        var strOpcion = this.getValue('cmbfiltro');
        
        var val_url = 'downloadText';
        var str_msg = 'Download Plain Text File ?';        	                
        if (strOpcion === '2' ){
            val_url = 'downloadText_2';
        }       
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',            
            msg: str_msg,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/' + val_url +'?beanString='+encodeURI(JSON.stringify(this.searchParams)));
                }
            }
        });
        
        
    },

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
    }
    
    // </editor-fold>
});
