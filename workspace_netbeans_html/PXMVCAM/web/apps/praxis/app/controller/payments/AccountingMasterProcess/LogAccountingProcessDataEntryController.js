Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.LogAccountingProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LogAccountingProcessDataEntryController',
    
    afterRender: async function () {
        const me = this;
        await me.loadLogData();
    },
    
    loadLogData: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idLOG + '-logGrid');
        
        if (!grid) {
            return;
        }
        
        // Obtener los parámetros del proceso desde la vista
        const processId = me.view.processId || '';
        const ccust = me.view.ccust || '139';
        
        if (!processId) {
            global.Msg({msg: 'Process ID is required'});
            return;
        }
        
        grid.setLoading(true);
        
        try {
            // Llamar al stored procedure SQP05838
            const params = {
                IN_CCUST: ccust,
                IN_PROCESS_ID: processId
            };
            
            const res = await global.callStoreGet('PRAXISMP', 'SQP05838', params);
            
            if (res && res.lstRs && res.lstRs.length > 0) {
                // Obtener los datos del log desde el primer result set
                const logData = res.lstRs?.at(0) || [];

                if (!logData || Object.keys(logData).length === 0) {
                    global.Msg({msg: 'Log data not found'});
                    return;
                }
    
                let store = new Ext.data.Store({data: logData});

                grid.setStore(store);

            } else {
                global.Msg({msg: 'Log data not found'});
            }
        } catch (error) {
            console.error('Error loading log data:', error);
            global.Msg({msg: 'Error loading log data: ' + (error.message || 'Unknown error')});
        } finally {
            grid.setLoading(false);
        }
    },
    
    onClickClose: function () {
        this.view.close();
    },
    
    downloadExcelLog: function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idLOG + '-logGrid');
        
        if (!grid || !grid.getStore()) {
            global.Msg({msg: 'No data to export'});
            return;
        }
        
        const store = grid.getStore();
        const records = store.getData().items;
        
        if (!records || records.length === 0) {
            global.Msg({msg: 'No data to export'});
            return;
        }
        
        const processId = me.view.processId || 'Log';
        const data = records.map(function(rec, index) {
            return {
                'RN': rec.get('POSITION') || index + 1,
                'Status': rec.get('STATUS_DESCRIPTION') || '',
                'Log Message': rec.get('MESSAGE') || '',
                'User': rec.get('USCR') || '',
                'Date': rec.get('FECR') || '',
                'Hour': rec.get('HOCR') || ''
            };
        });
        
        const fileName = 'AccountingProcessLog_' + processId;
        global.writeExcelFromJson(data, fileName);
        
        Ext.toast({
            html: '<b>Excel file downloaded successfully</b>',
            title: 'Success',
            align: 't',
            closable: true,
            width: 280,
            timeout: 3000
        });
    }
});
