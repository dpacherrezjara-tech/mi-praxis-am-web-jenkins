/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.LoadControlReport.LoadControlReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadControlReportController',
    beanXLS: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        me = this;
    },
    afterRender: function () {
        this.btnSearch_click();
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
        var beanXLS = {};

        beanXLS.VP_FPROC1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha01-excel').getValue(), 'Ymd');
        beanXLS.VP_FPROC2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha02-excel').getValue(), 'Ymd');

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/LoadControlReportExcel?beanString=' + encodeURI(JSON.stringify(beanXLS)));
                }
            }
        });
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
    onTxtFilterTKTKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            // this.cmbfiltroSTS_clickHandler();
        }
    },
    Onsearch: function () {
        this.search();
    },
    search: function ()
    {
        me = this;
        //Ext.getCmp(prototype.id + '-boxPaginacion').show();
        var bean = {};
        bean.VP_FPROC1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha01').getValue(), 'Ymd');
        bean.VP_FUEN = Ext.getCmp(prototype.id + '-FUEN').getValue();
        bean.VP_PAIS = Ext.getCmp(prototype.id + '-PAIS').getValue();

        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        // Ext.getCmp(prototype.id + '-paggin').setStore(storeGridDatas);
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.LoadControlReportForm.LoadControlReportFormCrud', {
            id: prototype.id01 + '-LoadControlReportFormCrud',
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
    onChangeExportToExcel: function (obj, newValue, oldValue, eOpts) {
        if (newValue) {
            Ext.getCmp(prototype.id + '-fecha01-excel').enable();
            Ext.getCmp(prototype.id + '-fecha02-excel').enable();
            Ext.getCmp(prototype.id + '-fecha01-excel').focus();
        } else {
            Ext.getCmp(prototype.id + '-fecha01-excel').disable();
            Ext.getCmp(prototype.id + '-fecha02-excel').disable();
        }

    },

    onClickComment: function (view, cellEl, rowIndex, cellIndex, e, record) {

        const target = Ext.fly(e.target).findParent('.comment-cell', view.el, true);
      
        const dayNum = target.getAttribute('data-daynum');
        const fecha = record.get(`PRDA${dayNum}`);
        const dia = record.get(`PRDA${dayNum}_`);
        const nhot = record.get('NHOT');
        const status = record.get(`STATUS${dayNum}`);
        const comentario = record.get(`COMMENT${dayNum}`) || '';
        const rowData = record.getData();
        

//        console.log('dataaaa',rowData);
//        console.log('comentario',comentario);
        const dataEntry = Ext.create('Ext.Praxis.view.sales.LoadControlReportForm.DataEntrys.DataEntryLoadControlReport', {
            id: prototype.idDE + '-DataEntryLoadControlReport',
            rowId: nhot, 
            dayNum: dayNum, 
            dia: dia,
            fecha: fecha,
            status:status,
            comentario:comentario,
            rowData: rowData
        });

        dataEntry.show();
    }


});