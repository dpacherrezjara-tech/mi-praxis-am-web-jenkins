Ext.define('Ext.Praxis.controller.payments.SalesReconciliationDifferences.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryGridController',
    url: CONTEXTPATH + '/SalesReconciliationDiff',
    init: function (view) {
//        if (view.backButton) {
//            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
//            tbar.items.items[1].show();
//        }
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
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const panelDet = Ext.create('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Grids.SummaryMerchantGrid', {
            id: prototype.id + '-SummaryMerchantGrid-1',
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
        params.IN_SCURRENCY = obj.scurrency;
        params.IN_PMERCHID = 'M';
        console.log(params);
        return params;
    },
    downloadExcel:function(btn){
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to download?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.url}/downloadSummary?${new URLSearchParams(me.view.searchParams)}`);
                        }
                    }
                });
    }
});


