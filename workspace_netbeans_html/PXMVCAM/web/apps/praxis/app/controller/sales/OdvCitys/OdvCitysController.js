Ext.define('Ext.Praxis.controller.sales.OdvCitys.OdvCitysController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OdvCitysController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        console.log('after render');


        this.onSearchClickBtn();
        const combo = Ext.getCmp(prototype.id + '-cbxFiltro');
        this.onChangeCombo(combo, combo.getValue());
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
        console.log('params', params)
        const newGrid = Ext.create('Ext.Praxis.view.sales.OdvCitysForm.Grids.OdvCitysFormGrid', {
            id: prototype.id + '-OdvCitysFormGrid',
            searchParams: params
        });

        mainPanel.add(newGrid);


    },

    onChangeCombo: function (combo, newValue) {
        var codeField = Ext.getCmp(combo.id.replace('-cbxFiltro', '-txtCode'));
        var nameField = Ext.getCmp(combo.id.replace('-cbxFiltro', '-txtName'));

        if (newValue === '') {
            codeField.hide();
            nameField.hide();
            codeField.reset();
            nameField.reset();
        } else {
            codeField.show();
            nameField.show();
        }
    },

    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },

//    onClickClearBtn: function (obj) {
//        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
//    },

    onClickClearBtn: function (obj) {
        const form = Ext.getCmp(prototype.id + '-panelFilters').getForm();
        const combo = Ext.getCmp(prototype.id + '-cbxFiltro');
        const codeField = Ext.getCmp(prototype.id + '-txtCode');
        const nameField = Ext.getCmp(prototype.id + '-txtName');

        const filterVal = combo.getValue();

        form.getFields().each(function (field) {
            if (field.name !== 'IN_OPTION' && field.name !== 'IN_CCUST') {
                field.reset();
            }
        });
        
        if (filterVal === '') {
            return;
        }

        codeField.setValue('');
        nameField.setValue('');
    },

    onAddOdvCitys: function () {
        console.log('on Add');
        const gridId = Ext.ComponentQuery.query('grid')[0]
        const dataEntry = Ext.create('Ext.Praxis.view.sales.OdvCitysForm.DataEntrys.DataEntryOdvCitys', {
            id: prototype.id + '-DataEntryOdvCitys',
            option: 'C',
            gridId: gridId
        });
        dataEntry.show();
    }
});


