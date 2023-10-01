Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SummaryDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryDetailGridController',
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
        const res = await fetch(`${view.url}/loadSummaryDetail?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            let store = Ext.create('Ext.data.Store', {
                data: data.response,
                autoLoad: true
            });
            view.setStore(store);
        }
        view.unmask();
    }
});


