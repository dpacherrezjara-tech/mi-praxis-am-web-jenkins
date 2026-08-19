Ext.define('Ext.Praxis.controller.payments.SalesComplement.SalesComplementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesComplementController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesComplement',
    searchParams: null,
    searchUrl: null,
    gridType: 'P',
    afterRender: async function (obj, e) {
       this.loadFilters();
    },
    loadFilters: async function(){
        try {
            // filters Plusgrade
            const me = this;
            const res = await global.callStoreGet('PRAXISMP','SQP05016',{IN_CCUST:'139'});

            const { lstVals, lstRs } = res; 
            
            const dataCountry = lstRs[0] || {};
            const dataCerror = lstRs[1] || {};
            const dataStval = lstRs[2] || {};
            const dataProcessorInsumo = lstRs[3] || {};
            const dataProcessorMatch = lstRs[4] || {};
            const quantityAnalyzePending = lstVals.IO_QUANITY_ANALYZE_PENDING ;

            const filterCountry = Ext.getCmp(prototype.id + '-cmbPaisesPG');
            const filterCerror = Ext.getCmp(prototype.id + '-cmbCerrorPG');
            const filterStval = Ext.getCmp(prototype.id + '-cmbStvalPG');
            const filterProcessorInsumo = Ext.getCmp(prototype.id + '-cmbProcessorInsumo');
            const filterProcessorMatch = Ext.getCmp(prototype.id + '-cmbProcessorMatch');

            // sin "All"
            await global.setComboStore(filterCountry, dataCountry, 'CODE', 'NAME', '', false);
            await global.setComboStore(filterCerror, dataCerror, 'CODE', 'DESCRIPTION', '', false);
            await global.setComboStore(filterStval, dataStval, 'STVAL', 'DESCRIPTION', 'X', false);
            await global.setComboStore(filterProcessorInsumo, dataProcessorInsumo, 'CODE', 'DESCRIPTION', '', false);

            // con "All"
            await global.setComboStore(filterProcessorMatch, dataProcessorMatch, 'A4451KEY2', 'A4451DESC1', '' );

            me.changeAnalyzePending(quantityAnalyzePending);

        } catch (e) {
            console.log(e);
        }
    },
    changeAnalyzePending: function(quantity = 0){
        const optionAnalyze = Ext.getCmp(prototype.id + '-btnAnalyzeReconciliationErrors');
        if (optionAnalyze) {

            const originalText = optionAnalyze.defaultText || '';
            if (!optionAnalyze.defaultText) {
                optionAnalyze.defaultText = originalText;
            }
            if (quantity > 0) {
                optionAnalyze.setText(
                    originalText + ` <span style="color: red; font-weight: bold;">(${quantity})</span>`
                );
            } else {
                optionAnalyze.setText(originalText);
            }
        }
    },
    onChangeModule: function(btn){
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1=Ext.getCmp(prototype.id + '-formFilters-1');
        const filtro2 = Ext.getCmp(prototype.id + '-formFilters-2');
        const filtro3 = Ext.getCmp(prototype.id + '-formFilters-3');
        filtro1.hide();
        filtro2.hide();
        filtro3.hide();
        let opts={
            'P':()=>{
                filtro1.show();
            },
            'M':()=>{
                filtro2.show();
            },
            'U':()=>{
                filtro3.show();
            }
        };
        opts[btn.lastValue.opcion]();
    },
    onClickSearchBtn : function(){
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1=Ext.getCmp(prototype.id + '-formFilters-1');
        const filtro2 = Ext.getCmp(prototype.id + '-formFilters-2');
        const filtro3 = Ext.getCmp(prototype.id + '-formFilters-3');
        const radioBtn = Ext.getCmp(prototype.id + '-viewOption');
        let opts={
            'P':()=>{
                let params = filtro1.getForm().getValues();
                const newPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.Grids.PlusgradeGrid',{
                    id: prototype.id + '-PlusgradeGrid-1',
                    searchParams: params
                });
                // console.log(newPanel);
                mainPanel.add(newPanel);
            },
            'M':()=>{
                let params = filtro2.getForm().getValues();
                const newPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.Grids.MitGrid',{
                    id: prototype.id + '-MitGrid-1',
                    searchParams: params
                });
                // console.log(newPanel);
                mainPanel.add(newPanel);
            },
             'U':()=>{
                let params = filtro3.getForm().getValues();
                const newPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.Grids.DeUnaGrid',{
                    id: prototype.id + '-DeUnaGrid-1',
                    searchParams: params
                });
                // console.log(newPanel);
                mainPanel.add(newPanel);
            }
        };
        opts[radioBtn.lastValue.opcion]();
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
        Ext.getCmp(prototype.id + '-formFilters-1').getForm().reset();
        Ext.getCmp(prototype.id + '-formFilters-2').getForm().reset();
        Ext.getCmp(prototype.id + '-formFilters-3').getForm().reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onChangeDateComplement: function (obj) {
        let option = obj.id.split('-').at(-1);
        
        const fromPlusgrade = Ext.getCmp(prototype.id + '-datefieldFromPlusgrade');
        const toPlusgrade = Ext.getCmp(prototype.id + '-datefieldToPlusgrade');
        const fromMIT = Ext.getCmp(prototype.id + '-datefieldFromMIT');
        const toMIT = Ext.getCmp(prototype.id + '-datefieldToMIT');
        const fromDEUNA = Ext.getCmp(prototype.id + '-datefieldFromDEUNA');
        const toDEUNA = Ext.getCmp(prototype.id + '-datefieldToDEUNA');
        
        const opts = {
            'datefieldFromPlusgrade': () => {
                toPlusgrade.setValue(fromPlusgrade.getValue());
            },
            'datefieldToPlusgrade': () => {
                if (toPlusgrade.getValue() < fromPlusgrade.getValue()) {
                    fromPlusgrade.setValue(toPlusgrade.getValue());
                }
            },
            
            'datefieldFromMIT': () => {
                toMIT.setValue(fromMIT.getValue());
            },
            'datefieldToMIT': () => {
                if (toMIT.getValue() < fromMIT.getValue()) {
                    fromMIT.setValue(toMIT.getValue());
                }
            },
            
            'datefieldFromDEUNA': () => {
                toDEUNA.setValue(fromDEUNA.getValue());
            },
            'datefieldToDEUNA': () => {
                if (toDEUNA.getValue() < fromDEUNA.getValue()) {
                    fromDEUNA.setValue(toDEUNA.getValue());
                }
            }
        };
        opts[option]();
    },
    onClickAnalyzeReconciliationErrors: function () {
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.AnalyzeReconciliationErrorsDataEntry', {
            id: prototype.id + '-AnalyzeReconciliationErrorsDataEntry-1'
        });
        dataEntry.show();
    }
});


