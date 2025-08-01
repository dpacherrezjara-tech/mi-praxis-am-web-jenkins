Ext.define('Ext.Praxis.controller.payments.ReportsForm.DataEntryReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReportController',
//    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {

    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
    },
    
    onCancelClick: function () {
        this.view.close();
    },

    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.idEntry + '-panelFilters');
        filters.setLoading(true);
//        let store = global.callStoreGet('PRAXISMP', 'SQP05004', view.searchParams);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', {IN_STATUS: '1'});
        console.log('res', res)

        const cmbProcessor = Ext.getCmp(prototype.idEntry + '-cmbProctypef');
        const cmbCountry = Ext.getCmp(prototype.idEntry + '-cmbPaisesfBP');
//         const cmbDocType = Ext.getCmp(prototype.idEntry + '-');
        const cmbStatus = Ext.getCmp(prototype.idEntry + '-cmbStatus');
        const CmbCurrency = Ext.getCmp(prototype.idEntry + '-cmbMonedafBP');
        const cmbAdjCode = Ext.getCmp(prototype.idEntry + '-cmbCodadjub');
        const cmbeErrorCode = Ext.getCmp(prototype.idEntry + '-cmbCerrorb');

        global.setComboStore(cmbCountry, res.lstRs.at(4), 'CODE', 'NAME', '');
        global.setComboStore(CmbCurrency, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessor, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        global.setComboStore(cmbAdjCode, res.lstRs.at(1), 'A4451KEY3', 'A4451DESC1', '');
        global.setComboStore(cmbeErrorCode, res.lstRs.at(0), 'A4451STS', 'A4451DESC1', '');
        global.setComboStore(cmbStatus, res.lstRs.at(8), 'KEY3', 'A4451DESC1', '');


        filters.setLoading(false);

    }


});

