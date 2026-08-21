Ext.define('Ext.Praxis.controller.flown.EmdsSabre.EmdsSabreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EmdsSabreController',
    request: axios.create({
        baseURL: CONTEXTPATH + '/EmdsSabre',
        timeout: 20000
      }),
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.onClickSearchBtn();
    },
    //<editor-fold defaultstate="collapsed" desc="Parameters">
    formatSearchParams: function (type) {
        let params = {};
        if(type === 'S'){
            const formFilters = Ext.getCmp(prototype.id + '-formFiltersS').getForm();
            params = {
                IN_CCUST: '139',
                ...formFilters.getValues()
            };
        }else{
            const formFilters = Ext.getCmp(prototype.id + '-formFiltersB').getForm();
            params = {
                IN_CCUST: '139',
                ...formFilters.getValues()
            };
        }
        console.log(params);
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const me = this;
        const type = Ext.getCmp(prototype.id + '-cmbFilters').value;
        let params = me.formatSearchParams(type);
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        if(type === 'S'){
            const panel = Ext.create('Ext.Praxis.view.flown.EmdsSabreForm.Grids.SummaryGrid', {
                id: prototype.id + '-SummaryGrid-1',
                searchParams: params
            });
            mainPanel.add(panel);
        }else{
            const panel = Ext.create('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid', {
                id: prototype.id + '-DetailGrid-1',
                searchParams: params
            });
            mainPanel.add(panel);
        }
        
    },
    onClickClearBtn: function () {
        Ext.getCmp(prototype.id + '-formFiltersS').getForm().reset();
        Ext.getCmp(prototype.id + '-formFiltersB').getForm().reset();
        Ext.getCmp(prototype.id + '-filters').getForm().reset();
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onChangeFilters:function(btn){
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        if(btn.value==='S'){
            Ext.getCmp(prototype.id + '-formFiltersS').show();
            Ext.getCmp(prototype.id + '-formFiltersB').hide();
        }else{
            Ext.getCmp(prototype.id + '-formFiltersS').hide();
            Ext.getCmp(prototype.id + '-formFiltersB').show();
        }
    }
    //</editor-fold>

});


