Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ManualBatchDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ManualBatchDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.idDE4 + '-formFilters');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            console.log('Filtros: ', data);
            const procesadores = data.procesadores;
            const cmbProcesadores = Ext.getCmp(prototype.idDE4 + '-cmbProctypesq');
            me.setComboStore({cmp: cmbProcesadores, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});
            cmbProcesadores.fireEvent('change', cmbProcesadores,
                    cmbProcesadores.getValue(), null);
        }
        filterPanel.unmask();
    },
    loadGrid: async function (params) {
        const me = this;
        const grid = Ext.getCmp(prototype.idDE4 + '-gridBatch');
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/loadBatchInformation?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                data: data.result
            });
            console.log(data);
            grid.setStore(store);
            this.view.center();
        }
        me.view.unmask();
    },
    formatSearchParams: function () {
        const formFilters = Ext.getCmp(prototype.idDE4 + '-formFilters')
                .getForm().getValues();
        const params = {
            IN_CCUST: '139',
            IN_TDOC: formFilters.IN_TRANSTYPE === 'SALE' ? 'S' : 'R',
            ...formFilters
        };
        return params;
    },
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
            callback: () => {
                me.deleteTransactionInGrid(grid, obj.arefnbr);
            }
        });
        dataEntry.show();
    },
    onClickSearchBtn: function () {
        let params = this.formatSearchParams();
        console.log('Grid Params: ', params);
        this.loadGrid(params);
    },
    onChangeProctypesq: function (combo, newValue, oldValue) {
        const proctype = Ext.getCmp(prototype.idDE4 + '-cmbProctype');
        let store = combo.getStore();
        let record = store.findRecord('a4451key2', newValue);
        proctype.setValue(record.data.a4451key3);
    },
    deleteTransactionInGrid: function (grid, arefnbr) {
        let store = grid.getStore();

        let registrosAEliminar = store.query('arefnbr', arefnbr);

        if (registrosAEliminar && registrosAEliminar.getCount() > 0) {
            // Si se encuentran registros, eliminarlos del store
            store.remove(registrosAEliminar.getAt(0)); // Eliminar el primer registro encontrado
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    sumDate: function (fecha, dias) {
        let fechaDate = new Date(
                parseInt(fecha.substring(0, 4)),
                parseInt(fecha.substring(4, 6)) - 1,
                parseInt(fecha.substring(6, 8))
                );
        // Sumar o restar días a la fecha
        fechaDate.setDate(fechaDate.getDate() + dias);
        let fechaFormateada = Ext.Date.format(fechaDate, 'Ymd');
        return fechaFormateada;
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        let store = me.createComboStore({data: data
            , valueField: valueField, displayField: displayField});
        cmp.bindStore(store);
        cmp.setValue(store.getAt(0).get(valueField));
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
//        let allRecord = {};
//        allRecord[displayField] = 'All';
//        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data
        });
        //inserta record vacio
        //store.insert(0, allRecord);
        console.log('store creado', store);
        return store;
    }
    //</editor-fold>
});

