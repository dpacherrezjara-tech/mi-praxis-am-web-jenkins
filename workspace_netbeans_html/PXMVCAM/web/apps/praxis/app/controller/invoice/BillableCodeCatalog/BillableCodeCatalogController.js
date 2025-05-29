Ext.define('Ext.Praxis.controller.invoice.BillableCodeCatalog.BillableCodeCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BillableCodeCatalogController',
    url: CONTEXTPATH + '/BillableCodeCatalog',
    init: function (view) {
        prototype.id = 'BillableCodeCatalogForm';
        prototype.url = CONTEXTPATH + '/BillableCodeCatalog';
    },
    afterRender: async function () {
        this.onClickSearchBtn();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        let params = Ext.getCmp(prototype.id + '-formFilters')
                .getForm().getValues();
        let mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const grid = Ext.create('Ext.Praxis.view.invoice.BillableCodeCatalogForm.Grids.MainGrid', {
            id: prototype.id + '-MainGrid-1',
            searchParams: params
        });
        mainPanel.add(grid);
    },
    onCreateBtn: function () {
        let grid = Ext.getCmp(prototype.id + '-MainGrid-1');
        const dataEntry = Ext.create('Ext.Praxis.view.invoice.BillableCodeCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            option: 'C',
            reload: () => {
                if(grid){
                    grid.getStore().load();
                }
            }
        });
        dataEntry.show();
    },
    onDisplayFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClearOptionsBtn:function(){
        const filters = Ext.getCmp(prototype.id + '-formFilters');
        filters.getForm().reset();
    },
    onChangeFilter: function(btn){
        //Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
        const txtKey = Ext.getCmp(prototype.id + '-txtKey');
        const txtCuent = Ext.getCmp(prototype.id + '-txtCuenta1');
        const txtScuen = Ext.getCmp(prototype.id + '-txtCuenta2');
        
        txtCuent.setValue('');
        txtScuen.setValue('');
        txtKey.setValue('');
        txtKey.hide();
        txtCuent.hide();
        txtScuen.hide();
        if(btn.value === 'CTA'){
            txtCuent.show();
            txtScuen.show();
        }else{
            txtKey.show();
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