Ext.define('Ext.Praxis.controller.payments.EMDTracking.EMDTrackingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EMDTrackingController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanEMD: {},
    beanLog: {},
    beanEMDTicket: {},
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
    paramsDetailEMD: {},
    paramsDetailEMDTicket: {},
    paramsDetailTicketLog: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'EMDTrackingForm';
        prototype.url = CONTEXTPATH + '/EMDTrackingPayment';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#EMDTrackingForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#EMDTrackingForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#EMDTrackingForm-btnClear': {
                click: this.btnClear_click
            },
            '#EMDTrackingForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#EMDTrackingForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#EMDTrackingForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#EMDTrackingForm-btnEmail': {
                click: this.btnEmail_click
            },
            '#EMDTrackingForm-btnBack': {
                click: this.btnBack_click
            },
            '#EMDTrackingForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#EMDTrackingForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#EMDTrackingForm-btn-pag-next': {
                click: this.pagNext
            },
            '#EMDTrackingForm-btn-pag-last': {
                click: this.pagLast
            },
            '#EMDTrackingForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#EMDTrackingForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#EMDTrackingForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#EMDTrackingForm-cmbDateFromDay': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromDay
            },
            '#EMDTrackingForm-checkSettlement': {
                change: this.checkEvent
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    filterTicketEMD: function (e, eOpts) {
        var txtTicket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        if (eOpts.getKey() === 13) {
            if (txtTicket.trim().length === 13 || txtTicket.trim().length === 0) {
                this.btnSearch_click();
            } else {
                global.Msg({msg: 'Ticket Number must contain 13 digits.'});
            }
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

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

    },
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.strTicket;

        prototypeProgram.view = 'payments-emd-tracking-form';
        prototypeProgram.nprog = 'PX00000529';
        prototypeProgram.title = 'EMD Tracking';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    viewTicket2: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.strDesc;

        prototypeProgram.view = 'payments-emd-tracking-form';
        prototypeProgram.nprog = 'PX00000529';
        prototypeProgram.title = 'EMD Tracking';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter2: function () {

        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {
        if ($(Ext.getCmp(prototype.id + '-chkLog')).prop('checked')) {

            Ext.getCmp(prototype.id + '-txtTICKET').setVisible(true);
            if (Ext.getCmp(prototype.id + '-txtTICKET').getValue().trim() !== '') {
                console.log('2');
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelGridDataDetTicketLog';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                this.beanLog.IN_TKT = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
                this.beanLog.TDOC = '';
                this.beanLog.FECR = '';
                var a = 'N';
                console.log(this.beanLog);

                me.paramsDetailTicketLog.beanString = JSON.stringify(this.beanLog);
                this.setGridDataDetTicketLog(a);
            } else {
                this.setFormatParameter2();
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                Ext.getCmp(prototype.id + '-txtTICKET').setVisible(true);
                console.log('es log');
                this.setGridDataLog();
            }
        } else {
            Ext.getCmp(prototype.id + '-txtTICKET').setVisible(true);
            this.setFormatParameter();
            if (Ext.getCmp(prototype.id + '-txtTICKET').getValue().trim() !== '') {
                console.log('1');
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelGridDataDetEMDTicket';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                this.beanEMDTicket.IN_TKT = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
                this.beanEMDTicket.DSALES = "";
                console.log(this.beanEMDTicket);

                me.paramsDetailEMDTicket.beanString = JSON.stringify(this.beanEMDTicket);
                this.setGridDataDetEMDTicket();
            } else {
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                console.log('es nrl');
                this.setGridData();
            }
        }


    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A3757");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
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
                        obj.proxy.extraParams = searchParams
                    },
                    load: function (obj) {

                        var valueRadio1 = Ext.getCmp(prototype.id + '-Box_Decide').getValue();
                        var valueRadio = valueRadio1.rd;
                        switch (valueRadio) {
                            case 'TK':
                                console.log('Entra a TK');
                                Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').show();
                                Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').hide();
                                break;
                            case 'AM':
                                console.log('Entra a AM');
                                Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').hide();
                                Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').show();
                                break;
                        }

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    onGridDetEMD: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetEMD';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanEMD.DSALES = rowData.data.DSALES;
        this.beanEMD.strFormatDate = rowData.data.strFormatDate;
        console.log(this.beanEMD);

        me.paramsDetailEMD.beanString = JSON.stringify(this.beanEMD);
        this.setGridDataDetEMD();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridDataDetEMD">
    setGridDataDetEMD: function () {
        win.lblUser_toolTip("Estructura: A3757");
        me.panelActual = '-panelGridDataDetEMD';
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetailEMD;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res.data);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                var obj = obj.data.items[0].data;
                                Ext.getCmp(prototype.id + '-gridDataDetEMD').setTitle('<center style="font-size:12px;"> Sale Date ' + obj.strFormatDate + '</center>');


                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else
                            global.clear();
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetEMD').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    onGridDetEMDTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetEMDTicket';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanEMDTicket.DSALES = rowData.data.DSALES;
        this.beanEMDTicket.strFormatDate2 = rowData.data.strFormatDate2;
        this.beanEMDTicket.IN_TKT = "";
        console.log(this.beanEMDTicket);

        me.paramsDetailEMDTicket.beanString = JSON.stringify(this.beanEMDTicket);
        this.setGridDataDetEMDTicket();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridDataDetEMDTicket">
    setGridDataDetEMDTicket: function () {
        win.lblUser_toolTip("Estructura: A3757");
        me.panelActual = '-panelGridDataDetEMDTicket';
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchTicket'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetailEMDTicket;

                    },
                    load: function (obj, obj2, success, response, obj5) {

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res.data);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                var obj = obj.data.items[0].data;
                                Ext.getCmp(prototype.id + '-panelGridDataDetEMDTicket').setTitle('<center style="font-size:12px;"> Sale Date ' + obj.strFormatDate22 + '</center>');


                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else
                            global.clear();
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetEMDTicket').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataLog">
    setGridDataLog: function () {
//        win.lblUser_toolTip("Estructura: A3757 A2331");
        win.lblUser_toolTip("Estructura: A3759");
        me.panelActual = '-panelGridDataLog';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchLog'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams
                    },
                    load: function (obj) {

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataLog').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    onGridDetTicketLogChar: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetTicketLog';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLog.FECR = rowData.data.DCREATION;
        this.beanLog.TDOC = '2';
        this.beanLog.IN_TKT = '';
        console.log(this.beanEMD);
        var a = '';
        me.paramsDetailTicketLog.beanString = JSON.stringify(this.beanLog);
        this.setGridDataDetTicketLog(a);
    },
    onGridDetTicketLogRChar: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetTicketLog';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLog.FECR = rowData.data.DCREATION;
        this.beanLog.TDOC = '3';
        this.beanLog.IN_TKT = '';
        console.log(this.beanEMD);
        var a = '';
        me.paramsDetailTicketLog.beanString = JSON.stringify(this.beanLog);
        this.setGridDataDetTicketLog(a);
    },
    onGridDetTicketLogOChar: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetTicketLog';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanLog.FECR = rowData.data.DCREATION;
        this.beanLog.TDOC = 'T';
        this.beanLog.IN_TKT = '';
        console.log(this.beanEMD);
        var a = '';
        me.paramsDetailTicketLog.beanString = JSON.stringify(this.beanLog);
        this.setGridDataDetTicketLog(a);
    },
    // <editor-fold defaultstate="collapsed" desc="setGridDataDetTicketLog">
    setGridDataDetTicketLog: function (a) {
        win.lblUser_toolTip("Estructura: A3755 A2331");
        me.panelActual = '-panelGridDataDetTicketLog';
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchTicketLog'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetailTicketLog;

                    },
                    load: function (obj, obj2, success, response, obj5) {

                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res.data);
                        if (res.success) {
                            if (obj.data.length > 0) {
                                var obj = obj.data.items[0].data;
                                var tipo = '';
                                if (obj.TDOC === '2') {
                                    tipo = ' - ChargeBack';
                                } else if (obj.TDOC === '3') {
                                    tipo = ' - Reverse ChargeBack';
                                } else if (obj.TDOC === 'T') {
                                    tipo = ' - Others';
                                }
                                if (a === 'N') {
                                    //NADINE
                                } else {
                                    if (obj.TDOC !== '' && obj.TDOC !== null) {
                                        Ext.getCmp(prototype.id + '-panelGridDataDetTicketLog').setTitle('<center style="font-size:12px;"> Create Date ' + obj.strFormatDate + tipo + '</center>');
                                    } else {
                                        Ext.getCmp(prototype.id + '-panelGridDataDetTicketLog').setTitle('<center style="font-size:12px;"> Create Date ' + obj.strFormatDate + '</center>');
                                    }
                                }

                            } else {
                                global.Msg({msg: 'Data not found'});
                            }
                        } else
                            global.clear();
                    }
                }
            });
