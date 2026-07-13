Ext.define('Ext.Praxis.controller.payments.EmdsControl.EmdsControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EmdsControlController',
    init: function (view) {

    },
    afterRender: async function (obj, e) {

    },
    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
//        console.log('params',params)
        const newGrid = Ext.create('Ext.Praxis.view.payments.EmdsControlForm.Grids.EmdsControlGrid', {
            id: prototype.id + '-EmdsControlGrid',
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
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClickBtn();
        }
    }

});