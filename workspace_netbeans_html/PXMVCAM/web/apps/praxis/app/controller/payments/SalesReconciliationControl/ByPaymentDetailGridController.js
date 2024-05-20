Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByPaymentDetailGridController',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButtonDetail-1').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: function ( {view}) {
        const me = this;
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
                        } else {
                            me.showButtonCreditCard();
                        }
                    }
                }
            }
        });
        view.setStore(store);
        //view.bindStore(store);
    },
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
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
                            global.getFile(`${me.view.url}/downloadByPaymentDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    },
    showButtonCreditCard: function () {
        const filter = Ext.getCmp(prototype.id + '-cmbFiltersBP');
        const btnCreditCard = Ext.getCmp(prototype.id + '-groupCreditCard-1');
        if (filter.getValue() === 'F') {
            btnCreditCard.show();
        } else {
            btnCreditCard.hide();
        }
    },
    groupByCreditCard: function () {
        const formFilter = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        console.log('Parametros', formFilter.getValues());
        const winCreditCard = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CreditCardFilterDataEntry', {
            id: prototype.id + '-CreditCardFilterDataEntry-1',
            searchParams: formFilter.getValues()
        });
        winCreditCard.show();
    }
});


