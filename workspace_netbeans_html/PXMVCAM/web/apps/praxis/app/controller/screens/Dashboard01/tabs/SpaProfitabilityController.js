Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.SpaProfitabilityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SpaProfitabilityController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    beanDetSpaProfitability: {},
    paramsDetailSpaProfitability: {},
    meSPA: '',
    dw_excel: false,
    boxActual: '-boxMainDataSpaProfitability',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function (view) {
        meSPA = this;
        prototypeProgram.view = 'screens-dashboard-01-form';
        prototypeProgram.nprog = 'PX00000109';
        prototypeProgram.title = 'Dashboard 1';
        prototypeProgram.modulo = '';
    },
    afterRender: function () {
        console.log('1-----------------------SpaProfitabilityController - after');
    },
    inicio: function () {
        console.log(' ----- Inicio SpaProfitability -------');
        meSPA.drillDown = [];
        Ext.getCmp(prototype.id + '-filterMain').hide();
        Ext.getCmp(prototype.id + '-panelRadio').hide();
        Ext.getCmp(prototype.id + '-boxMainDataSpaProfitability').hide();
        this.btnSearch_click();
    },
    btnSearch_click: function (bean) {
        console.log('1--------------- SpaProfitabilityController - btnSearch_click');
        this.bean = bean;
        console.log(this.bean);
        meSPA.drillDown = [];
        this.setFormatParameter();
        this.search();
    },
    setFormatParameter: function () {
        meSPA.bean = {};
        meSPA.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear_SPA').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth_SPA').getValue();
        meSPA.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear_SPA').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth_SPA').getValue();
        meSPA.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbDocument').getValue();
        meSPA.bean.IN_CURRENP = Ext.getCmp(prototype.id + '-cmbCurr').getValue();
        meSPA.searchParams = JSON.stringify(meSPA.bean);
        console.log(meSPA.bean);
    },
    search: function () {
        console.log('search');
        this.showPagination_clickHandler();
        console.log('pag');
        win.lblUser_toolTip("Estructura: WRF001");
        this.showGrid('-boxMainDataSpaProfitability');
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_SPA'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxMainDataSpaProfitability').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSPA.searchParams};
                },
                load: function (obj) {
                    console.log('load');
                    Ext.getCmp(prototype.id + '-boxMainDataSpaProfitability').unmask();
                    console.log('unmask');
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchSPA');
                    var pagData = pag.getPageData();
                    console.log('pagData');
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log('pagData123');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                    }
                }
            }
        });
        console.log('storeGridDatas');
        Ext.getCmp(prototype.id + '-gridDataSpaProfitability').bindStore(storeGridDatas);
        console.log('gridDataSpaProfitability');
        Ext.getCmp(prototype.id + '-gridDataSpaProfitability').setStore(storeGridDatas);
        console.log('gridDataSpaProfitability');
        Ext.getCmp(prototype.id + '-paggin_searchSPA').bindStore(storeGridDatas);
        console.log('paggin_searchSPA');
    },
    onAirlineCode: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.beanDetSpaProfitability.IN_DATE_FROM = rowData.data.IN_DATE_FROM;
        this.beanDetSpaProfitability.IN_DATE_TO = rowData.data.IN_DATE_TO;
        this.beanDetSpaProfitability.AIRLINE = rowData.data.AIRLINE;
        this.beanDetSpaProfitability.IN_TUSO = rowData.data.IN_TUSO;
        this.beanDetSpaProfitability.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetSpaProfitability.IN_CURRENP = rowData.data.IN_CURRENP;
        this.beanDetSpaProfitability.FINVOICE = rowData.data.FINVOICE;
        //GUARDA ESTA FECHA PORQUE NO HAY INFORMACION
//        this.beanDetSpaProfitability.FINVOICE = '201601';
        console.log(this.beanDetSpaProfitability);
        meSPA.paramsDetailSpaProfitability.beanString = JSON.stringify(this.beanDetSpaProfitability);
        this.searchTAGSPA();
    },
    searchTAGSPA: function () {
        win.lblUser_toolTip("Estructura: A2907");
        this.hidePagination_clickHandler();
        this.showGrid('-boxDetailSpaProfitability');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTAGSPA'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailSpaProfitability').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSPA.paramsDetailSpaProfitability};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailSpaProfitability').unmask();
                    win.lblUser_toolTip("Estructura: A2907");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        var lstCompare1 = res.data1;
                        var lstCompare2 = res.data2;
                        console.log('lstCompare1');
                        console.log(lstCompare1);
                        console.log('lstCompare2');
                        console.log(lstCompare2);
