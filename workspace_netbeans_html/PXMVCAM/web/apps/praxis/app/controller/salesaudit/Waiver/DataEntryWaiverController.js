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
            var data = p.rec.data;
            var tickets = (data.A2537TKTS || '').trim().split(' ').filter(function (v, i, a) {
                return v !== '' && a.indexOf(v) === i;
            }).join(' ');
            var ccust = (data.A2537CCUST || '').trim();
            meDe._ccust  = ccust;
            meDe._tickets = tickets;
            if (tickets !== '') {
                await meDe.loadWaiverData(ccust, tickets);
            }
        }
    },

    loadWaiverData: async function (ccust, tickets) {
        var grid = Ext.getCmp(prototype.id + '-de-gridTickets');
        grid.setLoading(true);
        try {
            var res = await global.callStoreGet('PXSAUDIT', 'SQP01444', {
                V_ACTION:  'T',
                V_CCUST:   ccust,
                V_TICKETS: tickets,
                V_CIA:     '',
                V_FORMA:   '',
                V_SERIE:   '',
                V_CODWA:   ''
            });
            grid.setLoading(false);

            var returned = (res && res.lstRs && res.lstRs[0]) ? res.lstRs[0] : [];
            var returnedMap = {};
            Ext.each(returned, function (r) {
                returnedMap[r.TICKET] = r;
            });

            var ticketList = tickets.trim().split(' ').filter(function (v) { return v !== ''; });
            var storeData = Ext.Array.map(ticketList, function (t) {
                if (returnedMap[t]) {
                    return returnedMap[t];
                }
                // Ticket sin waiver: CIA(3), FORMA(4), SERIE(resto) por ancho fijo
                return {
                    A1672CCUST: ccust,
                    A1672CIA:   t.substring(0, 3),
                    A1672FORMA: t.substring(3, 7),
                    A1672SERIE: t.substring(7),
                    TICKET:     t,
                    A1672CODWA: ''
                };
            });

            grid.getStore().loadData(storeData);
            meDe.resetForm();
        } catch (e) {
            grid.setLoading(false);
        }
    },

    resetForm: function () {
        Ext.getCmp(prototype.id + '-de-txtCodwa').setValue('');
        Ext.getCmp(prototype.id + '-btn-de-save').setDisabled(true);
    },

    onGridSelectionChange: function (selModel, selected) {
        if (!selected || selected.length === 0) {
            meDe.resetForm();
            return;
        }
        const rec     = selected[0];
        const codwa   = (rec.get('A1672CODWA') || '').trim();
        const btnSave = Ext.getCmp(prototype.id + '-btn-de-save');

        Ext.getCmp(prototype.id + '-de-txtCodwa').setValue(codwa);
        btnSave.setDisabled(false);
        btnSave.setText(codwa === '' ? 'Create' : 'Update');
    },

    onSaveClick: async function () {
        var grid = Ext.getCmp(prototype.id + '-de-gridTickets');
        var sel  = grid.getSelection();
        if (!sel || sel.length === 0) {
            global.Msg({ msg: 'Please select a ticket.' });
            return;
        }
        var codwa = (Ext.getCmp(prototype.id + '-de-txtCodwa').getValue() || '').trim();
        if (codwa === '') {
            global.Msg({ msg: 'Please enter a Waiver Code.' });
            return;
        }
        var rec    = sel[0];
        var hasWaiver = (rec.get('A1672CODWA') || '').trim() !== '';
        var action = hasWaiver ? 'U' : 'C';

        grid.setLoading(true);
        try {
            await global.callStoreGet('PXSAUDIT', 'SQP01444', {
                V_ACTION:  action,
                V_CCUST:   rec.get('A1672CCUST'),
                V_TICKETS: '',
                V_CIA:     rec.get('A1672CIA'),
                V_FORMA:   rec.get('A1672FORMA'),
                V_SERIE:   rec.get('A1672SERIE'),
                V_CODWA:   codwa
            });
            grid.setLoading(false);
            await meDe.loadWaiverData(meDe._ccust, meDe._tickets);
        } catch (e) {
            grid.setLoading(false);
            global.Msg({ msg: 'Error saving waiver.' });
        }
    },

    onCancelClick: function () {
        this.view.close();
    }

});
