Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.SalesAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAnalysisController',
    childs: '5',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanCityPair: {},
    beanDet: {},
    beanCountryCity: {},
    beanAgent: {},
    paramsCountryCity: {},
    paramsAgent: {},
    meSales: '',
    gridActual: '',
    panelActual: '',
    GROUPBY: '',
    gloSelOpt: '',
    dw_excel: false,
    boxActual: '-boxMainData',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function (view) {
        me = this;
        mePie = this;
//        prototype.id = 'Dashboard01Form';
//        prototype.url = CONTEXTPATH + '/Dashboard01';
//        prototype.urlMaster = CONTEXTPATH + '/MasterController';
//        
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
//        console.log(this.childs);
        me.panelActual = '-boxMainData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log(me.childs);
        me.drillDown.push(me.boxActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#Dashboard01Form-xpanel': {
//                afterrender: this.xpanel_afterrender
//            },
//            '#Dashboard01Form-btnSearch': {
//                click: this.btnSearch_click
//            },
//            '#Dashboard01Form-btnClear': {
//                click: this.btnClear_click
//            },
//            '#Dashboard01Form-btnExcel': {
//                click: this.btnExcel_click
//            },
//            '#Dashboard01Form-btnFilter': {
//                click: this.btnFilter_click
//            },
//            '#Dashboard01Form-btnBack': {
//                click: this.btnBack_click
//            },
//            '#Dashboard01Form-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#Dashboard01Form-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#Dashboard01Form-btn-pag-next': {
//                click: this.pagNext
//            },
//            '#Dashboard01Form-btn-pag-last': {
//                click: this.pagLast
//            }
        });

    },
    /*
     btnSearch_click: function (bean) {
     
     console.log('1--------------- SalesAnalysisController - btnSearch_clickwaaaaaaaaaaaaaaaaaa');
     this.bean = bean;
     console.log(this.bean);
     this.setFormatParameter();
     this.search();
     },
     setFormatParameter: function () {
     //        me.bean = {};
     var beanString = JSON.stringify(this.bean);
     this.searchParams = beanString;
     console.log(this.bean);
     },
     */
    imgSearch_clickHandler: function () {
        console.log('imgSearch_clickHandler - Sales Analysis');
    },
    afterRender: function () {

        console.log('1-----------------------SalesAnalysisController - afterweeeeeeeeeeee');
    },
    inicio: function () {
        console.clear();
        console.log('1-----------------------SalesAnalysisController - INICIOOOOOOOOOOO');
        this.setFormatParameter();
        
        var opcion = "1";
        
        console.log(gloSelOpt);
        switch (gloSelOpt) {
            case '1':
                GROUPBY = 'MONTH';
                if (me.bean.IN_NR === 'true') {
                    this.searchByNR();
                } else {
                    this.search();
                }
                break;
            case '2':
                GROUPBY = 'MONTH';
                this.loadCountryOfSale();
                break;
            case "3": //City of Sale
                GROUPBY = 'CITYS';
                this.loadCityOfSale();
                break;
            case "4"://City Pair
//                GROUPBY = 'CITYPAIR';
//                me.beanCityPair = {};
//                me.beanCityPair.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//                me.beanCityPair.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//                me.beanCityPair.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
//                me.beanCityPair.IN_CITYPAIR = txtPairs.text.toUpperCase();
//                me.beanCityPair.IN_ORDER = '';
//                this.loadCityPair(beanCityPair);
                break;
            case "5"://Sales Agent
//                GROUPBY = 'VENDOR';
//                bean.CANAV = '';
//                bean.IN_ONOFF = '';
//                Activar_PBar();
//                this.loadSalesAgent(beanCityPair);
//                resetearOpcionesSA();
                break;
            case "6"://Alliances
                GROUPBY = 'ALLIANCES';
                this.loadAlliances();
                break;
        }
    },
    setFormatParameter: function () {
        me.bean = {};
        gloSelOpt = Ext.getCmp(prototype.id + '-cmbSelectBy').getValue();

        Ext.getCmp(prototype.id + '-chkRN').show();
        Ext.getCmp(prototype.id + '-cmbSelectBy').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbPais').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbDateToYear').show();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
        Ext.getCmp(prototype.id + '-lblTop').show();
        me.bean.strSelectedBy = gloSelOpt;

        if (gloSelOpt === '19') {
            Ext.getCmp(prototype.id + '-cmbDateToYear').hide();
            Ext.getCmp(prototype.id + '-cmbDateToMonth').hide();
            Ext.getCmp(prototype.id + '-lblTop').hide();

            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        } else {
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        }

        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + '';
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + '';
        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + '';
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + '';
        me.bean.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTop').getValue();
        me.bean.IN_NR = Ext.getCmp(prototype.id + '-chkRN').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);

    },
    search: function () {
        win.lblUser_toolTip("Estructura: IMF080");
        this.showGrid('-boxMainData');
//        me.panelActual = '-boxMainData';
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);

        Ext.Ajax.request({
            url: prototype.url + '/searchTest',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var totals = res.lstData[0][0]; //P_SALES_PER_MONTH_TOTALS
                var lstData = res.lstData[1]; //P_SALES_PER_MONTH_DATA
                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridData').bindStore(storeData);

                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmount').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT, '0,000'));
                Ext.getCmp(prototype.id + '-totAVG').setText(Ext.util.Format.number(totals.totAVG, '0,000.00'));

                Ext.getCmp(prototype.id + '-lblTotalCpnON').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalCpnONPerc').setText(Ext.util.Format.number(totals.CUPONS_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAmountON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmountONPerc').setText(Ext.util.Format.number(totals.AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAvgON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));

                Ext.getCmp(prototype.id + '-lblTotalCpnOFF').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalCpnOFFPerc').setText(Ext.util.Format.number(totals.CUPONS_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAmountOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmountOFFPerc').setText(Ext.util.Format.number(totals.AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAvgOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));

                Ext.getCmp(prototype.id + '-lblTotalQCPNSNR').setText(Ext.util.Format.number(totals.TOTAL_QCPNS0, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAMOUNTNR').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT0, '0,000'));


            }
        });

