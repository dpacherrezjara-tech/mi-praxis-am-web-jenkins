
Ext.define('Ext.Praxis.controller.sales.AccountingEmailMaintenanceForm.AccountingEmailMaintenanceFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingEmailMaintenanceFormController',

    bean: {},

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idAccoEmailMain + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idAccoEmailMain = 'AccountingEmailMaintenanceForm';
        prototype.idDataEntryEmailcatalogReportForm = 'DataEntryEmailcatalogReportwin';
        prototype.url = CONTEXTPATH + '/AccountingEmailMaintenanceForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    setStoresFilters: function () {
        var CmbModule = Ext.getCmp(prototype.idAccoEmailMain + '-CmbModule');
        var CmbType = Ext.getCmp(prototype.idAccoEmailMain + '-CmbType');
        var cmbStatus = Ext.getCmp(prototype.idAccoEmailMain + '-CmbStatus');


        CmbModule.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SAL", "name": "SALE"},
                {"code": "FLO", "name": "FLOWN"},
                {"code": "IXC", "name": "IXC"},
                {"code": "IXP", "name": "IXP"},
                {"code": "DIS", "name": "DISC"},
                {"code": "ADJ", "name": "ADJ"},
                {"code": "ADM", "name": "ADM's/ACM's"},
                {"code": "PLM", "name": "PLM"},
                {"code": "FOP", "name": "COM. FOP"},
                {"code": "COM", "name": "COM. CONS."}
            ]
        }));

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "MI", "name": "MIATECH"},
                {"code": "AM", "name": "AM"}
            ]
        }));


        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ACTIVE"},
                {"code": "E", "name": "INACTIVE"}
            ]
        }));


    },
    onCmbAfterRender: function (obj) {
        obj.setValue('');
    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4306FLAG'))) {
            case 'E':
                value = 'red';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idAccoEmailMain + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccoEmailMain + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.idAccoEmailMain + '-pagginator-01').setStore(store00);
    },
    onSearchClick: function (obj, e) {
        var me = this;

        me.bean.IN_MODULE = Ext.getCmp(prototype.idAccoEmailMain + '-CmbModule').getValue();
        me.bean.IN_TYPE = Ext.getCmp(prototype.idAccoEmailMain + '-CmbType').getValue();
        me.bean.IN_EMAIL = Ext.getCmp(prototype.idAccoEmailMain + '-txtEmail').getValue();
        me.bean.IN_STATUS = Ext.getCmp(prototype.idAccoEmailMain + '-CmbStatus').getValue();
        me.bean.pexcel = 0;

        me.Search(me.bean, obj === true ? obj : false);
    },
    Search: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idAccoEmailMain + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idAccoEmailMain + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
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
    onAddClick: function (obj) {
        this.winDataEntry('I', {});
    },
    onEditActionColumnClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'I' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.AccountingEmailMaintenanceForm.DataEntryAccountingEmailcatalogReport({
            params: {
                action: action,
                rec: rec
            }
        });
        win.show();
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4306FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'ACTIVE';
                break;
            case 'E':
                color = '#E5B2B2'; //'';'#B791EF'
                value = 'Void';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    }
});

