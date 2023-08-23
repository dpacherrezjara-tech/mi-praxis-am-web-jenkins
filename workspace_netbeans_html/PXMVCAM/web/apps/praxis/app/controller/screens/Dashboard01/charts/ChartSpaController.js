Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartSpaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartSpaController',
    searchParams: {},
    searchParamsB: {},
    columns2: {},
    beanChart: {},
    fecha: new Date(),
    beanChart_F: {},
    beanDet: {},
    dataObtain_chart: {},
    searchParamsCountryOfSale: {},
    dataRoute_chart: [],
    dataAirline_chart: [],
    lstAgent_chart: [],
    lstTotales: [],
    lstTotalesGraf: [],
    storeGridDatas: '',
    meSPAChart: '',
    cara: 0,
    dw_excel: false,
    boxActual: '-boxMainDataFA',
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
        meSPAChart = this;
        this.setStoreData();

    },
    afterRender: function () {
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbSPAFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbSPAFromMonth').setValue('01');
        meSPAChart.inicio();
//        Ext.getCmp(prototype.id + '-Box_Chart_SPA').items.items[0].setValue(true);
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id + '-cmbSPAFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbSPAFromMonth').bindStore(storeComboDataMonth);
    },
    inicio: function () {
        this.setFormatParameter();
        this.loadSPAChart();
    },
    setFormatParameter: function () {

        meSPAChart.beanChartSPA = {};
        console.log(this.cara);
        meSPAChart.beanChartSPA.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbSPAFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbSPAFromMonth').getValue();
        meSPAChart.beanChartSPA.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbSPAFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbSPAFromMonth').getValue();
        meSPAChart.beanChartSPA.IN_TDOC = '1';
        meSPAChart.beanChartSPA.IN_CURRENP = 'USD';
//        meSPAChart.beanChartSPA.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbFADateFromYear1').getValue() + Ext.getCmp(prototype.id + '-cmbFADateToMonth1').getValue();

        meSPAChart.searchParams = JSON.stringify(meSPAChart.beanChartSPA);
        console.log(meSPAChart.beanChartSPA);
    },
    cbxDateFromMonth_changeHandler_chart: function () {
//        Ext.getCmp(prototype.id + '-cmbSPAFromMonth').setValue(Ext.getCmp(prototype.id + '-cmbSPAToMonth').getValue());
    },
    onClickSearch: function () {
        this.inicio();
        console.log('onClickSearch');
    },
    btnDisplay_click: function () {
        var panelTab = Ext.getCmp(prototype.id + '-panelTabs');
        var panelChart = Ext.getCmp(prototype.id + '-panelChart');

        panelTab.show();
        panelChart.hide();

    },
    loadSPAChart: function (range) {

        win.lblUser_toolTip("Estructura: WRF001");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_ChartsSPA'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: meSPAChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            console.log(res.data.length);
//                            
                            var lstTot_piePB = [];
                            var item_pie1PB = {};
                            var k = 0;
                            if(range>0){
                                console.log('range es vacío');
                                //nadine
                            }else{
                                console.log('range es 10');
                                range = 9;
                            }
                            for ( k = range-1; k >= 0; k--) {
                                item_pie1PB.QCUPON = res.data[k].QCUPON;
                                item_pie1PB.strAirlineName = res.data[k].strAirlineName;
                                lstTot_piePB.push(item_pie1PB);
                                item_pie1PB = {};
                            }
                            console.log(lstTot_piePB);
                            var storeDataTotales_piePB = Ext.create('Ext.data.Store', {
                                data: lstTot_piePB,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displaySPA').bindStore(storeDataTotales_piePB);

                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_SPA').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_SPA').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displaySPA').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    chooseRange_clickHandler: function (obj, rb_new, rb_old, func) {
        var range = 0;
        var valueRadio = rb_new.rb;
        switch (valueRadio) {
            case 'VE':
                console.log('rango por 20');
                range = 20;
                break;
            case 'QU':
                console.log('rango por 15');
                range = 15;
                break;
            case 'DI':
                console.log('rango por 10');
                range = 10;
                break;
            case 'CI':
                console.log('rango por 5');
                range = 5;
                break;
        }
        this.loadSPAChart(range);
    },

    btnExcel_click: function (obj, e) {
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
    },
    exportExcel: function () {
        this.setFormatParameter();
//        if (Ext.getCmp(prototype.id + '-boxSPAByCarrier1').isVisible()) {
//            global.getFile(prototype.url + '/getXLSXByCarrierQTY?beanString=' + meSPAChart.searchParams);
//        } 
    },
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
