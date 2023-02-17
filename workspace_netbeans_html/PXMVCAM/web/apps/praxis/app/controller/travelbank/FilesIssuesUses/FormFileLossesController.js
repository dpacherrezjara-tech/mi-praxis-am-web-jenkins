/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileLossesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormFileLossesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    // </editor-fold>
    init: function ( ) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        //prototype.id15 = 'FilesIssuesUsesForm';
        prototype.url = CONTEXTPATH + '/TransactionFiles';
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
        switch (strOpcion) {
            case "1" :
                Ext.getCmp(prototype.id15 + '-BoxTransactionID').show();
                Ext.getCmp(prototype.id15 + '-BoxTicketNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxFechasDesdeHasta').hide();
                Ext.getCmp(prototype.id15 + '-BoxNbrIDENTIFIER').hide();
                Ext.getCmp(prototype.id15 + '-A4347IDLOS').focus();
                break;

            case "2" :
                Ext.getCmp(prototype.id15 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id15 + '-BoxTicketNumber').show();
                Ext.getCmp(prototype.id15 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxFechasDesdeHasta').hide();
                Ext.getCmp(prototype.id15 + '-BoxNbrIDENTIFIER').hide();
                Ext.getCmp(prototype.id15 + '-ticket').focus();                 
                break;

            case "3" :
                Ext.getCmp(prototype.id15 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id15 + '-BoxTicketNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxAccountNumber').show();
                Ext.getCmp(prototype.id15 + '-BoxFechasDesdeHasta').hide();
                Ext.getCmp(prototype.id15 + '-BoxNbrIDENTIFIER').hide();
                Ext.getCmp(prototype.id15 + '-A4347NCTA').focus();
                break;

            case "4" :
            case "6" :
            case "7" :
                Ext.getCmp(prototype.id15 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id15 + '-BoxTicketNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxFechasDesdeHasta').show();
                Ext.getCmp(prototype.id15 + '-BoxNbrIDENTIFIER').hide();
                Ext.getCmp(prototype.id15 + '-fecha1').focus();
                break;

            case "5" :
                Ext.getCmp(prototype.id15 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id15 + '-BoxTicketNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id15 + '-BoxFechasDesdeHasta').hide();
                Ext.getCmp(prototype.id15 + '-BoxNbrIDENTIFIER').show();
                Ext.getCmp(prototype.id15 + '-A4347IDFIL1').focus();
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function (grid, rowIndex) {
        //console.log('onEditClick of FormFileUsedController ');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.FileLossesDataEntry', {
            id: 'FileLossesDataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
//        alert('btnSearch_click of FormFileUsedController ');
        var strFiltro = this.getValue('cmbfiltro');
        if (strFiltro !== '') {
            this.setFormatParameter();
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Please select filter type.'
            });
            this.focus('cmbfiltro');
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id15 + '-boxSearchFilter');
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
        Ext.getCmp(prototype.id15 + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id15 + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id15 + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id15 + '-lbl-total').setText("0");
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id15 + '-boxMainData').show();
        // </editor-fold>
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function () {
        var me = this;
        me.searchParams = {
            VP_IDLOS: '',
            VP_TICKET: '',
            VP_NCTA: '',
            VP_IDFIL1: '',
            VP_IDFIL2: '',
            VP_DESDE: '',
            VP_HASTA: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltro');
        me.searchParams.VP_OPCION = cmbfiltro;
        switch (cmbfiltro) {
            case "1" :
                me.searchParams.VP_IDLOS = Ext.getCmp(prototype.id15 + '-A4347IDLOS').getValue();
                break;
            case "2" :
                me.searchParams.VP_TICKET = Ext.getCmp(prototype.id15 + '-ticket').getValue();
                break;
            case "3" :
                me.searchParams.VP_NCTA = Ext.getCmp(prototype.id15 + '-A4347NCTA').getValue();
                break;
            case "4" :
            case "6" :
            case "7" :
                me.searchParams.VP_DESDE = Ext.util.Format.date(Ext.getCmp(prototype.id15 + '-fecha1').getValue(), 'Ymd');
                me.searchParams.VP_HASTA = Ext.util.Format.date(Ext.getCmp(prototype.id15 + '-fecha2').getValue(), 'Ymd');
                break;
            case "5":
                me.searchParams.VP_IDFIL1 = Ext.getCmp(prototype.id15 + '-A4347IDFIL1').getValue();
                me.searchParams.VP_IDFIL2 = Ext.getCmp(prototype.id15 + '-A4347IDFIL2').getValue();
                break;
        }
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación para EXCEL" >
        _path = prototype.url + '/getXLSX?' +
                'VP_DESDE=' + me.searchParams.VP_DESDE + '&' +
                'VP_HASTA=' + me.searchParams.VP_HASTA + '&' +
                'VP_IDFIL1=' + me.searchParams.VP_IDFIL1 + '&' +
                'VP_IDFIL2=' + me.searchParams.VP_IDFIL2 + '&' +
                'VP_IDISS=' + me.searchParams.VP_IDISS;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        var me = this;
        //Ext.getCmp(prototype.id15 + '-gridMainContem').mask('Cargando...', '');
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/searchLosses'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    // Ext.getCmp(prototype.id15 + '-gridMainContem').unmask('Loading...', '');
                    win.lblUser_toolTip("Estructura: A4347");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id15 + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id15 + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id15 + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id15 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }
                }
            }
        });
        Ext.getCmp(prototype.id15 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id15 + '-gridData').getStore().reload();
        Ext.getCmp(prototype.id15 + '-paggin').setStore(storeGridDatas);
    },
    // </editor-fold>    

    exportExcel: function () {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function () {
//        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
//        Ext.getCmp(prototype.id15+'-cmbDatePeriodFrom').setValue('');
//        Ext.getCmp(prototype.id15+'-cmbDatePeriodTo').setValue('');
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
//        Ext.getCmp(prototype.id15+'-cmbDateMonthFrom').setValue(mes);
//        Ext.getCmp(prototype.id15+'-cmbDateMonthTo').setValue(mes);
//        Ext.getCmp(prototype.id15+'-cmbDateYearFrom').setValue(new Date().getFullYear());
//        Ext.getCmp(prototype.id15+'-cmbDateYearTo').setValue(new Date().getFullYear());
//        // </editor-fold>
//        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
//        this.setValue("cboEstado", "");        
//        this.setValue("txtDateFrom", "");
//        this.setValue("txtDateTo", "");
//        // </editor-fold>
//        // <editor-fold defaultstate="collapsed" desc="show">
//        Ext.getCmp(prototype.id15+'-boxDateFilter').hide();
//        Ext.getCmp(prototype.id15+'-boxPeriodFilter').hide();
//        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id15 + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id15 + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id15 + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id15 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id15 + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id15 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id15 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id15 + '-' + id).setValue(txt);
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
