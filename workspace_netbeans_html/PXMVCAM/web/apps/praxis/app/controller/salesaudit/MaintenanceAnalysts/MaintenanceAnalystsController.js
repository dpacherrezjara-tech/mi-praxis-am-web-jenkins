Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.MaintenanceAnalystsController', {
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
        console.log('CONTEXTPATH--', CONTEXTPATH);
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            //            //   -------------------Eventos Genericos --------------------
            '#MaintenanceAnalystsForm-xpanel': {
                afterrender: me.xpanel_afterrender
            },
            '#MaintenanceAnalystsForm-btnSearch': {
                click: this.onGetData
            },
            '#MaintenanceAnalystsForm-btnAdd': {
                click: this.onCreateClick
            },
            '#MaintenanceAnalystsForm-btnClear': {
                click: this.btnClear_click
            },
            '#MaintenanceAnalystsForm-btnExcel': {
                click: this.btnExcel_click
            },
            // '#MaintenanceAnalystsForm-btnFilter': {
            //     click: this.btnFilter_click
            // }
        });

    },

    xpanel_afterrender: function (obj, e) {

        const me = this;
        const view = me.view;
        console.log('after', view);

        this.onFilter();
        this.onGetData();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        Ext.getCmp(prototype.id + '-pagginator-legend').show();
    },

    onAuditorFilter: async function () {

        let params = {
            IN_CCUST: '139',
            IN_OPTION: '1',
            IN_VAR1: '',
            IN_VAR2: ''
        };

        let cmbUser = Ext.getCmp(prototype.id + '-cmbUser');
        const res = await global.callStoreGet('PXSAUDIT', 'SQP05872', params);
        // console.log('res', res)

        if (res.lstRs) {
            let data = res.lstRs.at(0);
            // console.log('filter user', data);

            // Normalizar por si viene "id"
            let cleanData = data.map(item => ({
                A4886USER: item.A4886USER
            }));
            cleanData.unshift({
                A4886USER: 'All'
            });

            console.log('cleanData', cleanData)

            let store = cmbUser.getStore();
            store.removeAll();
            store.loadData(cleanData);
            cmbUser.setValue('All');
        }
    },

    // ---- CARGAR DATA INICIAL
    onFilter: async function () {
        me = this;
        const view = me.view;


        let cmbUser = Ext.getCmp(prototype.id + '-cmbUser');
        let cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        let cmbFuente = Ext.getCmp(prototype.id + '-cmbFuente');
        let cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        let cmbDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        let cmbDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');

        this.onAuditorFilter();

        // ---- CARGAR COMBO FUENTE ----
        cmbFuente.bindStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: "", name: "All" },
                { code: "ARC", name: "ARC" },
                { code: "BSP", name: "BSP" },
                { code: "ACR", name: "ACR" },
            ]
        }));
        cmbFuente.setValue("");



        // ---- CARGAR COMBO STATUS ----
        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: "", name: "All" },
                { code: "AC", name: "Active" },
                { code: "IN", name: "Inactive" }
            ]
        }));
        cmbStatus.setValue("");

        // ---- CARGAR COMBO FECHA FILTRO ----
        cmbFecFiltro.bindStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: "1", name: "Creation date" },
                { code: "2", name: "Disabled date" }
            ]
        }));
        cmbFecFiltro.setValue("1");



    },

    onGetData: async function () {
        me = this;
        const view = me.view;

        let cmbUser = Ext.getCmp(prototype.id + '-cmbUser');
        let cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        let cmbFuente = Ext.getCmp(prototype.id + '-cmbFuente');
        let cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        let cmbDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        let cmbDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');

        // ---- ARMAR PARAMETROS PARA LA CONSULTA ----
        me.view.searchParams = {
            library: "PXSAUDIT",
            procedure: "SQP05871",
            params: {
                IN_CCUST: '139',
                // IN_USER: cmbUser.getValue() || '',
                IN_USER: cmbUser.getValue() === 'All' ? '' : cmbUser.getValue() || '',
                IN_STATUS: cmbStatus.getValue() === 'All' ? '' : cmbStatus.getValue() || '',
                IN_DATETO: cmbDateTo.getValue() || '',
                IN_DATEFROM: cmbDateFrom.getValue() || '',
                IN_FUENT: cmbFuente.getValue() === 'All' ? '' : cmbFuente.getValue() || '',
                IN_OPTION: cmbFecFiltro.getValue() || '1'
            }
        };

        console.log('searchParams ini', me.view.searchParams);

        // ---- LLAMADA AL SERVICIO ----
        const store01 = await global.callStorePaggin(
            view.searchParams.library,
            view.searchParams.procedure,
            view.searchParams.params
        );

        console.log('store01', store01);
        console.log('items', store01.data.items);

        // ---- AGRUPAR POR FUENTES
        store01.setGroupField('FUENTES');

        // ---- Asignar store al grid ----
        const grid01 = Ext.getCmp(prototype.id + '-gridDataMain');
        grid01.setStore(store01);

        // ---- Configurar paginador ----
        let pagginator01 = Ext.getCmp(prototype.id + '-pagginator-01');
        pagginator01.setStore(store01);
    },

    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();

    },

    onRendererColumnOnStatus: function (value, metaData, record) {
        let iconCls = '';
        let color = '';
        let tooltip = '';

        switch (String(record.get('A4886FLAG'))) {
            case 'ACTIVE':
                iconCls = 'fas fa-check-circle';
                color = '#28a745'; // verde
                tooltip = 'Active';
                break;

            case 'DISABLED':
                iconCls = 'fa fa-ban';
                color = '#dc3545'; // rojo
                tooltip = 'Disabled';
                break;

            case 'ON VACATION':
                iconCls = 'fa fa-plane';
                color = '#007bff'; // azul
                tooltip = 'On Vacation';
                break;

            default:
                iconCls = 'fas fa-question-circle';
                color = '#6c757d'; // gris
                tooltip = 'Unknown';
        }

        metaData.tdAttr = 'data-qtip="' + tooltip + '"';

        return '<i class="' + iconCls + '" style="font-size:16px; color:' + color + ';"></i>';
    },


    //---- PAGINACION
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        this.onGetData();
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },

    onCreateClick: function (grid) {
        const dataEntry = Ext.create('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryMaintenanceAnalysts', {
            id: prototype.id01 + '-dataEntryUserMain',
            params: {
                action: 'C',
            },
            callback: () => {
                grid.getStore().load();
            }
        });

        dataEntry.show();

    },

    onEditClick: function (grid, rowIndex, colIndex, item, e, record) {

        console.log('record real:', record);

        const dataEntry = Ext.create(
            'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryMaintenanceAnalysts',
            {
                id: prototype.id01 + '-dataEntryUserMain',
                params: {
                    action: 'U',
                    rec: record,
                    instancia: me
                },
                callback: () => {
                    grid.getStore().load();
                }
            }
        );

        dataEntry.show();
    },

    btnExcel_click: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Download Excel?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        //                            global.getFile(`${me.url}/downloadDetail?${new URLSearchParams(params)}`);
                        me.onDownloadExcel();
                    }
                }
            });
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        console.log('params', view.searchParams);
        const params = Object.assign({}, view.searchParams?.params || {});

        view.setLoading(true);
        try {
            let data = await global.callStorePagginExcel('PXSAUDIT', 'SQP05871', params);

            if (data.length === 0) {
                console.log('data excel', data);
                global.Msg({ msg: 'Data not Found' });
                view.setLoading(false);
                return;
            }

            let excel = data.map(x => ({
                'Auditor': x.A4886USER,
                'Description': x.A4886DESCR,
                'Fuente': x.FUENTES,
                'Canal': x.A4420CANAL,
                'Queq': x.A4420QUEQ,
                'Transaction': x.A4420TRAS,
                'Iata': x.A4420IATA,
                'Fcmi': x.A4420FCMI,
                'Status': x.A4886FLAG
            }));

            await global.writeExcelFromJson(excel, 'Maintenance Analysts Information');
            view.setLoading(false);

        } catch (e) {
            console.log(e);
            view.setLoading(false);

        }
    },



},



);