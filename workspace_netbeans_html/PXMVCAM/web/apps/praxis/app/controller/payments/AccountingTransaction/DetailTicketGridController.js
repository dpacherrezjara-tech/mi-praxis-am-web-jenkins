Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.DetailTicketGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATDetailTicketGridController',
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
                url: `${view.url}/loadDetailTickets`,
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
    onClickTicketInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {

        //var strTkt = rowData.data.A4183TICKET;
        console.log(record.data.tkt);
        if(record.data.tkt.trim()===''){
            return;
        }
        const obj = record.data;

        prototypeProgram.view = 'payments-accounting-transaction-form';
        prototypeProgram.nprog = 'PX00000628';
        prototypeProgram.title = 'Accounting Transaction';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = obj.ccia;
        beanProMasterTicket.IN_FORMA = obj.forma;
        beanProMasterTicket.IN_SERIE = obj.serie;

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
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
                            global.getFile(`${view.url}/downloadDetailTickets?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


