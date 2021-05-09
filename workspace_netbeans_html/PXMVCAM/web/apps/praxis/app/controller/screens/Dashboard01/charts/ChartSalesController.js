Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartSalesController',
    searchParams: {},
    columns2: {},
    beanChart: {},
    beanChart_F: {},
    beanDet: {},
    dataObtain_chart: {},
    dataAirline_chart: [],
    lstTotales: [],
    lstTotalesGraf: [],
    storeGridDatas: '',
    meSChart: '',
    dw_excel: false,
    boxActual: '-boxPrincipalSales',
    drillDown: [],
    colors: [
        '#8ca640',
        '#974144',
        '#4091ba',
        '#8e658e',
        '#3b8d8b',
        '#b86465',
        '#d2af69',
        '#6e8852',
        '#3dcc7e',
        '#a6bed1',
        '#cbaa4b',
        '#998baa'
    ],
    _path: '',
    init: function (view) {
        meSChart = this;
        this.setStoreData();

    },
    afterRender: function () {
        
        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue("");
        meSChart.inicio();
        
        Ext.getCmp(prototype.id + '-Box_Chart_Sales').items.items[0].setValue(true);

    },
    setStoreData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        
        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').bindStore(storeComboDataMonth);
    },
    inicio: function () {
        console.clear();
        this.setFormatParameter();
        var valueRadio = Ext.getCmp(prototype.id + '-Box_Chart_Sales').getValue().rb;

        switch (valueRadio) {
            case 'rbc6':   //Total
                this.loadTotalControlTotalChart();
                break;
            case 'rbc2':   //Channels
                this.loadChannelsChart();
                break;
            case 'rbc1' :  //On/Off
                this.search();
                break;
            case 'rbc3' :  //Countries
//                this.loadCountryOfSale();
                break;
            case 'rbc4' :  //Cabin
//                this.loadCabinChart();
                break;
            case 'rbc5' :  //Cabin
//                this.loadAgentChart_3();
                break;
        }
    },
    setFormatParameter: function () {

        meSChart.beanChart = {};
        meSChart.beanChart_F = {};
        
        meSChart.beanChart.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue();
        meSChart.beanChart.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').getValue();
        
        meSChart.beanChart_F.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue();
        meSChart.beanChart_F.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').getValue();
        
        meSChart.searchParams = JSON.stringify(meSChart.beanChart);
        console.log(meSChart.beanChart);

    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue(Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue());
    },
    onClickSearch: function () {
        this.inicio();
    },
    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxSal_Total').hide();
        Ext.getCmp(prototype.id + '-boxSal_Channels_1').hide();
        Ext.getCmp(prototype.id + '-boxSal_Channels_2').hide();
        Ext.getCmp(prototype.id + '-boxSal_OnOff').hide();
        Ext.getCmp(prototype.id + '-boxSal_OnOff_2').hide();
    },
    loadTotalControlTotalChart: function () {
        
        win.lblUser_toolTip("Estructura: IMF077");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadTotalControlTotalChart'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
//                            var lstTotales = res.lstTotales;
                            me.lstTotales = res.lstTotales;
                            for (var i = 0; i < me.lstTotales.length; i++) {
                                me.lstTotales[i].totQKMS = 100;
                                me.lstTotales[i].VENDOR = me.lstTotales[i].TYPE + ' , ' + Ext.util.Format.number(me.lstTotales[i].Perc2, '0,000.00') + '%';;   
                            }
                            
                            me.lstTotalesGraf = res.data;
                            console.log(me.lstTotalesGraf);
                            var pivot = [];
                            var existe;
                            for (var i = 0; i < me.lstTotalesGraf.length; i++) {
                                existe = false;
                                for (var j = 0; j < pivot.length; j++) {
                                    if(pivot[j].mes === me.lstTotalesGraf[i].strFormatDate){
                                        existe = true;
                                        switch (me.lstTotalesGraf[i].TYPE) {
                                            case 'ACMS':
                                                pivot[j].ACMS = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'ADMS':
                                                pivot[j].ADMS = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'EXCH':
                                                pivot[j].EXCH = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'RFND':
                                                pivot[j].RFND = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'SALE':
                                                pivot[j].SALE = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                        }
                                    }
                                }
                                if(!existe){
                                    var items = { mes: me.lstTotalesGraf[i].strFormatDate, 
                                                 ACMS: '0',
                                                 ADMS: '0',
                                                 EXCH: '0',
                                                 RFND: '0',
                                                 SALE: '0'
                                        };
                                    switch (me.lstTotalesGraf[i].TYPE) {
                                        case 'ACMS':
                                            items.ACMS = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'ADMS':
                                            items.ADMS = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'EXCH':
                                            items.EXCH = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'RFND':
                                            items.RFND = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'SALE':
                                            items.SALE = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                    }
                                    pivot.push(items);
                                }
                                
                            }
                            console.log(pivot);
                            console.log(me.lstTotales);
                            
                            var storeDataTotales = Ext.create('Ext.data.Store', {
                                data: me.lstTotales,
                                autoLoad: true
                            });
                            var storeDataPivot = Ext.create('Ext.data.Store', {
                                data: pivot,
                                autoLoad: true
                            });
                            
                            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').bindStore(storeDataTotales);
                            Ext.getCmp(prototype.id + '-displaySAChart33').bindStore(storeDataTotales);
                            Ext.getCmp(prototype.id + '-displaySAChart40').bindStore(storeDataTotales);
                            Ext.getCmp(prototype.id + '-displaySAChart32').bindStore(storeDataPivot);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_boxChart6').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    loadChannelsChart: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadChannelsChart'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    
                    console.log(res.data); //lstDataChannelsTotal
                    console.log(res.lstDataChannelsByDate); //lstDataChannelsByDate
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            
                            var storeChannelsByDate = Ext.create('Ext.data.Store', {
                                data: res.lstDataChannelsByDate,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displaySAChart20').bindStore(storeChannelsByDate);
                            Ext.getCmp(prototype.id + '-displaySAChart20_2').bindStore(storeChannelsByDate);
                            
                            // ------------------------------------- 1er GRAFICO -----------------------------------------------------------
                            
                            var lstDataEdit = res.data;
                            for (var i = 0; i < lstDataEdit.length; i++) {
                                lstDataEdit[i].LABEL = lstDataEdit[i].strDescription + ' ,  ' + Ext.util.Format.number(lstDataEdit[i].CUPONS_PERCENT, '0,000.00') + '%';
                                lstDataEdit[i].LABEL2 = lstDataEdit[i].strDescription + ' ,  ' + Ext.util.Format.number(lstDataEdit[i].AMOUNT_PERCENT, '0,000.00') + '%';
                            }
                            
                            var storeChannelChart15 = Ext.create('Ext.data.Store', {
                                data: lstDataEdit,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displaySAChart15').bindStore(storeChannelChart15);
                            Ext.getCmp(prototype.id + '-displaySAChart16').bindStore(storeChannelChart15);
                            
                            // ------------------------------------- 2do GRAFICO -----------------------------------------------------------
                            
                            
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_boxChart2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_boxChart2_2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displaySAChart15').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displaySAChart16').bindStore(storeGridDatas);
    },
    search: function () {

        Ext.Ajax.request({
            url: prototype.url + '/searchTest',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: meSChart.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                
                var lstDataGrid = res.lstData[1]; //P_SALES_PER_MONTH_DATA
                var storeDataGrid = Ext.create('Ext.data.Store', {
                    data: lstDataGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridData_boxChart1').bindStore(storeDataGrid);
                Ext.getCmp(prototype.id + '-gridData_boxChart1_2').bindStore(storeDataGrid);
                Ext.getCmp(prototype.id + '-gridData_boxChart2_S').bindStore(storeDataGrid);
                
//                 ----------------------------- Totales  GRID ----------------------------------------------
//                var totGrid = res.lstData[0][0]; //P_SALES_PER_MONTH_TOTALS
//                
//                Ext.getCmp(prototype.id + '-totQTY').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS, '0,000'));
//                Ext.getCmp(prototype.id + '-totQTY_ON').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS_ON, '0,000'));
//                Ext.getCmp(prototype.id + '-totQTY_OFF').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS_OFF, '0,000'));
                
//                // ------------------------------------------ 1er Grafico ------------------------------------------------------ //
//                
                var totals = res.lstData[0];
                totals[0].LABEL = 'Total ON, ' + Ext.util.Format.number(totals[0].CUPONS_ON_PERCENT, '0,000.00') + '%';
                totals[0].LABEL_AMOUNT = 'Total ON, ' + Ext.util.Format.number(totals[0].AMOUNT_ON_PERCENT, '0,000.00') + '%';
                
                var item = {};
                item.CUPONS_ON_PERCENT = totals[0].CUPONS_OFF_PERCENT;
                item.AMOUNT_ON_PERCENT = totals[0].AMOUNT_OFF_PERCENT;
                item.LABEL = 'Total OFF, ' + Ext.util.Format.number(item.CUPONS_ON_PERCENT, '0,000.00') + '%';
                item.LABEL_AMOUNT = 'Total OFF, ' + Ext.util.Format.number(item.AMOUNT_ON_PERCENT, '0,000.00') + '%';
                totals.push(item);
                
                var storeData1er = Ext.create('Ext.data.Store', {
                    data: totals,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart11').bindStore(storeData1er);
                Ext.getCmp(prototype.id + '-displaySAChart13').bindStore(storeData1er);
                
                
                // --------------------------------------------- 3er Grafico --------------------------------------------------  //
                
                for (var i = 0; i < lstDataGrid.length; i++) {
                    lstDataGrid[i].DESstrFormatDate = lstDataGrid[i].strFormatDate.substring(5);
                }
                var storeDataEdi = Ext.create('Ext.data.Store', {
                    data: lstDataGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart01').bindStore(storeDataEdi);
                Ext.getCmp(prototype.id + '-displaySAChart14').bindStore(storeDataEdi);
            }
        });
    },
    chooseChart_clickHandler: function (obj, rb_new, rb_old, func) {
        
        var valueRadio = rb_new.rb;
        this.hidePanelGraficos();
        this.setFormatParameter();
        
        switch (valueRadio) {
            case 'rbc6':    //Total
                Ext.getCmp(prototype.id + '-boxSal_Total').show();
                this.loadTotalControlTotalChart();
                break;
            case 'rbc2':    //Channels
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
                this.loadChannelsChart();
                break;
            case 'rbc1':    //On/Off
                Ext.getCmp(prototype.id + '-boxSal_OnOff').show();
                this.search();
                break;
            case 'rbc3':    //Countries
//                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
//                this.loadCountryOfSale();
                break;
            case 'rbc4':    //Cabin
//                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
//                this.loadCabinChart();
                break;
            case 'rbc5':    //Agent
//                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
//                this.loadAgentChart_3();
                break;
        }
    },
    changeArray_clickHandler: function (obj, value, old_value) {
        
        if (value) {
            Ext.getCmp(prototype.id + '-gridData_boxChart6').hide();
            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').show();
        } else {
            Ext.getCmp(prototype.id + '-gridData_boxChart6').show();
            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').hide();
        }
    },
    chooseUSO_clickHandler: function (obj, value, old_value) {
        
        var valueRadio = Ext.getCmp(prototype.id + '-Box_Chart_Sales').getValue().rb;
        
        if(valueRadio === 'rbc2'){
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').hide();
                Ext.getCmp(prototype.id + '-boxSal_Channels_2').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
                Ext.getCmp(prototype.id + '-boxSal_Channels_2').hide();
            }
        }
        else if(valueRadio === 'rbc1') {
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_OnOff').hide();
                Ext.getCmp(prototype.id + '-boxSal_OnOff_2').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_OnOff').show();
                Ext.getCmp(prototype.id + '-boxSal_OnOff_2').hide();
            }
        }
    },

    //To render
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnRender: function (sprite, config, data, index) {
        return {
            fillStyle: this.colors[index],
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    }
});
