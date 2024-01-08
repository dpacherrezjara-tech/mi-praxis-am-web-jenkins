Ext.define('Ext.Praxis.controller.payments.PaymentsCommissions.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    fecha: new Date(),
    url: CONTEXTPATH + '/PaymentsCommissions',
    init: function (view) {
        if (view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
            tbar.items.items[1].show();
        }
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
                url: `${view.url}/loadMasterCommissions`,
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
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const newWindow = Ext.create('Ext.Praxis.view.payments.PaymentsCommissionsForm.DataEntrys.CommissionDataEntry', {
            id: prototype.id + '-CommissionDataEntry-1',
            mode: 'U',
            objID: record.data.id
        });
        newWindow.show();
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
                            global.getFile(`${me.url}/downloadMasterCommissions?${new URLSearchParams(me.view.searchParams)}`);
                        }
                    }
                });
    }

});


