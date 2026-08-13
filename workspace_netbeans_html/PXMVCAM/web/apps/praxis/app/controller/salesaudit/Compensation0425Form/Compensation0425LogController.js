Ext.define('Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425LogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Compensation0425LogController',
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function(){
        const me = this;
        const gridLog = Ext.getCmp(prototype.idDE3 + '-gridCompensationLog');
        
        try {
            gridLog.setLoading(true);
            let params = {
                IN_CCUST:me.view.obj.A4961CCUST,
                IN_OPTION:"1",
                IN_CCIA: me.view.obj.A4961CIA,
                IN_FORMA: me.view.obj.A4961FORMA,
                IN_SERIE: me.view.obj.A4961SERIE,
                IN_SEQ: me.view.obj.A4961SEQ,
                IN_TRNCU: me.view.obj.A4961TRNCU,
                IN_PNR:'',
                IN_COUNTRY:''
            };
            const res = await global.callStoreGet('PXSAUDIT', 'SQP06087', params);
           
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
