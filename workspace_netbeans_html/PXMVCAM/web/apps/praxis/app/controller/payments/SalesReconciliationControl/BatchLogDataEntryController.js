Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.BatchLogDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BatchLogDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.loadLog();
    },
    loadLog: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idDE5 + '-gridLog');
        me.view.mask('Loading...');
        const filters = Ext.getCmp(prototype.idDE5 + '-formFilters')
                .getForm().getValues();
        filters.IN_CCUST = '139';
        const res = await fetch(`${me.url}/loadBatchLog?${new URLSearchParams(filters)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.response.length > 0) {
                grid.setStore(Ext.create('Ext.data.Store', {
                    data: data.response
                }));
            } else {
                global.Msg({msg: 'No Data'});
            }

        } else {
            global.Msg({msg: 'Error'});
        }
        me.view.unmask();
        me.view.center();
    },
    onClickSearchBtn: function () {
        this.loadLog();
    },
    onClickErrors: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const gridDetail = Ext.getCmp(prototype.idDE5 + '-gridLogDetail');
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            gridDetail.hide();
            global.Msg({msg: 'No data'});
            return;
        }
        gridDetail.show();
        this.getDetail(record, gridDetail);
    },
    getDetail: async function (record, grid) {
        const me = this;
        const view = grid.getView();
        let params = me.requestObjectPX(record.data);
        grid.mask('Loading...');
        const res = await fetch(`${me.url}/loadBatchLogInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            grid.setStore(new Ext.data.Store({
                autoLoad: true,
                data: data.response
            }));
        }
        grid.unmask();
    },
    onClickInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {CCUST, PRDA, TDOC, AREFNBR} = record.data;
        let params = {
            ccust: CCUST,
            prda: PRDA,
            tdoc: TDOC,
            arefnbr: AREFNBR
        };
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: params
        });
    },
    onClose: function () {
        this.view.close();
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
                resultado[nuevaClave] = jsonData[clave];
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

