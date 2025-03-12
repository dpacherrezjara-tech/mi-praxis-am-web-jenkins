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
    },
    downloadExcel: function () {
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
                            global.getFile(`${view.url}/downloadDetailAccounted?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


