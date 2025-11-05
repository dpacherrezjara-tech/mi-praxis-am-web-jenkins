Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.BPOControlAnalyticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BPOControlAnalyticsController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        console.log('after render');
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
        console.log('params', params)
        const newGrid = Ext.create('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsGrid', {
            id: prototype.id + '-BPOControlAnalyticsGrid',
            searchParams: params
        });

        mainPanel.add(newGrid);


    },


    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },

    onClickClearBtn: function (obj) {
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },


});


