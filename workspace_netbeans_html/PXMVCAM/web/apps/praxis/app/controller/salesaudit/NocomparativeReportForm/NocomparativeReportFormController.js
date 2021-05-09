
Ext.define('Ext.Praxis.controller.salesaudit.NocomparativeReportForm.NocomparativeReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NocomparativeReportFormController',

    bean: {},
    bean2: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGrids();
    },
    OnBeforeShow: function () {
        prototype.idnocompara = 'NocomparativeReportForm';
        prototype.url = CONTEXTPATH + '/NocomparativeReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idnocompara + '-gridData');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 25
        });
        grid01.setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbPeriAfterRender: function (obj) {
        obj.setValue('1');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idnocompara + '-cmbSearch');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "PERIOD"}
            ]
        }));
       

    },
    onCmbTypeChange: function (obj, records, eOpts) {
        var cmbDateFromYear = Ext.getCmp(prototype.idnocompara + '-cmbDateFromYear');
        var cmbDateFromMonth = Ext.getCmp(prototype.idnocompara + '-cmbDateFromMonth');
        var cmbDateToYear = Ext.getCmp(prototype.idnocompara + '-cmbDateToYear');
        var cmbDateToMonth = Ext.getCmp(prototype.idnocompara + '-cmbDateToMonth');
        var txtFilterDateFrom = Ext.getCmp(prototype.idnocompara + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idnocompara + '-txtFilterDateTo');
        if (obj.getValue() === "2") {
            cmbDateFromYear.show();
            cmbDateFromMonth.show();
            cmbDateToYear.show();
            cmbDateToMonth.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
        } else if (obj.getValue() === "1") {
            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
        } else {
            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
        }
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbDateAfterRender: function (obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbMonthAfterRender: function (obj) {
        var fecha = new Date();
        fecha = fecha.getMonth() + 1;
        if (fecha <= 9) {
            fecha = 0 + '' + fecha.toString();
        } else {
            fecha = fecha.toString();
        }
        ;
        obj.setValue(win.getAbreviaturaMes(fecha));
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var cmbSearch = Ext.getCmp(prototype.idnocompara + '-cmbSearch').getValue();
        var cmbDateFromYear = Ext.getCmp(prototype.idnocompara + '-cmbDateFromYear').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.idnocompara + '-cmbDateFromMonth').getValue();
        var cmbDateToYear = Ext.getCmp(prototype.idnocompara + '-cmbDateToYear').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.idnocompara + '-cmbDateToMonth').getValue();

        var txtFilterDateFrom = Ext.getCmp(prototype.idnocompara + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idnocompara + '-txtFilterDateTo').getRawValue();
        var txtiata = Ext.getCmp(prototype.idnocompara + '-txtiata').getValue();
        var txtcountry = Ext.getCmp(prototype.idnocompara + '-txtcountry').getValue();

        if (cmbSearch === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (cmbSearch === '1') {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }

            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idnocompara + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idnocompara + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
            me.bean.IN_DATEFROM = txtFilterDateFrom;
            me.bean.IN_DATETO = txtFilterDateTo;
            me.bean.IN_OPTION = cmbSearch;
            me.bean.IN_IATA = txtiata;
            me.bean.IN_COUNTRY = txtcountry;
        } else if (cmbSearch === '2') {
            me.bean.IN_DATEFROM = cmbDateFromYear + "" + win.getMonthAbbreviation(cmbDateFromMonth);
            me.bean.IN_DATETO = cmbDateToYear + "" + win.getMonthAbbreviation(cmbDateToMonth);
            me.bean.IN_OPTION = cmbSearch;
            me.bean.IN_IATA = txtiata;
            me.bean.IN_COUNTRY = txtcountry;
        }
        me.bean.pexcel = Ext.getCmp(prototype.idnocompara + '-pagination').getValue() ? 0 : 1;
        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.idnocompara + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    imgClear_clickHandler: function (obj, e) {
        Ext.getCmp(prototype.idnocompara + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.idnocompara + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.idnocompara + '-txtiata').setValue('');
        Ext.getCmp(prototype.idnocompara + '-txtcountry').setValue('');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idnocompara + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idnocompara + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idnocompara + '-lbl-total').setText(records[0].data.A3456TOTALPAGI);
                    } else {
                        Ext.getCmp(prototype.idnocompara + '-lbl-total').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });

        }
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    }

});

