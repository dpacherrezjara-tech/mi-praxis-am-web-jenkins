Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartFlownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartFlownController',
    searchParams: {},
    searchParamsB: {},
    columns2: {},
    beanChart: {},
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
    meFChart: '',
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
        meFChart = this;
        this.setStoreData();

    },
    afterRender: function () {
        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue("");
        meFChart.inicio();
//        Ext.getCmp(prototype.id + '-Box_Chart_Flown').items.items[0].setValue(true);
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').bindStore(storeComboDataMonth);
    },
    inicio: function () {
        this.setFormatParameter();
    },
    inicio2: function () {
        this.setFormatParameter();
        this.loadFAMonthChart();
    },
    setFormatParameter: function () {

        meFChart.beanChartFM = {};

        meFChart.beanChartFM.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbFADateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateFromMonth').getValue();
        meFChart.beanChartFM.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbFADateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateToMonth').getValue();
        meFChart.beanChartFM.IN_FECHA_FROMB = (Ext.getCmp(prototype.id + '-cmbFADateFromYear').getValue() - 1) + Ext.getCmp(prototype.id + '-cmbFADateFromMonth').getValue();
        meFChart.beanChartFM.IN_FECHA_TOB = (Ext.getCmp(prototype.id + '-cmbFADateToYear').getValue() - 1) + Ext.getCmp(prototype.id + '-cmbFADateToMonth').getValue();
        meFChart.searchParams = JSON.stringify(meFChart.beanChartFM);
        console.log(meFChart.beanChartFM);
    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue(Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue());
    },
    onClickSearch: function () {
        this.inicio();
    },
    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxSal_TotalF').hide();
    },
    loadFAMonthChart: function () {
        console.log('loadFAMonthChart');
        win.lblUser_toolTip("Estructura: A1791");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchWKperMOCH'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxSal_TotalF').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meFChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-displayFOChartP').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + obj.strYear + '</center>');
                            Ext.getCmp(prototype.id + '-displayFOChartPB').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + obj.strYearB + '</center>');
                            var vsy = '<a style="color:#209938;">' + obj.strYear + '</a>'
                            var vsyb = '<a style="color:#1c50c9;">' + obj.strYearB + '</a>'
                            var vs =  vsyb + ' vs ' + vsy ;
                            Ext.getCmp(prototype.id + '-displayFOChartP2').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + vs + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_boxChartFlown').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_boxChartFlownB').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFOChartC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFOChartA').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFOChartP').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFOChartP2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFOChartPB').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    rbChangeType_Fo: function () {
        console.log('RADIOS');
        var rbgType_Fo = Ext.getCmp(prototype.id + '-radiogroupType_Fo').getValue().rbgType_Fo;
        switch (rbgType_Fo) {
            case 'C':
                Ext.getCmp(prototype.id + '-displayFOChartC').setVisible(true);
                Ext.getCmp(prototype.id + '-displayFOChartA').setVisible(false);
                break;
            case 'A':
                Ext.getCmp(prototype.id + '-displayFOChartC').setVisible(false);
                Ext.getCmp(prototype.id + '-displayFOChartA').setVisible(true);
                break;
        }
        this.loadFAMonthChart();
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
