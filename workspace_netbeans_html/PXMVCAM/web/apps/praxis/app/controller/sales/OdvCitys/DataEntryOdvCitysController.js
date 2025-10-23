Ext.define('Ext.Praxis.controller.sales.OdvCitys.DataEntryOdvCitysController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryOdvCitysController',
    url: CONTEXTPATH + '/DataEntryOdvCitys',

    init: function (view) {
        // Por ahora vacío
    },

    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await me.getData(me.view);
        me.view.setLoading(false);
    },

    getData: async function (view) {
        try {
            
        } catch (e) {
            console.error(e);
        }
    },

    onUpdateClick: async function () {
        const me = this;
        me.view.setLoading(true);

        try {
//          
        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {
            me.view.setLoading(false);
            me.getData(me.view);
        }
    },

    onCancelClick: function () {
        this.view.close();
    },

 
});
