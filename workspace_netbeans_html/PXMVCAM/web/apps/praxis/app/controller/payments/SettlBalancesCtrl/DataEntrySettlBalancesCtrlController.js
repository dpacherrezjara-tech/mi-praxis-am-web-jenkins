

Ext.define('Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntrySettlBalancesCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySettlBalancesCtrlController',
    url: CONTEXTPATH + '/DataEntrySettlBalancesCntrl',
    init: function (view) {
        
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await this.getData(me.view);
        me.view.setLoading(false);
    },

    getData: async function (view) {
        console.log('view..', view)
         console.log('view.searchParams', view.searchParams);
         try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05645', view.searchParams);
            console.log(res);
            let data = res.lstRs.at(0);
            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            form.setValues(data.at(0));
        } catch (e) {
            
        }

        //let store = global.callStorePaggin('PRAXISMP', 'SQP05644', view.searchParams);
        //console.log('stores dataentry', store)
    },

});