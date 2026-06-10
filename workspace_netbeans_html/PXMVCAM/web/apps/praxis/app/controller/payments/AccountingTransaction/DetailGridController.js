Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATDetailGridController',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        me.setColumnasFecha({type: view.searchParams.IN_TFECHA});
        me.getData({view: view});
    },
    getData: function ({view}) {
        let params = Object.assign({}, view.searchParams);
        const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'IN_PROCTYPE', 'IN_PROCTYPESQ',
            'IN_MDA', 'IN_TDOC', 'IN_PNR', 'IN_STCONL',
            'IN_PRAXISID', 'IN_IDFLEX', 'IN_AREFNBR', 'IN_TICKET'];
        expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

        const store = global.callStorePaggin('PRAXISMP', 'SQP05041', params);
        view.bindStore(store);
    },
    setColumnasFecha: function ({type}) {
        const fechap = Ext.getCmp(prototype.id + '-det-fechap');
        const fechah = Ext.getCmp(prototype.id + '-det-fechah');
        if (type === 'P') {
            fechap.setText('Processing<br>Date');
            fechap.setConfig('dataIndex', 'PRDA');
            fechah.setText('Sale<br>Date');
            fechah.setConfig('dataIndex', 'SDATE');
        } else {
            fechap.setText('Sale<br>Date');
            fechap.setConfig('dataIndex', 'SDATE');
            fechah.setText('Processing<br>Date');
            fechah.setConfig('dataIndex', 'PRDA');
        }
        this.view.getView().refresh();
    },
    onClickAccountingDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.PRAXISID.trim() === '') {
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
            searchParams: me.formatSearchParams(record.data)
        });
        mainPanel.add(accountingPanel);
    },
    formatSearchParams: function (obj) {
        return {
            IN_CCUST:   '139',
            IN_TDOC:    obj.TDOC,
            IN_PRDA:    obj.PRDA,
            IN_AREFNBR: obj.AREFNBR
        };
    },
    onClickTickets: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.QTYTKT === 0) {
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
            searchParams: me.formatSearchParams(record.data)
        });
        mainPanel.add(ticketPanel);
    },
    onClickTicketInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        try {
            if (record.data.TICKET.trim() === '') {
                return;
            }

            let { CCUST: ccust, TICKET: ticket, TDOC: tdoc, SEQ: seq, CORRL: corrl } = record.data;

            let params = {
                IN_CCUST:  ccust,
                IN_CIA:    ticket.substr(0, 3),
                IN_FORMA:  ticket.substr(3, 4),
                IN_SERIE:  ticket.substr(7, 6),
                IN_SEQ:    seq,
                IN_TDOC:   tdoc,
                IN_CORRL:  corrl
            };

            const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
                id: prototype.id + '-TicketConciliationDataEntry-1',
                searchParams: params
            });
            dataEntry.show();

        } catch (e) {
            console.error(e);
        }
    },
    downloadExcel: function () {
        const view = this.view;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: async function (btn) {
                if (btn === 'yes') {
                    const tdate = view.searchParams.IN_TFECHA;
                    const excelFields = [
                        { title: tdate === 'P' ? 'Processing Date' : 'Sale Date',
                          field: tdate === 'P' ? 'PRDA' : 'SDATE',     order: 1  },
                        { title: 'Doc. Type',          field: 'TRANSTYPE',   order: 2  },
                        { title: 'Status',             field: 'STVAL',       order: 3  },
                        { title: 'Flex ID',            field: 'IDFLEX',      order: 4  },
                        { title: 'PRAXIS ID',          field: 'PRAXISID',    order: 5  },
                        { title: 'Date',               field: 'FCONTL',      order: 6  },
                        { title: 'Acc. Status',        field: 'STCONL',      order: 7  },
                        { title: 'Card Number',        field: 'SCARDN',      order: 8  },
                        { title: 'Auth Code',          field: 'SAUTHOC',     order: 9  },
                        { title: tdate === 'P' ? 'Sale Date' : 'Processing Date',
                          field: tdate === 'P' ? 'SDATE' : 'PRDA',     order: 10 },
                        { title: 'Currency',           field: 'SCURRENCY',   order: 11 },
                        { title: 'Transaction Amount', field: 'TGROSAMOUN',  order: 12 },
                        { title: 'PNR',                field: 'SPNR',        order: 13 },
                        { title: 'Qty Tkts',           field: 'QTYTKT',      order: 14 },
                        { title: 'Ticket Nbr',         field: 'TICKET',      order: 15 }
                    ];
                    let params = Object.assign({}, view.searchParams);
                    const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'IN_PROCTYPE', 'IN_PROCTYPESQ',
                        'IN_MDA', 'IN_TDOC', 'IN_PNR', 'IN_STCONL',
                        'IN_PRAXISID', 'IN_IDFLEX', 'IN_AREFNBR', 'IN_TICKET'];
                    expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

                    await global.callStoreDownloadExcel('PRAXISMP', 'SQP05041', params,
                        'Accounting Transaction - SummaryDetail ' + params.FECHA_FROM,
                        excelFields);
                }
            }
        });
    }
});


