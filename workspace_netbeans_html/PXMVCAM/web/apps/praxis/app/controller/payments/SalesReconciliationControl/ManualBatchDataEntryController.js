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
                data: data.response
            });
            console.log(data);
            grid.setStore(store);
            this.view.center();
        }
        me.view.unmask();
    },
    processAdju: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/processBatchInformation?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            global.Msg({msg: data.message});
        } else {
            global.Msg({msg: 'Server Error'});
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
        this.searchParams = params;
        return params;
    },
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, PRDA, TDOC, AREFNBR} = record.data;
        let params = {
            ccust: CCUST,
            prda: PRDA,
            tdoc: TDOC,
            arefnbr: AREFNBR
        };
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: params,
            callback: () => {
                me.deleteTransactionInGrid(grid, AREFNBR);
            }
        });
        dataEntry.show();
    },
    onClickSearchBtn: function () {
        let params = this.formatSearchParams();
        console.log('Grid Params: ', params);
        this.loadGrid(params);
    },
    onProcessAdjuBtn: function () {
        let params = this.formatSearchParams();
        console.log('Process Params: ', params);
        this.processAdju(params);
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
    onMatchTransaction: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to match Transaction?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.fireManualMatch(grid, record.data);
                        }
                    }
                });
    },
    fireManualMatch: async function (grid, obj) {
        const me = this;
        me.view.mask('Loading...');
        let params = me.requestObjectPX(obj);
        params.IN_PROCTYPE = me.searchParams.IN_PROCTYPE;
        params.IN_PROCTYPESQ = me.searchParams.IN_PROCTYPESQ;
        params.IN_FDESGLOSE = 'A';
        const res = await fetch(`${me.url}/autoMatchManual`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.SQLRES === 1) {
                global.Msg({msg: data.SQLMSG});
                me.deleteTransactionInGrid(grid, obj.AREFNBR);
            } else {
                global.Msg({msg: data.SQLMSG});
            }
        }
        me.view.unmask();
    },
    onUpdateAll: function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idDE4 + '-gridBatch');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to match Transactions?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.fireManualMatchBatch(grid);
                        }
                    }
                });
    },
    fireManualMatchBatch: async function (grid) {
        const me = this;
        let store = grid.getStore();
        let selected = grid.getSelectionModel().getSelection();
        let listaMatch = [];
        selected.forEach(x => {
            let formatObj = me.requestObjectPX(x.data);
            formatObj.IN_PROCTYPE = me.searchParams.IN_PROCTYPE;
            formatObj.IN_PROCTYPESQ = me.searchParams.IN_PROCTYPESQ;
            formatObj.IN_FDESGLOSE = 'A';
            listaMatch.push(formatObj);
        });
        console.log(listaMatch);
        if (listaMatch.length > 0) {
            const res = await fetch(`${me.url}/masiveAutoMatchManual`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listaMatch)
            });
            if (res.ok) {
                const data = await res.json();
                global.Msg({msg: data.message});
                Ext.Array.each(selected, function (registro) {
                    store.remove(registro);
                });
            }
        } else {
            global.Msg({msg: 'Server Error'});
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
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;
                // Asigna el valor original a la nueva clave
                if (typeof jsonData[clave] === 'string') {
                    resultado[nuevaClave] = jsonData[clave].trimEnd();
                } else {
                    resultado[nuevaClave] = jsonData[clave];
                }
            }
        }
        return resultado;
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

