
Ext.define('Ext.Praxis.controller.payments.MaintenanceAnalysts.MaintenanceAnalystsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaintenanceAnalystsController',
    childs: '5',
    bean: '',
    paginActual: '',
    gridActual: '',
    panelActual: '',
    procesadores: '',
    reg99: 0,
    me: '',
    url2: CONTEXTPATH + '/SalesReconciliationBPO',
    url: CONTEXTPATH + '/MaintenanceAnalysts',
    dup: '',
    searchParams: {},
    beanDownload: {},
    dataGrid: [],
    beanTMP: {},
    beanEXCEL: {},

    init: function (view) {
        me = this;
        prototype.id = 'MaintenanceAnalystsForm';
        prototype.url = CONTEXTPATH + '/MaintenanceAnalysts';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#MaintenanceAnalystsForm-xpanel': {
                afterrender: me.xpanel_afterrender
            },
            '#MaintenanceAnalystsForm-btnSearch': {
                click: this.onSearchClick
            },
            '#MaintenanceAnalystsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#MaintenanceAnalystsForm-btnClear': {
                click: this.btnClear_click
            },
            '#MaintenanceAnalystsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#MaintenanceAnalystsForm-btnFilter': {
                click: this.btnFilter_click
            }
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.onLoadUsers();
        this.loadFilters();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
         Ext.getCmp(prototype.id + '-pagginator-legend').show(); 
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.onSearchClick();
        }
    },

    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        this.onSearchClick();
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.id + '-txtUser');

        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/loadDataAuditor',
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
    loadFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-xpanel');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url2}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            const procesadores = data.procesadores;
            this.procesadores = procesadores;
            //<editor-fold defaultstate="collapsed" desc="Combos">

            const cmbProctypeSettl = Ext.getCmp(prototype.id + '-cmbProctypeSettl');
            me.setComboStore({cmp: cmbProctypeSettl, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            //</editor-fold>

        }
        filterPanel.unmask();
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    obtainData: function () {
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        var Cmbstatus = Ext.getCmp(prototype.id + '-Cmbstatus');

        Cmbstatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AC", "Active"],
                ["IN", "Inactive"]
            ]
        }));
        Cmbstatus.setValue("");
        //
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                //  ["2", "Auditor"],
                ["1", "System date"],
                ["3", "Start date"]
            ]
        }));
        cmbFecFiltro.setValue("1");
        //
        var grid01 = Ext.getCmp(prototype.id + '-gridDataMain');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01',
            pageSize: 20,
            groupField: 'A4836DESCR',
            fields: [
                {name: 'A4836CCUST', type: 'string'},
                {name: 'A4836USER', type: 'string'},
                {name: 'A4836PROCE', type: 'string'},
                {name: 'A4836CORR', type: 'int'},
                {name: 'A4836FLAG', type: 'string'},
                {name: 'A4836DESCR', type: 'string'},
                {name: 'A4836FALTA', type: 'string'},
                {name: 'A4836REGIS', type: 'string'},
                {name: 'A4836FREGI', type: 'string'},
                {name: 'A4836HREGI', type: 'string'},
                {name: 'A4836FLAGDES', type: 'string'}
            ],
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchMantAuditor',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        if (obj.getValue() === "1" || obj.getValue() === "3") {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
            Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
            // Ext.getCmp(prototype.id + '-txtUser').hide();
        } else if (obj.getValue() === "2") {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
            Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
            // Ext.getCmp(prototype.id + '-txtUser').show();
        } else {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
            Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
            //Ext.getCmp(prototype.id + '-txtUser').hide();
        }
    },
    OnEditActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return String(record.get('A4836FLAG')) !== 'AC' ? true : false;
    },
    onRendererColumnOnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4836FLAG'))) {
            case 'P':
                value = 'yellow';
                break;
            case 'D':
                value = 'silver';
                break;
            case 'N':
                value = 'silver';
                break;
            case 'AC':
                value = 'green';
                break;
            case 'C':
                value = 'orange';
                break;
            case 'F':
                value = 'mediumpurple';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onSearchClick: function (btn) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id + '-gridDataMain');
        var store01 = grid01.getStore();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-cmbProctypeSettl').getValue();
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        var txtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var Cmbstatus = Ext.getCmp(prototype.id + '-Cmbstatus').getValue();
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        if (cmbFecFiltro === '3') {
            me.beanTMP.IN_OPTION = cmbFecFiltro;
            me.beanTMP.IN_TYPEREPORT = CmbTypeprocesa;
            me.beanTMP.IN_DATETO = '';
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_USER = txtUser;
            me.beanTMP.IN_STATUS = Cmbstatus;
        } else {
            me.beanTMP.IN_OPTION = cmbFecFiltro;
            me.beanTMP.IN_TYPEREPORT = CmbTypeprocesa;
            me.beanTMP.IN_DATETO = txtFilterDateTo;
            me.beanTMP.IN_DATEFROM = txtFilterDateFrom;
            me.beanTMP.IN_USER = '';
            me.beanTMP.IN_STATUS = Cmbstatus;
        }
        store01.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {

            }
        });
    },
    btnExcel_click: function (obj, e) {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-cmbProctypeSettl').getValue();
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        var txtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var Cmbstatus = Ext.getCmp(prototype.id + '-Cmbstatus').getValue();
        if (cmbFecFiltro === '3') {
            me.beanEXCEL.IN_OPTION = cmbFecFiltro;
            me.beanEXCEL.IN_TYPEREPORT = CmbTypeprocesa;
            me.beanEXCEL.IN_DATETO = '';
            me.beanEXCEL.IN_DATEFROM = '';
            me.beanEXCEL.IN_USER = txtUser;
            me.beanEXCEL.IN_STATUS = Cmbstatus;
        } else {
            me.beanEXCEL.IN_OPTION = cmbFecFiltro;
            me.beanEXCEL.IN_TYPEREPORT = CmbTypeprocesa;
            me.beanEXCEL.IN_DATETO = txtFilterDateTo;
            me.beanEXCEL.IN_DATEFROM = txtFilterDateFrom;
            me.beanEXCEL.IN_USER = '';
            me.beanEXCEL.IN_STATUS = Cmbstatus;
        }

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
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        //me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        //me.bean.IN_SPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_ADMNUM = Ext.getCmp(prototype.id + '-txtADMNUM').getValue();
//        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
//        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtSAUTHOC').getValue();
//        me.bean.IN_SPNR = Ext.getCmp(prototype.id + '-txtSPNR').getValue().trim();
//        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
//        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams, 'searchParamss');

    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();  //obtengo los Parametros
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue() != '' || Ext.getCmp(prototype.id + '-txtADMNUM').getValue() != '') {
            this.setGridDataDetail()
        } else {
            this.setGridData();
        }
    },
    setGridData: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataMain'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'  //ES LA RUTA // CONECTO AL JAVA
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            var data = obj.data.items[0].data;

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    setGridDataDetail: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDet'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.beanTMP;
    },
    exportFiles: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Files zip ?',
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
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-cmbProctypeSettl').setValue('');
        Ext.getCmp(prototype.id + '-cmbFecFiltro').setValue('1');
        Ext.getCmp(prototype.id + '-txtUser').setValue('ALL');
        Ext.getCmp(prototype.id + '-Cmbstatus').setValue('');
        Ext.getCmp(prototype.id + '-gridDataMain').getStore().removeAll(); 
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(800);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },

    /*     
     * Funciones para la paginacion     
     */

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    viewDataEntry_clickHandler: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.payments.MaintenanceAnalystsForm.DataEntryMaintenanceAnalysts', {
            //id: prototype.id01 + '-dataEntryUserMain',
            params: {
                action: action,
                rec: rec,
                instancia: me,
                panel: me.panelActual,
                data: this.procesadores
            }
        }).show();
    },
}
);