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
            const res = await global.callStoreGet('PRAXIS', 'SQP05713', {});
            const data = res.lstRs.at(0);
            console.log("data", data);
            grid.setStore(data);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    }
    
});