/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.SalesReconciliAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliAmexController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanSubmission: {},
    beanSummary: {},
    beanSettlement: {},
    beanTransaction: {},
    beanPricing: {},
    beanDay: {},
    beanMerchant: {},
    beanBankS: {},
    beanDayByS: {},
    beanMerchantByS: {},
    beanByMerchant: {},
    beanSettlementTktsDetail: {},
    bean_warning: {},
    optionCheck: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailSummary: {},
    paramsDetailChargeback: {},
    paramsDetailSubmission: {},
    paramsDetailTransaction: {},
    paramsDetailDetTktSettlement: {},
    paramsDetailPricing: {},
    searchParamsMainSettlement: {},
    paramsDetailSettlement: {},
    paramsDetailDetSettlement: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SalesReconciliAmexForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#SalesReconciliAmexForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesReconciliAmexForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesReconciliAmexForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesReconciliAmexForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesReconciliAmexForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesReconciliAmexForm-btnEmail': {
                click: this.btnEmail_click
            },
            '#SalesReconciliAmexForm-btnBack': {
                click: this.btnBack_click
            },
            '#SalesReconciliAmexForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesReconciliAmexForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesReconciliAmexForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesReconciliAmexForm-btn-pag-last': {
                click: this.pagLast
            },
            '#SalesReconciliAmexForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#SalesReconciliAmexForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#SalesReconciliAmexForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#SalesReconciliAmexForm-cmbDateFromDay': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromDay
            },
            '#SalesReconciliAmexForm-checkSettlement': {
                change: this.checkEvent
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    obtainData: function () {

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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PRDA", "Processing Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbDateSel.setValue("PAYDATE");

        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Pending"],
                ["1", "Match"],
                ["2", "Sales Without Settlement"],
                ["3", "Settlement Without Sales"],
                ["4", "Match with Differences"],
                ["5", "Match Manual"],
                ["6", "Forced Match"],
                ["7", "Compensation Match"]
            ]
        }));
        cmbSTVAL.setValue("");

        var cmbTDOC = Ext.getCmp(prototype.id + '-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        cmbTDOC.setValue("");

        var cmbComplement = Ext.getCmp(prototype.id + '-cmbComplement');
        cmbComplement.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["Y", "Complements"],
                ["N", "No Complements"]
            ]
        }));
        cmbComplement.setValue("");

        /*var cmbErrorCode = Ext.getCmp(prototype.id + '-cmbErrorCode');
         cmbErrorCode.bindStore(Ext.create('Ext.data.ArrayStore', {
         autoLoad: false,
         fields: ['CODE', 'NAME'],
         data: [
         ["", "All"],
         ["81", "81"],
         ["82", "82"]
         ]
         }));
         cmbErrorCode.setValue("");*/
        me.bean_warning = {};
        if ($(Ext.getCmp(prototype.id + '-chkWarnings')).prop('checked')) {
            me.bean_warning.IN_WARNING = 'Y';
        } else {
            me.bean_warning.IN_WARNING = 'N';
        }
        Ext.Ajax.request({
            url: prototype.url + '/getErrorCodes',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.bean_warning)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbErrorCode').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbErrorCode').setValue('');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });

        //me.btnSearch_click();

    },
    checkEvent: function (obj, e) {
        //true : check ; false : uncheck
        console.log('checkEvent')
        if (obj.getValue()) {
            this.optionCheck = 1;

        } else {
            this.optionCheck = 0;
        }
        this.btnSearch_click();
    },
    setFormatParameter: function () {
        me.bean = {};
        if ($(Ext.getCmp(prototype.id + '-chkWarnings')).prop('checked')) {
            me.bean.IN_WARNING = 'Y';
        } else {
            me.bean.IN_WARNING = 'N';
        }
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_CERROR = Ext.getCmp(prototype.id + '-cmbErrorCode').getValue();
        me.bean.IN_COMPLEMENT = Ext.getCmp(prototype.id + '-cmbComplement').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        me.bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        me.bean.IN_PNRError = Ext.getCmp(prototype.id + '-txtPNRError').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };

        searchParamsMainSettlement = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {
        /*if (me.panelActual === '-boxDetSettlement' && (Ext.getCmp(prototype.id + '-cmbSTVAL').getValue() !== '' || Ext.getCmp(prototype.id + '-txtPNR').getValue() !== '')) {
            this.setFilterParameterDetSettMerchant();
        } else {*/
        Ext.getCmp(prototype.id + '-frmFilterSettlement').setVisible(false);
        this.rbChangeType();
        //}
    },
    chkWarning_Click: function () {
        me.bean_warning = {};
        if ($(Ext.getCmp(prototype.id + '-chkWarnings')).prop('checked')) {
            me.bean_warning.IN_WARNING = 'Y';
        } else {
            me.bean_warning.IN_WARNING = 'N';
        }
        Ext.Ajax.request({
            url: prototype.url + '/getErrorCodes',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.bean_warning)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbErrorCode').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbErrorCode').setValue('');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    rbChangeType: function () {

        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupType').getValue().rbgType;

        this.setFormatParameter();
        if (selectedValue === 'ER') {
            Ext.getCmp(prototype.id + '-frmQueueError').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-frmQueueError').setVisible(false);
        }
        if (selectedValue === 'SE') {
            Ext.getCmp(prototype.id + '-frmFilterSettlement').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-frmFilterSettlement').setVisible(false);
        }
        switch (selectedValue) {
            case 'SU':
                this.setGridDataMainSummary();
                break;
            case 'SE':
                this.setGridDataMainSettlement();
                break;
            case 'AD':
                this.setGridDataMainAdjustment();
                break;
            case 'ER':
                this.setGridDataMainErrorTransaction();
                break;
        }
    },
    setGridDataMainAdjustment: function () {
        win.lblUser_toolTip("Estructura: A4118");
        me.panelActual = '-boxMainAdjustment';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMainAdjustment'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParamsMainSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin13');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-htDateMainAdjustment').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-htDateMainAdjustment').setText('Processing');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainAdjustment').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    setGridDataMainErrorTransaction: function () {
        win.lblUser_toolTip("Estructura: A4116");
        me.panelActual = '-boxMainErrorTransaction';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchErrorTransaction'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParamsMainSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);                        
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainErrorTransaction').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridMainErrorTransaction').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
    },
    setGridDataMainSettlement: function () {
        win.lblUser_toolTip("Estructura: A4116");
        me.panelActual = '-boxMainSettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMainSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParamsMainSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin9');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);                        
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-mSetDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-mSetDate').setText('Processing');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainSettlement').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
    },
    onGridSettlement: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxSettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanSettlement.DATE = rowData.data.DATE;
        this.beanSettlement.IN_DATE = rowData.data.IN_DATE;
        this.beanSettlement.IN_PCURRENCY = rowData.data.PCURRENCY;
        this.beanSettlement.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        this.beanSettlement.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        this.beanSettlement.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();

        me.paramsDetailSettlement.beanString = JSON.stringify(this.beanSettlement);
        this.setGridDataSettlement();
    },
    setGridDataSettlement: function () {
        win.lblUser_toolTip("Estructura: A4116");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin10');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-settDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-settDate').setText('Processing');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridSettlement').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    txtPNR_keyDownHandler: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    cmbSTVAL_keyDownHandler: function () {
        this.setFilterParameterDetSettMerchant();
    },
    setFilterParameterDetSettMerchant: function () {
        this.beanSettlement.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        this.beanSettlement.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        this.beanSettlement.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        me.paramsDetailDetSettlement.beanString = JSON.stringify(this.beanSettlement);
        this.setGridDataDetSettlement();
    },
    onGridDetSettMerchant: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetSettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-frmFilterSettlement').setVisible(true);

        this.beanSettlement.DATE = rowData.data.DATE;
        this.beanSettlement.IN_DATE = rowData.data.IN_DATE;
        this.beanSettlement.IN_MERCHID = rowData.data.MERCHID;
        this.beanSettlement.IN_PCURRENCY = rowData.data.PCURRENCY;
        this.beanSettlement.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        this.beanSettlement.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        this.beanSettlement.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();

        me.paramsDetailDetSettlement.beanString = JSON.stringify(this.beanSettlement);
        this.setGridDataDetSettlement();
    },
    setGridDataDetSettlement: function () {
        win.lblUser_toolTip("Estructura: A4116/A4117/A4118");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailDetSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin11');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);
                        var data = obj.data.items[0].data;
                        console.log(data);
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-detSettDate').setText('Payment');
                            Ext.getCmp(prototype.id + '-gridDetSettlement').setTitle('<center style="font-size:12px;">' + 'PAYMENT DATE: ' + data.DATE + ' - ' + ' MERCHANT: ' + data.IN_MERCHID + ' - ' + ' CURRENCY: ' + data.IN_PCURRENCY + '</center>');
                        } else {
                            Ext.getCmp(prototype.id + '-detSettDate').setText('Processing');
                            Ext.getCmp(prototype.id + '-gridDetSettlement').setTitle('<center style="font-size:12px;">' + 'PROCESSING DATE: ' + data.DATE + ' - ' + ' MERCHANT: ' + data.IN_MERCHID + ' - ' + ' CURRENCY: ' + data.IN_PCURRENCY + '</center>');
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetSettlement').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetSettlement').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    onTktsDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.QTYTKT === 0) {
            return
        }
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetailTktSettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanSettlementTktsDetail.DATE = rowData.data.DATE;
        this.beanSettlementTktsDetail.IN_DATE = rowData.data.IN_DATE;
        this.beanSettlementTktsDetail.MERCHID = rowData.data.MERCHID;
        this.beanSettlementTktsDetail.SPNR = rowData.data.SPNR;
        this.beanSettlementTktsDetail.ISREFNBR = rowData.data.ISREFNBR;
        this.beanSettlementTktsDetail.IN_PCURRENCY = rowData.data.IN_PCURRENCY;
        this.beanSettlementTktsDetail.IN_TGROSAMOUN = rowData.data.TGROSAMOUN;
        this.beanSettlementTktsDetail.IN_descSTVAL = rowData.data.descSTVAL;
        this.beanSettlementTktsDetail.IN_TRANSDATE = rowData.data.TRANSDATE;
        this.beanSettlementTktsDetail.IN_AXPRODAT = rowData.data.AXPRODAT;
        this.beanSettlementTktsDetail.IN_FREGLA = rowData.data.FREGLA;
        this.beanSettlementTktsDetail.IN_SCARDN = rowData.data.SCARDN;
        this.beanSettlementTktsDetail.IN_SAUTHOC = rowData.data.SAUTHOC;
        this.beanSettlementTktsDetail.IN_IDITEMT = rowData.data.IDITEMT;
        this.beanSettlementTktsDetail.IN_IDITEMS = rowData.data.IDITEMS;

        me.paramsDetailDetTktSettlement.beanString = JSON.stringify(this.beanSettlementTktsDetail);
        this.setGridDataDetTktSettlement();


    },
    setGridDataDetTktSettlement: function () {
        win.lblUser_toolTip("Estructura: A4121");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailDetTktSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin17');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);
                        var data = obj.data.items[0].data;
                        console.log(data);
                        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').setTitle('<center style="font-size:12px;">' + 'TICKET: ' + data.IN_ISREFNBR + ' - Currency: ' + ' ' + data.IN_PCURRENCY + ' - ' + data.IN_descSTVAL + '</center>');
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-detSettTktDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-detSettTktDate').setText('Processing');
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin17').bindStore(storeGridDatas);
    },
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.ISREFNBR;

        prototypeProgram.view = 'payments-sales-reconcili-amex-form';
        prototypeProgram.nprog = 'PX00000570';
        prototypeProgram.title = 'Sales Reconciliation By Amex';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    setGridDataMainSummary: function () {
        win.lblUser_toolTip("Estructura: A4113");
        me.panelActual = '-boxMainSummary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMainSummary'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin16');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-msDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-msDate').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainSummary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin16').bindStore(storeGridDatas);

    },
    onGridDetSummary: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanSummary.DATE = rowData.data.DATE;
        this.beanSummary.IN_DATE = rowData.data.IN_DATE;
        this.beanSummary.IN_PCURRENCY = rowData.data.PCURRENCY;
        console.log(this.beanSummary);

        me.paramsDetailSummary.beanString = JSON.stringify(this.beanSummary);
        this.setGridData();
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A4113");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailSummary;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin14');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);

                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-htDate').setText('Payment');
                            //Ext.getCmp(prototype.id + '-gridData').setTitle('<center style="font-size:12px;">Payment Date: ' + data.DATE + '</center>');
                        } else {
                            Ext.getCmp(prototype.id + '-htDate').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin14').bindStore(storeGridDatas);

    },
    onGridDetSubmission: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.AXPAYNBR.trim() === '') {
            this.onGridDetAdjustment(obj, metaData, rowNum, columnNum, obj2, rowData);
            return;
        }

        this.beanSubmission.IN_DATEFROM = rowData.data.IN_DATEFROM;
        this.beanSubmission.IN_DATETO = rowData.data.IN_DATETO;
        this.beanSubmission.IN_DATE = rowData.data.IN_DATE;
        this.beanSubmission.IN_PADJAMOUN = rowData.data.PADJAMOUN;

        this.beanSubmission.IN_MERCHID = rowData.data.PMERCHID;
        this.beanSubmission.IN_AXPAYNBR = rowData.data.AXPAYNBR;
        this.beanSubmission.IN_PCURRENCY = rowData.data.PCURRENCY;

        this.beanSubmission.strDATE = rowData.data.DATE;

        me.paramsDetailSubmission.beanString = JSON.stringify(this.beanSubmission);
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetSubmission';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.setGridDataDetSubmission();
    },
    setGridDataDetSubmission: function () {
        win.lblUser_toolTip("Estructura: A4115");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetSubmission'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailSubmission;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);

                        var pag = Ext.getCmp(prototype.id + '-paggin15');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var data = obj.data.items[0].data;
                        console.log(data);

                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-htDateSunmission').setText('Payment');
                            Ext.getCmp(prototype.id + '-gridDetSubmission').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                    + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                        } else {
                            Ext.getCmp(prototype.id + '-htDateSunmission').setText('Processing');
                            Ext.getCmp(prototype.id + '-gridDetSubmission').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                    + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetSubmission').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);

    },
    onGridDetAdjustment: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        this.beanSubmission.IN_DATEFROM = rowData.data.IN_DATEFROM;
        this.beanSubmission.IN_DATETO = rowData.data.IN_DATETO;
        this.beanSubmission.IN_DATE = rowData.data.IN_DATE;

        this.beanSubmission.IN_MERCHID = rowData.data.PMERCHID;
        this.beanSubmission.IN_AXPAYNBR = rowData.data.AXPAYNBR;
        this.beanSubmission.IN_PCURRENCY = rowData.data.PCURRENCY;

        this.beanSubmission.strDATE = rowData.data.DATE;
        //console.log(this.beanSubmission);
        //me.paramsDetail.beanString = JSON.stringify(this.beanSubmission);                
        //var chkChargeBack = Ext.getCmp(prototype.id + '-chkChargeback').getValue();

        me.paramsDetailChargeback.beanString = JSON.stringify(this.beanSubmission);
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetChargeback';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.setGridDataDetChargeback();
    },
    setGridDataDetChargeback: function () {

        console.log('setGridDataDetChargeback');
        win.lblUser_toolTip("Estructura: A4118");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetChargeback'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailChargeback;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);

                        var data = obj.data.items[0].data;
                        console.log(data);
//
                        if (data.IN_DATE === "PAYDATE") {
//                            Ext.getCmp(prototype.id + '-htDateChargeback').setText('Payment');
                            Ext.getCmp(prototype.id + '-gridDetChargeback').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                    + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                        } else {
//                            Ext.getCmp(prototype.id + '-htDateChargeback').setText('Processing');
                            Ext.getCmp(prototype.id + '-gridDetChargeback').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                    + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetChargeback').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetChargeback').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);

    },
    onGridDetTransaction: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetTransaction';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanTransaction.IN_DATEFROM = rowData.data.IN_DATEFROM;
        this.beanTransaction.IN_DATETO = rowData.data.IN_DATETO;
        this.beanTransaction.IN_DATE = rowData.data.IN_DATE;

        this.beanTransaction.strDATE = rowData.data.strDATE;
        this.beanTransaction.IN_MERCHID = rowData.data.MERCHID;
        this.beanTransaction.IN_AXPAYNBR = rowData.data.AXPAYNBR;
        this.beanTransaction.IN_PCURRENCY = rowData.data.PCURRENCY;

        var strTipo = Ext.getCmp(prototype.id + '-gridDetSubmission').headerCt.getGridColumns()[columnNum].dataIndex;
        console.log(strTipo);

        if (strTipo === 'IDITEMS') {
            this.beanTransaction.IN_IDITEMS = rowData.data.IDITEMS;
        } else {
            this.beanTransaction.IN_IDITEMS = '';
        }

        console.log(this.beanTransaction);

        //me.paramsDetail.beanString = JSON.stringify(this.beanTransaction);
        me.paramsDetailTransaction.beanString = JSON.stringify(this.beanTransaction);
        this.setGridDataDetTransaction();
    },
    setGridDataDetTransaction: function () {
        win.lblUser_toolTip("Estructura: A4116");

        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTransaction'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailTransaction;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        var data = obj.data.items[0].data;
                        console.log(data);

                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-htDateTransaction').setText('Payment');

                            if (data.IN_IDITEMS !== '') {
                                Ext.getCmp(prototype.id + '-gridDetTransaction').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '  -  ID Sub.: ' + data.IN_IDITEMS + '</center>');
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetTransaction').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                            }

                        } else {
                            Ext.getCmp(prototype.id + '-htDateTransaction').setText('Processing');
                            if (data.IN_IDITEMS !== '') {
                                Ext.getCmp(prototype.id + '-gridDetTransaction').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '  -  ID Sub.: ' + data.IN_IDITEMS + '</center>');
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetTransaction').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENC + '</center>');
                            }
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetTransaction').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetTransaction').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onGridDetPricing: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetPricing';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanPricing.IN_DATEFROM = rowData.data.IN_DATEFROM;
        this.beanPricing.IN_DATETO = rowData.data.IN_DATETO;
        this.beanPricing.IN_DATE = rowData.data.IN_DATE;

        this.beanPricing.strDATE = rowData.data.strDATE;
        this.beanPricing.IN_MERCHID = rowData.data.MERCHID;
        this.beanPricing.IN_AXPAYNBR = rowData.data.AXPAYNBR;
        this.beanPricing.IN_PCURRENCY = rowData.data.PCURRENCY;

        this.beanPricing.IN_IDITEMS = '';
        this.beanPricing.IN_IDITEMT = '';

        console.log(this.beanPricing);

        //me.paramsDetail.beanString = JSON.stringify(this.beanPricing);
        me.paramsDetailPricing.beanString = JSON.stringify(this.beanPricing);
        this.setGridDataDetPricing();
    },
    onGridDetPricingByItemt: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetPricing';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanPricing.IN_DATEFROM = rowData.data.IN_DATEFROM;
        this.beanPricing.IN_DATETO = rowData.data.IN_DATETO;
        this.beanPricing.IN_DATE = rowData.data.IN_DATE;

        this.beanPricing.strDATE = rowData.data.strDATE;
        this.beanPricing.IN_MERCHID = rowData.data.MERCHID;
        this.beanPricing.IN_AXPAYNBR = rowData.data.AXPAYNBR;
        this.beanPricing.IN_PCURRENCY = rowData.data.PCURRENCY;

        this.beanPricing.IN_IDITEMS = rowData.data.IDITEMS;
        this.beanPricing.IN_IDITEMT = rowData.data.IDITEMT;

        console.log(this.beanPricing);

        //me.paramsDetail.beanString = JSON.stringify(this.beanPricing);
        me.paramsDetailPricing.beanString = JSON.stringify(this.beanPricing);
        this.setGridDataDetPricing();
    },
    setGridDataDetPricing: function () {
        win.lblUser_toolTip("Estructura: A4117");

        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetPricing'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailPricing;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                        
                        var data = obj.data.items[0].data;
//                        console.log(data);

                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-htDatePricing').setText('Payment');

                            if (data.IN_IDITEMS !== '') {
                                Ext.getCmp(prototype.id + '-gridDetPricing').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '  -  ID Sub.: ' + data.IN_IDITEMS + '</center>');
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetPricing').setTitle('<center style="font-size:12px;">Payment Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '</center>');
                            }

                        } else {
                            Ext.getCmp(prototype.id + '-htDatePricing').setText('Processing');
                            if (data.IN_IDITEMS !== '') {
                                Ext.getCmp(prototype.id + '-gridDetPricing').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENCY + '  -  ID Sub.: ' + data.IN_IDITEMS + '</center>');
                            } else {
                                Ext.getCmp(prototype.id + '-gridDetPricing').setTitle('<center style="font-size:12px;">Processing Date: ' + data.strDATE + '  -  Merchant ID: ' + data.IN_MERCHID
                                        + '  -  Payment Number: ' + data.IN_AXPAYNBR + '  -  Currency: ' + data.IN_PCURRENC + '</center>');
                            }
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetPricing').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);

    },
    onGridDetDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDay.IN_DATE = rowData.data.IN_DATE;
        this.beanDay.SDATE = rowData.data.SDATE;
        this.beanDay.CBANK = rowData.data.CBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDay.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanDay);
        this.setGridDataDetDay();
    },
    setGridDataDetDay: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            var value = Ext.getCmp(prototype.id + '-htDetDay');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }

                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTotD_QMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QPAS48').setText(Ext.util.Format.number(data.lngTotQPAS48, '0,000'));
                            Ext.getCmp(prototype.id + '-totQBANKRFND2').setText(Ext.util.Format.number(data.totQBANKRFND, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QPAID').setText(Ext.util.Format.number(data.lngTotQPAID, '0,000'));
                            Ext.getCmp(prototype.id + '-lngTotD_QDIFF').setText(Ext.util.Format.number(data.lngTotQDIFF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTOTSAL').setText(Ext.util.Format.number(data.lngTotQTOTSAL, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTOTWS').setText(Ext.util.Format.number(data.lngTotQTOTWS, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotD_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDetMerchant: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetMerchant';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanMerchant.IN_TDOC = rowData.data.IN_TDOC;
        this.beanMerchant.IN_DATE = rowData.data.IN_DATE;
        this.beanMerchant.SDATE = rowData.data.SDATE;
        this.beanMerchant.CBANK = rowData.data.CBANK;
        this.beanMerchant.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanMerchant.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanMerchant.strFormatDate = rowData.data.strFormatDate;
        this.beanMerchant.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanMerchant);
        this.setGridDataDetMerchant();
    },
    setGridDataDetMerchant: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetMerchant'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridDetMerchant').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTotAMOUNT').setText(Ext.util.Format.number(data.dblTotAMOUNT, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotAMOUNTR').setText(Ext.util.Format.number(data.dblTotAMOUNTR, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotM_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotM_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetMerchant').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetBankS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        console.log(columnNum);
        var cant = 0;
        switch (columnNum) {
            case 1 :
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 2 :
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 4 :
                rowData.data.IN_STVAL = '2';
                cant = rowData.data.Total;
                break;
            case 5 :
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPAID;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetBankByS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanBankS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanBankS.IN_DATE = rowData.data.IN_DATE;
            this.beanBankS.SDATE = rowData.data.SDATE;
            this.beanBankS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanBankS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanBankS.IN_BANK = rowData.data.IN_BANK;
            this.beanBankS.IN_TTRAN = rowData.data.IN_TTRAN;
            this.beanBankS.strFormatDate = rowData.data.strFormatDate;

            me.paramsDetail.beanString = JSON.stringify(this.beanBankS);
            this.setGridDataDetBankS();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetBankS: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetBankByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-gridDetBankByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_BS_QACCB').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_BS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_BS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetBankByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    OnGridDetDayByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayByS.SDATE = rowData.data.SDATE;
        this.beanDayByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDayByS.CBANK = rowData.data.CBANK;
        this.beanDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayByS.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDayByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDayByS.strCREJEC = rowData.data.strCREJEC;
        this.beanDayByS.strTitulo = rowData.data.strTitulo;

        me.paramsDetail.beanString = JSON.stringify(this.beanDayByS);
        this.setGridDataDetDayBys();
    },
    setGridDataDetDayBys: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDayByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin6');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-gridDetDayBys').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_DS_QACCB').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_DS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_DS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDayBys').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },
    OnGridDetMerchantByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetMerchantByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanMerchantByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanMerchantByS.IN_DATE = rowData.data.IN_DATE;
        this.beanMerchantByS.SDATE = rowData.data.SDATE;
        this.beanMerchantByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanMerchantByS.CBANK = rowData.data.CBANK;
        this.beanMerchantByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanMerchantByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanMerchantByS.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanMerchantByS.strFormatDate = rowData.data.strFormatDate;
        this.beanMerchantByS.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanMerchantByS);
        this.setGridDataDetMerchantBys();
    },
    setGridDataDetMerchantBys: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetMerchantByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-gridDetMerchantBys').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_MS_AMOUNT').setText(Ext.util.Format.number(data.dblTotAMOUNT, '0,000'));
                            Ext.getCmp(prototype.id + '-totAMTRFND_F').setText(Ext.util.Format.number(data.dblTotAMOUNTR, '0,000'));
                            Ext.getCmp(prototype.id + '-totDIFF_SVFOP_F').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_AMOUNTR').setText(Ext.util.Format.number(data.dblTotAVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetMerchantBys').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },
    OnGridByMerchant: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var QTY = 0;
        switch (columnNum) {
            case 1 :
                rowData.data.IN_TDOC = '';
                QTY = rowData.data.MERCHN;
                break;
            case 4 :
                rowData.data.IN_TDOC = 'S';
                QTY = rowData.data.AMOUNTS;
                break;
            case 5 :
                rowData.data.IN_TDOC = 'R';
                QTY = rowData.data.AMOUNTR;
                break;
        }

        if (QTY > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxByMerchant';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanByMerchant.IN_TDOC = rowData.data.IN_TDOC;
            this.beanByMerchant.IN_DATE = rowData.data.IN_DATE;
            this.beanByMerchant.SDATE = rowData.data.SDATE;
            this.beanByMerchant.MERCHN = rowData.data.MERCHN;
            this.beanByMerchant.CBANK = rowData.data.CBANK;
            this.beanByMerchant.IN_STVAL = rowData.data.IN_STVAL;
            this.beanByMerchant.SCURRENCY = rowData.data.SCURRENCY;
            this.beanByMerchant.DATEF = rowData.data.DATEF;
            this.beanByMerchant.strFormatDate = rowData.data.strFormatDate;
            this.beanByMerchant.strTitulo = rowData.data.strTitulo;

            me.paramsDetail.beanString = JSON.stringify(this.beanByMerchant);
            this.setGridByMerchant();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridByMerchant: function () {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchByMerchant'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin8');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                            Ext.getCmp(prototype.id + '-totSVFOP').setText('');
                            Ext.getCmp(prototype.id + '-totQTYDOC').setText('');
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridByMerchant').setTitle('<center style="font-size:12px;">' + data.strTitulo + ' Merchant Code ' + data.MERCHN + ' (' + data.strDescMerchn + ') ' + '</center>');
                            Ext.getCmp(prototype.id + '-totSVFOP').setText(Ext.util.Format.number(data.totSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-totQTYDOC').setText(Ext.util.Format.number(data.totQTYDOC, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridByMerchant').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
        }
    },
    imgByTDOC_clickHandler: function () {
//        this.btnSearch_click();
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onViewPNRbySPNR: function (a, b, c, d, e, rowData) {

//        var rec = grid.getStore().getAt(rowIndex);
        rowData.data.PNR = rowData.data.SPNR;
        this.winDataEntry('', rowData);
    },
    onViewPNR: function (a, b, c, d, e, rowData) {

//        var rec = grid.getStore().getAt(rowIndex);
        rowData.data.PNR = rowData.data.INVORNBR;
        this.winDataEntry('', rowData);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
//                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnEmail_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send Mail ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.sendMailMultipleDifferences();
                }
            }
        });
    },
    sendMailMultipleDifferences: function (obj, e) {
        Ext.Ajax.request({
            url: prototype.url + '/sendMailMultipleDifferences',
            method: 'POST',
            timeout: 60000000,
            params: {
                IN_DATEFROM: Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue(),
                IN_DATETO: Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue(),
                IN_DATE: Ext.getCmp(prototype.id + '-cmbDateSel').getValue()
            },
            beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...', ''),
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...', '');

                var res = Ext.JSON.decode(response.responseText);
                global.Msg({
                    msg: res.MESSAGE,
                    icon: 1,
                    fn: function () {
                    }
                });
            }
        });
    },
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                console.log(me.pagginActual);
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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
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
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxMainSummary':
                global.getFile(prototype.url + '/getXLSXMainSummary?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + me.paramsDetailSummary.beanString);
                break;
            case  '-boxDetChargeback':
                global.getFile(prototype.url + '/getXLSXChargeback?beanString=' + me.paramsDetailChargeback.beanString);
                break;
            case  '-boxDetSubmission':
                global.getFile(prototype.url + '/getXLSXSubmission?beanString=' + me.paramsDetailSubmission.beanString);
                break;
            case  '-boxDetTransaction':
                global.getFile(prototype.url + '/getXLSXTransaction?beanString=' + me.paramsDetailTransaction.beanString);
                break;
            case  '-boxDetPricing':
                global.getFile(prototype.url + '/getXLSXPricing?beanString=' + me.paramsDetailPricing.beanString);
                break;
            case  '-boxMainSettlement':
                global.getFile(prototype.url + '/getXLSXMainSettlement?beanString=' + searchParamsMainSettlement.beanString);
                break;
            case  '-boxSettlement':
                global.getFile(prototype.url + '/getXLSXSettlement?beanString=' + me.paramsDetailSettlement.beanString);
                break;
            case  '-boxDetSettlement':
                global.getFile(prototype.url + '/getXLSXDetSettlement?beanString=' + me.paramsDetailDetSettlement.beanString);
                break;
            case  '-boxMainAdjustment':
                global.getFile(prototype.url + '/getXLSXMainAdjustment?beanString=' + searchParams.beanString);
                break;
            case  '-boxMainErrorTransaction':
                global.getFile(prototype.url + '/getXLSXMainErrorTransactiont?beanString=' + searchParams.beanString);
                break;
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
    onSendClick: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send Mail ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.sendMail(rowData.data);
                }
            }
        });
    },
    sendMail: function (data) {
        console.log('Send Mail');
        /*var DATE = '20210625';
         var AXPAYNBR = '139';
         var PMERCHID = '9351479119';
         var DIFF_PNETAMOU_STRING = "1,225.82";
         var PCURRENCY = "MXN";*/

        Ext.Ajax.request({
            url: prototype.url + '/sendMail',
            method: 'POST',
            timeout: 60000000,
            params: {
                DATE: data.DATE,
                IN_DATE: data.IN_DATE,
                AXPAYNBR: data.AXPAYNBR,
                PMERCHID: data.PMERCHID,
                DIFF_PNETAMOU_STRING: Ext.util.Format.number(data.DIFF_PNETAMOU, '0,000.00').replace('-', ''),
                PCURRENCY: data.PCURRENCY
            },
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...', ''),
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...', '');

                var res = Ext.JSON.decode(response.responseText);
                global.Msg({
                    msg: res.MESSAGE,
                    icon: 1,
                    fn: function () {
                    }
                });
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
        if (me.panelActual === '-boxDetTransaction' || me.panelActual === '-boxDetPricing' || me.panelActual === '-boxMainSettlement' || me.panelActual === '-boxSettlement' || me.panelActual === '-boxDetSettlement' || me.panelActual === '-boxMainErrorTransaction' || me.panelActual === '-boxMainAdjustment' || me.panelActual === '-boxDetailTktSettlement' || me.panelActual === '-panelGridData' || me.panelActual === '-boxDetSubmission' || me.panelActual === '-boxMainSummary') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
        this.winDataEntryError('U', rec);
    },
    winDataEntryError: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntryErrorTransaction', {
            id: prototype.id + '-dataEntryError',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    onEditClickSettlement: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
        this.winDataEntrySettlement('U', rec);
    },
    winDataEntrySettlement: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntrySettlement', {
            id: prototype.id + '-dataEntrySettlement',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxDetTransaction':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetPricing':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetMerchant':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetBankByS':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetMerchantByS':
                me.pagginActual = '-paggin7';
                break;
            case '-boxByMerchant':
                me.pagginActual = '-paggin8';
                break;
            case '-boxMainSettlement':
                me.pagginActual = '-paggin9';
                break;
            case '-boxSettlement':
                me.pagginActual = '-paggin10';
                break;
            case '-boxDetSettlement':
                me.pagginActual = '-paggin11';
                break;
            case '-boxMainErrorTransaction':
                me.pagginActual = '-paggin12';
                break;
            case '-boxMainAdjustment':
                me.pagginActual = '-paggin13';
                break;
            case '-panelGridData':
                me.pagginActual = '-paggin14';
                break;
            case '-boxDetSubmission':
                me.pagginActual = '-paggin15';
                break;
            case '-boxMainSummary':
                me.pagginActual = '-paggin16';
                break;
            case '-boxDetailTktSettlement':
                me.pagginActual = '-paggin17';
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