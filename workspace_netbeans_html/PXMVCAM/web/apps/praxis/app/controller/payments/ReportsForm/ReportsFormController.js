Ext.define('Ext.Praxis.controller.payments.ReportsForm.ReportsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReportsFormController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
//        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
//        console.log('params',params)
        const newGrid = Ext.create('Ext.Praxis.view.payments.ReportsForm.Grids.ReportGrid', {
            id: prototype.id + '-ReportGrid',
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

    onClickAddBtn: function (obj) {
        console.log('rp', )

        const newWindow = Ext.create('Ext.Praxis.view.payments.ReportsForm.DataEntrys.DataEntryReport', {
            id: prototype.idEntry + '-DataEntryReport',
        });
        newWindow.show();
    },

    

    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
//        let store = global.callStoreGet('PRAXISMP', 'SQP05004', view.searchParams);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', {IN_STATUS: '1'});
        console.log('res', res)

 
        const cmbProcessor = Ext.getCmp(prototype.id + '-cmbProctypef');
        const cmbCountry = Ext.getCmp(prototype.id + '-cmbPaisesfBP');
//         const cmbDocType = Ext.getCmp(prototype.idEntry + '-');
        const cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        const CmbCurrency = Ext.getCmp(prototype.id + '-cmbMonedafBP');
        const cmbAdjCode = Ext.getCmp(prototype.id + '-cmbCodadjub');
        const cmbeErrorCode = Ext.getCmp(prototype.id + '-cmbCerrorb');

        global.setComboStore(cmbCountry, res.lstRs.at(4), 'CODE', 'NAME', '');
        global.setComboStore(CmbCurrency, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessor, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        global.setComboStore(cmbAdjCode, res.lstRs.at(1), 'A4451KEY3', 'A4451DESC1', '');
        global.setComboStore(cmbeErrorCode, res.lstRs.at(0), 'CODE', 'A4451DESC1', '');
        global.setComboStore(cmbStatus, res.lstRs.at(8), 'A4451STS', 'A4451DESC1', '');
        filters.setLoading(false);

    }


});