//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetTicketLog').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    decide_ticket_amount: function (obj, rb_new, rb_old, func) {
        var valueRadio1 = Ext.getCmp(prototype.id + '-Box_Decide').getValue();
        var valueRadio = valueRadio1.rd;
        switch (valueRadio) {
            case 'TK':
                console.log('Entra a TK');
                Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').show();
                Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').hide();
                break;
            case 'AM':
                console.log('Entra a AM');
                Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').hide();
                Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').show();
                break;
        }
    },
    loadGraphicEMDTracking: function () {
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
                        obj.proxy.extraParams = searchParams
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-displayEMDTrackingBared1').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-displayEMDTrackingBared2').bindStore(storeGridDatas);
        }
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

        Ext.create('Ext.Praxis.view.payments.EMDTrackingForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lst: me.lst
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.panelActual === '-panelGridDataLog') {
            console.log('prueba');
            $(Ext.getCmp(prototype.id + '-chkLog')).prop("disabled", true);
        }

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
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');

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
            case  '-panelGridDataDetEMD':
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + me.paramsDetailEMD.beanString);
                break;
            case  '-panelGridDataDetEMDTicket':
                global.getFile(prototype.url + '/getXLSXDetailTicket?beanString=' + me.paramsDetailEMDTicket.beanString);
                break;
            case  '-panelGridDataLog':
                global.getFile(prototype.url + '/getXLSXLog?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataDetTicketLog':
                global.getFile(prototype.url + '/getXLSXTicketLog?beanString=' + me.paramsDetailTicketLog.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
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
        console.log(me.panelActual);
        if (me.panelActual === '-panelGridDataDetEMDTicket' || me.panelActual === '-panelGridDataDetTicketLog') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataDetEMDTicket':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataDetTicketLog':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
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
    }


}
);
