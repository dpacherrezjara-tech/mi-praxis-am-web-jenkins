Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.CouponsUsagesDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponsUsagesDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/loadTicketUses?${new URLSearchParams(me.view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            const {IN_CIA, IN_FORMA, IN_SERIE, IN_ITIN} = me.view.searchParams;
            const {out_USOS} = data;
            const store = Ext.create('Ext.data.Store', {
                data: [{
                        ticket: IN_CIA + IN_FORMA + IN_SERIE,
                        itin: IN_ITIN,
                        c1: out_USOS.slice(0, 1),
                        c2: out_USOS.slice(1, 2),
                        c3: out_USOS.slice(2, 3),
                        c4: out_USOS.slice(-1)
                    }]
            });
            Ext.getCmp(prototype.idUse + '-gridUsages').setStore(store);
        }
        me.view.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    }
});
