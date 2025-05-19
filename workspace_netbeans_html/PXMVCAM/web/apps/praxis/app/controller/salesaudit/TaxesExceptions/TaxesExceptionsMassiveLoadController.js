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
            notifier.async(this.readExcel(file),'File Successfully Loaded', 'Error on Load', 'Loading File');
        }
    },
    readExcel: async function (file) {
        const me = this;
        let notifier = new AWN();
        const gridError = Ext.getCmp(prototype.idDE2 + '-gridErrors');
        gridError.hide();
        await global.readExcelFile(file, async function (data) {
            const loadTable = await global.loadRecordsOnTable('PXSAUDIT', 'X3191', data);
            if (loadTable.success) {
                let params = {
                    IN_CUUID: loadTable.cuuid,
                    IN_FUUID: loadTable.fuuid
                };
                const res = await global.callStorePost('PXSAUDIT', 'SQP05595', params);
                const {lstVals,lstRs} = res.data;
                if (lstVals.OUT_PROCESSED>0){
                    notifier.info('Tickets Added ' + lstVals.OUT_PROCESSED);
                }
                if (lstVals.OUT_ERRORS>0){
                    notifier.alert('Tickets with Error ' + lstVals.OUT_ERRORS);
                    let store = new Ext.data.Store({
                        data:lstRs.at(0)
                    });
                    gridError.setStore(store);
                    gridError.show();
                }
            }
            me.view.reloadGrid();
        });
    },
    onCancelClick:function(){
        this.view.close();
    }

});

