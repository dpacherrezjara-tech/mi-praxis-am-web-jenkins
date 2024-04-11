Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementDetailGridController',
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
        //const tdate = view.searchParams.IN_DATE === 'PRDA' ? 'Processing<br>Date' : 'Payment<br>Date';
        //view.columns[0].setText(tdate);
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadSettlementDetail`,
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
        ;
        view.setStore(store);
    },
    onClickDate: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        console.log(me.formatDateParams(obj));
//        const panelMerch = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementSummaryGrid', {
//            id: prototype.id + '-SettlementSummaryGrid-2',
//            searchParams: me.formatDateParams(obj)
//        });
//        panelMerch.show();
    },
    formatMerchantParams: function (obj) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.IN_MERCHANT = 'M';
        params.IN_DATEFROM = obj.paydate ? obj.paydate : obj.prda;
        params.IN_DATETO = obj.paydate ? obj.paydate : obj.prda;
        params.IN_PROCTYPE = obj.proctype;
        params.IN_SCOUNTRY = obj.scountry;
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
                            global.getFile(`${me.view.url}/downloadSettlementDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    },
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.SettlementDataEntry', {
            id: prototype.id + '-SettlementDataEntry-1',
            obj: obj
        });
        dataEntry.show();
    }
});


