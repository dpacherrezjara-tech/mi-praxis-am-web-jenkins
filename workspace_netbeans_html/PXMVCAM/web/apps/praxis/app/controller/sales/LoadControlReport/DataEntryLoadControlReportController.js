Ext.define('Ext.Praxis.controller.sales.LoadControlReport.DataEntryLoadControlReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadControlReportController',
    url: CONTEXTPATH + '/LoadControlReport',
    listeners: {
        afterrender: 'afterRender'
    },

    init: function (view) {
        // Por ahora vacío
        
    },

    afterRender: async function () {
        const me = this;
    },

    getData: async function (view) {
       console.log('getData');
    },

    onUpdateClick: async function () {
       console.log('onUpdateClick');

    },

    onCreateClick: async function () {
       console.log('onCreateClick');
    },

    onCancelClick: function () {
        this.view.close();
    },

   
});
