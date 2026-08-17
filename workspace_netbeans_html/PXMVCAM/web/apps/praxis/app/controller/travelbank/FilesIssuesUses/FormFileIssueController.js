/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormFileIssueController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    // </editor-fold>
    init: function ( ) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        //prototype.id02 = 'FilesIssuesUsesForm';
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
            case "3" :
            case "4" :
                Ext.getCmp(prototype.id02 + '-BoxFilter01').show();
                Ext.getCmp(prototype.id02 + '-BoxFilter02').hide();
                Ext.getCmp(prototype.id02 + '-BoxFilter03').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id02 + '-BoxFilter02').show();
                Ext.getCmp(prototype.id02 + '-BoxFilter01').hide();
                Ext.getCmp(prototype.id02 + '-BoxFilter03').hide();
                break;
            case '5':
                Ext.getCmp(prototype.id02 + '-BoxFilter03').show();
                Ext.getCmp(prototype.id02 + '-BoxFilter01').hide();
                Ext.getCmp(prototype.id02 + '-BoxFilter02').hide();
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function (grid, rowIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueDataEntry', {
            id: 'FormFileIssueDataEntry',
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
        //alert('btnSearch_click of FormFileIssueController ');
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
        var option = Ext.getCmp(prototype.id02 + '-boxSearchFilter');
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
        Ext.getCmp(prototype.id02 + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id02 + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id02 + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id02 + '-lbl-total').setText("0");
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id02 + '-boxMainData').show();
        // </editor-fold>
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function () {
        var me = this;
        me.searchParams = {
            VP_DESDE: '',
            VP_HASTA: '',
            VP_IDFIL1: '',
            VP_IDFIL2: '',
            VP_IDISS: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltro');
        me.searchParams.VP_OPCION = cmbfiltro;
        switch (cmbfiltro) {
            case "1" :
            case "3" :
            case "4" :
                me.searchParams.VP_DESDE = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-fecha1').getValue(), 'Ymd');
                me.searchParams.VP_HASTA = Ext.util.Format.date(Ext.getCmp(prototype.id02 + '-fecha2').getValue(), 'Ymd');
                break;
            case '2':
                me.searchParams.VP_IDFIL1 = Ext.getCmp(prototype.id02 + '-A4280IDFILE1').getValue();
                me.searchParams.VP_IDFIL2 = Ext.getCmp(prototype.id02 + '-A4280IDFILE2').getValue();
                break;
            case '5':
                me.searchParams.VP_IDISS = Ext.getCmp(prototype.id02 + '-A4281IDISS').getValue();
                break;
        }
        me.searchParams.VP_STS = Ext.getCmp(prototype.id02 + '-cmbSTS').getValue();
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
        //Ext.getCmp(prototype.id02 + '-gridMainContem').mask('Cargando...', '');
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                   // Ext.getCmp(prototype.id02 + '-gridMainContem').unmask('Loading...', '');
                    win.lblUser_toolTip("Estructura: A4280");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id02 + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id02 + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id02 + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id02 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }
                }
            }
        });
        Ext.getCmp(prototype.id02 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id02 + '-gridData').getStore().reload();
        Ext.getCmp(prototype.id02 + '-paggin').setStore(storeGridDatas);
    },
    // </editor-fold>    

    exportExcel: function () {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function () {

//        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
//        this.setValue("cboEstado", "");        
//        this.setValue("txtDateFrom", "");
//        this.setValue("txtDateTo", "");
//        // </editor-fold>
//        // <editor-fold defaultstate="collapsed" desc="show">
//        Ext.getCmp(prototype.id02+'-boxDateFilter').hide();
//        Ext.getCmp(prototype.id02+'-boxPeriodFilter').hide();
//        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id02 + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id02 + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id02 + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id02 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id02 + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id02 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id02 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id02 + '-' + id).setValue(txt);
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
