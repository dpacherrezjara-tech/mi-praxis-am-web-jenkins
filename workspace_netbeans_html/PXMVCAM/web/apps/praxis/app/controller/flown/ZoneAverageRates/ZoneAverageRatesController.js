/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ZoneAverageRates.ZoneAverageRatesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ZoneAverageRatesController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    bean: '',
    beanDetDay: {},
    beanDetZone: {},
    childs: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailCoupon: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'ZoneAverageRatesForm';
        prototype.url = CONTEXTPATH + '/ZoneAverageRates';
        me = this;

        me.gridActual = '-gridData';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ZoneAverageRatesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#ZoneAverageRatesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ZoneAverageRatesForm-btnClear': {
                click: this.btnClear_click
            },
            '#ZoneAverageRatesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ZoneAverageRatesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ZoneAverageRatesForm-btnBack': {
                click: this.btnBack_click
            },
            '#ZoneAverageRatesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ZoneAverageRatesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ZoneAverageRatesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ZoneAverageRatesForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------

            '#ZoneAverageRatesForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ZoneAverageRatesForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ZoneAverageRatesForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ZoneAverageRatesForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
//            '#ZoneAverageRatesForm-cmbDateFromDay': {
//                afterrender: this.afterRenderDay,
//                select: this.selectComboFromDay
//            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
    },
//    afterRenderDay: function(obj) {
//        obj.setValue('');
//    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
//    selectComboFromDay: function(obj) {
//        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
//        comboToDay.setValue(obj.getValue());
//    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
//        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbZone = Ext.getCmp(prototype.id + '-cmbZone');
        cmbZone.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["ASI", "ASIA"],
                ["CAN", "CANADA"],
                ["CAR", "CARIBBEAN"],
                ["CAM", "CENTRAL AMERICA"],
                ["USA", "UNITED STATES"],
                ["EUR", "EUROPE"],
                ["FRO", "BORDER"],
                ["LOC", "LOCAL"],
                ["PLA", "BEACH"],
                ["SUD", "SOUTH AMERICA"],
                ["OCE", "OCEANIA"],
                ["AFR", "AFRICA"]
            ]
        }));
        cmbZone.setValue("");

        var cmbStock = Ext.getCmp(prototype.id + '-cmbStock');
        cmbStock.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["139", "139"],
                ["OAL", "OAL"]
            ]
        }));
        cmbStock.setValue("");


    },
    btnSearch_click: function(obj, e) {

        this.setSearchParams();
        this.setGridData();

    },
    setSearchParams: function() {
        me.bean = {};

        me.bean.IN_DATEF = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();


        me.bean.IN_DATET = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_ZONA = Ext.getCmp(prototype.id + '-cmbZone').getValue();
        me.bean.IN_CCIA = Ext.getCmp(prototype.id + '-cmbStock').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);

    },
    setGridData: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridData').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-gridData').unmask();
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);

