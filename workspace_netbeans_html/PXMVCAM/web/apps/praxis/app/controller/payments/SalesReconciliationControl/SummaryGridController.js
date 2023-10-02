Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryGridController',
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
        view.mask('Loading...');
        const res = await fetch(`${view.url}/loadSummary?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            let store = Ext.create('Ext.data.Store', {
                pageSize: 20,
                data: data.response,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                },
                autoLoad: true
            });
            view.setStore(store);
        }
        view.unmask();
    },
    onClickDate: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        console.log(me.formatDateParams(obj));
        const mainPanel = Ext.getCmp(prototype.id + '-mainContentSumm');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const panelDet = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SummaryDetailGrid', {
            id: prototype.id + '-SummaryDetailGrid-1',
            searchParams: me.formatDateParams(obj),
            url: me.view.url,
            backButton: true
        });
        mainPanel.add(panelDet);
    },
    formatDateParams: function (obj) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.IN_DATEFROM = obj.prda;
        params.IN_DATETO = obj.prda;
        params.IN_PROCTYPE = obj.proctype;
        params.IN_PROCTYPESQ = obj.proctypesq;
        params.IN_PCURRENCY = obj.pcurrency;
        return params;
    }
});


