Ext.define('Ext.Praxis.controller.flown.RevenueByOperation.RevenueByOperationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RevenueByOperationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    flagNPLANE: false,
    flagZONA: false,
    me: '',
    setContext: function() {
        me = this;
    },
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'RevenueByOperationForm';
        prototype.url = CONTEXTPATH + '/RevenueByOperation';
        prototype.widthContenedor = 1630;
        prototype.widthGrid = 1620;
        prototype.widthGridByZone = 900;
        prototype.widthGridByCityPair = 900;
        prototype.widthGridByNPlane = 900;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function() {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    rgchange: function(field, newvalue, oldvalue) {
        flagNPLANE = false;
        flagZONA = false;
        if (newvalue) {
            if (field.id === prototype.id + '-rbNPlane') {
                this.setFormatParameterByNPlane();
                this.setGridDataByNPlane();
            } else if (field.id === prototype.id + '-rbCity') {
                this.setFormatParameterByCityPair();
                this.setGridDataByCityPair();
            } else if (field.id === prototype.id + '-rbZone') {
                this.setFormatParameterByZone();
                this.setGridDataByZone();
            } else {
                this.setFormatParameter();
                this.setGridData();
            }
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (newValue !== '') {
            if (newValue > comboToYear.getValue()) {
                comboToYear.setValue(newValue);
            }
            if (this.getValue("cmbDateFromMonth") === '02') {
                var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
                var store = win.getStoreDays2(true, newValue, 1);
                comboFromDay.bindStore(store);
                comboFromDay.setValue('');
            }
        } else {
            comboToYear.setValue(newValue);
            comboToMonth.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        if (newValue !== '') {
            if (comboFromYear.getValue() !== '') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else
                comboFromYear.setValue(newValue);
            if (this.getValue("cmbDateToMonth") === '02') {
                var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
                var store = win.getStoreDays2(true, newValue, 1);
                comboToDay.bindStore(store);
                comboToDay.setValue('');
            }
        } else {
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateFromYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboFromDay.setValue('');

            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > comboToMonth.getValue()) {
                    comboToMonth.setValue(newValue);
                }
            }
        } else {
            comboToMonth.setValue(newValue);
            comboFromDay.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateToYear"), Number(newValue) - 1);
            comboToDay.bindStore(store);
            comboToDay.setValue('');

            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue() !== '') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else
                    comboFromMonth.setValue(newValue);
            }
        } else {
            comboFromMonth.setValue(newValue);
            comboToDay.setValue(newValue);
        }
    },
    onFromDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            if (comboFromMonth.getValue() === '') {
                comboFromMonth.setValue("01");
                comboFromDay.setValue(newValue);
            }
        } else {
            comboToDay.setValue(newValue);
        }
    },
    onToDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        if (newValue !== '') {
            if (comboToMonth.getValue() === '') {
                comboToMonth.setValue("01");
                comboToDay.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var days = new Array();
        days.push(['', 'All']);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        flagNPLANE = false;
        flagZONA = false;
        if (Ext.getCmp(prototype.id + '-rbNPlane').getValue()) {
            this.setFormatParameterByNPlane();
            this.setGridDataByNPlane();
        } else if (Ext.getCmp(prototype.id + '-rbCity').getValue()) {
            this.setFormatParameterByCityPair();
            this.setGridDataByCityPair();
        } else if (Ext.getCmp(prototype.id + '-rbZone').getValue()) {
            this.setFormatParameterByZone();
            this.setGridDataByZone();
        } else {
            this.setFormatParameter();
            this.setGridData();
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
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
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
//        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue("");
//        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue("");
        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
//        this.setValue("cbxFVAL", "");
//        this.setValue("txtTKT", "");
        // </editor-fold>
//        this.focus("txtTKT");

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");
        // </editor-fold>
//        Ext.getCmp(prototype.id+'-boxSearchFilter').hide();
//        Ext.getCmp(prototype.id+'-boxMainData').show();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var fday = Ext.getCmp(prototype.id+'-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var tday = Ext.getCmp(prototype.id+'-cmbDateToDay').getValue();
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
//        var txtTKT = this.getValue("txtTKT");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear + fmonth,
            IN_FECHA_TO: tyear + tmonth
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    setFormatParameterByZone: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var fday = Ext.getCmp(prototype.id+'-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var tday = Ext.getCmp(prototype.id+'-cmbDateToDay').getValue();
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
//        var txtTKT = this.getValue("txtTKT");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear + fmonth,
            IN_FECHA_TO: tyear + tmonth
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    setFormatParameterByCityPair: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var fday = Ext.getCmp(prototype.id+'-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var tday = Ext.getCmp(prototype.id+'-cmbDateToDay').getValue();
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
//        var txtTKT = this.getValue("txtTKT");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear + fmonth,
            IN_FECHA_TO: tyear + tmonth,
            DFLIGHT: '',
            NPLANE: '',
            ZONA: ''
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    setFormatParameterByNPlane: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var fday = Ext.getCmp(prototype.id+'-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var tday = Ext.getCmp(prototype.id+'-cmbDateToDay').getValue();
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
//        var txtTKT = this.getValue("txtTKT");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear + fmonth,
            IN_FECHA_TO: tyear + tmonth
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueByOperation.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1971");
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataByZone: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueByOperation.GridDataByZone', {
            proxy: {
                url: prototype.url + '/searchByZone'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1971");
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByZone').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataByCityPair: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueByOperation.GridDataByCityPair', {
            proxy: {
                url: prototype.url + '/searchByCityPair'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1971");
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total3').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    setGridDataByNPlane: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueByOperation.GridDataByNPlane', {
            proxy: {
                url: prototype.url + '/searchByNPlane'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1972");
                    var pag = Ext.getCmp(prototype.id + '-paggin4');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage4').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount4').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total4').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataByNPlane').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    // </editor-fold>

    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
