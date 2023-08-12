/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.travelbank.ReconciliationReport.AccountStatementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountStatementController',    
    fecha: new Date(),
    searchParams: {},
    _path: '',    
    init: function ( ) {        
        this.control({
        });
    },
    afterRender: function () {
        this.p = this.view.params;        
        this.mostrarData(this.p.rec);
    },
    onMostrarFiltrosChange: function (cmp, newValue, oldValue, eOpts) {
        this.limpiarFiltros();
    },

    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function (grid, rowIndex) {

        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        console.log('onEditClick of Error view detail: ');
        console.log(rec);        
        // mostrar formulario segun tipo de error
        switch (rec.data.A4435CDERR) {
            case "FM0001":               
                this.winDataEntry('U', rec);
                break;
            default:
                alert('No implementado');
                break;
        }
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.TransaccionErrorForm.Crud.IssueDataEntry', {
            id: 'CrudIssueDataEntry',
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
//        var strFiltro = this.getValue('cmbfiltro');
//        var VP_ACCNBR = Ext.getCmp(prototype.id3 + '-NCTA').getValue();
//        var VP_TICKET = Ext.getCmp(prototype.id3 + '-TicketNumber').getValue();
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
//            console.log(Ext.util.Format.date(Ext.getCmp(prototype.id3 + '-fecha1').getValue(), 'Ymd'))
//            //me.searchParams.VP_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id3 + '-fecha2').getValue(), 'Ymd');
//        }
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id3 + '-boxSearchFilter');
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
        Ext.getCmp(prototype.id3 + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id3 + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id3 + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id3 + '-lbl-total').setText("0");
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id3 + '-boxMainData').show();
        // </editor-fold>
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        this.setFormatParameter(rec);               
        this.setValue('NCTA', rec.get('A4460CUENT'));       
        this.setValue('MDA', rec.get('A4460MONED'));                
        this.setValue('SALDO', Ext.util.Format.number(rec.get('A4460SALDO'), '0,000.00'));
        this.setValue('SALRV', Ext.util.Format.number(rec.get('A4460SALRV'), '0,000.00'));
        this.setValue('SALPE', Ext.util.Format.number(rec.get('A4460SALPE'), '0,000.00'));               
        this.setGridData();
    },
    // </editor-fold>   
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        me. searchParams = {            
            VP_OPCION: '',
            VP_DESDE: '',
            VP_HASTA: '',
            VP_NCTA: rec.get('A4460CUENT'),
            VP_MONEDA: rec.get('A4460MONED'),
            VP_ARCHI: ''
        };            
        // <editor-fold defaultstate="collapsed" desc="asignación para EXCEL" >
//        _path = prototype.url + '/getXLSX?' +
//                'VP_DESDE=' + me.searchParams.VP_DESDE + '&' +
//                'VP_HASTA=' + me.searchParams.VP_HASTA + '&' +
//                'VP_IDFIL1=' + me.searchParams.VP_IDFIL1 + '&' +
//                'VP_IDFIL2=' + me.searchParams.VP_IDFIL2 + '&' +
//                'VP_IDISS=' + me.searchParams.VP_IDISS;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {

        var me = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url3 + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {                    
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }else{
                        //total saldo
                        //console.log(obj);                        
                        let VL_A4417SALDO = 0;
                         obj.data.items.forEach(
                            function (row) {
                                //console.log(currentValue);
                                VL_A4417SALDO = VL_A4417SALDO + parseFloat(row.data.A4417TOTTR);
                            }
                        );                    
                        Ext.getCmp(prototype.id3 + '-A4417SALDO').setValue(Ext.util.Format.number(VL_A4417SALDO, '0,000.00'));
                    }
                }
            }
        });
        Ext.getCmp(prototype.id3 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id3 + '-gridData').getStore().reload();
        //Ext.getCmp(prototype.id3 + '-paggin').setStore(storeGridDatas);
    },
    // </editor-fold>    

    exportExcel: function () {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function () {
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id3 + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id3 + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id3 + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id3 + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id3 + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id3 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id3 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id3 + '-' + id).setValue(txt);
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



