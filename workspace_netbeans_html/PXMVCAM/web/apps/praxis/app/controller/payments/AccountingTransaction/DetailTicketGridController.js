Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.DetailTicketGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATDetailTicketGridController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.getData({view: this.view});
    },
    getData: async function ({view}) {
        let params = Object.assign({}, view.searchParams);
        const expectedParams = ['IN_CCUST', 'IN_PRDA', 'IN_TDOC', 'IN_AREFNBR'];
        expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

        const res = await global.callStoreGet('PRAXISMP', 'SQP05043', params);
        const data = res.lstRs[0];

        const store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data
        });
        view.setStore(store);
        if (data.length === 0) {
            global.Msg({msg: 'Data not Found'});
        }
    },
    onClickTicketInfo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        console.log(record.data.TKT);
        if (record.data.TKT.trim() === '') {
            return;
        }
        const obj = record.data;

        prototypeProgram.view = 'payments-accounting-transaction-form';
        prototypeProgram.nprog = 'PX00000628';
        prototypeProgram.title = 'Accounting Transaction';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA   = obj.CCIA;
        beanProMasterTicket.IN_FORMA = obj.FORMA;
        beanProMasterTicket.IN_SERIE = obj.SERIE;

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
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
                    const excelFields = [
                        { title: 'Payment Date',        field: 'PAYDATE',           order: 1  },
                        { title: 'Status',              field: 'STVAL_DESCRIPTION', order: 2  },
                        { title: 'Ticket',              field: 'TKT',               order: 3  },
                        { title: 'Seq',                 field: 'SEQ',               order: 4  },
                        { title: 'Card Number',         field: 'SCARDN',            order: 5  },
                        { title: 'Auth',                field: 'SAUTHOC',           order: 6  },
                        { title: 'PNR',                 field: 'SPNR',              order: 7  },
                        { title: 'Sale Date',           field: 'SDATE',             order: 8  },
                        { title: 'Currency',            field: 'SCURRENCY',         order: 9  },
                        { title: 'Total Sale Amount',   field: 'SVFOPS_TOTAL',      order: 10 },
                        { title: 'Amount Transaction',  field: 'SVFOPS',            order: 11 },
                        { title: 'Acc. Sales Date',     field: 'FCONT',             order: 12 },
                        { title: 'Acc. Sales ID',       field: 'IDCON',             order: 13 },
                        { title: 'Acc. Settl. Date',    field: 'LIQ_FCON',          order: 14 },
                        { title: 'Acc. Settl. ID',      field: 'LIQ_IDCON',         order: 15 },
                        { title: 'Acc. Settl. Status',  field: 'STCONL_DESCRIPTION', order: 16 }
                    ];
                    let params = Object.assign({}, view.searchParams);
                    const expectedParams = ['IN_CCUST', 'IN_PRDA', 'IN_TDOC', 'IN_AREFNBR'];
                    expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

                    await global.callStoreDownloadExcel('PRAXISMP', 'SQP05043', params,
                        'Accounting Transaction - Detail Tickets - ' + win.getFechaFormat(),
                        excelFields);
                }
            }
        });
    }
});


