Ext.define('Ext.Praxis.controller.payments.ReconciliationDoublePayment.ReconciliationDoublePaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReconciliationDoublePaymentController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationDoublePay',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            const procesadores = data.procesadores;
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbProctype');
            me.setComboStore({cmp: cmbProcesadores, data: procesadores,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});

            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdas = Ext.getCmp(prototype.id + '-cmbMoneda');
            me.setComboStore({cmp: cmbMdas, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});
            //</editor-fold>
        }
        filterPanel.unmask();
    },
    onClickSearchBtn: function () {
        const me = this;
        let params = me.formatMainGridParams();
        console.log(params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelTree = Ext.create('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Grids.MainGrid', {
            id: prototype.id + '-MainGrid-1',
            url: me.url,
            searchParams: params
        });
        mainPanel.add(panelTree);
    },
    formatMainGridParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard.at(0) !== '' && obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0)}%${obj.creditcard.at(1)}%`;
        }
        return params;
    },
    onChangeDateBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-datefieldFrom');
        const to = Ext.getCmp(prototype.id + '-datefieldTo');
        const opts = {
            'datefieldFrom': () => {
                to.setValue(from.getValue());
            },
            'datefieldTo': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        const filter = Ext.getCmp(prototype.id + '-formFilters');
        filter.getForm().reset();
    },
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
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    }
    //</editor-fold>
});
