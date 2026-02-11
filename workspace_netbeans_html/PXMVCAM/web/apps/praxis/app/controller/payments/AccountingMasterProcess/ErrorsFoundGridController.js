Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ErrorsFoundGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorsFoundGridController',
    
    afterRender: async function () {
        const me = this;
        const processId = me.view.processId || '';
        if (processId) {
            me.view.setTitle('Errors Found of Accounting Master Process - Process: ' + processId);
        }
        await me.loadErrorsData();
    },
    
    loadErrorsData: async function () {
        const me = this;
        const grid = me.view;
        
        if (!grid) {
            return;
        }
        
        const processId = me.view.processId || '';
        const ccust = me.view.ccust || '139';
        
        if (!processId) {
            global.Msg({msg: 'Process ID is required'});
            return;
        }
        
        grid.setLoading(true);
        
        try {
            const params = {
                IN_CCUST: ccust,
                IN_PROCESS_ID: processId
            };
            
            const res = await global.callStoreGet('PRAXISMP', 'SQP05839', params);
            
            if (res && res.lstRs && res.lstRs.length > 0) {
                const errorsData = res.lstRs[0] || [];
                
                if (!errorsData || (Array.isArray(errorsData) && errorsData.length === 0)) {
                    const store = Ext.create('Ext.data.Store', { data: [] });
                    grid.setStore(store);
                    global.Msg({msg: 'No errors found for this process'});
                    return;
                }
                
                const dataArray = Array.isArray(errorsData) ? errorsData : (errorsData && typeof errorsData === 'object' ? [errorsData] : []);
                const store = Ext.create('Ext.data.Store', { data: dataArray });
                grid.setStore(store);
            } else {
                const store = Ext.create('Ext.data.Store', { data: [] });
                grid.setStore(store);
                global.Msg({msg: 'No errors found for this process'});
            }
        } catch (error) {
            console.error('Error loading errors data:', error);
            global.Msg({msg: 'Error loading errors: ' + (error.message || 'Unknown error')});
        } finally {
            grid.setLoading(false);
        }
    },
    
    onClickBack: function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const searchParams = me.view.searchParams || {};
        
        if (!mainPanel) {
            return;
        }
        
        mainPanel.removeAll();
        mainPanel.mask('Loading...');
        
        try {
            const params = Ext.apply({}, searchParams);
            if (params.IN_DATE_FROM && params.IN_DATE_FROM instanceof Date) {
                params.IN_DATE_FROM = Ext.Date.format(params.IN_DATE_FROM, 'Ymd');
            }
            if (params.IN_DATE_TO && params.IN_DATE_TO instanceof Date) {
                params.IN_DATE_TO = Ext.Date.format(params.IN_DATE_TO, 'Ymd');
            }
            
            const spParams = {
                IN_CCUST: params.IN_CCUST || '139',
                IN_DATE_FROM: params.IN_DATE_FROM || '',
                IN_DATE_TO: params.IN_DATE_TO || '',
                IN_MODULE: params.IN_MODULE || '',
                IN_STATUS: params.IN_STATUS || ''
            };
            
            const newGrid = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingProcessGrid', {
                id: prototype.id + '-AccountingProcessGrid',
                searchParams: searchParams
            });
            mainPanel.add(newGrid);
            
            const store = global.callStorePaggin('PRAXISMP', 'SQP05836', spParams);
            newGrid.bindStore(store);
            newGrid.setStore(store);
        } catch (e) {
            console.error('Error returning to Accounting Master Process:', e);
            global.Msg({msg: 'Error returning to previous grid'});
        } finally {
            mainPanel.unmask();
        }
    },
    
    onDownloadExcelErrors: function () {
        const me = this;
        const grid = me.view;
        
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
        
        const processId = me.view.processId || 'Errors';
        const data = records.map(function (rec, index) {
            return {
                'RN': index + 1,
                'Process Type': (rec.get('TYPE_ERROR_PROCESS') || '').toString().trim(),
                'Processor': (rec.get('PROCESSOR') || '').toString().trim(),
                'Processing Date': (rec.get('PRDA') || '').toString().trim(),
                'Ref. Number': (rec.get('AREFNBR') || '').toString().trim(),
                'Complement Id': (rec.get('TRANSACTID') || '').toString().trim(),
                'Status': (rec.get('STATUS_DESCRIPTION') || '').toString().trim(),
                'Currency': (rec.get('CURRENCY') || '').toString().trim(),
                'Amount': rec.get('AMOUNT') != null && rec.get('AMOUNT') !== '' ? rec.get('AMOUNT') : '',
                'Type Error': (rec.get('TYPE_ERROR_DESCRIPTION') || '').toString().trim(),
                'Code Error': (rec.get('CERROR') || '').toString().trim(),
                'Description Error': (rec.get('DERROR') || '').toString().trim()
            };
        });
        
        const fileName = 'AccountingProcessErrors_' + processId;
        global.writeExcelFromJson(data, fileName);
        
        Ext.toast({
            html: '<b>Excel file downloaded successfully</b>',
            title: 'Success',
            align: 't',
            closable: true,
            width: 280,
            timeout: 3000
        });
    },

    onOpenSettlement: function (item) {
        const btn = item.parentMenu.ownerCmp;
        const rec = btn.getWidgetRecord();
        const obj = rec.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.SettlementDataEntry', {
            id: prototype.id + '-SettlementDataEntry-1',
            obj: obj
        });
        dataEntry.show();
    },
    
    onOpenByPayment: function (item) {
        const btn = item.parentMenu.ownerCmp;
        const rec = btn.getWidgetRecord();
        const obj = rec.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },

    onOpenByTicket: function (item){
        const btn = item.parentMenu.ownerCmp;
        const rec = btn.getWidgetRecord();
        const obj = rec.data;

        let params = {
            IN_CCUST: obj.CCUST,
            IN_CIA: obj.CCIA,
            IN_FORMA: obj.FORMA,
            IN_SERIE: obj.SERIE,
            IN_SEQ: obj.SEQ,
            IN_TDOC: obj.TDOC,
            IN_CORRL: obj.CORRL
        };

        console.log("params", params) ;

        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
            id: prototype.id + '-TicketConciliationDataEntry-1',
            searchParams: params,
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },

    onOpenComplement: function (item) {
        const btn = item.parentMenu.ownerCmp;
        const rec = btn.getWidgetRecord();
        const obj = rec.data;
        const params = {
            CCUST: obj.CCUST.trim() || '139',
            PRDA: obj.PRDA.trim(),
            PLUSGRAID: obj.TRANSACTID.trim(),
            EMDNUMBER: obj.TICKET.trim() || '',
            PNR: '',
            SDATE: ''
        };
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.PlusgradeReconciliationDataEntry', {
            id: prototype.id + '-PlusgradeReconciliationDataEntry-1',
            obj: params,
        });
        dataEntry.show();
    },

    onOpenAccounting: function (item) {
        const btn = item.parentMenu.ownerCmp;
        const rec = btn.getWidgetRecord();
        const obj = rec.data;

        const me = this;
        const processId = me.view.processId || '';
        const ccust = me.view.ccust || obj.CCUST || '139';

        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ErrorAccountingDetailDataEntry', {
            id: prototype.id + '-ErrorAccountingDetailDataEntry-1',
            obj: obj,
            processId: processId,
            ccust: ccust
        });

        dataEntry.show();
    },

});