//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
//                            me.setWidthPie();

                            var lstData = res.data;
                            var a = [];
                            var dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function(index, value) {
                                if (a.indexOf(value.DFLIGHT) < 0) {
                                    var x = [];

                                    var totQTY_CUPONES_CONT = 0;
                                    var totQTY_CUPONES_PEND = 0;
                                    var totVALOR_CUPONES_CONT = 0;
                                    var totPROMEDIO_CUPONES_CONT = 0;
                                    Ext.Object.each(lstData, function(index, valuex) {
                                        if (value.DFLIGHT === valuex.DFLIGHT) {
                                            totQTY_CUPONES_CONT += valuex.QTY_CUPONES_CONT;
                                            totQTY_CUPONES_PEND += valuex.QTY_CUPONES_PEND;
                                            totVALOR_CUPONES_CONT += valuex.VALOR_CUPONES_CONT;
                                            totPROMEDIO_CUPONES_CONT += valuex.PROMEDIO_CUPONES_CONT;
                                        }
                                    });

                                    a.push(value.DFLIGHT);
                                    dataRoot.children.push({
                                        DFLIGHT: value.DFLIGHT,
//                                        DESCZONA: '',
                                        COD_DESC_ZONA: '',
//                                        A1964TUSO: '',
                                        MDACP: value.MDACP,
                                        QTY_CUPONES_CONT: totQTY_CUPONES_CONT,
                                        QTY_CUPONES_PEND: totQTY_CUPONES_PEND,
                                        VALOR_CUPONES_CONT: totVALOR_CUPONES_CONT,
                                        PROMEDIO_CUPONES_CONT: totPROMEDIO_CUPONES_CONT,
                                        IN_DATEF: value.IN_DATEF,
                                        IN_DATET: value.IN_DATET,
                                        expanded: false, children: []
                                    });
                                    var b = [];
                                    Ext.Object.each(lstData, function(index, value01) {
                                        if (value.DFLIGHT === value01.DFLIGHT) {
                                            //                                    b.push(value01.VNR);
                                            dataRoot.children[a.indexOf(value.DFLIGHT)].children.push({
                                                DFLIGHT: value01.DFLIGHT,
                                                ZONA: value01.ZONA,
                                                DESCZONA: value01.DESCZONA,
                                                COD_DESC_ZONA: value01.COD_DESC_ZONA,
                                                QTY_CUPONES: value01.QTY_CUPONES,
                                                QTY_CUPONES_CONT: value01.QTY_CUPONES_CONT,
                                                QTY_CUPONES_PEND: value01.QTY_CUPONES_PEND,
//                                                A1964TUSO: value01.A1964TUSO,
//                                                DES_SOURCOD: value01.DES_SOURCOD,
                                                MDACP: value01.MDACP,
                                                VALOR_CUPONES_CONT: value01.VALOR_CUPONES_CONT,
                                                VALOR_CUPONES_PEND: value01.VALOR_CUPONES_PEND,
                                                PROMEDIO_CUPONES_CONT: value01.PROMEDIO_CUPONES_CONT,
                                                PROMEDIO_CUPONES_PEND: value01.PROMEDIO_CUPONES_PEND,
                                                IN_DATEF: value01.IN_DATEF,
                                                IN_DATET: value01.IN_DATET,
                                                IN_ZONA: value01.IN_ZONA,
//                                                QTY_CUPONES: value01.QTY_CUPONES,
//                                                VALOR: value01.VALOR,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
                            console.log(dataRoot);



                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridData').setStore(storeTree);
                        }
                    }
                }
            }
        });
        global.clear();
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetDay: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.children === null) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetDay.IN_DATEF = rowData.data.IN_DATEF;
            this.beanDetDay.IN_DATET = rowData.data.IN_DATET;

            console.log(this.beanDetDay);


            me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
            this.setGridDataByDay();
        }
    },
    setGridDataByDay: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridDetData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchByDay'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetData').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetData').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var mes = '';
                        switch (bean.DFLIGHT.substring(4, 6)) {
                            case  '01':
                                mes = ' - JAN';
                                break;
                            case  '02':
                                mes = ' - FEB';
                                break;
                            case  '03':
                                mes = ' - MAR';
                                break;
                            case  '04':
                                mes = ' - APR';
                                break;
                            case  '05':
                                mes = ' - MAY';
                                break;
                            case  '06':
                                mes = ' - JUN';
                                break;
                            case  '07':
                                mes = ' - JUL';
                                break;
                            case  '08':
                                mes = ' - AUG';
                                break;
                            case  '09':
                                mes = ' - SEP';
                                break;
                            case  '10':
                                mes = ' - OCT';
                                break;
                            case  '11':
                                mes = ' - NOV';
                                break;
                            case  '12':
                                mes = ' - DEC';
                                break;
                        }
                        Ext.getCmp(prototype.id + '-gridDetData').setTitle('<center style="font-size:12px;">' +
                                'FLIGHT DATE: ' + bean.DFLIGHT.substring(0, 4) + mes + '</center>');
                        me.setWidthPie();

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetZone: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log(rowData.data.IN_ZONA);
        console.log(rowData.data.ZONA);
        if (rowData.data.children === null) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetZone';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetZone.IN_DATEF = rowData.data.IN_DATEF;
            this.beanDetZone.IN_DATET = rowData.data.IN_DATET;
            this.beanDetZone.IN_ZONA = rowData.data.IN_ZONA;

            console.log(this.beanDetZone);


            me.paramsDetail.beanString = JSON.stringify(this.beanDetZone);
            this.setGridDataByZone();
        }
    },
    setGridDataByZone: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridDetZone';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchByZone'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetZone').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetZone').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                                                var mes = '';
                        switch (bean.DFLIGHT.substring(4, 6)) {
                            case  '01':
                                mes = ' - JAN';
                                break;
                            case  '02':
                                mes = ' - FEB';
                                break;
                            case  '03':
                                mes = ' - MAR';
                                break;
                            case  '04':
                                mes = ' - APR';
                                break;
                            case  '05':
                                mes = ' - MAY';
                                break;
                            case  '06':
                                mes = ' - JUN';
                                break;
                            case  '07':
                                mes = ' - JUL';
                                break;
                            case  '08':
                                mes = ' - AUG';
                                break;
                            case  '09':
                                mes = ' - SEP';
                                break;
                            case  '10':
                                mes = ' - OCT';
                                break;
                            case  '11':
                                mes = ' - NOV';
                                break;
                            case  '12':
                                mes = ' - DEC';
                                break;
                        }
                        Ext.getCmp(prototype.id + '-gridDetZone').setTitle('<center style="font-size:12px;">' +
                                'FLIGHT DATE: ' + bean.DFLIGHT.substring(0, 4) + mes + '</center>');
                        me.setWidthPie();

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetZone').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var zone = Ext.getCmp(prototype.id + '-cmbZone');
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());

        yearFrom.setValue(this.fecha.getFullYear());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        zone.setValue('');
//        dayFrom.setValue('');
//        dayTo.setValue('');
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {

    }

    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
//            me.setWidthPie();
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
    },
    setWidthPie: function() {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDetData':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDetZone':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    }
});
