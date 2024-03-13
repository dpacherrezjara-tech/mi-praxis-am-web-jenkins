Ext.define('Ext.Praxis.controller.payments.MiscellaneousCatalog.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    url: CONTEXTPATH + '/MiscellaneousCatalog',
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
            proxy: {
                type: 'ajax',
                url: `${view.url}/loadCatalog`,
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
    onDuplicateClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const params = {
            a4451key1: record.data.a4451key1,
            a4451key2: record.data.a4451key2.trim(),
            a4451cant1: 0,
            a4451cant2: 0,
            a4451fech1: record.data.a4451fech1.trim(),
            a4451fech2: record.data.a4451fech2.trim(),
            a4451comen: record.data.a4451comen.trim()
        };
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MiscellaneousCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            option: 'C',
            obj: params
        });
        dataEntry.show();
    },
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MiscellaneousCatalogForm.DataEntrys.MaintenanceDataEntry', {
            id: prototype.id + '-MaintenanceDataEntry-1',
            option: 'U',
            searchParams: me.formatEditParams(record.data),
            obj: record.data
        });
        dataEntry.show();
    },
    onDeleteClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const k1 = record.data.a4451key1;
        const k2 = record.data.a4451key2;
        const k3 = record.data.a4451key3;
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
                            this.deleteMisc(k1, k2, k3);
                        }
                    }
                });
    },
    deleteMisc: async function (k1, k2, k3) {
        const me = this;
        let params = {
            IN_A4451KEY1: k1,
            IN_A4451KEY2: k2,
            IN_A4451KEY3: k3,
            IN_OPTION: 'D'
        };

        const res = await fetch(`${me.url}/maintenanceCatalog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (res.ok) {
            global.Msg({msg: 'Deleted Successfull'});
            Ext.getCmp(prototype.id + '-MainGrid-1').getStore().load();
        } else {
            global.Msg({
                msg: 'Error'
            });
        }
    },
    formatEditParams: function (rec) {
        let params = {
            IN_A4451KEY1: rec.a4451key1,
            IN_A4451KEY2: rec.a4451key2,
            IN_A4451KEY3: rec.a4451key3
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
                            global.getFile(`${view.url}/downloadCatalog?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


