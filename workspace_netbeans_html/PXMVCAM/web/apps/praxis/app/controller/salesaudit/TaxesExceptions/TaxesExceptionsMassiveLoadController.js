Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsMassiveLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsMassiveLoadController',
    afterRender: function () {
    },
    onUpdateClick: function () {
        const field = Ext.getCmp(prototype.idDE2 + '-massiveExcelFile');
        const file = field.fileInputEl.dom.files[0];
        if (file) {
            this.readExcel(file);
        }
    },
    readExcel: async function (file) {
        await global.readExcelFile(file,async function(data){
            const res = await global.loadRecordsOnTable('PXSAUDIT','X3191',data);
            console.log(res);
        });
    }
    
});

