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
    boxActual: '-boxMainData',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meSPA = this;

        meSPA.panelActual = '-boxMainDataSpaProfitability';
        meSPA.drillDown.push(meSPA.boxActual);

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

        meFlown.drillDown = [];
        Ext.getCmp(prototype.id + '-filterMain').hide();
        Ext.getCmp(prototype.id + '-panelRadio').hide();
        Ext.getCmp(prototype.id + '-boxMainDataSpaProfitability').hide();
        this.btnSearch_click();        
    },
    btnSearch_click: function(bean) {
        
        console.log('1--------------- SpaProfitabilityController - btnSearch_click');
        this.bean = bean;
        console.log(this.bean);
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
        me.panelActual = '-boxMainDataSpaProfitability';

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
                    Ext.getCmp(prototype.id + '-boxMainDataSpaProfitability').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchSPA');
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
        Ext.getCmp(prototype.id + '-gridDataSpaProfitability').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataSpaProfitability').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchSPA').bindStore(storeGridDatas);
    },
    onAirlineCode: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        meSPA.drillDown.push(meSPA.panelActual);
        meSPA.panelActual = '-boxDetailSpaProfitability';
        this.beanDetSpaProfitability.IN_DATE_FROM = rowData.data.IN_DATE_FROM;
        this.beanDetSpaProfitability.IN_DATE_TO = rowData.data.IN_DATE_TO;
        this.beanDetSpaProfitability.AIRLINE = rowData.data.AIRLINE;
        this.beanDetSpaProfitability.IN_TUSO = rowData.data.IN_TUSO;
        this.beanDetSpaProfitability.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetSpaProfitability.IN_CURRENP = rowData.data.IN_CURRENP;
        this.beanDetSpaProfitability.FINVOICE = rowData.data.FINVOICE;
        console.log(this.beanDetSpaProfitability);
        meSPA.paramsDetailSpaProfitability.beanString = JSON.stringify(this.beanDetSpaProfitability);
        this.setGridDataDetSpaProfitability();
    },
    setGridDataDetSpaProfitability: function () {
        win.lblUser_toolTip("Estructura: A4183");
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
                    win.lblUser_toolTip("Estructura: WRF001");


                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
//                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    
    clickDetSales_colHandler: function(param,column, e, row, column, x, rowData) {
//        console.log(param);

//        Ext.getCmp(field.id).setGroupValue(param);
        this.beanDet = x.record.data;
        this.beanDet.FlagFactor = param;
        this.showGrid('-boxDetDataS');
        console.log(Ext.getCmp(prototype.id+'-rbgpDetail'));
        if(param==='MIN'){
            Ext.getCmp(prototype.id+'-rbMIN').setValue(true);
        }else if(param==='MAX'){
            Ext.getCmp(prototype.id+'-rbMAX').setValue(true);
        }else{
            Ext.getCmp(prototype.id+'-rbBEL').setValue(true);
        }



        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    
    viewDetSales_colHandler: function() {
        
        this.beanDet.CITYO = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getValue();
        this.beanDet.CITYD = Ext.getCmp(prototype.id + '-cmbcCitiesTo').getValue();
        
        this.showPagination_clickHandler();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {url: prototype.url + '/searchDetSales'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id +  meSPA.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(meSPA.beanDet),dw_excel:false};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + meSPA.boxActual).unmask();
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
                        if(v_storeCities === 0){
                            meSPA.obtainCities();
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
        
        Ext.getCmp(prototype.id + meSPA.boxActual).hide();
        
        meSPA.boxActual = nameGrid;
        meSPA.drillDown.push(meSPA.boxActual);  
        
        Ext.getCmp(prototype.id + meSPA.boxActual).show();

//        console.log('showGrid == ' + meSPA.drillDown);

        
    },
    imgBack_clickHandler: function () {
        
        if (meSPA.drillDown.length > 0) {
                Ext.getCmp(prototype.id + meSPA.boxActual).hide();
                meSPA.drillDown.pop();
                meSPA.boxActual = meSPA.drillDown[meSPA.drillDown.length-1];
                Ext.getCmp(prototype.id +  meSPA.boxActual).show();
                
//                this.showGrid(meSPA.drillDown[meSPA.drillDown.length-1]);
                
                if(meSPA.boxActual === '-boxMainData'){
                    this.hidePagination_clickHandler();
                }
                
        }
        
//        if(meSPA.boxActual === '-boxMainDataSpaProfitability'){
//            console.log('main');
//            Ext.getCmp(prototype.id +  meSPA.boxActual).show();
//        }
//        if(meSPA.boxActual === '-boxDetailSpaProfitability'){
//            console.log('detail');
//            meSPA.boxActual === '-boxMainDataSpaProfitability'
//            this.showGrid('-boxMainDataSpaProfitability');
//            Ext.getCmp(prototype.id +  meSPA.boxActual).show();
//        }
//        console.log('imgBack_clickHandler == ' + meSPA.drillDown);
        
    },
    imgExcel_clickHandler: function () {
        
        console.log('excell');
        meSPA.dw_excel = true;
        if(meSPA.boxActual === '-boxMainData'){
            console.log(Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
            meSPA.goURLpost('searchSales',this.searchParams,Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
        }else if(meSPA.boxActual === '-boxDetDataS'){
            console.log(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
//            console.log(JSON.stringify(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns));
            meSPA.goURLpost('searchDetSales',JSON.stringify(meSPA.beanDet),Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
        }else{
            meSPA.dw_excel = false;
        }
    },
    goURLpost: function (method,parms,columns) {
        
        var js_columns = JSON.stringify(columns);
        
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' +method+'?dw_excel=true';

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
    obtainCities: function () {

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainCities',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
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
    rgchange: function(field, newvalue, oldvalue,options) {
//        this.beanDet.FlagFactor = param;
//        console.log(field);
        
        if (oldvalue) {
//            console.log(Ext.getCmp(field.id).getGroupValue());
            this.beanDet.FlagFactor = Ext.getCmp(field.id).getGroupValue();
            this.viewDetSales_colHandler();
        }
//        console.log(this.beanDet);
    },
    dateChange: function(field, newvalue, oldvalue) {
        var V_CDATE = Ext.getCmp(prototype.id + '-txtDateCreate').getValue();

        V_CDATE = Ext.util.Format.date(V_CDATE, 'Ymd');
        
        console.log(V_CDATE);
        
        this.beanDet.FECR = V_CDATE;
        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    
//    setWidthPie: function () {
//        console.log(meSPA.boxActual);
//        var ancho = Ext.getCmp(prototype.id + meSPA.boxActual).getWidth();
//        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
//        Ext.getCmp(prototype.id + '-pie').setVisible(true);
//    },
//    getPaggin: function () {
//        meSPA.pagginActual = '';
//        switch (meSPA.boxActual) {
////            case  '-boxMainDataSpaProfitability':
////                meSPA.pagginActual = '-paggin_searchSPA';
////                break;
////            case '-BoxDDTMCountryofSale':
////                me.pagginActual = '-paggin2';
////                break;
////            case '-BoxDDTMDetailbyAgent':
////                me.pagginActual = '-paggin3';
////                break;
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
//        var pag = Ext.getCmp(prototype.id + meSPA.pagginActual);
//        pag.moveFirst();
//    }, pagPrevious: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + meSPA.pagginActual);
//        pag.movePrevious();
//    },
//    pagNext: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + meSPA.pagginActual);
//        pag.moveNext();
//    },
//    pagLast: function (obj, e) {
//        this.getPaggin();
//        var pag = Ext.getCmp(prototype.id + meSPA.pagginActual);
//        pag.moveLast();
//    },
//    
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
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
