Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsLogController',
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function(){
        const me = this;
        const gridLog = Ext.getCmp(prototype.idDE3 + '-gridTaxesExceptionsLog');
        
        try {
            gridLog.setLoading(true);
            
            const {CCUST,CCIA,FORMA,SERIE,SEQ,TRNCU} = me.view.obj;
            let params = {
                IN_CCUST:CCUST,
                IN_CCIA: CCIA,
                IN_FORMA: FORMA,
                IN_SERIE: SERIE,
                IN_SEQ: SEQ,
                IN_TRNCU: TRNCU
            };
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05632', params);
            console.log(res);
            if (res.lstRs.length > 0) {
                  
                let storeLog = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });
                
                gridLog.setStore(storeLog);
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            gridLog.setLoading(false);
        }
        
    }
});
