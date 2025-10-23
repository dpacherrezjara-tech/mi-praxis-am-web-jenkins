Ext.define('Ext.Praxis.controller.sales.OdvCitys.OdvCitysController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OdvCitysController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        console.log('after render');
        this.onSearchClickBtn();
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
//        console.log('params',params)
        const newGrid = Ext.create('Ext.Praxis.view.sales.OdvCitysForm.Grids.OdvCitysFormGrid', {
            id: prototype.id + '-OdvCitysFormGrid',
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


