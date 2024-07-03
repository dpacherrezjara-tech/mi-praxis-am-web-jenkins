Ext.define('Ext.Praxis.controller.invoice.ArithmeticValidation.ArithmeticValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ArithmeticValidationController',
    url: CONTEXTPATH + '/ArithmeticValidation',
    init: function (view) {
        prototype.id = 'ArithmeticValidationForm';
        prototype.url = CONTEXTPATH + '/ArithmeticValidation';
    },
    afterRender: async function () {
        this.onClickSearchBtn();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.searchTicketGrid();
    },
    onDisplayFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClearOptionsBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-formFilters');
        filters.getForm().reset();
    },
    onEnterKeyPress:function(field, e){
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickTicket: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {A1946FPROC, A1946TRNCU, A1946TRNCO, A1946TIPO, A1946CIA, A1946FORMA, A1946SERIE} = record.data;
        let params = {
            IN_FPROC: A1946FPROC,
            IN_TRNCU: A1946TRNCU,
            IN_TRNCO: A1946TRNCO,
            IN_TIPO: A1946TIPO,
            IN_CIA: A1946CIA,
            IN_FORMA: A1946FORMA,
            IN_SERIE: A1946SERIE
        };
        this.searchInformation(params);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Functions">
    searchTicketGrid: async function () {
        let params = Ext.getCmp(prototype.id + '-formFilters')
                .getForm().getValues();
        const ticketGrid = Ext.getCmp(prototype.id + '-ticketsGrid');
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/loadErrors`,
                extraParams: params,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        ticketGrid.setStore(store);
    },
    searchInformation: async function (params) {
        const me = this;
        const panel = Ext.getCmp(prototype.id + '-panelInfo');
        panel.mask('Loading...');
        const gridTotals = Ext.getCmp(prototype.id + '-ticketTotals');
        gridTotals.getStore().removeAll();
        const gridDetails = Ext.getCmp(prototype.id + '-ticketDetails');
        gridDetails.getStore().removeAll();
        const res = await fetch(`${me.url}/loadInformation?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const response = data.response;
            console.log("Response: ",data);
            if(response.length>0){
                let totals = response.filter(x => x.A1924TREGI === 'T');
                let storeTotals = new Ext.data.Store({
                    data: totals
                });
                gridTotals.setStore(storeTotals);
                let excludedValues = ['T', 'P', 'L'];
                let details = response.filter(x => !excludedValues.includes(x.A1924TREGI));
                let fields = Object.keys(details.at(0));
                let storeDetails = new Ext.data.Store({
                    fields: fields, //Deben añadirse la columnas para el RowEditing
                    data: details,
                    autoLoad: true
                });
                gridDetails.setStore(storeDetails);
            }else{
                global.Msg({msg:'Data not Found'});
            }
        }
        panel.unmask();
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