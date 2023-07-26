Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.ByIATAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByIATAController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meIATA: '',
    dw_excel: false,
    boxActual: '-boxMainData',
    drillDown: [],
    _path: '',
    // </editor-fold>
//    init: function(view) {
//        meIATA = this;
////        prototype.id = 'DataRequestedByBankForm';
////        prototype.url = CONTEXTPATH + '/DataRequestedByBank';
//        console.log(' ByIATAController - init');
//        this.btnSearch_click();
//        meIATA.drillDown.push(meIATA.boxActual);
//        console.log(meIATA.drillDown);
//    },
    init: function (view) {
        meIATA = this;

        meIATA.panelActual = '-boxMainDataByIATA';
        meIATA.drillDown.push(meIATA.boxActual);

        prototypeProgram.view = 'screens-dashboard-01-form';
        prototypeProgram.nprog = 'PX0000010X';
        prototypeProgram.title = 'Dashboard 1';
        prototypeProgram.modulo = '';

    },
    afterRender: function () {
        
        console.log('1-----------------------ByIATAController - afterweeeeeeeeeeee');
    },
    inicio: function () {

        console.log(' ----- Inicio IATA -------');

        meIATA.drillDown = [];
        Ext.getCmp(prototype.id + '-filterMain').hide();
        Ext.getCmp(prototype.id + '-panelRadio').hide();
        Ext.getCmp(prototype.id + '-boxFlownAnalysis').hide();
        this.btnSearch_click();        
    },
    btnSearch_click: function(bean) {
        
        console.log('1--------------- ByIATAController - btnSearch_click');
        this.bean = bean;
        console.log(this.bean);
        this.setFormatParameter();
        this.search();
    },
    setFormatParameter: function () {
        
        
        meIATA.bean = {};

        meIATA.bean.IN_ANIO_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        meIATA.bean.IN_ANIO_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
//        meIATA.bean.IN_TIPO = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        
//        meIATA.bean = {};
        var beanString = JSON.stringify(meIATA.bean);
        this.searchParams = beanString;
        console.log('PARAMETROS IATA');
        console.log(meIATA.bean);
    },
    search: function() {
        console.log(' ByIATAController - search');
        console.log(prototype.url + '/searchIATA');
        Ext.Ajax.request({
            url: prototype.url + '/searchIATA',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString:this.searchParams,dw_excel:false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log(res.lst);
//                console.log(res.lstData[1]);
//                console.log(res.lstData[2]);
//                console.log(res.lstData[3]);
//                console.log(res.lstData[4]);
                var totals = res.lst; //P_SALES_PER_MONTH_TOTALS
                var lstData = res.lst; //P_SALES_PER_MONTH_DATA
//                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDataByIATA').bindStore(storeData);
//                
//                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalAmount').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT, '0,000'));
//                Ext.getCmp(prototype.id + '-totAVG').setText(Ext.util.Format.number(totals.totAVG, '0,000.00'));
//                
//                Ext.getCmp(prototype.id + '-lblTotalCpnON').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_ON, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalCpnONPerc').setText(Ext.util.Format.number(totals.CUPONS_ON_PERCENT, '0,000.00'));
//                Ext.getCmp(prototype.id + '-lblTotalAmountON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalAmountONPerc').setText(Ext.util.Format.number(totals.AMOUNT_ON_PERCENT, '0,000.00'));
//                Ext.getCmp(prototype.id + '-lblTotalAvgON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
//                
//                Ext.getCmp(prototype.id + '-lblTotalCpnOFF').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_OFF, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalCpnOFFPerc').setText(Ext.util.Format.number(totals.CUPONS_OFF_PERCENT, '0,000.00'));
//                Ext.getCmp(prototype.id + '-lblTotalAmountOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalAmountOFFPerc').setText(Ext.util.Format.number(totals.AMOUNT_OFF_PERCENT, '0,000.00'));
//                Ext.getCmp(prototype.id + '-lblTotalAvgOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));
//                
//                Ext.getCmp(prototype.id + '-lblTotalQCPNSNR').setText(Ext.util.Format.number(totals.TOTAL_QCPNS0, '0,000'));
//                Ext.getCmp(prototype.id + '-lblTotalAMOUNTNR').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT0, '0,000'));
                
                
            }
        });
        
//        meIATA.dw_excel = false;
        
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
                    Ext.getCmp(prototype.id +  meIATA.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(meIATA.beanDet),dw_excel:false};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + meIATA.boxActual).unmask();
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
                            meIATA.obtainCities();
                        }


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
//                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetSalesS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        

    },
    showGrid: function (nameGrid) {
        
        Ext.getCmp(prototype.id + meIATA.boxActual).hide();
        
        meIATA.boxActual = nameGrid;
        meIATA.drillDown.push(meIATA.boxActual);  
        
        Ext.getCmp(prototype.id + meIATA.boxActual).show();

//        console.log('showGrid == ' + meIATA.drillDown);

        
    },
    imgBack_clickHandler: function () {
        
        if (meIATA.drillDown.length > 0) {
                Ext.getCmp(prototype.id + meIATA.boxActual).hide();
                meIATA.drillDown.pop();
                meIATA.boxActual = meIATA.drillDown[meIATA.drillDown.length-1];
                Ext.getCmp(prototype.id +  meIATA.boxActual).show();
                
//                this.showGrid(meIATA.drillDown[meIATA.drillDown.length-1]);
                
                if(meIATA.boxActual === '-boxMainData'){
                    this.hidePagination_clickHandler();
                }
                
        }
//        console.log('imgBack_clickHandler == ' + meIATA.drillDown);
        
    },
    imgExcel_clickHandler: function () {
        
        console.log('excell');
        meIATA.dw_excel = true;
        if(meIATA.boxActual === '-boxMainData'){
            console.log(Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
            meIATA.goURLpost('searchSales',this.searchParams,Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
        }else if(meIATA.boxActual === '-boxDetDataS'){
            console.log(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
//            console.log(JSON.stringify(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns));
            meIATA.goURLpost('searchDetSales',JSON.stringify(meIATA.beanDet),Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
        }else{
            meIATA.dw_excel = false;
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
