Ext.define('Ext.Praxis.controller.payments.SalesComplement.SalesComplementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesComplementController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesComplement',
    searchParams: null,
    searchUrl: null,
    gridType: 'P',
    afterRender: async function (obj, e) {
       
    },
    onChangeModule: function(btn){
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1=Ext.getCmp(prototype.id + '-formFilters-1');
        const filtro2 = Ext.getCmp(prototype.id + '-formFilters-2');
        filtro1.hide();
        filtro2.hide();
        let opts={
            'P':()=>{
                filtro1.show();
            },
            'M':()=>{
                filtro2.show();
            }
        };
        opts[btn.lastValue.opcion]();
    },
    onClickSearchBtn : function(){
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1=Ext.getCmp(prototype.id + '-formFilters-1');
        const filtro2 = Ext.getCmp(prototype.id + '-formFilters-2');
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
    },
});


