/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.Waiver.WaiverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WaiverController',
    init: function (view) {
        me = this;
        prototype.id = 'WaiverForm';
        prototype.url = CONTEXTPATH + '/Waiver';

        this.control({
            '#WaiverForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#WaiverForm-btnClear': {
                click: this.btnClear_click
            },
            '#WaiverForm-btnFilter': {
                click: this.btnFilter_click
            }
        });
    },
    /**
     * @private Referencia al Ext.grid.Panel interno del widget storeprocgrid.
     */
    getGrid: function () {
        var widget = Ext.getCmp(prototype.id + '-mainGrid');
        return widget ? widget.down('gridpanel') : null;
    },
    formatParams: function () {
        var formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return formFilters.getValues();
    },
    btnSearch_click: function () {
        var grid = Ext.getCmp(prototype.id + '-mainGrid');
        if (grid) {
            grid.getController().reload(me.formatParams());
        }
    },
    btnClear_click: function () {
        var formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
        me.btnSearch_click();
    },
    btnFilter_click: function () {
        var filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            me.btnSearch_click();
        }
    },
    btnCreate_click: function () {
        var existing = Ext.getCmp(prototype.id + '-recordFormWin');
        if (existing) existing.close();
        Ext.create('Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm', {
            id: prototype.id + '-recordFormWin',
            params: {
                action: 'C',
                onSuccess: function () { me.btnSearch_click(); }
            }
        }).show();
    },
    onEditWaiverClick: function (grid, rowIndex, colIndex, item, e, record) {
        var existing = Ext.getCmp(prototype.id + '-recordFormWin');
        if (existing) existing.close();
        Ext.create('Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm', {
            id: prototype.id + '-recordFormWin',
            params: {
                action: 'U',
                rec: record,
                onSuccess: function () { me.btnSearch_click(); }
            }
        }).show();
    },
    btnAdd_click: function () {
        var grid = me.getGrid();
        var sel = grid ? grid.getSelection() : null;
        if (!sel || sel.length === 0) {
            global.Msg({ msg: 'Please select a record.' });
            return;
        }
        var rec = sel[0];
        var existing = Ext.getCmp(prototype.id + '-dataEntry');
        if (existing) existing.close();
        Ext.create('Ext.Praxis.view.salesaudit.WaiverForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: { rec: rec }
        }).show();
    }
});
