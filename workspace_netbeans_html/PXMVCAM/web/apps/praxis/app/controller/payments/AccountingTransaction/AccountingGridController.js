Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.AccountingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATAccountingGridController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.getData({view: this.view});
    },
    getData: async function ({view}) {
        let params = Object.assign({}, view.searchParams);
        const expectedParams = ['IN_CCUST', 'IN_PRDA', 'IN_TDOC', 'IN_AREFNBR'];
        expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

        const res = await global.callStoreGet('PRAXISMP', 'SQP05042', params);
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
                        { title: 'Ticket',            field: 'TICKET',     order: 1  },
                        { title: 'Mode',              field: 'A4183MODO',  order: 2  },
                        { title: 'SRC',               field: 'A4183FUENT', order: 3  },
                        { title: 'Sub SRC',           field: 'A4183SUBFU', order: 4  },
                        { title: 'FOP',               field: 'A4183FP',    order: 5  },
                        { title: 'CPN',               field: 'A4183CUPON', order: 6  },
                        { title: 'SEQ',               field: 'A4183SEQ',   order: 7  },
                        { title: 'Settlement Date',   field: 'A4183FPRO',  order: 8  },
                        { title: 'Settlement Period', field: 'A4183FCONT', order: 9  },
                        { title: 'Account Number',    field: 'ACCOUNT',    order: 10 },
                        { title: 'LOC Curr',          field: 'A4183CUR',   order: 11 },
                        { title: 'LOC Debit',         field: 'A4183ACTIV', order: 12 },
                        { title: 'LOC Credit',        field: 'A4183PASIV', order: 13 },
                        { title: 'Concept',           field: 'A4183TITU',  order: 14 },
                        { title: 'Client',            field: 'A4183CLIEN', order: 15 },
                        { title: 'Provider',          field: 'A4183PROV',  order: 16 },
                        { title: 'Journal Entry',     field: 'A4183IDCON', order: 17 }
                    ];
                    let params = Object.assign({}, view.searchParams);
                    const expectedParams = ['IN_CCUST', 'IN_PRDA', 'IN_TDOC', 'IN_AREFNBR'];
                    expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

                    await global.callStoreDownloadExcel('PRAXISMP', 'SQP05042', params,
                        'Accounting Transaction - Detail Accounted ' + params.IN_PRDA,
                        excelFields);
                }
            }
        });
    }
});


