Ext.define('Ext.Praxis.controller.payments.InputsTamiz.DaysReceiptSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DaysReceiptSettlementController',
    afterRender: async function () {
        await this.loadGrids();
    },
    loadGrids: async function(){
        const me = this;
        me.view.setLoading(true);
        try {
            const grid = Ext.getCmp(prototype.idDRS + '-gridDaysReceiptSettlement');
            const params = { IN_PROCESSOR : 'ALL' } ;
            const res = await global.callStoreGet('PRAXISMP', 'SQP05672', params);
            const data = res.lstRs.at(0);
            console.log("data", data);
            grid.setStore(data);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },
    saveProcessData: async function (data, option){
        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();
        
        me.view.setLoading(true);
        
        try {

            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', data);
            console.log('tmp', tmp);

            let params = {
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid,
                IN_OPTION : option
            };
            console.log('params',params);
            
            const res = await global.callStorePost('PRAXISMP', 'SQP05695 ', params);
            console.log(res);
            
            success = res.data.lstVals.IO_RESPONSE === 1 ;
            message = res.data.lstVals.IO_MESSAGE ;
            
            if ( success ) {
                notifier.success(message);
            }else{
                notifier.warning('Error: ' + message);        
            }
            await me.loadGrids();
        } catch (e) {
            console.log(e) ;
            notifier.alert('System Error');
        }
        finally {
            me.view.setLoading(false);
        }
        
    },
    onClickUpdateProcessor: async function (btn) { 
        const me = this;
        // when is widgetcolumn
        const record = btn.getWidgetRecord();
        console.log('Record:', record.getData());
    
        let data = [ record.getData() ]; 
        console.log('Registro procesado:', data);
        
        await me.saveProcessData (data, '') ;
        
    },
    onCancelClick: function () {
        this.view.close();
    },
    onSaveAllData: async function (view) {
        
        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();
        
        const gridDays = Ext.getCmp(prototype.idDRS + '-gridDaysReceiptSettlement');
        const storeDataDays = gridDays.getStore().getData().items;
//        console.log('store', storeDataDays);
        
        let data = storeDataDays.map(x => ({
            ...x.data
        }));
        
        await me.saveProcessData (data, 'A') ;
        
    }
});