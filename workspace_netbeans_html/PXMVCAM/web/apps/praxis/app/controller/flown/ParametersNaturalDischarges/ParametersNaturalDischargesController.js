Ext.define('Ext.Praxis.controller.flown.ParametersNaturalDischarges.ParametersNaturalDischargesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ParametersNaturalDischargesController',
    afterRender: async function () {
        await this.loadGrids();
    },
    loadGrids: async function(){
        const me = this;
        me.view.setLoading(true);
        try {
            const grid = Ext.getCmp(prototype.id + '-gridParametersNaturalDischarges');
            params = {
                IN_CCUST : '139',
                IN_CPARM : '',
                IN_CORRL : 0
            } ;
//            let storeGrid = await global.callStorePaggin('PRAXIS','SQP05713',params);
//            grid.setStore(storeGrid); 
            const res = await global.callStoreGet('PRAXIS', 'SQP05713', params);            
            const data = res.lstRs.at(0);
            console.log("data", data);
            grid.setStore(data);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }        
    },
    reloadGrid: function(){
        const grid = Ext.getCmp(prototype.id + '-gridParametersNaturalDischarges');
        grid.getStore().load();
        this.loadGrids();
    },
    openParameter: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        this.showDataEntryParameter('U', record.data);
    },
    showDataEntryParameter: function(option, data){
        const me = this;
        
        const newWin = Ext.create('Ext.Praxis.view.flown.ParametersNaturalDischargesForm.DataEntrys.ParameterNaturalDischargesDataEntry',{
            id:prototype.id + '-ParameterNaturalDischargesDataEntry-1',
            option:option,
            obj: data,
            reloadGrid: () => me.loadGrids() //me.reloadGrid
        });
        newWin.show();
    },
    onClickSearchBtn: async function(){
        await this.loadGrids();
    },
    onClickAddBtn: function(){
        this.showDataEntryParameter('C', {A4807CCUST: '139', A4807CORRL: 0});
    }
});