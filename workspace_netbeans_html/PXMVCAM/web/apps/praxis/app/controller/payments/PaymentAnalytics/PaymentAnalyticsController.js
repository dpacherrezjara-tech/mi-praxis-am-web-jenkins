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
        
        // Settlement 
        const cmbProcessorSettlement = Ext.getCmp(prototype.id + '-cmbProcessorSettlement');
        const cmbCurrencySettlement = Ext.getCmp(prototype.id + '-cmbCurrencySettlement');

        global.setComboStore(cmbCurrencySettlement, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessorSettlement, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        
        
        // Accounting 
        const cmbProcessorAccounting = Ext.getCmp(prototype.id + '-cmbProcessorAccounting');
        const cmbCurrencyAccounting = Ext.getCmp(prototype.id + '-cmbCurrencyAccounting'); 
        
        global.setComboStore(cmbCurrencyAccounting, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessorAccounting, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');

        filters.setLoading(false);

    },
    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        if (!mainPanel) {
            Ext.Msg.alert('Error', 'No se encontró el panel principal.');
            return;
        }

        const cmbFiltersAnalytics = Ext.getCmp(prototype.id + '-cmbFiltersAnalytics');
        const selectedType = cmbFiltersAnalytics ? cmbFiltersAnalytics.getValue() : 'S'; 

        // Remover todo siempre antes de agregar.
        mainPanel.removeAll();

        // Mejor: Diccionario para clases de grid.
        const gridClasses = {
            'S': 'AnalyticsSettlementGrid',
            'A': 'AnalyticsAccountingGrid'
        };

        const gridClass = gridClasses[selectedType];
        if (!gridClass) {
            Ext.Msg.alert('Error', 'Tipo seleccionado inválido.');
            return;
        }

        const filter = Ext.getCmp(prototype.id + '-panelFiltersAnalytics-' + selectedType);
        if (!filter) {
            Ext.Msg.alert('Error', 'No se encontró el filtro correspondiente.');
            return;
        }
        const form = filter.getForm ? filter.getForm() : null;
        if (!form) {
            Ext.Msg.alert('Error', 'No se encontró los filtros.');
            return;
        }
        const params = form.getValues();

        console.log('params', params);

        // Crear y agregar el grid
        const grid = Ext.create('Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.' + gridClass, {
            id: prototype.id + '-' + gridClass,
            searchParams: params
        });

        mainPanel.add(grid);
    },
    onChangeDateFrom: function (obj) {
        let option = obj.id.split('-').at(-1);

        // Define all relevant date fields for both Settlement and Accounting
        const fromSettlement = Ext.getCmp(prototype.id + '-dateFieldFromSettlement');
        const toSettlement = Ext.getCmp(prototype.id + '-dateFieldToSettlement');
        const fromAccounting = Ext.getCmp(prototype.id + '-dateFieldFromAccounting');
        const toAccounting = Ext.getCmp(prototype.id + '-dateFieldToAccounting');
        
        const opts = {
            // Settlement
            'dateFieldFromSettlement': () => {
                toSettlement.setValue(fromSettlement.getValue());
            },
            'dateFieldToSettlement': () => {
                if (toSettlement.getValue() < fromSettlement.getValue()) {
                    fromSettlement.setValue(toSettlement.getValue());
                }
            },

            // Accounting
            'dateFieldFromAccounting': () => {
                toAccounting.setValue(fromAccounting.getValue());
            }
            ,
            'dateFieldToAccounting': () => {
                if (toAccounting.getValue() < fromAccounting.getValue()) {
                    fromAccounting.setValue(toAccounting.getValue());
                }
            }
        };

        // Ejecuta la función correspondiente si existe
        if (opts[option]) {
            opts[option]();
        }
    },
    onChangeFiltersAnalytics: function (obj) {
        const filtroSettlement = Ext.getCmp(prototype.id + '-panelFiltersAnalytics-S');
        const filtroAccounting = Ext.getCmp(prototype.id + '-panelFiltersAnalytics-A');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        console.log("filtroSettlement",filtroSettlement) ;
        console.log("filtroAccounting",filtroAccounting) ;

        if (obj.getValue() === 'S') {
            filtroSettlement.show();
            filtroAccounting.hide();
        }
        if (obj.getValue() === 'A') {
            filtroAccounting.show();
            filtroSettlement.hide();
        }
    },
    
});