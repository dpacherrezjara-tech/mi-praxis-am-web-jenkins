Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.PnrsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PnrsGridController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/loadBrowser`,
                extraParams: view.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        view.setStore(store);
    },
    onClickPNR: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const panelDet = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.TicketsGrid', {
            id: prototype.id + '-TicketsGrid-1',
            searchParams: me.formatTicketsParams(obj),
            backButton: () => {
                drillDown.at(-1).destroy();
                drillDown.at(-1).show();
            }
        });
        mainPanel.add(panelDet);
    },
    formatTicketsParams: function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_PNR: obj.PNR,
            IN_OPTION: 'T',
            IN_FROM: obj.PRDA,
            IN_TO: obj.PRDA
        };
        return params;
    },
    downloadExcel: function () {
        const me = this;
        const view = this.view;
        let params = Object.assign({}, view.searchParams);
        params.excel = true;
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Download Excel?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        global.getFile(`${me.url}/downloadPNR?${new URLSearchParams(params)}`);
                    }
                }
            });
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