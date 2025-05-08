Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsMassiveLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsMassiveLoadController',
    afterRender: function () {
    },
    onUpdateClick: function () {
        let notifier = new AWN();
        const field = Ext.getCmp(prototype.idDE2 + '-massiveExcelFile');
        const file = field.fileInputEl.dom.files[0];
        if (file) {
            notifier.async(this.readExcel(file),'Successfully Loaded', 'Error on Load', 'Loading File');
        }
    },
    readExcel: async function (file) {
        
        await global.readExcelFile(file, async function (data) {
            const loadTable = await global.loadRecordsOnTable('PXSAUDIT', 'X3191', data);
            if (loadTable.success) {
                let params = {
                    IN_CUUID: loadTable.cuuid,
                    IN_FUUID: loadTable.fuuid
                };
                const res = await global.callStorePost('PXSAUDIT', 'SQP05595', params);
                return res;
            }
        });
    },
    onCancelClick:function(){
        this.view.close();
    }

});

