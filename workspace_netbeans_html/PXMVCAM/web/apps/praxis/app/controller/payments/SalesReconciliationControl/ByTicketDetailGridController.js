Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByTicketDetailGridController',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButtonDetail-2').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: function ( {view}) {
        console.log("view.searchParams",view.searchParams);
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadByTicketDetail`,
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
                        console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        view.setStore(store);
    },
    onClickTicket: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
            id: prototype.id + '-TicketConciliationDataEntry-1',
            searchParams: me.formatByTicketInfoParams(obj),
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },
    formatByTicketInfoParams: function (obj) {
        let params = {
            IN_CCUST: obj.a4501CCUST,
            IN_CIA: obj.a4501CIA,
            IN_FORMA: obj.a4501FORMA,
            IN_SERIE: obj.a4501SERIE,
            IN_SEQ: obj.a4501SEQ,
            IN_TDOC: obj.a4501TDOC,
            IN_CORRL: obj.a4501CORRL
        };
        return params;
    },
    downloadExcel: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.view.url}/downloadByTicketDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


