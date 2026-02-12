Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingMasterProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterProcessController',
    url: CONTEXTPATH + '/AccountingMasterProcess',
    
    init: function (view) {
        const me = this;
    },
    
    afterRender: async function () {
        const me = this;
        await me.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        const dateAccountingFrom = Ext.getCmp(prototype.id + '-dateAccountingFrom');
        const dateAccountingTo = Ext.getCmp(prototype.id + '-dateAccountingTo');

        filterPanel.mask('Loading Filters...');

        try {
            const response = await global.callStoreGet('PRAXISMP', 'SQP05835', {IN_STATUS : '139'});
            const { lstVals, lstRs } = response;

            // Mapear los 5 result sets del stored procedure SQP05835
            const dataAccountingProcessor = lstRs[0] || [];  // ACCOUNTING_TYPE - Result Set 0
            const dataProcessors = lstRs[1] || [];          // PROCESSORS - Result Set 1
            const dataComplements = lstRs[2] || [];         // COMPLEMENTS - Result Set 2
            const dataErrors = lstRs[3] || [];              // ERRORS - Result Set 3
            const dataStatus = lstRs[4] || [];              // STATUS - Result Set 4

            const previousDatetAccounting = lstVals.IO_PREVIOUS_DATE_ACCOUNTING;
            const nextDatetAccounting = lstVals.IO_NEXT_DATE_ACCOUNTING;
            const dateCalendarExist = lstVals.IO_DATE_CALENDAR_EXISTS;

            // Guardar datos en variables me. para uso en DataEntry y otros componentes
            me.dataAccountingProcessor = dataAccountingProcessor;
            me.dataProcessors = dataProcessors;
            me.dataComplements = dataComplements;
            me.dataErrors = dataErrors;
            me.dataStatus = dataStatus;
            me.nextDatetAccounting = nextDatetAccounting;
            me.dateCalendarExist = dateCalendarExist;
            
            // Actualizar combos
            me.setComboStore({ 
                cmp: Ext.getCmp(prototype.id + '-cmbAccountingModule'),
                data: dataAccountingProcessor,   
                valueField: 'CODE', 
                displayField: 'DESCRIPTION',   
                value: '', 
                addValueAll: true });
            
            me.setComboStore({ 
                cmp: Ext.getCmp(prototype.id + '-cmbStatus'),
                data: dataStatus,
                valueField: 'CODE',
                displayField: 'DESCRIPTION',
                value: '',
                addValueAll: true });

            // Parsear el string YYYYMMDD a objeto Date
            const previousDate = Ext.Date.parse(previousDatetAccounting, 'Ymd');
            const accountingDate = Ext.Date.parse(nextDatetAccounting, 'Ymd');
            if (accountingDate && previousDate) {
                dateAccountingFrom.setValue(previousDate);
                dateAccountingTo.setValue(accountingDate);
            } else {
                console.warn('No se pudo parsear las fechas:', previousDatetAccounting, nextDatetAccounting);
            }

        } catch (e) {
            console.error('Error loading filters:', e);
            global.Msg({msg: 'Error loading filters'});
        } finally {    
            filterPanel.unmask();
        }
    },
    onClickSearchBtn: function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        
        if (!filtro1) {
            global.Msg({msg: 'Filters panel not found'});
            return;
        }
        
        let params = filtro1.getForm().getValues();
        
        // Validar que al menos haya un filtro seleccionado
        // if (!params.FECHA_FROM && !params.FECHA_TO && !params.IN_MODULE && !params.IN_STATUS) {
        //     global.Msg({msg: 'Please select at least one filter'});
        //     return;
        // }
        
        // Limpiar el contenido anterior
        mainPanel.removeAll();
        mainPanel.mask('Loading data...');
        
        try {
            // Crear el grid con los parámetros de búsqueda
            const newGrid = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingProcessGrid', {
                id: prototype.id + '-AccountingProcessGrid',
                searchParams: params
            });
            
            mainPanel.add(newGrid);
            
            // Cargar datos en el grid
            me.loadProcessGridData(newGrid, params);
        } catch (e) {
            console.error('Error creating grid:', e);
            global.Msg({msg: 'Error creating process grid'});
        } finally {
            mainPanel.unmask();
        }
    },
    
    onClickConsistencyBtn: function () {
        const me = this;
        // Abrir el DataEntry para análisis de consistencia
        // Pasar los datos cargados desde fillFilters al DataEntry
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ConsistencyDataEntry', {
            id: prototype.id + '-ConsistencyDataEntry-1',
            dataAccountingProcessor: me.dataAccountingProcessor || [],
            dataProcessors: me.dataProcessors || [],
            dataComplements: me.dataComplements || [],
            dataErrors: me.dataErrors || [],
            nextDatetAccounting: me.nextDatetAccounting || '',
        });
        dataEntry.show();
    },
    
    
    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        const btnFilter = Ext.getCmp(prototype.id + '-btnFilter');
        
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },
    
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    
    onChangeFechaBtn: function (field, newValue, oldValue) {
        const me = this;
        // Obtener el ID del campo que cambió
        const fieldId = field.id;
        const option = fieldId.split('-').pop(); // Obtener la última parte del ID
        
        const dateFrom = Ext.getCmp(prototype.id + '-dateAccountingFrom');
        const dateTo = Ext.getCmp(prototype.id + '-dateAccountingTo');
                
        const opts = {
            'dateAccountingFrom': () => {
                // Cuando cambia From, actualizar To con el mismo valor
                if (newValue) {
                    dateTo.setValue(newValue);
                }
            },
            'dateAccountingTo': () => {
                // Cuando cambia To, si es menor que From, actualizar From con el valor de To
                const fromValue = dateFrom.getValue();
                if (newValue && fromValue && newValue < fromValue) {
                    dateFrom.setValue(newValue);
                }
            }
        };
        
        // Ejecutar la función correspondiente según el campo que cambió
        if (opts[option]) {
            opts[option]();
        }
    },
    
    loadProcessGridData: function (grid, params) {
        const me = this;

        if (!grid) {
            return;
        }

        // parameters of Filter
        const spParams = {
            IN_CCUST: params.IN_CCUST || '139',
            IN_DATE_FROM: params.IN_DATE_FROM || '',
            IN_DATE_TO: params.IN_DATE_TO || '',
            IN_MODULE: params.IN_MODULE || '',
            IN_STATUS: params.IN_STATUS || ''
        };

        // Crear store con paginación
        const store = global.callStorePaggin('PRAXISMP', 'SQP05836', spParams);

        // Vincular el store al grid
        grid.bindStore(store);
        grid.setStore(store);
    },
    
    onClickExecuteProcess: function () {
        const me = this;
        // Validar si el calendario de ejecución está habilitado
        if (!me.dateCalendarExist) {
            global.Msg({
                msg: 'Calendar for execution is not enabled. Please enable the calendar before executing the accounting process.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
            return;
        }
        // Abrir el DataEntry para ejecutar proceso contable
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.AccountingExecuteDataEntry', {
            id: prototype.id + '-AccountingExecuteDataEntry-1',
            dataAccountingProcessor: me.dataAccountingProcessor || [],
            nextDatetAccounting: me.nextDatetAccounting || ''
        });
        dataEntry.show();
    },
    
    onClickLog: function (grid, rowIndex, colIndex, item, e, record) {
        const me = this;
        
        // Obtener el Number Process del record seleccionado
        const processId = record.get('A1955ENVIO') || '';
        
        if (!processId) {
            global.Msg({msg: 'Process ID not found'});
            return;
        }
        
        // Abrir el DataEntry para mostrar el log del proceso
        const logDataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.LogAccountingProcessDataEntry', {
            id: prototype.id + '-LogAccountingProcessDataEntry-1',
            processId: processId,
            ccust: '139'
        });
        logDataEntry.show();
    },
    
    onDownloadExcelAccountingProcess: async function () {
        const me = this;
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        const grid = Ext.getCmp(prototype.id + '-AccountingProcessGrid');
        
        if (!filtro1 || !grid) {
            global.Msg({msg: 'Filters or grid not found. Please search first.'});
            return;
        }
        
        let params = filtro1.getForm().getValues();
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
        
        grid.setLoading(true);
        try {
            const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05836', spParams);
            if (!res || res.length === 0) {
                global.Msg({msg: 'No data to export'});
                return;
            }
            
            const data = res.map(function (x, index) {
                return {
                    'RN': index + 1,
                    'Number Process': x.A1955ENVIO || '',
                    'Process Date': x.A1955FPROC || '',
                    'Accounting Date': x.A1955FCONT || '',
                    'Module Process': x.A4451DESC1 || '',
                    'Status': x.STATUS_DESCRIPTION || '',
                    'Records Processed': x.RECORDS_PROCESSED || 0,
                    'Errors Found': x.ERROR_FOUND || 0,
                    'Create User': x.A1955USRIN || '',
                    'Create Date': x.A1955FECIN || '',
                    'Create Hour': x.A1955HORIN || '',
                    'Update User': x.A1955USRAC || '',
                    'Update Date': x.A1955FECAC || '',
                    'Update Hour': x.A1955HORAC || ''
                };
            });
            
            await global.writeExcelFromJson(data, 'AccountingMasterProcess_ExecutedProcesses');
            Ext.toast({
                html: '<b>Excel file downloaded successfully</b>',
                title: 'Success',
                align: 't',
                closable: true,
                width: 280,
                timeout: 3000
            });
        } catch (e) {
            console.error('Error downloading Excel:', e);
            global.Msg({msg: 'Error downloading Excel: ' + (e.message || 'Unknown error')});
        } finally {
            grid.setLoading(false);
        }
    },
   

    onClickReverseProcess: function (view, rowIndex, colIndex, item, e, record) {
        const me = this;
        const grid = view ? view.up('gridpanel') : Ext.getCmp(prototype.id + '-AccountingProcessGrid');

        if (!grid || !record) {
            global.Msg({msg: 'Grid or record not found.'});
            return;
        }

        const activeReverse = record.get('ACTIVE_REVERSE');
        if (activeReverse !== 1) {
            global.Msg({msg: 'Reverse is not allowed for this process.'});
            return;
        }

        const idProcess = (record.get('A1955ENVIO') || '').toString().trim();
        if (!idProcess) {
            global.Msg({msg: 'Number Process not found in this row.'});
            return;
        }

        const ccust = (grid.searchParams && grid.searchParams.IN_CCUST) ? grid.searchParams.IN_CCUST.toString().trim() : '139';

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to reverse process <b>' + Ext.String.htmlEncode(idProcess) + '</b>?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.executeReverseProcess(grid, ccust, idProcess);
                }
            }
        });
    },

    executeReverseProcess: async function (grid, ccust, idProcess) {
        const me = this;

        grid.setLoading(true);

        try {
            const params = {
                IN_CCUST: ccust || '139',
                IN_IDPROCESS: idProcess
            };

            const res = await global.callStorePost('PRAXISMP', 'SQP05926', params);

            const lstVals = (res && res.data && res.data.lstVals) ? res.data.lstVals : (res && res.lstVals) ? res.lstVals : {};
            const response = lstVals.IO_REPONSE != null ? lstVals.IO_REPONSE : lstVals.IO_RESPONSE;
            const message = (lstVals.IO_MESSAGE || '').toString().trim() || 'Reverse process completed.';

            if (response === 1 || response === '1') {
                Ext.toast({
                    html: '<b>' + Ext.String.htmlEncode(message) + '</b>',
                    title: 'Success',
                    align: 't',
                    closable: true,
                    width: 320
                });
                if (grid.getStore() && grid.getStore().load) {
                    grid.getStore().load();
                }
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    message: message || 'Reverse process failed.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
        } catch (e) {
            console.error('Error reversing process:', e);
            global.Msg({msg: 'Error reversing process: ' + (e.message || 'Unknown error')});
        } finally {
            grid.setLoading(false);
        }
    },

    onCellClickErrorsFound: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        const me = this;
        const grid = view.up('gridpanel');
        if (!grid) return;
        const column = grid.getVisibleColumnManager().getHeaderAtIndex(cellIndex);
        if (!column || column.dataIndex !== 'ERROR_FOUND') {
            return;
        }
        
        const errorFound = record.get('ERROR_FOUND') || 0;
        if (errorFound <= 0) {
            return;
        }
        
        const processId = record.get('A1955ENVIO') || '';
        if (!processId) {
            global.Msg({msg: 'Process ID not found'});
            return;
        }
        
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        if (!mainPanel) return;
        
        const searchParams = grid.searchParams || {};
        
        mainPanel.removeAll();
        mainPanel.mask('Loading errors...');
        
        try {
            const errorsFoundGrid = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.ErrorsFoundGrid', {
                id: prototype.id + '-ErrorsFoundGrid',
                processId: processId,
                ccust: record.get('CCUST') || '139',
                searchParams: searchParams
            });
            mainPanel.add(errorsFoundGrid);
        } catch (err) {
            console.error('Error opening Errors Found grid:', err);
            global.Msg({msg: 'Error opening Errors Found grid'});
        } finally {
            mainPanel.unmask();
        }
    },

    
    setComboStore: function ( {cmp, data, valueField, displayField, value, addValueAll = true}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data, valueField: valueField, displayField: displayField, addValueAll: addValueAll}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField, addValueAll = true}) {
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record "All" solo si addValueAll es true
        if (addValueAll === true) {
            let allRecord = {};
            allRecord[displayField] = 'All';
            allRecord[valueField] = '';
            store.insert(0, allRecord);
        }
        //console.log('store creado',store);
        return store;
    },
    
    createStore: function ( {data}) {
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    }

});