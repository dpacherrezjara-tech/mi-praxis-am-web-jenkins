Ext.define('Ext.Praxis.controller.payments.PaymentAnalytics.PaymentAnalyticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PaymentAnalyticsController',
    init: function (view) {

    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
    },
    
    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', {IN_STATUS: '1'});
         
        console.log('RES',res.lstRs);
        const cmbProcessor = Ext.getCmp(prototype.id + '-cmbProcessor');
        const CmbCurrency = Ext.getCmp(prototype.id + '-cmbMonedafBP');
        
        global.setComboStore(CmbCurrency, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessor, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        filters.setLoading(false);

    },
    
    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
//        console.log('params',params)
        const newGrid = Ext.create('Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsGrid', {
            id: prototype.id + '-AnalyticsGrid',
            searchParams: params
        });

        mainPanel.add(newGrid);


    },
    


});