//        me.dw_excel = false;

    },
    GridDDTMtotalperMonth_colHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-BoxDDTMCountryofSale';
//        console.log('1111');
//        console.log(prototype.id);
//        console.log(me.childs);
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log('2222');
//        var dataIndex = Ext.getCmp(prototype.id + '-gridDetail').headerCt.getGridColumns()[columnNum].dataIndex;
        this.showGrid('-BoxDDTMCountryofSale');
        var cant = 0;
        console.log(columnNum);
        switch (columnNum) {
            case 0 :
                rowData.data.TYPE = '1';
                break;
            case 1 :
                rowData.data.TYPE = '2';
                break;
        }

        this.beanCountryCity.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanCountryCity.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        this.beanCountryCity.TYPE = rowData.data.TYPE;
        this.beanCountryCity.CARRIER = rowData.data.CARRIER;

        this.beanCountryCity.strFormatDate = rowData.data.strFormatDate;
        this.beanCountryCity.ALLIC = rowData.data.ALLIC;
        this.beanCountryCity.IN_PAIS = rowData.data.IN_PAIS;
        this.beanCountryCity.COUNTRY = rowData.data.COUNTRY;
        this.beanCountryCity.COUNTRY_NAME = rowData.data.COUNTRY_NAME;
        this.beanCountryCity.CARRIER = rowData.data.CARRIER;

        this.beanCountryCity.DSALES = rowData.data.DSALES;
        this.beanCountryCity.strDescription = rowData.data.strDescription;

        this.paramsCountryCity.beanString = JSON.stringify(this.beanCountryCity);
        console.log(this.beanCountryCity);
        this.loadDDTpMCountryofSale(this.paramsCountryCity, this.beanCountryCity);
    },
    loadDDTpMCountryofSale: function (paramsCountryCity, bean) {
        win.lblUser_toolTip("Estructura: IMF082");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadDDTpMCountryofSale'
            }, listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = paramsCountryCity;
                },
                load: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                    var pag = Ext.getCmp(prototype.id + '-paggin2');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        
                        if (bean.TYPE === "2") {
                            Ext.getCmp(prototype.id + '-lbl_Country').setText('City of Sale');
                        } else {
                            Ext.getCmp(prototype.id + '-lbl_Country').setText('Country of Sale');
                        }
                        var tit = Ext.getCmp(prototype.id + '-gridCountryofSale');
                        tit.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');

                        Ext.getCmp(prototype.id + '-lblCUPON').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                        Ext.getCmp(prototype.id + '-lblAMOUNT').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTARIFA').setText(Ext.util.Format.number(data.TOTAL_AVG, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lblTotalDC_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTotalDC_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));
                    }
