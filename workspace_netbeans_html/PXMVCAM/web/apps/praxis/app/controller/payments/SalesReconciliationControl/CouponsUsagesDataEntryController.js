Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.CouponsUsagesDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponsUsagesDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    sabreLoaded: false,
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.loadPraxisUsages();
    },
    validateDocType: function (doctype) {
        const validDocs = ['TKT', 'EMD'];
        let result = validDocs.some(x => doctype === x);
        return result;
    },
    loadPraxisUsages: async function () {
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
                        tipod: me.view.doctype,
                        itin: IN_ITIN,
                        c1: out_USOS.slice(0, 1),
                        c2: out_USOS.slice(1, 2),
                        c3: out_USOS.slice(2, 3),
                        c4: out_USOS.slice(-1)
                    }]
            });
            Ext.getCmp(prototype.idUse + '-gridUsages').setStore(store);
        }
        let valid = me.validateDocType(me.view.doctype.slice(0, 3));
        if (!valid) {
            Ext.toast({
                html: '<b>Invalid Document</b>',
                iconCls: 'prx-icon-incomplete',
                title: 'Error',
                align: 't',
                slideInDuration: 300,
                minWidth: 250
            });
            me.view.close();
            return;
        }
        me.view.unmask();
    },
    loadSabreUsages: async function () {
        const me = this;
        me.view.mask('Loading...');
        const {IN_CIA, IN_FORMA, IN_SERIE} = me.view.searchParams;
        let ticketParam = IN_CIA + IN_FORMA + IN_SERIE;
        const res = await fetch(`${me.url}/loadSabreUses/${ticketParam}`);
        if (res.ok) {
            const data = await res.json();
            let coupons = [];
            if (data.length > 0) {
                coupons = data.map(x => ({
                        ticket: ticketParam,
                        tipod: me.view.doctype,
                        coupon: x.coupon,
                        origin: x.startLocation ? x.startLocation.value : '',
                        destiny: x.endLocation ? x.endLocation.value : '',
                        oldstatus: x.previousStatus,
                        status: x.currentStatus
                    }));
            } else {
                global.Msg({msg: 'No data'});
            }
            const store = Ext.create('Ext.data.Store', {
                data: coupons
            });
            Ext.getCmp(prototype.idUse + '-gridUsagesSabre').setStore(store);
        } else {
            console.error(res);
            global.Msg({msg: 'Not Found'});
        }
        me.view.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    },
    onChangeUse: function (checkbox, newValue) {
        const me = this;
        if (newValue) {
            if (!me.sabreLoaded) {
                me.loadSabreUsages();
                me.sabreLoaded = true;
            }
            Ext.getCmp(prototype.idUse + '-gridUsages').hide();
            Ext.getCmp(prototype.idUse + '-gridUsagesSabre').show();
        } else {
            Ext.getCmp(prototype.idUse + '-gridUsages').show();
            Ext.getCmp(prototype.idUse + '-gridUsagesSabre').hide();
        }
    },
    reloadGrids: function () {
        const me = this;
        const sabreGrid = Ext.getCmp(prototype.idUse + '-gridUsagesSabre');
        if (sabreGrid.isVisible()) {
            me.loadSabreUsages();
        } else {
            me.loadPraxisUsages();
        }
    }
});
