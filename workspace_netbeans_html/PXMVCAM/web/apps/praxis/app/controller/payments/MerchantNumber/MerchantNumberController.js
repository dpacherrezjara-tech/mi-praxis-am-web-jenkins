Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantNumberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantNumberController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    init: function (view) {
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumberTmz';
    },
    afterRender: async function () {
        await this.fillFilters();
        await this.loadMerchants();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});
            //</editor-fold>
        }
        filterPanel.unmask();
    },
    loadMerchants: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.Grids.MerchantsGrid', {
            id: prototype.id + '-MerchantsGrid-1',
            url: me.url,
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        let params = {
            IN_CCUST: '139',
            ...formFilters.getValues()
        };
        console.log('Search Params: ', params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.loadMerchants();
    },
    onAddMerchantBtn: function () {
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
            id: prototype.id + '-MerchantMaintenanceDataEntry-1',
            option: 'C'
                    //searchParams: me.formatByTicketInfoParams(obj),
                    //obj: obj
        });
        dataEntry.show();
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn:function(){
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress:function(field, e){
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
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