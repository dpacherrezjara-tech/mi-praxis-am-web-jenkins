Ext.define('Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntrySettlBalancesCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySettlBalancesCtrlController',
    url: CONTEXTPATH + '/DataEntrySettlBalancesCntrl',

    init: function (view) {
        // Por ahora vacío
    },

    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await me.getData(me.view);
        me.view.setLoading(false);
    },

    getData: async function (view) {
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05645', view.searchParams);
            const data = res.lstRs.at(0).at(0);
            console.log('data', data);

            // Guarda para el update
            this.ticketData = data;

            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            form.setValues({
                ...data,
                proceedStatus: data.STPROCEDE 
            });
        } catch (e) {
            console.error(e);
        }
    },

    onUpdateClick: async function () {
        const me = this;
        me.view.setLoading(true);

        try {
            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            const selectedStatus = form.getValues().proceedStatus;

            const params = {
                IN_CCUST:me.ticketData.CCUST,
                IN_CCIA: me.ticketData.CCIA,
                IN_FORMA: me.ticketData.FORMA,
                IN_SERIE: me.ticketData.SERIE,
                IN_SEQ: me.ticketData.SEQ,
                IN_CORRL: me.ticketData.CORRL,
                IN_TDOCVTA: me.ticketData.TDOCVTA,
                IN_SEQROLL: me.ticketData.SEQROLL,
                IN_TDOC: me.ticketData.TDOC,
                IN_PRDA: me.ticketData.PRDA,
                IN_AREFNBR: me.ticketData.AREFNBR,
                IN_STPROCEDE: selectedStatus
            };

            console.log('Params para guardar:', params);

            const res = await global.callStorePost('PRAXISMP', 'SQP05650', params);
            const {lstVals} = res.data;
            new AWN().success(lstVals.OUT_MSG);

        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {
            me.view.setLoading(false);
            me.getData(me.view);
        }
    },

    onCancelClick: function () {
        this.view.close();
    }
});
