
Ext.define('Ext.Praxis.controller.salesaudit.RfndarcUserMaintenanceForm.RfndarcUserMaintenanceFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RfndarcUserMaintenanceFormController',

    beanTMP: {},
    beanEXCEL: {},

    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idRfndarcUser = 'RfndarcUserMaintenanceForm';
        prototype.idDataEntryARCUserMain = 'DataEntryARCUserMaintenance';
        prototype.url = CONTEXTPATH + '/RfndarcUserMaintenanceForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente...')

        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresGrids();
    },

    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRfndarcUser + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idRfndarcUser + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "EFECTIVE DATE"},
                {"code": "3", "name": "DISCONTINUITY DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "AC", "name": "ENABLED"},
                {"code": "IN", "name": "DISABLED"},
                {"code": "DE", "name": "DELETE"}
            ]
        }));
    },

    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.idRfndarcUser + '-txtUser');

        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbUser.setValue('ALL');
                }
            }
        });

        cmbUser.setStore(store);
    },

    OnLoadDataPendienteAfterrender: function (obj) {

    },

    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRfndarcUser + '-gridCalendarBSP');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfndarcUser + '-store-grid01',
            pageSize: 20,
            groupField: 'A4359USER',
            fields: [
                {name: 'A4359USER', type: 'string'},
                {name: 'A4359PAIS', type: 'string'},
                {name: 'A4359FREGI', type: 'string'},
                {name: 'A4359FALTA', type: 'string'},
                {name: 'A4359FBAJA', type: 'string'}
            ],
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchQueryRefund',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

