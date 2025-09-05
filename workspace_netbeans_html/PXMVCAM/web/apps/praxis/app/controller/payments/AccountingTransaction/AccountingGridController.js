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
//                            this.downloadExcelClient();
                            global.getFile(`${view.url}/downloadDetailAccounted?${new URLSearchParams(params)}`);
                        }
                    }
                });
    },
    
//    downloadExcelClient: async function () {
//        const me = this;
//        const view = me.view;
//        view.setLoading(true);
//
//        try {
//            
//            let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05042', view.searchParams);
//
//            let data = res.map(x => ({
//                'Ticket': x.A4183CIA + x.A4183FORMA + x.A4183SERIE,
//                'Mode': x.A4183MODO,
//                'SRC': x.A4183FUENT,
//                'Sub SRC': x.A4183SUBFU,
//                'FOP': x.A4183FP,
//                'CPN': x.A4183CUPON,
//                'SEQ': x.A4183SEQ,
//                'Settlement Date': x.A4183FPRO,
//                'Settlement Period': x.A4183FCONT,
//                'Account Number': x.A4183CUENT,
//                'LOC Curr': x.A4183CUR,
//                'LOC Debit': x.A4183ACTIV,
//                'LOC Credit': x.A4183PASIV,
//                'Code Concept': x.A4183ORIG,
//                'Description Concept': x.A4183TITU,
//                'Client': x.A4183COPE,
//                'Provider': x.A4183PROV,
//                'Journal Entry': x.A4183IDCON
//            }));
//
//            await global.writeExcelFromJson(data, 'Accounting Transaction - Detail Accounted 20250904');
//            
//        } catch (e) {
//            global.Msg({msg: 'Error generating Excel: ' + e.message});
//        } finally {
//            view.setLoading(false);
//        }
//    }
});


