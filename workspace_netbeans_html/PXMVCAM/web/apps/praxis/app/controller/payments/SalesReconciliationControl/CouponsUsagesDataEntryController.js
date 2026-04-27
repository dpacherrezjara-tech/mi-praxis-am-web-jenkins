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
        const {IN_CIA, IN_FORMA, IN_SERIE, IN_ITIN} = me.view.searchParams;
        try {
            const res = await global.callStorePost('PRAXISMP', 'SQP05075', me.view.searchParams);
            const {OUT_USOS} = res.data.lstVals;
            const store = Ext.create('Ext.data.Store', {
                data: [{
                        TICKET: IN_CIA + IN_FORMA + IN_SERIE,
                        TIPOD: me.view.doctype,
                        ITIN: IN_ITIN,
                        C1: OUT_USOS.slice(0, 1),
                        C2: OUT_USOS.slice(1, 2),
                        C3: OUT_USOS.slice(2, 3),
                        C4: OUT_USOS.slice(-1)
                    }]
            });
            Ext.getCmp(prototype.idUse + '-gridUsages').setStore(store);
        } catch (e) {
            global.Msg({msg: 'Error loading usages'});
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
                        TICKET: ticketParam,
                        TIPOD: me.view.doctype,
                        COUPON: x.coupon,
                        ORIGIN: x.startLocation ? x.startLocation.value : '',
                        DESTINY: x.endLocation ? x.endLocation.value : '',
                        OLDSTATUS: x.previousStatus,
                        STATUS: x.currentStatus
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
