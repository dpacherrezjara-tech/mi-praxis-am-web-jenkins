Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.AccountingTransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingTransactionController',
    fecha: new Date(),
    url: CONTEXTPATH + '/AccountingTransaction',
    searchParams: null,
    searchUrl: null,
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
//        await me.onClickSearchBtn();
    },
    fillFilters: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilters.mask('Loading Filters...');
        
        if (res.ok) {
            const data = await res.json();
            
            const procesadores = data.lstProcs.filter(x=>x.a4451fech1.trim()==='P');
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbProcs = Ext.getCmp(prototype.id + '-cmbProcessor');
            me.setComboStore({cmp: cmbProcs, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});
            
            const cmbMdas = Ext.getCmp(prototype.id + '-cmbMoneda');
            me.setComboStore({cmp: cmbMdas, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});
            //</editor-fold>
            panelFilters.unmask();
        }
    },
    onClickSearchBtn: async function () {
        await this.loadSummary();
    },
    loadSummary: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        let params = me.formatParameters();
        console.log('Summary Grid Params: ',params);
        
        const summaryGrid = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryGrid', {
            id: prototype.id + '-gridSummary',
            searchParams: params,
            url: me.url
        });
        mainPanel.add(summaryGrid);
    },
    formatParameters: function () {
        let formFilterts = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
        console.log('Summary Grid Filters: ',formFilterts);
        return formFilterts;
    },
    onClickFilterBtn:function(){
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn:function(){
        prototype.id = 'AccountingTransactionForm';
        prototype.url = CONTEXTPATH + '/AccountingTransaction';
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    downloadAllDetailAccountingExcel: async function(){
        const me = this;
        const view = me.view;
        
        me.view.setLoading(true);
        let notifier = new AWN();
        
        try {
            // obtener la grilla summary
            const gridData = Ext.getCmp(prototype.id + '-gridSummary');
            
            if (!gridData) {
                global.Msg({ msg: 'Summary grid not found', icon: 2 });
                me.view.setLoading(false);
                return;
            }
            
            const storeData = gridData.getStore().getData().items;
            
            // Obtener solo las filas marcadas con CHECK
            let dataSelected = storeData
                .filter(x => x.data.CHECK === true || x.data.CHECK === 1)
                .map(x => ({ ...x.data }));
            
            // Si no hay selección, avisar y no llamar nada
            if (dataSelected.length === 0) {
                global.Msg({ msg: 'Please select at least one record to download', icon: 1 });
                me.view.setLoading(false);
                return;
            }
            
            // Guardar selección en tabla temporal XTEMPO
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', dataSelected);
            
            if (!tmp.success) {
                global.Msg({ msg: 'Error saving selection to temporary table', icon: 2 });
                me.view.setLoading(false);
                return;
            }
            
            let params = me.formatParameters();
            params.IN_CUUID = tmp.cuuid;
            params.IN_FUUID = tmp.fuuid;
            
            // Llamar al endpoint de descarga
            global.getFile(`${me.url}/downloadAllDetailAccounted?${new URLSearchParams(params)}`);
            
        } catch (e) {
            console.log(e);
            notifier.alert('System Error on Download');
        }
        finally {
            me.view.setLoading(false);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeFechaBtn: function (obj) {
        const me = this;
        let combo2 = null;
        try {
            let valor1 = Ext.Date.format(obj.getValue(), 'Ymd');
            //valor1 = parseInt(valor1);
            const opts = {
                'dateTo': () => {
                    combo2 = me.getCmp({id: '-dateFrom'});
                    let valor2 = Ext.Date.format(combo2.getValue(), 'Ymd');
                    //valor2 = parseInt(valor2);
                    if (valor1 >= valor2 && valor2 !== '') {
                        return;
                    }
                    combo2.setValue(obj.getValue());
                },
                'dateFrom': () => {
                    combo2 = me.getCmp({id: '-dateTo'});
                    combo2.setValue(obj.getValue());
                }
            };
            opts[obj.id.split('-').at(-1)]();
        } catch (err){
            return;
        }
    },
    validaFecha: function (value) {
        // Validar la fecha aquí
        // Devolver true si es válida, o un mensaje de error si no lo es
        if (value === null || value === '') {
            return 'Debe ingresar una fecha.';
        }
        try {
            const selectedDate = Ext.Date.format(value, 'Ym');
            return true;
        } catch (err) {
            return 'Fecha no válida.';
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
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
    }
    //</editor-fold>

});


