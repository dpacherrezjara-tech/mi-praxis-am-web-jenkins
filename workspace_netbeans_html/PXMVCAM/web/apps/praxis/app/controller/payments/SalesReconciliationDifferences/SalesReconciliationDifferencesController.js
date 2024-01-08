Ext.define('Ext.Praxis.controller.payments.SalesReconciliationDifferences.SalesReconciliationDifferencesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationDifferencesController',
    fecha: new Date(),
    url: prototype.url,
    init: function (view) {
        prototype.id = 'SalesReconciliationDiff';
        prototype.url = CONTEXTPATH + '/SalesReconciliationDiff';
        prototype.width = 1850;
        prototype.height = 630;
    },
    afterRender: async function (obj, e) {
        await this.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            const{procesadores, paises} = data;
            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbProctype');
            me.setComboStore({cmp: cmbProcesadores, data: procesadores,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});
        }
        filterPanel.unmask();
    },
    //<editor-fold defaultstate="collapsed" desc="Parameters">
    formatSearchParams: function () {
        //const me = this;
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        let params = {
            IN_CCUST: '139',
            ...formFilters.getValues()
        };
        console.log(params);
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const me = this;
        let params = me.formatSearchParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panel = Ext.create('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Grids.SummaryGrid', {
            id: prototype.id + '-SummaryGrid-1',
            url: prototype.url,
            searchParams: params
        });
        mainPanel.add(panel);
    },
    onClickClearBtn: function () {
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
    },
    onClickProcessBtn: function () {
        const newWindow = Ext.create('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.DataEntrys.ProcessDataEntry', {
            id: prototype.id + '-ProcessDataEntry-1'
        });
        newWindow.show();
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeFechaBtn: function (obj) {

    },
    validaFecha: function (value) {
        // Validar la fecha aquí
        // Devolver true si es válida, o un mensaje de error si no lo es
        if (value === null || value === '') {
            return 'Debe ingresar una fecha.';
        }
        try {
            const selectedDate = Ext.Date.format(value, 'Ymd');
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


