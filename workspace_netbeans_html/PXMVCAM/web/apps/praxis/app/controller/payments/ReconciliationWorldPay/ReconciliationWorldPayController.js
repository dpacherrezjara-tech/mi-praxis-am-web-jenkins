/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.ReconciliationWorldPay.ReconciliationWorldPayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReconciliationWorldPayController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsMainData: {},
    paramsHeaderDetail: {},
    paramsHeaderDetailByParteID: {},
    paramsHeaderDetailByParteIDSE: {},
    beanHeaderDay: {},
    beanMainData: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'ReconciliationWorldPayForm';
        prototype.url = CONTEXTPATH + '/ReconciliationWorldPay';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#ReconciliationWorldPayForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#ReconciliationWorldPayForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ReconciliationWorldPayForm-btnClear': {
                click: this.btnClear_click
            },
            '#ReconciliationWorldPayForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ReconciliationWorldPayForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ReconciliationWorldPayForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ReconciliationWorldPayForm-btnBack': {
                click: this.btnBack_click
            },
            '#ReconciliationWorldPayForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ReconciliationWorldPayForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ReconciliationWorldPayForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ReconciliationWorldPayForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ReconciliationWorldPayForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ReconciliationWorldPayForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ReconciliationWorldPayForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
//    xpanel_afterrender: function(obj, e) {
//        // this.setStoreData();
////           this.btnSearch_click();
//    },


    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeCmbType: function (obj, value) {

        Ext.getCmp(prototype.id + '-panelFilter1').hide();
        Ext.getCmp(prototype.id + '-panelFilter2').hide();
        Ext.getCmp(prototype.id + '-panelFilter3').hide();
        Ext.getCmp(prototype.id + '-panelFilter4').hide();
        Ext.getCmp(prototype.id + '-panelFilter5').hide();
        Ext.getCmp(prototype.id + '-panelFilter6').hide();
        Ext.getCmp(prototype.id + '-panelFilter7').hide();
        Ext.getCmp(prototype.id + '-panelFilter8').hide();

        if (value !== '') {
            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
        }

    },
    obtainData: function () {

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PRDA", "Processing Date"],
            ]
        }));
        cmbDateSel.setValue("PRDA");

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

        this.btnSearch_click();
    },
    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
//        console.log(searchParams);
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A4042");
        me.panelActual = '-panelGridSummaryData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSummary'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams

                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        me.setWidthPie();
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataSummary').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    OnGridMainData: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var beanMainData = {};
        beanMainData.DATE = rowData.data.PRDA;
        beanMainData.SETCURREN = rowData.data.SETCURREN;
        beanMainData.IN_DATE = 'PRDA';

        me.paramsMainData.beanString = JSON.stringify(beanMainData);

        this.setOnGridMainData();
    },
    setOnGridMainData: function () {
        win.lblUser_toolTip("Estructura: A4040");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsMainData
                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        me.setWidthPie();
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    OnGridHeaderDetByDate: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridHeaderDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var beanHeaderDay = {};
        beanHeaderDay.DATE = rowData.data.PRDA;
        beanHeaderDay.SETCURREN = rowData.data.SETCURREN;
        beanHeaderDay.SCURRENCY = rowData.data.SCURRENCY;
        beanHeaderDay.IN_DATE = 'PRDA';

        me.paramsHeaderDetail.beanString = JSON.stringify(beanHeaderDay);

        this.setOnGridHeaderDetByDate();
    },
    setOnGridHeaderDetByDate: function () {
        win.lblUser_toolTip("Estructura: A4040");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchHeaderDetailByDate'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsHeaderDetail
                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        me.setWidthPie();
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridHeaderDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    OnGridHeaderDetByParteID: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridHeaderDetailByParteID';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var beanHeaderDay = {};
        beanHeaderDay.IN_PRDA = rowData.data.PRDA;
        beanHeaderDay.IN_PARTEID = rowData.data.PARTEID;

        me.paramsHeaderDetailByParteID.beanString = JSON.stringify(beanHeaderDay);

        this.setOnGridHeaderDetByParteID();
    },
    setOnGridHeaderDetByParteID: function () {
        win.lblUser_toolTip("Estructura: A4040");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchHeaderDetailByParteID'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsHeaderDetailByParteID
                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        me.setWidthPie();
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridHeaderDetailByParteID').setTitle('<center style="font-size:12px;">Processing Date: ' + data.IN_PRDA + ' - Part ID: ' + data.IN_PARTEID + '</center>');

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridHeaderDetailByParteID').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    OnGridHeaderDetByParteIDSE: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridHeaderDetailByParteIDSE';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var beanHeaderDay = {};
        beanHeaderDay.IN_PRDA = rowData.data.PRDA;
        beanHeaderDay.IN_PARTEIDSE = rowData.data.PARTEIDSE;
        beanHeaderDay.IN_SCURRENCY = rowData.data.SCURRENCY;

        me.paramsHeaderDetailByParteIDSE.beanString = JSON.stringify(beanHeaderDay);

        this.setOnGridHeaderDetByParteIDSE();
    },
    setOnGridHeaderDetByParteIDSE: function () {
        win.lblUser_toolTip("Estructura: A4042");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchHeaderDetailByParteIDSE'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsHeaderDetailByParteIDSE
                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        me.setWidthPie();
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var data = obj.data.items[0].data;
                        //Ext.getCmp(prototype.id + '-gridHeaderDetailByParteIDSE').setTitle('<center style="font-size:12px;">Processing Date: ' + data.IN_PRDA + ' - Part ID: ' + data.IN_PARTEIDSE + ' - Currency: ' + data.IN_SCURRENCY +'</center>');
                        Ext.getCmp(prototype.id + '-gridHeaderDetailByParteIDSE').setTitle('<center style="font-size:12px;">Processing Date: ' + data.IN_PRDA + ' - Part ID: ' + data.IN_PARTEIDSE +'</center>');

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridHeaderDetailByParteIDSE').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },    
    showTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var data = {}
        data.CCIA = rowData.data.TKTNUMBER.substring(0, 3);
        data.FORMA = rowData.data.TKTNUMBER.substring(3, 7);
        data.SERIE = rowData.data.TKTNUMBER.substring(7, 13);
        console.log(data);
        me.viewMasterTkt(data);
    },
    viewMasterTkt: function (data) {

        prototypeProgram.view = 'payments-reconciliation-world-pay-form';
        prototypeProgram.nprog = 'PX00000589';
        prototypeProgram.title = 'Reconciliation by WORLDPAY';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = '';

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
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

        Ext.create('Ext.Praxis.view.payments.ReconciliationWorldPayForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {

    },
    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridHeaderDetail':
                global.getFile(prototype.url + '/getXLSXHeaderDetail?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg({
                    msg: 'Under Construction'
                });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    setWidthPie1: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        if (me.panelActual === '-panelGridData' || me.panelActual === '-panelGridHeaderDetail' || me.panelActual === '-panelGridHeaderDetailByParteID' || me.panelActual === '-panelGridHeaderDetailByParteIDSE') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridHeaderDetail':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridHeaderDetailByParteID':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelGridHeaderDetailByParteIDSE':
                me.pagginActual = '-paggin4';
                break;
            case  '-panelGridSummaryData':
                me.pagginActual = '-paggin5';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
}
);