//        Ext.getCmp(prototype.idRfndarcUser + '-pagginator-01').setStore(store00);
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },

    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },

    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {

    },

    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },

    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },

    compareDate: function (dateFrom, dateTo) {
        dateFrom = parseInt(String(dateFrom.split('/')[0]) + String(dateFrom.split('/')[1]) + String(dateFrom.split('/')[2]));
        dateTo = parseInt(String(dateTo.split('/')[0]) + String(dateTo.split('/')[1]) + String(dateTo.split('/')[2]));
        return dateFrom > dateTo ? true : false;
    },

    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.idRfndarcUser + '-contenedor-filters-form').getForm();

        var grid01 = Ext.getCmp(prototype.idRfndarcUser + '-gridCalendarBSP');

        var store01 = grid01.getStore();

        var comboBy = String(Ext.getCmp(prototype.idRfndarcUser + '-search-type').getValue());

        if (Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue()) !== '' &&
                Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue()) !== '') {
            if (this.compareDate(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue(), Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue())) {
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }

        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-cmbCountry').getValue());
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.idRfndarcUser + '-CmbStatus').getValue();
        me.beanTMP.IN_USER = Ext.getCmp(prototype.idRfndarcUser + '-txtUser').getValue();
        me.beanTMP.IN_USER = me.beanTMP.IN_USER === 'ALL' ? '' : me.beanTMP.IN_USER;

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.idRfndarcUser + '-pagination').getValue() ? 0 : 1;

        store01.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {

            }
        });

    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idRfndarcUser + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idRfndarcUser + '-pagginator-01').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.idRfndarcUser + '-pagginator-01').enable();
            Ext.getCmp(prototype.idRfndarcUser + '-pagginator-legend').show();
        }
    },

    onRendererColumnAgency: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnPassenger: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRfndarcUser + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>';
    },

    OnColumnCountryRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRfndarcUser + \'-Contenedor\').getController().OnDetail02(' + rowIndex + ');">' + value + '</span>';
    },

    OnDetail01: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idRfndarcUser + '-gridPediente');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        // console.log(rec);
        var vl_fechaini = '';
        var vl_fechafin = '';

        if (rec.get('A4359USER')) {
            Ext.getCmp(prototype.idRfndarcUser + '-txtUser').setValue(rec.get('A4359USER'));

            Ext.getCmp(prototype.idRfndarcUser + '-gridPediente').hide();
            Ext.getCmp(prototype.idRfndarcUser + '-gridcabiatas').show();
            Ext.getCmp(prototype.idRfndarcUser + '-gridDETALLE').hide();

            Ext.getCmp(prototype.idRfndarcUser + '-btn-back').show();

            Ext.getCmp(prototype.idRfndarcUser + '-search-type').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-txtFrmaSerie').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-txtSeq').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-cmbCountry').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-txtNumber').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').disable();
            Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').disable();

            if (Ext.getCmp(prototype.idRfndarcUser + '-search-type').getValue() === '') {
                vl_fechaini = rec.get('A3389FAPPI').substring(0, 4) + '' + this.getDataMes(rec.get('A3389FAPPI').substring(7, 4)) + '01';
                vl_fechafin = rec.get('A3389FAPPI').substring(0, 4) + '' + this.getDataMes(rec.get('A3389FAPPI').substring(7, 4)) + '31';
            } else {
                vl_fechaini = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue();
                vl_fechafin = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue();
            }

            this.beanTMP01.IN_OPTION = '9';
            this.beanTMP01.IN_USER = rec.get('A4359USER');
            this.beanTMP01.IN_DATEFROM = vl_fechaini;
            this.beanTMP01.IN_DATETO = vl_fechafin;
            this.beanTMP01.IN_COUNTRY = Ext.getCmp(prototype.idRfndarcUser + '-cmbCountry').getValue();
            this.beanTMP01.IN_DOCUMET = Ext.getCmp(prototype.idRfndarcUser + '-txtNumber').getValue();
            this.beanTMP01.IN_CIA = Ext.getCmp(prototype.idRfndarcUser + '-txtCia').getValue();
            this.beanTMP01.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFrmaSerie').getValue().substr(0, 4));
            this.beanTMP01.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFrmaSerie').getValue().substr(4, 10));
            this.beanTMP01.IN_SEQ = Ext.getCmp(prototype.idRfndarcUser + '-txtSeq').getValue();
            this.beanTMP01.IN_IATA = Ext.getCmp(prototype.idRfndarcUser + '-txtIATA').getValue();

            this.beanTMP01.pexcel = 0;
            this.beanTMP01.IN_STATUS = '';

            var grid = Ext.getCmp(prototype.idRfndarcUser + '-gridcabiatas');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1, {
                params: this.beanTMP01,
                callback: function (records, operation, success) {

                }
            });
        }

    },
    onExcelClick: function () {
        var me = this;
        var comboBy = String(Ext.getCmp(prototype.idRfndarcUser + '-search-type').getValue());

        if (Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue()) !== '' &&
                Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue()) !== '') {
            if (this.compareDate(Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue(), Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue())) {
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }
        me.beanEXCEL.IN_OPTION = comboBy;
        me.beanEXCEL.IN_DATEFROM = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateFrom').getRawValue();
        me.beanEXCEL.IN_DATETO = Ext.getCmp(prototype.idRfndarcUser + '-txtFilterDateTo').getRawValue();
        me.beanEXCEL.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.idRfndarcUser + '-cmbCountry').getValue());
        me.beanEXCEL.IN_STATUS = Ext.getCmp(prototype.idRfndarcUser + '-CmbStatus').getValue();
        me.beanEXCEL.IN_USER = Ext.getCmp(prototype.idRfndarcUser + '-txtUser').getValue();
        if (me.beanEXCEL.IN_USER === 'ALL') {
            me.beanEXCEL.IN_USER = '';
        }

        if (Ext.Object.getSize(me.beanEXCEL) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                    }
                }
            });
        }
    },
    OnDetail02: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idRfndarcUser + '-gridcabiatas');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        // console.log(rec);

        if (rec.get('A3389PAIS') !== '') {
            Ext.getCmp(prototype.idRfndarcUser + '-gridPediente').hide();
            Ext.getCmp(prototype.idRfndarcUser + '-gridcabiatas').hide();
            Ext.getCmp(prototype.idRfndarcUser + '-gridDETALLE').show();

            Ext.getCmp(prototype.idRfndarcUser + '-btn-back').show();

            this.beanTMP02.IN_OPTION = '4';
            this.beanTMP02.IN_COUNTRY = rec.get('A3389PAIS');
            this.beanTMP02.IN_DOCUMET = Ext.getCmp(prototype.idRfndarcUser + '-txtNumber').getValue();
            this.beanTMP02.IN_CIA = Ext.getCmp(prototype.idRfndarcUser + '-txtCia').getValue();
            this.beanTMP02.IN_FORMA = Ext.getCmp(prototype.idRfndarcUser + '-txtFrmaSerie').getValue();
            this.beanTMP02.IN_SEQ = Ext.getCmp(prototype.idRfndarcUser + '-txtSeq').getValue();
            this.beanTMP02.IN_IATA = Ext.getCmp(prototype.idRfndarcUser + '-txtIATA').getValue();
            this.beanTMP02.IN_DATEFROM = rec.get('A3389FREAS');
            this.beanTMP02.IN_USER = rec.get('A4359USER');

            this.beanTMP02.pexcel = 0;
            this.beanTMP02.IN_STATUS = '';
            this.beanTMP02.IN_DATETO = '';

            var grid = Ext.getCmp(prototype.idRfndarcUser + '-gridDETALLE');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1, {
                params: this.beanTMP02,
                callback: function (records, operation, success) {

                }
            });

        }
    },

    getDataMes: function (data) {
        var index = "";
        if (data === "JAN") {
            index = '01';
        }
        if (data === "FEB") {
            index = '02';
        }
        if (data === "MAR") {
            index = '03';
        }
        if (data === "APR") {
            index = '04';
        }
        if (data === "MAY") {
            index = '05';
        }
        if (data === "JUN") {
            index = '06';
        }
        if (data === "JUL") {
            index = '07';
        }
        if (data === "AUG") {
            index = '08';
        }
        if (data === "SEP") {
            index = '09';
        }
        if (data === "OCT") {
            index = '10';
        }
        if (data === "NOV") {
            index = '11';
        }
        if (data === "DEC") {
            index = '12';
        }
        return index;
    },

    onBackClick: function (obj) {
        var grid01 = Ext.getCmp(prototype.idRfndarcUser + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.idRfndarcUser + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.idRfndarcUser + '-gridDETALLE');

        if (grid02.isVisible()) {
            grid01.show();
            grid02.hide();
            grid03.hide();
            Ext.getCmp(prototype.idRfndarcUser + '-txtUser').setValue('');
            Ext.getCmp(prototype.idRfndarcUser + '-btn-back').hide();
        } else if (grid03.isVisible()) {
            grid01.hide();
            grid02.show();
            grid03.hide();
        }
    },

    OnPendingColumnSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },

    OnProcessedColumnSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },

    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3389SEMAF'))) {
            case 'ORANGE':
                value = 'Circle_Orange.png';
                break;
            case 'GREEN':
                value = 'Circle_Green.png';
                break;
            default:
                value = 'Circle_Red.png';
        }
        return '<img src="resources/img/semaforo/' + value + '" width="12px"/>';
    },

    onAddClick: function (obj) {
        this.winDataEntry('I', {});
    },

    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'I' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RfndarcUserMaintenanceForm.DataEntryARCUserMaintenance({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url,
                url02: prototype.url01
            }
        });
        win.show();
    },

    onEditActionColumnClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },

    OnColumnStatusRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

        if (String(record.get('A4359FLAG')) === 'Enabled') {
            value = 'green';
        } else {
            value = 'red';
        }

        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    OnEditActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return String(record.get('A4359FLAG')) !== 'Enabled' ? true : false;
    }

});


