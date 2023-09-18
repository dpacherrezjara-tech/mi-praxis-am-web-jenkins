Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByPaymentDetailGridController',
    init: function (view) {
        if(!view.backButton){
            Ext.getCmp(prototype.id + '-backButtonDetail-1').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: function ( {view}) {
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadByPaymentDetail`,
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
        view.setStore(store);
        //view.bindStore(store);
    },
    onClickBPO:function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry',{
            id:prototype.id + '-TransacErrorBPODataEntry-1',
            obj:obj
        });
        dataEntry.show();
    }
});


