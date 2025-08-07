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
            const res = await global.callStoreGet('PRAXISMP','SQP05016');
            const data = res.lstRs[0] || {};
            
            const filterCountry = Ext.getCmp(prototype.id + '-cmbPaisesPG');

            filterCountry.suspendEvents(false);
            filterCountry.bindStore(me.createComboStore({data: data, valueField: 'CODE', displayField: 'NAME'}));
            filterCountry.setValue('');
            filterCountry.resumeEvents();
            
        } catch (e) {
            console.log(e);
        }
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
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
                console.log(newPanel);
                mainPanel.add(newPanel);
            },
            'M':()=>{
                let params = filtro2.getForm().getValues();
                const newPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.Grids.MitGrid',{
                    id: prototype.id + '-MitGrid-1',
                    searchParams: params
                });
                console.log(newPanel);
                mainPanel.add(newPanel);
            },
             'U':()=>{
                let params = filtro3.getForm().getValues();
                const newPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.Grids.DeUnaGrid',{
                    id: prototype.id + '-DeUnaGrid-1',
                    searchParams: params
                });
                console.log(newPanel);
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
});