//                        if (obj.data1.length() > 0) {
                            var storeData = Ext.create('Ext.data.Store', {
                                data: lstCompare1,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').bindStore(storeData);
                            Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').setStore(storeData);

                            var storeData2 = Ext.create('Ext.data.Store', {
                                data: lstCompare2,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').bindStore(storeData2);
                            Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').setStore(storeData2);
//                        } else {
//                            global.Msg({msg: 'Data not found'});
//                        }
                    } else
                        global.Msg({msg: 'Data not found'});
                }
            }
        });
    },
    onSPAApliedYes: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.beanDetSpaProfitability.IN_DATE_FROM = rowData.data.IN_DATE_FROM;
        this.beanDetSpaProfitability.IN_DATE_TO = rowData.data.IN_DATE_TO;
        this.beanDetSpaProfitability.AIRLINE = rowData.data.AIRLINE;
        this.beanDetSpaProfitability.IN_TUSO = rowData.data.IN_TUSO;
        this.beanDetSpaProfitability.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetSpaProfitability.IN_CURRENP = rowData.data.IN_CURRENP;
        this.beanDetSpaProfitability.FINVOICE = rowData.data.FINVOICE;
        console.log(this.beanDetSpaProfitability);
        meSPA.paramsDetailSpaProfitability.beanString = JSON.stringify(this.beanDetSpaProfitability);
        this.searchDetail_SPA();
    },
    searchDetail_SPA: function () {
        win.lblUser_toolTip("Estructura: WRF002");
        this.showGrid('-boxApliedSpaProfitabilityS');
        this.showPagination_clickHandler();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail_SPA'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxApliedSpaProfitabilityS').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSPA.paramsDetailSpaProfitability};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxApliedSpaProfitabilityS').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchDetail_SPAS');
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
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin_searchDetail_SPAS').bindStore(storeGridDatas);
    },
    onSPAApliedNot: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.beanDetSpaProfitability.IN_DATE_FROM = rowData.data.IN_DATE_FROM;
        this.beanDetSpaProfitability.IN_DATE_TO = rowData.data.IN_DATE_TO;
        this.beanDetSpaProfitability.AIRLINE = rowData.data.AIRLINE;
        this.beanDetSpaProfitability.IN_TUSO = rowData.data.IN_TUSO;
        this.beanDetSpaProfitability.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetSpaProfitability.IN_CURRENP = rowData.data.IN_CURRENP;
        this.beanDetSpaProfitability.FINVOICE = rowData.data.FINVOICE;
        console.log(this.beanDetSpaProfitability);
        meSPA.paramsDetailSpaProfitability.beanString = JSON.stringify(this.beanDetSpaProfitability);
        this.searchDetail_SPANot();
    },
    searchDetail_SPANot: function () {
        win.lblUser_toolTip("Estructura: WRF002");
        this.showGrid('-boxApliedSpaProfitabilityN');
        this.showPagination_clickHandler();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail_SPANot'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxApliedSpaProfitabilityN').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSPA.paramsDetailSpaProfitability};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxApliedSpaProfitabilityN').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchDetail_SPAN');
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
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin_searchDetail_SPAN').bindStore(storeGridDatas);
    },
    onTotalCoupons: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.beanDetSpaProfitability.IN_DATE_FROM = rowData.data.IN_DATE_FROM;
        this.beanDetSpaProfitability.IN_DATE_TO = rowData.data.IN_DATE_TO;
        this.beanDetSpaProfitability.AIRLINE = rowData.data.AIRLINE;
        this.beanDetSpaProfitability.IN_TUSO = rowData.data.IN_TUSO;
        this.beanDetSpaProfitability.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetSpaProfitability.IN_CURRENP = rowData.data.IN_CURRENP;
        this.beanDetSpaProfitability.FINVOICE = rowData.data.FINVOICE;
        console.log(this.beanDetSpaProfitability);
        meSPA.paramsDetailSpaProfitability.beanString = JSON.stringify(this.beanDetSpaProfitability);
        this.searchTotalCoupons();
    },
    searchTotalCoupons: function () {
        win.lblUser_toolTip("Estructura: A2957");
        this.showGrid('-boxTotalCoupons');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTAGSPA'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxTotalCoupons').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSPA.paramsDetailSpaProfitability};
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxTotalCoupons').unmask();
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridTotalCoupons').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridTotalCoupons').setStore(storeGridDatas);
    },
    showGrid: function (nameGrid) {
        Ext.getCmp(prototype.id + meSPA.boxActual).hide();
        meSPA.boxActual = nameGrid;
        meSPA.drillDown.push(meSPA.boxActual);
        Ext.getCmp(prototype.id + meSPA.boxActual).show();
        console.log('showGrid == ' + meSPA.drillDown);
    },
    imgBack_clickHandler: function () {
        console.log(meSPA.boxActual)
        if (meSPA.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meSPA.boxActual).hide();
            meSPA.drillDown.pop();
            meSPA.boxActual = meSPA.drillDown[meSPA.drillDown.length - 1];
            Ext.getCmp(prototype.id + meSPA.boxActual).show();

            if (meSPA.boxActual === '-boxMainDataSpaProfitability' || meSPA.boxActual === '-boxDetailSpaProfitability' || meSPA.boxActual === '-boxApliedSpaProfitability' || meSPA.boxActual === '-boxTotalCoupons') {
                this.hidePagination_clickHandler();
            }
        }
    },
    imgExcel_clickHandler: function () {

        console.log('excell');
        meSPA.dw_excel = true;
//        if (meSPA.boxActual === '-boxMainData') {
//            console.log(Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
//            meSPA.goURLpost('searchSales', this.searchParams, Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
//        } else if (meSPA.boxActual === '-boxDetDataS') {
//            console.log(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
////            console.log(JSON.stringify(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns));
//            meSPA.goURLpost('searchDetSales', JSON.stringify(meSPA.beanDet), Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
//        } else {
//            meSPA.dw_excel = false;
//        }
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
        Ext.getCmp(prototype.id + '-espaciado').hide();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-espaciado').show();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
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
    }

});
