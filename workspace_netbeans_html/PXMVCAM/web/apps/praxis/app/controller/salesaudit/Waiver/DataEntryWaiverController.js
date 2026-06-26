/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.Waiver.DataEntryWaiverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',

    init: function (view) {
        meDe = this;
    },

    afterRender: async function () {
        var p = this.view.params;
        if (p && p.rec && p.rec.data) {
            var data    = p.rec.data;
            var tickets = (data.A2537TKTS  || '').trim();
            var ccust   = (data.A2537CCUST || '').trim();
            if (tickets !== '') {
                await this.loadWaiverData(ccust, tickets);
            }
        }
    },

    loadWaiverData: async function (ccust, tickets) {
        var grid = Ext.getCmp(prototype.id + '-de-gridTickets');
        grid.mask('Loading...');
        try {
            var params = {
                V_CCUST:   ccust,
                V_TICKETS: tickets
            };
            var res = await global.callStoreGet('PXSAUDIT', 'SQP01444', params);
            grid.unmask();
            if (res && res.data) {
                grid.getStore().loadData(res.data);
            }
        } catch (e) {
            grid.unmask();
        }
    },

    onCancelClick: function () {
        this.view.close();
    }

});
