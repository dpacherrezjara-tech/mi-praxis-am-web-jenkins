Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATSummaryGridController',
    filters: {},
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.getData();
    },
    getData: async function () {
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.mask('Loading...');
        this.filters = view.searchParams;

        let params = Object.assign({}, view.searchParams);
        const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'FECHA_TO', 'IN_PROCESADOR',
            'IN_MDA', 'IN_TDOC', 'IN_PNR', 'IN_PRAXISID',
            'IN_FLEXID', 'IN_AREFNBR', 'IN_TICKET'];
        expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

        const res = await global.callStoreGet('PRAXISMP', 'SQP05036', params);
        const data = res.lstRs[0];

        const storeSummary = Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });
        view.bindStore(storeSummary);
        if (data.length === 0) {
            global.Msg({msg: 'Data not found'});
        }
        mainPanel.unmask();
    },
    onClickMonth: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = this.view;

        let params = me.formatMonthParameters(record.data);
        console.log('Summary Tree Params: ', params);

        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(0).hide();
        const treePanel = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryTree', {
            id: prototype.id + '-treePanel',
            searchParams: params,
            tdate: view.searchParams.IN_TFECHA
        });
        mainPanel.add(treePanel);
    },
    formatMonthParameters: function (obj) {
        const viewParams = this.view.searchParams;
        return {
            IN_TFECHA:     viewParams.IN_TFECHA,
            FECHA_FROM:    obj.MIN_DATE,
            FECHA_TO:      obj.MAX_DATE,
            IN_PROCTYPE:   obj.PROCTYPE,
            IN_PROCTYPESQ: obj.PROCTYPESQ,
            IN_MDA:        obj.SCURRENCY,
            IN_TDOC:       viewParams.IN_TDOC,
            IN_PNR:        viewParams.IN_PNR,
            IN_PRAXISID:   viewParams.IN_PRAXISID,
            IN_FLEXID:     viewParams.IN_FLEXID,
            IN_TICKET:     this.filters.IN_TICKET,
            IN_AREFNBR:    this.filters.IN_AREFNBR
        };
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
                          field: 'FECHA',        order: 1 },
                        { title: 'Processor',    field: 'PROC_DESC',     order: 2 },
                        { title: 'Currency',     field: 'SCURRENCY',     order: 3 },
                        { title: 'Match',        field: 'ACCOUNTED',     order: 4 },
                        { title: 'Qty Match',    field: 'QTY_ACCOUNTED', order: 5 },
                        { title: 'Pending',      field: 'PENDING',       order: 6 },
                        { title: 'Qty Pending',  field: 'QTY_PENDING',   order: 7 },
                        { title: 'Total',        field: 'TOTAL',         order: 8 },
                        { title: 'Qty Total',    field: 'QTY_TOTAL',     order: 9 }
                    ];
                    let params = Object.assign({}, view.searchParams);
                    const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'FECHA_TO', 'IN_PROCESADOR',
                        'IN_MDA', 'IN_TDOC', 'IN_PNR', 'IN_PRAXISID',
                        'IN_FLEXID', 'IN_AREFNBR', 'IN_TICKET'];
                    expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

                    await global.callStoreDownloadExcel('PRAXISMP', 'SQP05036', params,
                        'Accounting Transaction - Summary ' + params.FECHA_FROM,
                        excelFields);
                }
            }
        });
    }
});


