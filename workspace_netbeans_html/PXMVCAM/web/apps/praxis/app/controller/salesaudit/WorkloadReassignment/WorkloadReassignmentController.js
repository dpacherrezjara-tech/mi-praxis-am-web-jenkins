Ext.define('Ext.Praxis.controller.salesaudit.WorkloadReassignment.WorkloadReassignmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WorkloadReassignmentController',
    childs: '5',
    bean: '',
    paginActual: '',
    gridActual: '',
    panelActual: '',
    procesadores: '',
    reg99: 0,
    me: '',
    url2: CONTEXTPATH + '/SalesReconciliationBPO',
    url: CONTEXTPATH + '/WorkloadReassignment',
    url3: CONTEXTPATH + '/MaintenanceAnalysts',
    dup: '',
    searchParams: {},
    beanDownload: {},
    beanGuardar: {},
    dataGrid: [],
    beanTMP: {},
    beantmpuser: {},
    beanEXCEL: {},
    beantmpdetaill: {},
    beanPaginationChkChange: {},

    init: function (view) {
        me = this;
        prototype.id = 'WorkloadReassignmentForm';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            '#WorkloadReassignmentForm-xpanel': {
                afterrender: me.xpanel_afterrender
            },
            '#WorkloadReassignmentForm-btnSearch': {
                click: this.onSearchClick
            },
            '#WorkloadReassignmentForm-btnClear': {
                click: this.btnClear_click
            },
            '#WorkloadReassignmentForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#WorkloadReassignmentForm-btnback': {
                click: this.btnback_click
            },
            '#WorkloadReassignmentForm-btnuser': {
                click: this.onChangeAuditorClick
            }
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.loadFilters();
        //  mostrar paginador y leyenda al iniciar
        Ext.getCmp(prototype.id + '-pagi12').show();
        Ext.getCmp(prototype.id + '-pagginator-legend').show();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },

    onLoadUsers: async function () {
        try {
            let params = {
                IN_OPTION: '5',
                IN_CCUST: '139'
            };

            const res = await global.callStoreGet('PXSAUDIT', 'SQP02745', params);

            if (res.lstRs) {
                const data = res.lstRs?.[0] || [];
                console.log('data: SQP02745', data);

                data.unshift({ A4886USER: 'ALL' });

                const cmb = Ext.getCmp(prototype.id + '-txtUser');

                const store = Ext.create('Ext.data.Store', {
                    fields: ['A4886USER'],
                    data: data
                });

                cmb.setStore(store);
                cmb.setValue('ALL');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    },

    loadFilters: function () {
        this.onLoadUsers();
    },

    onLoadDataMain: async function () {
        const me = this;
        var grid01 = Ext.getCmp(prototype.id + '-gridDataMain');

        me.beanTMP = {
            IN_OPTION: Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue(),
            IN_CCUST: '139',
            IN_DATEFROM: Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue(),
            IN_DATETO: Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue(),
            IN_SOURCE: Ext.getCmp(prototype.id + '-cmbProctypeSettl').getValue() || '',
            IN_COUNTRY: '',
            IN_USER: ''
        };

        const res = await global.callStorePaggin('PXSAUDIT', 'SQP05875', me.beanTMP);
        if (res) {
            res.getProxy().setReader({ type: 'json', rootProperty: 'response', totalProperty: 'totrow' });
            grid01.setStore(res);
            Ext.getCmp(prototype.id + '-pagginator-01').setStore(res);
        }
    },

    onLoadDataDetail: async function () {
        const grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');

        const params2 = {
            IN_OPTION: '1',
            IN_CCUST: '139',
            IN_DATE: '20250831',
            IN_SOURCE: 'ARC',
            IN_COUNTRY: '',
            IN_USER: ''
        };

        try {
            const res2 = await global.callStoreGet('PXSAUDIT', 'SQP05876', params2);

            if (res2.lstRs) {
                const data = res2.lstRs?.[0] || [];

                const store03 = Ext.create('Ext.data.Store', {
                    data: data,
                    fields: Object.keys(data[0] || {})
                });

                grid03.setStore(store03);
            }

        } catch (error) {
            console.error('Error cargando detalle inicial:', error);
        }
    },

    obtainData: async function () {
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        var cmbProctypeSettl = Ext.getCmp(prototype.id + '-cmbProctypeSettl');

        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['1', 'Processing Date']
            ]
        }));
        cmbFecFiltro.setValue("1");

        cmbProctypeSettl.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['', 'All'],
                ['1', 'BSP'],
                ['2', 'ASR'],
                ['3', 'ARC'],
                ['4', 'MAN']
            ]
        }));
        cmbProctypeSettl.setValue("");

        this.onLoadDataMain();
        this.onLoadDataDetail();
    },

    onSearchClick: async function () {
        const grid = Ext.getCmp(prototype.id + '-gridDataMain');

        const params = {
            IN_OPTION: Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue(),
            IN_CCUST: '139',
            IN_DATEFROM: Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue(),
            IN_DATETO: Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue(),
            IN_SOURCE: Ext.getCmp(prototype.id + '-cmbProctypeSettl').getValue() || '',
            IN_COUNTRY: '',
            IN_USER: Ext.getCmp(prototype.id + '-txtUser').getValue() === 'ALL'
                ? ''
                : Ext.getCmp(prototype.id + '-txtUser').getValue()
        };

        try {
            const res = await global.callStorePaggin('PXSAUDIT', 'SQP05875', params);

            if (res) {
                res.getProxy().setReader({
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'totrow'
                });

                grid.setStore(res);
                Ext.getCmp(prototype.id + '-pagginator-01').setStore(res);
            }

        } catch (error) {
            console.error('Error en búsqueda:', error);
        }
    },

    onLoadUsersDetail: async function (rec) {
        try {
            const me = this;
            const gridDetalle = Ext.getCmp(prototype.id + '-gridDETALLE');
            const storeGrid = gridDetalle.getStore();

            let map = {};
            let data = [];

            data.push({ A4886USER: 'ALL' });

            storeGrid.each(function (record) {
                let user = (record.get('A1672UASIG') || '').trim();
                if (user && !map[user]) {
                    map[user] = true;
                    data.push({ A4886USER: user });
                }
            });

            const cmb = Ext.getCmp(prototype.id + '-cmbUser');

            cmb.setStore(Ext.create('Ext.data.Store', {
                fields: ['A4886USER'],
                data: data
            }));

            cmb.un('change', me.onFilterAuditorDetail, me);
            cmb.on('change', me.onFilterAuditorDetail, me);

            cmb.suspendEvents();
            cmb.setValue('ALL');
            cmb.resumeEvents();

        } catch (error) {
            console.error('Error cargando usuarios detalle:', error);
        }
    },

    OnDetail01: async function (rowIndex) {
        console.log('OnDetail01');
        const me = this;

        const gridMain = Ext.getCmp(prototype.id + '-gridDataMain');
        const rec = gridMain.getStore().getAt(rowIndex);

        console.log('OnDetail01 rec', rec);

        gridMain.hide();
        Ext.getCmp(prototype.id + '-gridDETALLE').show();

        Ext.getCmp(prototype.id + '-btnSearch').hide();
        Ext.getCmp(prototype.id + '-btnExcel').hide();
        Ext.getCmp(prototype.id + '-btnClear').hide();
        Ext.getCmp(prototype.id + '-cmbFecFiltro').hide();
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
        Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
        Ext.getCmp(prototype.id + '-txtUser').hide();
        Ext.getCmp(prototype.id + '-cmbProctypeSettl').hide();
        Ext.getCmp(prototype.id + '-txtCountry').hide();

        Ext.getCmp(prototype.id + '-btnback').show();
        Ext.getCmp(prototype.id + '-btnuser').show();
        Ext.getCmp(prototype.id + '-cmbUser').show();

        // ← ocultar paginador y leyenda al entrar al detalle
        Ext.getCmp(prototype.id + '-pagi12').hide();
        Ext.getCmp(prototype.id + '-pagginator-legend').hide();

        me.beantmpdetaill = {
            IN_OPTION: '1',
            IN_CCUST: '139',
            IN_DATE: rec.get('A1672FPROC'),
            IN_SOURCE: rec.get('A1672FUENT'),
            IN_COUNTRY: '',
            IN_USER: ''
        };

        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05876', me.beantmpdetaill);

            console.log('OnDetail01 response sp', res);

            if (res.lstRs) {
                const data = res.lstRs?.[0] || [];

                const gridDetalle = Ext.getCmp(prototype.id + '-gridDETALLE');

                const fields = Object.keys(data[0] || {});

                fields.push('TOTAL');

                const storeDetalle = Ext.create('Ext.data.Store', {
                    fields: fields,
                    data: data
                });

                storeDetalle.each(function (rec) {
                    rec.set('TOTAL',
                        ((rec.get('PEDINMACH')) || 0) +
                        ((rec.get('PEDINADM')) || 0) +
                        ((rec.get('PEDINACM')) || 0) +
                        ((rec.get('PEDINERROR')) || 0) +
                        ((rec.get('PROCE')) || 0)
                    );
                });

                gridDetalle.setStore(storeDetalle);
                gridDetalle.setStore(storeDetalle);

                Ext.defer(function () {
                    gridDetalle.getView().refresh();
                }, 50);
            }

        } catch (error) {
            console.error('Error cargando detalle:', error);
        }

        await me.onLoadUsersDetail(rec);
    },

    onFilterAuditorDetail: function (combo, newValue) {
        const grid = Ext.getCmp(prototype.id + '-gridDETALLE');
        const store = grid.getStore();

        if (!store) return;

        store.clearFilter(false);

        if (!newValue || newValue === 'ALL') {
            grid.getView().refresh();
            return;
        }

        store.filterBy(function (record) {
            return (record.get('A1672UASIG') || '').trim() === newValue.trim();
        });

        grid.getView().refresh();

    },

    onChangeAuditorClick: function (obj) {
        var me = this;

        console.log('onChangeAuditorClick meeee', me);
        Ext.create('Ext.Praxis.view.salesaudit.WorkloadReassignmentForm.DataEntryAsigna', {
            params: {
                beanUser: me.beanUser,
                PROCTYPE1: me.beantmpdetaill.PROCTYPE1,
                PROCTYPESQ1: me.beantmpdetaill.PROCTYPESQ1,
                PRDA1: me.beantmpdetaill.PRDA1
            }
        }).show();
    },

    btnback_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridDataMain').show();
        Ext.getCmp(prototype.id + '-btnSearch').show();
        Ext.getCmp(prototype.id + '-btnExcel').show();
        Ext.getCmp(prototype.id + '-btnClear').show();
        Ext.getCmp(prototype.id + '-cmbFecFiltro').show();
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
        Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
        Ext.getCmp(prototype.id + '-txtUser').show();
        Ext.getCmp(prototype.id + '-cmbProctypeSettl').show();
        Ext.getCmp(prototype.id + '-txtCountry').show();

        // mostrar paginador y leyenda al volver
        Ext.getCmp(prototype.id + '-pagi12').show();
        Ext.getCmp(prototype.id + '-pagginator-legend').show();

        Ext.getCmp(prototype.id + '-gridDETALLE').hide();
        Ext.getCmp(prototype.id + '-btnback').hide();
        Ext.getCmp(prototype.id + '-btnuser').hide();
        Ext.getCmp(prototype.id + '-cmbUser').hide();

        // limpiar filtros del detalle al volver
        var gridDetalle = Ext.getCmp(prototype.id + '-gridDETALLE');
        if (gridDetalle.getStore()) {
            gridDetalle.getStore().clearFilter(false);
        }

        //  recargar grid principal correctamente
        me.onLoadDataMain();
    },

    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>';
    },

    OnColumnTotalRenderer: function (value, metaData, record) {
        const total =
            (record.get('PEDINMACH') || 0) +
            (record.get('PEDINADM') || 0) +
            (record.get('PEDINACM') || 0) +
            (record.get('PEDINERROR') || 0) +
            (record.get('PROCE') || 0);

        return total;
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.beanTMP;
    },

    onPagingBeforeChange02: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.beanTMP;
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        const me = this;
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }

        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-cmbProctypeSettl').getValue();
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        var txtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();

        me.beanPaginationChkChange.IN_OPTION = cmbFecFiltro;
        me.beanPaginationChkChange.IN_PROCESADOR = (CmbTypeprocesa === 'All') ? '' : CmbTypeprocesa;
        me.beanPaginationChkChange.IN_DATEFROM = txtFilterDateFrom;
        me.beanPaginationChkChange.IN_DATETO = txtFilterDateTo;
        me.beanPaginationChkChange.IN_USER = (txtUser === 'ALL') ? '' : txtUser;
        me.beanPaginationChkChange.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        var grid = Ext.getCmp(prototype.id + '-gridDataMain');
        var store = grid.getStore();
        store.removeAll();
        store.loadPage(1, {
            params: this.beanPaginationChkChange,
            callback: function (records, operation, success) { }
        });
    },

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    }

});