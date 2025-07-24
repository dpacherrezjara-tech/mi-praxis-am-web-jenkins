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
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();


        const newGrid = Ext.create('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.Grids.MiscellaneousAgentGrid', {
            id: prototype.id + '-MiscellaneousAgentGrid',
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

    onAddRecord: function () {
        let grid = Ext.getCmp(prototype.id + '-MiscellaneousAgentGrid');
        console.log('grid',grid)
        const dataEntry = Ext.create('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.DataEntrys.DataEntryMiscellaneousAgentForm', {
            id: prototype.id + '-DataEntryMiscellaneousAgentForm',
//            searchParams: params,
            option: 'C',
            reload: () => {
                if(grid){
                    grid.getStore().load();
                }
            }
        });
        dataEntry.show();
    },
});


