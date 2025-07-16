Ext.define('Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.MiscellaneousAgentFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MiscellaneousAgentFormController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
    },

    onSearchClickBtn: function () {

        console.log('onSearchClickBtn');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        console.log('mainPanel', mainPanel, );
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        console.log('fffffffffffff', filtro1);
        let params = filtro1.getForm().getValues();
        console.log('params', params);

        let newparams = {
            "IN_A4593CCUST": "139"
        /*    "IN_A4593KEY1": "",
            "IN_A4593KEY2": "",
            "IN_A4593KEY3": "",
            "IN_A4593DESC1": "",
            "IN_A4593DESC2": "",
            "IN_A4593COMEN": "",
            "IN_A4593STS": ""*/
        };

        const newGrid = Ext.create('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.Grids.MiscellaneousAgentGrid', {
            id: prototype.id + '-MiscellaneousAgentGrid',
            searchParams: newparams
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


