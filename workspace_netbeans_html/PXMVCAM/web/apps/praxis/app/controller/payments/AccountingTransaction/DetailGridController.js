Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATDetailGridController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        me.setColumnasFecha({type: view.searchParams.IN_TFECHA});
        this.getData({view: view});
    },
    getData: function ( {view}) {
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${view.url}/loadSummaryTreeDetail`,
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
        view.bindStore(store);
    },
    setColumnasFecha: function ( {type}){
        const fechap = Ext.getCmp(prototype.id + '-det-fechap');
        const fechah = Ext.getCmp(prototype.id + '-det-fechah');
        //const colIdflex = Ext.getCmp(prototype.id + '-colIDFlex');
        if (type === 'P') {
            fechap.setText('Processing<br>Date');
            fechap.setConfig('dataIndex', 'prda');
            fechah.setText('Sale<br>Date');
            fechah.setConfig('dataIndex', 'sdate');
            //colIdflex.setText('FLEX ID');
        } else {
            fechap.setText('Sale<br>Date');
            fechap.setConfig('dataIndex', 'sdate');
            fechah.setText('Processing<br>Date');
            fechah.setConfig('dataIndex', 'prda');
            //colIdflex.setText('PRAXIS ID');
        }
        this.view.getView().refresh();
    },
    onClickAccountingDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.idflex.trim() === '') {
            global.Msg({
                msg: 'Empty ID'
            });
            return;
        }
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const accountingPanel = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.AccountingGrid', {
            id: prototype.id + '-accountingGrid',
            searchParams: me.formatSearchParams(record.data),
            url: me.view.url
        });
        mainPanel.add(accountingPanel);
    },
    formatSearchParams: function (obj) {
        //console.log(obj);
        return {
            IN_CCUST: '139',
            IN_TDOC: obj.tdoc,
            IN_PRDA: obj.prda,
            IN_AREFNBR: obj.arefnbr
        };
    },
    onClickTickets: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.qtytkt === 0) {
            global.Msg({
                msg: 'No Data'
            });
            return;
        }
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const ticketPanel = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailTicketGrid', {
            id: prototype.id + '-detailTicketGrid',
            searchParams: me.formatSearchParams(record.data),
            url: me.view.url
        });
        mainPanel.add(ticketPanel);
    },
    onClickTicketInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        try {
            if (record.data.ticket.trim() === '') {
                return;
            }
//            const obj = record.data.ticket;
//            console.log("ticket : ", obj.substr(0, 3) , obj.substr(3, 4) , obj.substr(7, 6) ) ;

            let { ccust, ticket, tdoc, seq, corrl } = record.data;
            
            let params = {
                IN_CCUST: ccust,
                IN_CIA: ticket.substr(0, 3),
                IN_FORMA: ticket.substr(3, 4),
                IN_SERIE: ticket.substr(7, 6),
                IN_SEQ: seq,
                IN_TDOC: tdoc,
                IN_CORRL: corrl
            };
            
            const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
                id: prototype.id + '-TicketConciliationDataEntry-1',
                searchParams: params
    //            obj: obj,
    //            callback: () => {
    //                grid.getStore().load();
    //            }
            });
            dataEntry.show();
            
        } catch (e) {
            console.error(e);
        }
        /*
        const obj = record.data.ticket;
        prototypeProgram.view = 'payments-accounting-transaction-form';
        prototypeProgram.nprog = 'PX00000628';
        prototypeProgram.title = 'Accounting Transaction';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = obj.substr(0, 3);
        beanProMasterTicket.IN_FORMA = obj.substr(3, 4);
        beanProMasterTicket.IN_SERIE = obj.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
        */
//        const obj = record.data.ticket;
//        prototypeProgram.view = 'payments-sales-reconciliation-control-form';
//        prototypeProgram.nprog = 'PX00000636';
//        prototypeProgram.title = 'Payments Reconciliation';
//        prototypeProgram.modulo = '';
//        
//        console.log("prototypeProgram", prototypeProgram);
//        
//        var beanProMasterTicket = {};
//        
//        beanProMasterTicket.IN_CIA = obj.substr(0, 3);
//        beanProMasterTicket.IN_FORMA = obj.substr(3, 4);
//        beanProMasterTicket.IN_SERIE = obj.substr(7, 6);
//
//        console.log("beanProMasterTicket", beanProMasterTicket);
//        
//        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    downloadExcel:function(){
        const view = this.view;
        let params = Object.assign({},view.searchParams);
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
                            global.getFile(`${view.url}/downloadSummaryTreeDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


