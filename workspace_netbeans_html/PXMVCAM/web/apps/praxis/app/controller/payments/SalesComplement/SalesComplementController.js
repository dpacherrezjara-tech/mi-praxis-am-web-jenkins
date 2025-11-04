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

            // console.log(dataCountry);
            // console.log(dataCerror);

            const filterCountry = Ext.getCmp(prototype.id + '-cmbPaisesPG');
            const filterCerror = Ext.getCmp(prototype.id + '-cmbCerrorPG');
            const filterStval = Ext.getCmp(prototype.id + '-cmbStvalPG');
            const filterProcessorInsumo = Ext.getCmp(prototype.id + '-cmbProcessorInsumo');
            const filterProcessorMatch = Ext.getCmp(prototype.id + '-cmbProcessorMatch');

            
            filterCountry.suspendEvents(false);
            filterCountry.bindStore(await me.createComboStore({data: dataCountry, valueField: 'CODE', displayField: 'NAME'}));
            filterCountry.setValue('');
            filterCountry.resumeEvents();

            filterCerror.suspendEvents(false);
            filterCerror.bindStore(await me.createComboStore({data: dataCerror, valueField: 'CODE', displayField: 'DESCRIPTION', addElementAll: false}));
            filterCerror.setValue('');
            filterCerror.resumeEvents();

            filterStval.suspendEvents(false);
            filterStval.bindStore(await me.createComboStore({data: dataStval, valueField: 'STVAL', displayField: 'DESCRIPTION', addElementAll: false}));
            filterStval.setValue('X');
            filterStval.resumeEvents();
            
            filterProcessorInsumo.suspendEvents(false);
            filterProcessorInsumo.setStore(await me.createComboStore({data: dataProcessorInsumo, valueField: 'CODE', displayField: 'DESCRIPTION',addElementAll: false}));
            filterProcessorInsumo.setValue('');
            filterProcessorInsumo.resumeEvents();
            
            filterProcessorMatch.suspendEvents(false);
            filterProcessorMatch.setStore(await me.createComboStore({data: dataProcessorMatch, valueField: 'A4451KEY2', displayField: 'A4451DESC1'}));
            filterProcessorMatch.setValue('');
            filterProcessorMatch.resumeEvents();
        
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
    createComboStore: async function ( {data, valueField, displayField, addElementAll = true}) {
        //crea record vacio
        let allRecord = {};
        if (addElementAll) {
            allRecord[displayField] = 'All';
            allRecord[valueField] = '';
        }
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = me.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
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


