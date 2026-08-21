Ext.define('Ext.Praxis.controller.flown.EMDStandalone.EMDStandaloneController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EMDStandaloneController',
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
        prototype.id = 'EMDStandaloneForm';
        prototype.url = CONTEXTPATH + '/EMDStandalone';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#EMDStandaloneForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#EMDStandaloneForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#EMDStandaloneForm-btnClear': {
                click: this.btnClear_click
            },
            '#EMDStandaloneForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#EMDStandaloneForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#EMDStandaloneForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#EMDStandaloneForm-btnEmail': {
                click: this.btnEmail_click
            },
            '#EMDStandaloneForm-btnBack': {
                click: this.btnBack_click
            },
            '#EMDStandaloneForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#EMDStandaloneForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#EMDStandaloneForm-btn-pag-next': {
                click: this.pagNext
            },
            '#EMDStandaloneForm-btn-pag-last': {
                click: this.pagLast
            },
            '#EMDStandaloneForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#EMDStandaloneForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#EMDStandaloneForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#EMDStandaloneForm-cmbDateFromDay': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromDay
            },
            '#EMDStandaloneForm-checkSettlement': {
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

        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearch');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Used Date"],
                ["1", "Valuation Date"],
                ["2", "Accounting  Date"]
            ]
        }));
        cmbSearch.setValue("0");

        Ext.Ajax.request({
            url: prototype.url + '/getPaises',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbSCOUNTRY').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                }
            }
        });

    },
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.strTicket;

        prototypeProgram.view = 'flown-emd-standalone-form';
        prototypeProgram.nprog = 'PX00000633';
        prototypeProgram.title = 'EMD Standalone';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbSCOUNTRY').getValue();
        me.bean.IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearch').getValue();

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {
        if (me.panelActual === '-panelGridDataMain' || me.panelActual === '-panelMidleGridData') {
            console.log('panelGridDataMain');

            var txtTicket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
            if (txtTicket.trim().length > 0) {
                if (txtTicket.trim().length === 13) {
                    me.bean = {};
                    me.bean.IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                    me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
                    var date = '';
                    var stval = '';
                    var beanString = JSON.stringify(me.bean);
                    paramsDetailEMD = {
                        beanString: beanString,
                        bean: me.bean
                    };

                    this.setGridData(date, stval);
                } else {
                    global.Msg({msg: 'Ticket Number must contain 13 digits.'});
                }
            } else {
                var txtCountry = Ext.getCmp(prototype.id + '-cmbSCOUNTRY').getValue();
                if (txtCountry.trim().length > 0) {
                    me.drillDown.length = 0;
                    this.setMainData();
                    me.drillDown.push(me.panelActual);
                    me.panelActual = '-panelMidleGridData';
                    global.selectedChild(me.childs, prototype.id + me.panelActual);

                    me.beanEMD = {};

                    me.beanEMD.IN_COUNTRY = txtCountry;
                    var date = '';
                    var stval = '';
                    me.beanEMD.IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                    console.log(me.beanEMD);
                    var beanString = JSON.stringify(me.beanEMD);
                    paramsDetailEMD = {
                        beanString: beanString,
                        bean: me.beanEMD
                    };
                    this.setGridDataMidle(date, stval);
                } else {
                    this.setFormatParameter();
                    this.setMainData();
                }
            }
        } else {
            var txtCountry = Ext.getCmp(prototype.id + '-cmbSCOUNTRY').getValue();
            if (txtCountry.trim().length > 0) {
                me.drillDown.length = 0;
                this.setMainData();
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMidleGridData';
                global.selectedChild(me.childs, prototype.id + me.panelActual);

                me.beanEMD = {};

                me.beanEMD.IN_COUNTRY = txtCountry;
                var date = '';
                var stval = '';
                me.beanEMD.IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                console.log(me.beanEMD);
                var beanString = JSON.stringify(me.beanEMD);
                paramsDetailEMD = {
                    beanString: beanString,
                    bean: me.beanEMD
                };
                this.setGridDataMidle(date, stval);
            } else {
                console.log('panelGridData');

                me.bean = {};
                me.bean.IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                var date = '';
                var stval = '';
                var txtTicket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
                if (txtTicket.trim().length > 0) {
                    if (txtTicket.trim().length === 13) {
                        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
                        var beanString = JSON.stringify(me.bean);
                        paramsDetailEMD = {
                            beanString: beanString,
                            bean: me.bean
                        };
                        this.setGridData(date, stval);
                    } else {
                        global.Msg({msg: 'Ticket Number must contain 13 digits.'});
                    }
                } else {
//                    me.bean.IN_DATE = me.beanEMD.IN_DATE;
//                    me.bean.IN_STVAL = me.beanEMD.IN_STVAL;
                    console.log('entro al main');
                    this.setFormatParameter();
                    this.setMainData();
                }
            }
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setMainData: function (obj, val) {
        console.log("URL : " + prototype.url + '/searchMain');
        win.lblUser_toolTip("Estructura: A4478");
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
                proxy: {
                    url: prototype.url + '/searchMain'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {

                        var a = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                        var texto = '';
                        if (a === '0') {
                            texto = 'Used<br>Date';
                        } else if (a === '1') {
                            texto = 'Valuation<br>Date';
                        } else {
                            texto = 'Accounting<br>Date';
                        }
                        Ext.getCmp(prototype.id + '-strFormatDate').setText(texto);
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    onGridDataMidle: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMidleGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanEMD = {};

        me.beanEMD.IN_DATE = rowData.data.strDate;
        me.beanEMD.IN_COUNTRY = rowData.data.IN_COUNTRY;
        if (me.beanEMD.IN_COUNTRY === '') {
            me.beanEMD.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbSCOUNTRY').getValue();
            console.log(me.beanEMD.IN_COUNTRY);
        }
        var date = rowData.data.strFormatDate;
        var stval = '';
        me.beanEMD.IN_TIPO = rowData.data.IN_TIPO;
        console.log(me.beanEMD);
        var beanString = JSON.stringify(me.beanEMD);
        paramsDetailEMD = {
            beanString: beanString,
            bean: me.beanEMD
        };
        this.setGridDataMidle(date, stval);
    },
    setGridDataMidle: function (date, stval) {
        var a = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
        var texto = '';
        if (a === '0') {
            texto = 'Used Date :';
        } else if (a === '1') {
            texto = 'Valuation Date :';
        } else {
            texto = 'Accounting Date :';
        }
        if (date !== '') {
            if (stval !== '') {
                Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + date + ' ' + stval + '</center>');
            } else {
                Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + date + '</center>');
            }
        } else {
            Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + '</center>');
        }
        console.log("URL : " + prototype.url + '/search');
        win.lblUser_toolTip("Estructura: A4479");
        me.panelActual = '-panelMidleGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
                proxy: {
                    url: prototype.url + '/searchMidle'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = paramsDetailEMD;
                    },
                    load: function (obj) {
                        var a = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                        var texto = '';
                        if (a === '0') {
                            texto = 'Used<br>Date';
                        } else if (a === '1') {
                            texto = 'Valuation<br>Date';
                        } else {
                            texto = 'Accounting<br>Date';
                        }
                        Ext.getCmp(prototype.id + '-strDateMidle').setText(texto);
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMidleData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-pagginMidle').bindStore(storeGridDatas);
        }
    },
    onGridData: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.getCmp(prototype.id + '-txtTICKET').show();
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanEMD = {};

        me.beanEMD.IN_DATE = rowData.data.strDate;
        me.beanEMD.IN_COUNTRY = rowData.data.IN_COUNTRY;
        var date = rowData.data.strFormatDate;
        var stval = '';
        me.beanEMD.IN_TIPO = rowData.data.IN_TIPO;
        console.log(me.beanEMD);
        var beanString = JSON.stringify(me.beanEMD);
        paramsDetailEMD = {
            beanString: beanString,
            bean: me.beanEMD
        };
        this.setGridData(date, stval);
    },
    onGridDataDetailConcliliated: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.getCmp(prototype.id + '-txtTICKET').show();
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanEMD = {};

        me.beanEMD.IN_DATE = rowData.data.strDate;
        me.beanEMD.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.beanEMD.IN_STVAL = '0';
        var date = rowData.data.strFormatDate;
        var stval = '';
        me.beanEMD.IN_TIPO = rowData.data.IN_TIPO;
        console.log(me.beanEMD);
        var beanString = JSON.stringify(me.beanEMD);
        paramsDetailEMD = {
            beanString: beanString,
            bean: me.beanEMD
        };
        this.setGridData(date, stval);
    },
    onGridDataDetailPending: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.getCmp(prototype.id + '-txtTICKET').show();
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanEMD = {};

        me.beanEMD.IN_DATE = rowData.data.strDate;
        me.beanEMD.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.beanEMD.IN_STVAL = '1';
        var date = rowData.data.strFormatDate;
        var stval = '';
        me.beanEMD.IN_TIPO = rowData.data.IN_TIPO;
        console.log(me.beanEMD);
        var beanString = JSON.stringify(me.beanEMD);
        paramsDetailEMD = {
            beanString: beanString,
            bean: me.beanEMD
        };
        this.setGridData(date, stval);
    },
    setGridData: function (date, stval) {
        var a = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
        var texto = '';
        if (a === '0') {
            texto = 'Used Date :';
        } else if (a === '1') {
            texto = 'Valuation Date :';
        } else {
            texto = 'Accounting Date :';
        }
        if (date !== '') {
            if (stval !== '') {
                Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + date + ' ' + stval + '</center>');
            } else {
                Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + date + '</center>');
            }
        } else {
            Ext.getCmp(prototype.id + '-gridMidleData').setTitle('<center style="font-size:12px;">' + texto + '</center>');
        }
        console.log("URL : " + prototype.url + '/search');
        win.lblUser_toolTip("Estructura: A4479");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = paramsDetailEMD;
                    },
                    load: function (obj) {
                        var a = Ext.getCmp(prototype.id + '-cmbSearch').getValue();
                        var texto = '';
                        if (a === '0') {
                            texto = 'Used<br>Date';
                        } else if (a === '1') {
                            texto = 'Valuation<br>Date';
                        } else {
                            texto = 'Accounting<br>Date';
                        }
                        Ext.getCmp(prototype.id + '-strDateDetail').setText(texto);
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
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridDataDetEMD">
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
    setGridDataDetEMD: function () {
        win.lblUser_toolTip("Estructura: A4479");
        me.panelActual = '-panelGridDataDetEMD';
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
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
                                Ext.getCmp(prototype.id + '-gridDataDetEMD').setTitle('<center style="font-size:12px;"> Used Date ' + obj.strFormatDate + '</center>');


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
        console.log(me.lst);
        Ext.create('Ext.Praxis.view.flown.EMDStandaloneForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lst: me.lst
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.panelActual === 'panelGridData') {
            console.log('back');
            this.btnSearch_click();
        } else {
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
        }

    },
    btnClear_click: function (obj, e) {
//        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
//        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
//        Ext.getCmp(prototype.id + '-cmbBank').setValue('');

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
            case  '-panelGridDataMain':
                global.getFile(prototype.url + '/getXLSXMain?beanString=' + searchParams.beanString);
                break;
            case  '-panelMidleGridData':
                global.getFile(prototype.url + '/getXLSXMidle?beanString=' + paramsDetailEMD.beanString);
                break;
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(paramsDetailEMD.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnTXT_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportTXT();
                }
            }
        });
    },
    exportTXT: function () {
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getFileTxt?beanString=' + paramsDetailEMD.beanString);
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
        if (me.panelActual === '-panelGridData') {
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
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
//            case  '-panelMidleGridData':
//                me.pagginActual = '-pagginMidle';
//                break;    
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
