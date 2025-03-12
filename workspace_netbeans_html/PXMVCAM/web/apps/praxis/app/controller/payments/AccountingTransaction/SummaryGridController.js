Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATSummaryGridController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.mask('Loading...');
        const res = await fetch(`${view.url}/loadSummary?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            const storeSummary = Ext.create('Ext.data.Store', {
                autoLoad: true,
                data: data.response,
                pageSize: 20,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            view.bindStore(storeSummary);
            if (data.response.length === 0) {
                global.Msg({msg: 'Data not found'});
            }
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
            url: view.url,
            searchParams: params,
            tdate: view.searchParams.IN_TFECHA
        });
        mainPanel.add(treePanel);
    },
    formatMonthParameters: function (obj) {
        const viewParams = this.view.searchParams;
        return {
            IN_TFECHA: viewParams.IN_TFECHA,
            FECHA_FROM: obj.fecha,
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_MDA: obj.scurrency,
            IN_TDOC: viewParams.IN_TDOC,
            IN_PNR: viewParams.IN_PNR,
            IN_PRAXISID: viewParams.IN_PRAXISID,
            IN_FLEXID: viewParams.IN_FLEXID
        };
    },
    downloadExcel: function () {
        const view = this.view;
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
                            global.getFile(`${view.url}/downloadSummary?${new URLSearchParams(view.searchParams)}`);
                        }
                    }
                });
    }
});


