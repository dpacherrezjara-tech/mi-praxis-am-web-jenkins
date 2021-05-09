Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartInterlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartInterlineController',
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    dataObtain_chart: {},
    dataAirline_chart: [],
    storeGridDatas: '',
    meIChart: '',
    dw_excel: false,
    boxActual: '-boxMainData_interline',
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
        meIChart = this;
        this.setStoreData();

    },
    afterRender: function () {

        Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue("");
        meIChart.inicio();

        Ext.getCmp(prototype.id + '-rbChart_IA').items.items[0].setValue(true);
    },
    setStoreData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').bindStore(storeComboDataMonth);
        this.dataObtain_chart.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain_chart)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                me.lstAIRLINE = res.lstAIRLINE;
                console.log(res);
                var storeDataAirline = Ext.create('Ext.data.Store', {
                    data: me.lstAIRLINE,
                    autoLoad: false
                });
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').bindStore(storeDataAirline);
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').setValue('');

            }
        });
    },
    inicio: function () {
        console.clear();
        this.setFormatParameter();
        var valueRadio = Ext.getCmp(prototype.id + '-rbChart_IA').getValue().rb;

        switch (valueRadio) {
            case 'rbc1_IA':
                this.searchInterline();
                break;

            case 'rbc2_IA':
                this.searchInterlineByAir();
                break;

            case 'rbc3_IA' :
                break;

        }
    },
    setFormatParameter: function () {

        meIChart.bean = {};

        var valueRadio = Ext.getCmp(prototype.id + '-rbChart_IA').getValue().rb;

        switch (valueRadio) {
            case 'rbc1_IA':
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();
                meIChart.bean.A050AIRLIN = Ext.getCmp(prototype.id + '-cmbAirline_INT2').getValue();

                break;
            case 'rbc2_IA':
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();

                var valueP = Ext.getCmp(prototype.id + '-rbcP').getValue().rb01;
                switch (valueP) {
                    case 'Prime' :
                        meIChart.bean.strEstado = 'P';
                        break;

                    case 'Reject' :
                        meIChart.bean.strEstado = 'R';
                        break;

                }

                break;
            case 'rbc3_IA' :
                break;

        }
        meIChart.searchParams = JSON.stringify(meIChart.bean);
        console.log(meIChart.bean);

    },
//    checkEvent: function (obj, e) {
//        console.log(obj);
//        console.log(e);
//    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue(Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue());
    },
    onClickSearch: function () {
        this.inicio();
    },

    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxInt_Month').hide();
        Ext.getCmp(prototype.id + '-boxInt_Airline').hide();
    },

    onChangeRadioAirline: function (obj, rb_new, rb_old, func) {
        var valueRadio = rb_new.rb;
        this.setFormatParameter();
        this.searchInterlineByAir();

    },

    searchAnalysis: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAnalysis'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                    win.lblUser_toolTip("Estructura: SFI040");
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR').setText(obj.yearTo);
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR').setText((parseInt(obj.yearFrom) - 1) + '');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP1_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP2_interline').bindStore(storeGridDatas);

    },
    searchInterline: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterline'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
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
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_INT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_INT2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_INT_TOT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_03').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    searchInterlineByAir: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterlineByAir'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);

                    if (res.success) {
                        meIChart.dataAirline_chart = res.data;
                        var newArray = [];
                        var newArray2 = [];
                        for (var i = 0; i < meIChart.dataAirline_chart.length; i++) {
                            if (i < 10) {
                                newArray.push(meIChart.dataAirline_chart[i]);
                            }
                        }
                        for (var i = (newArray.length - 1); i >= 0; i--) {
                            newArray2.push(newArray[i]);
                        }

                        var storeDataNew = Ext.create('Ext.data.Store', {
                            data: newArray2,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_04').bindStore(storeDataNew);


                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').bindStore(storeGridDatas);



    },

    onChangeRadio: function (obj, rb_new, rb_old, func) {
        console.log('onChangeRadio');
        var valueRadio = rb_new.rb;
        this.hidePanelGraficos();
        switch (valueRadio) {
            case 'rbc1_IA':
                Ext.getCmp(prototype.id + '-boxInt_Month').show();
                this.searchInterline();
                break;
            case 'rbc2_IA':
                Ext.getCmp(prototype.id + '-boxInt_Airline').show();
                this.setFormatParameter();
                this.searchInterlineByAir();
                break;
            case 'rbc3_IA' :

                break;

        }
    },
    onChangeChart_IA_01: function (obj, rb_new, rb_old, func) {


        var valueRadio = rb_new.rb2;
        switch (valueRadio) {
            case 'rbcC_IA':


                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').show();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').hide();
                break;
            case 'rbcG_IA':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').hide();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').show();

                break;

        }
    },
    onChangeChart_IA_02: function (obj, rb_new, rb_old, func) {


        var valueRadio = rb_new.rb3;
        switch (valueRadio) {
            case 'rbcD_IA2':


                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').show();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').hide();
                break;
            case 'rbcA_IA2':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').hide();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').show();

                break;

        }
    },

    onChangeCKTotal: function (obj, value, old_value) {


        if (value) {
            Ext.getCmp(prototype.id + '-byMonth_01').hide();
            Ext.getCmp(prototype.id + '-byMonth_02').show();
        } else {
            Ext.getCmp(prototype.id + '-byMonth_01').show();
            Ext.getCmp(prototype.id + '-byMonth_02').hide();
        }




    },

    onChangeTopAirline: function (obj, value, cmp, strFunc) {

        var data = meIChart.dataAirline_chart;
        var newArray = [];
        var newArray2 = [];
        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                newArray.push(data[i]);
            }
        }
        for (var i = (newArray.length - 1); i >= 0; i--) {
            newArray2.push(newArray[i]);
        }

        var storeDataNew = Ext.create('Ext.data.Store', {
            data: newArray2,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_04').bindStore(storeDataNew);

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
    },
});
