/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.travelbank.TransaccionBalance.TransaccionBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransaccionBalanceController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    // </editor-fold>
    init: function ( ) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        //prototype.id = 'FilesIssuesUsesForm';
        prototype.id = 'TransaccionBalanceForm';
        prototype.url = CONTEXTPATH + '/TransaccionBalance';
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
//        var strOpcion = this.getValue('cmbfiltro');
//        Ext.getCmp(prototype.id + '-BoxUniqueServiceCreditID').hide();
//        Ext.getCmp(prototype.id + '-BoxAccountNumber').hide();
//        Ext.getCmp(prototype.id + '-BoxFechasDesdeHasta').hide();
//        Ext.getCmp(prototype.id + '-BoxNbrIDENTIFIER').hide();

//        switch (strOpcion) {
//            case "1" :
//                Ext.getCmp(prototype.id + '-BoxUniqueServiceCreditID').show();
//                Ext.getCmp(prototype.id + '-A4357IDMER').focus();
//                break;
//            case "2" :
//                Ext.getCmp(prototype.id + '-BoxAccountNumber').show();
//                Ext.getCmp(prototype.id + '-A4357NCTAT').focus();
//                break;
//            case "3" :
//                Ext.getCmp(prototype.id + '-BoxFechasDesdeHasta').show();
//                Ext.getCmp(prototype.id + '-fecha1').focus();
//                break;
//            case "4" :
//                Ext.getCmp(prototype.id + '-BoxNbrIDENTIFIER').show();
//                Ext.getCmp(prototype.id + '-A4357IDFIL1').focus();
//                break;
//        }
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
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.FileLiabilityDataEntry', {
            id: 'FileLiabilityDataEntry',
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
        // var strFiltro = this.getValue('cmbfiltro');
        var VP_ACCNBR = Ext.getCmp(prototype.id + '-NCTA').getValue();
        var VP_CREDID = Ext.getCmp(prototype.id + '-creditID').getValue();
// SEQ QUITA A PEDIDO DE ROCIO
//        if (VP_ACCNBR === '') {
//            global.Msg({
//                msg: 'Enter account number.'
//            });
//            return;
//        }
//        if (VP_CREDID === '') {
//            global.Msg({
//                msg: 'Enter credit ID'
//            });
//            return;
//        }

       if ( VP_ACCNBR === '' && VP_CREDID === '' ) {
            global.Msg({
                msg: 'Enter account number or  credit ID '
            });
            return;
        }
        this.setFormatParameter();
        this.setGridData();

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
    setFormatParameter: function () {
        var me = this;
        me.searchParams = {
            VP_OPCION: '',
            VP_FECHA1: '',
            VP_FECHA2: '',
            VP_ACCNBR: '8139204153239670',
            VP_CREDID: '0000000619'
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltro');
        me.searchParams.VP_OPCION = cmbfiltro;
        me.searchParams.VP_ACCNBR = Ext.getCmp(prototype.id + '-NCTA').getValue();
        me.searchParams.VP_CREDID = Ext.getCmp(prototype.id + '-creditID').getValue();
        switch (cmbfiltro) {
            case "1" :
            case "2" :
                me.searchParams.VP_FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
                me.searchParams.VP_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/searchTransactionId'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    //win.lblUser_toolTip("Estructura: A4357");
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
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }else
                    {
                        //total saldo
                        let vl_balance = 0;
                         obj.data.items.forEach(
                            function (row) {
                                //console.log(currentValue);
                                vl_balance = vl_balance + parseFloat(row.data.XVALUE);
                            }
                        ); 
                         
                        Ext.getCmp(prototype.id + '-balance').setValue(Ext.util.Format.number(vl_balance, '0,000.00'));
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').getStore().reload();
        Ext.getCmp(prototype.id + '-paggin').setStore(storeGridDatas);
    },
    // </editor-fold>    

    exportExcel: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
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
