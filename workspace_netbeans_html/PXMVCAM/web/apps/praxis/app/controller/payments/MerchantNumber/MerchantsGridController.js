Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantsGridController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    init: function (view) {
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
                url: `${view.url}/loadMerchants`,
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
    },
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
            id: prototype.id + '-MerchantMaintenanceDataEntry-1',
            option: 'U',
            searchParams: me.formatEditParams(record.data),
            obj: record.data
        });
        dataEntry.show();
    },
    onDeleteClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const merchant = record.data.merchn;

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.deleteMerchantNumber(merchant);
                        }
                    }
                });
    },
    deleteMerchantNumber: async function (merchant) {
        const me = this;

        let params = {
            IN_MERCHN: merchant,
            IN_CCUST: '139',
            IN_CHOPTION: 'D'
        };

        const res = await fetch(`${me.url}/maintenanceMerchant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (res.ok) {
            global.Msg({msg: 'Deleted Successfull'});
            Ext.getCmp(prototype.id + '-MerchantsGrid-1').getStore().load();
        } else {
            const msg = await res.text();
            console.error('Error: ' + msg);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'Error!<br>Check Console for more<br>Information.',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
    },
    formatEditParams: function (rec) {
        let params = {
            IN_CCUST: '139',
            IN_MERCHN: rec.merchn
        };
        return params;
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
                            global.getFile(`${view.url}/downloadMerchants?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


