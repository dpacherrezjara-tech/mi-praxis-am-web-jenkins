Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.CatalogGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CatalogGridController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-backButton-1').show();
        }
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
                url: `${me.url}/loadKeys`,
                extraParams: {
                    IN_CCUST: '139',
                    IN_KEY2: 'CCUSERS'
                },        
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
    onClickBackButton: function () {
        const me = this.view;
        if (me.backButton) {
            me.backButton();
        }
    },
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.DataEntrys.CatalogMaintenanceDataEntry', {
            id: prototype.id + '-CatalogMaintenanceDataEntry-1',
            option: 'U',
            searchParams: me.formatEditParams(record.data),
            obj: record.data
        });
        console.log("dp: CatalogGridController record.data = " , record.data);
        dataEntry.show();
    },
    formatEditParams: function (rec) {
        let params = {
            IN_CCUST: '139',
            IN_KEY2: rec.A4593KEY2
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
                            global.getFile(`${view.url}/downloadkeys?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }

});