//                    me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridCountryofSale').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    GridDDTMDetailbyAgent_colHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-BoxDDTMCountryofSale';
//        console.log(prototype.id);
//        console.log(me.childs);
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.showGrid('-BoxDDTMDetailbyAgent');

        var cant = 0;
        console.log(columnNum);
        switch (columnNum) {
            case 1 :
                rowData.data.TYPE = '1';
                break;
            case 2 :
                rowData.data.TYPE = '2';
                break;
        }

        this.beanAgent.TYPE = rowData.data.TYPE;

        this.beanAgent.strFormatDate = rowData.data.strFormatDate;
        this.beanAgent.ALLIC = rowData.data.ALLIC;
        this.beanAgent.IN_PAIS = rowData.data.IN_PAIS;
        this.beanAgent.COUNTRY = rowData.data.COUNTRY;
        this.beanAgent.COUNTRY_NAME = rowData.data.COUNTRY_NAME;
        this.beanAgent.CARRIER = rowData.data.CARRIER;
        this.beanAgent.strDescription5 = rowData.data.strDescription5;

        this.beanAgent.DSALES = rowData.data.DSALES;
        this.beanAgent.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanAgent.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        
        console.log(rowData.data);

        this.paramsAgent.beanString = JSON.stringify(this.beanAgent);
        console.log(this.beanAgent);
        this.loadDDTpMAgent(this.paramsAgent);
    },
    loadDDTpMAgent: function (paramsAgent) {
        me.panelActual = '-BoxDDTMDetailbyAgent';
        this.showPagination_clickHandler();

        win.lblUser_toolTip("Estructura: IMF084");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadDDTpMAgent'
            }, listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = paramsAgent;
                },
                load: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
//                        me.panelActual = '-BoxDDTMDetailbyAgent';
                        var data = obj.data.items[0].data;
                        console.log(data);

                        var tit = Ext.getCmp(prototype.id + '-gridDetailbyAgent');
//                        var titSL = Ext.getCmp(prototype.id + '-gridDetailbyAgentSL');
                        tit.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');
//                        titSL.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');
//
                        Ext.getCmp(prototype.id + '-lblCUPON_Ag').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
////                        Ext.getCmp(prototype.id + '-lblCUPON').setText('100%');
                        Ext.getCmp(prototype.id + '-lblAMOUNT_Ag').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTARIFA_Ag').setText(Ext.util.Format.number(data.TOTAL_AVG, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lblTotalDA_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTotalDA_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));
                    }
//                    mePie.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailbyAgent').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridDetailbyAgentSL').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    
    loadCountryOfSale: function () {
        win.lblUser_toolTip("Estructura: IMF082");
        
        this.showGrid('-BoxCountryOfSale');
        Ext.Ajax.request({
            url: prototype.url + '/loadCountryOfSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];
                
                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridCountryOfSale').bindStore(storeData);

                Ext.getCmp(prototype.id + '-tot1_CUPONS').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                
                Ext.getCmp(prototype.id + '-tot1_CUPONS_ON').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON_AVG').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON_AVG_RATE').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
//
                Ext.getCmp(prototype.id + '-tot1_CUPONS_OFF').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF_AVG').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF_AVG_RATE').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));
                
                Ext.getCmp(prototype.id + '-lblTotalC_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalC_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000.00'));
                
            }
        });

//        me.dw_excel = false;

    },
    loadCityOfSale: function () {
        win.lblUser_toolTip("Estructura: IMF082");
        
        this.showGrid('-BoxCityOfSale');
        Ext.Ajax.request({
            url: prototype.url + '/loadCityOfSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];
                
                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridCityOfSale').bindStore(storeData);

                Ext.getCmp(prototype.id + '-lblCiSTotalCPN').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSD').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNOn').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNOff').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNPercOn').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON_PERCEN, '0,000.00'));
//
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDPercOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalAVGOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNPercOff').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF_PERCEN, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDPercOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalAVGOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));
                
                Ext.getCmp(prototype.id + '-lblTotalY_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalY_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));
                
            }
        });

