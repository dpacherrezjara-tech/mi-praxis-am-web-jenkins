Ext.define('Ext.Praxis.controller.payments.ReconciliationDoublePayment.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationDoublePay',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadInfo`,
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
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        ;
        view.setStore(store);
    },
    onTktsDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        let params = me.formatDetailParams(record.data);
        console.log(params);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const detail = Ext.create('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Grids.DetailGrid', {
            id: prototype.id + '-DetailGrid-1',
            url: me.url,
            searchParams: params,
            backButton: true
        });
        mainPanel.add(detail);

    },
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        let params = me.formatDetailParams(record.data);
        const refundForm = Ext.create('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.DataEntrys.RefundInfoDataEntry', {
            id: prototype.id + '-RefundInfoDataEntry-1',
            url: me.url,
            searchParams: params
        });
        refundForm.show();
    },
    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to download?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.url}/downloadInfo?${new URLSearchParams(me.view.searchParams)}`);
                        }
                    }
                });
    },
    formatDetailParams: function (obj) {
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_TDOC: obj.tdoc,
            IN_AREFNBR: obj.arefnbr
        };
        return params;
    }
});


