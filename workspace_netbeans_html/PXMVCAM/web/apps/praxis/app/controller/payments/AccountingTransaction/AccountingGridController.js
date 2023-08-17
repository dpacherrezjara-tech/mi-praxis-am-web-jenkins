Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.AccountingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATAccountingGridController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        me.getData({view: view});
    },
    getData: function ( {view}){
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            proxy: {
                type: 'ajax',
                url: `${view.url}/loadDetailAccounted`,
                extraParams: view.searchParams,
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
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        view.setStore(store);
    }
});