//        me.dw_excel = false;

    },
    loadAlliances: function () {
        win.lblUser_toolTip("Estructura: IMF083");
        
        this.showGrid('-BoxAlliances');
        Ext.Ajax.request({
            url: prototype.url + '/loadAlliances',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];
                
                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridAlliances').bindStore(storeData);
                
                //AEROMEXICO
                Ext.getCmp(prototype.id + '-lblTotalAlCPN').setText(Ext.util.Format.number(data.CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAlAmount').setText(Ext.util.Format.number(data.AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAlAVG').setText(Ext.util.Format.number(data.totAVG, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalPerGral').setText(Ext.util.Format.number(data.Perc4, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAL_QCPNSNR').setText(Ext.util.Format.number(data.CUPONS_OTHER, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAL_AMOUNTNR').setText(Ext.util.Format.number(data.AMOUNT_O, '0,000'));
                
            }
        });

//        me.dw_excel = false;

    },

    clickDetSales_colHandler: function (param, column, e, row, column, x, rowData) {
//        console.log(param);

//        Ext.getCmp(field.id).setGroupValue(param);
        this.beanDet = x.record.data;
        this.beanDet.FlagFactor = param;
        this.showGrid('-boxDetDataS');
        console.log(Ext.getCmp(prototype.id + '-rbgpDetail'));
        if (param === 'MIN') {
            Ext.getCmp(prototype.id + '-rbMIN').setValue(true);
        } else if (param === 'MAX') {
            Ext.getCmp(prototype.id + '-rbMAX').setValue(true);
        } else {
            Ext.getCmp(prototype.id + '-rbBEL').setValue(true);
        }

        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    viewDetSales_colHandler: function () {

        this.beanDet.CITYO = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getValue();
        this.beanDet.CITYD = Ext.getCmp(prototype.id + '-cmbcCitiesTo').getValue();

        this.showPagination_clickHandler();

        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {url: prototype.url + '/searchDetSales'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet), dw_excel: false};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + me.boxActual).unmask();
                    win.lblUser_toolTip("Estructura: IMF110");

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        Ext.getCmp(prototype.id + '-titDetSalesS').setText('Sale Date : ' + Objtemp.strFormatDate);


                        var v_storeCities = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getStore().data.length;
                        if (v_storeCities === 0) {
                            me.obtainCities();
                        }


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetSalesS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);



    },
    showGrid: function (nameGrid) {

        Ext.getCmp(prototype.id + meSales.boxActual).hide();

        meSales.boxActual = nameGrid;
        meSales.drillDown.push(meSales.boxActual);

        Ext.getCmp(prototype.id + meSales.boxActual).show();

//        console.log('showGrid == ' + me.drillDown);


    },
    imgBack_clickHandler: function () {

        if (meSales.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meSales.boxActual).hide();
            meSales.drillDown.pop();
            meSales.boxActual = meSales.drillDown[meSales.drillDown.length - 1];
            Ext.getCmp(prototype.id + meSales.boxActual).show();

//                this.showGrid(me.drillDown[me.drillDown.length-1]);
            console.log(meSales.boxActual);
            if (meSales.boxActual === '-boxMainData' || meSales.boxActual === '-BoxDDTMCountryofSale' || meSales.boxActual === '-BoxCityOfSale' ) {
                this.hidePagination_clickHandler();
            }

        }
//        console.log('imgBack_clickHandler == ' + me.drillDown);

    },
    imgExcel_clickHandler: function () {

        console.log('excell');
        console.log(this.searchParams);
//        console.log(this.paramsCountryCity.beanString);
        me.dw_excel = true;
        if (me.boxActual === '-boxMainData') {
            console.log(Ext.getCmp(prototype.id + '-gridData').config.columns.items);
            me.goURLpost('searchTest', this.searchParams, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        } else if (me.boxActual === '-BoxDDTMCountryofSale') {
            console.log(Ext.getCmp(prototype.id + '-gridCountryofSale').config.columns);
            me.goURLpost('loadDDTpMCountryofSale', this.paramsCountryCity.beanString, Ext.getCmp(prototype.id + '-gridCountryofSale').config.columns);
        } else {
            me.dw_excel = false;
        }
    },
    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);

        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);

        document.body.appendChild(mapForm);


        mapForm.submit();
    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    obtainCities: function () {

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainCities',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstCiudades = res.lstCiudades;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCiudades,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').setValue('');
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').setValue('');
//                global.clear();
            }
        });

    },
    rgchange: function (field, newvalue, oldvalue, options) {
//        this.beanDet.FlagFactor = param;
//        console.log(field);

        if (oldvalue) {
//            console.log(Ext.getCmp(field.id).getGroupValue());
            this.beanDet.FlagFactor = Ext.getCmp(field.id).getGroupValue();
            this.viewDetSales_colHandler();
        }
//        console.log(this.beanDet);
    },
    dateChange: function (field, newvalue, oldvalue) {
        var V_CDATE = Ext.getCmp(prototype.id + '-txtDateCreate').getValue();

        V_CDATE = Ext.util.Format.date(V_CDATE, 'Ymd');

        console.log(V_CDATE);

        this.beanDet.FECR = V_CDATE;
        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TICKET;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';

        win.displayProMasterTicket(this, 'ABValues', beanProMasterTicket);
    },
    setWidthPie: function () {
        console.log(me.panelActual);
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
//    getPaggin: function () {
//        me.pagginActual = '';
//        switch (me.panelActual) {
////            case  '-panelGridData':
////                me.pagginActual = '-paggin';
////                break;
////            case '-BoxDDTMCountryofSale':
////                me.pagginActual = '-paggin2';
////                break;
//            case '-BoxDDTMDetailbyAgent':
//                me.pagginActual = '-paggin3';
//                break;
////            case '-boxNoMatchData':
////                me.pagginActual = '-paggin4';
////                break;
////            case '-boxUsosData':
////                me.pagginActual = '-paggin5';
////                break;
////            case '-boxDetAvisos':
////                me.pagginActual = '-paggin6';
////                break;
//        }
//    },
//    pagFirst: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + me.pagginActual);
//        pag.moveFirst();
//    }, pagPrevious: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + me.pagginActual);
//        pag.movePrevious();
//    },
//    pagNext: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + me.pagginActual);
//        pag.moveNext();
//    },
//    pagLast: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + me.pagginActual);
//        pag.moveLast();
//    },

});
