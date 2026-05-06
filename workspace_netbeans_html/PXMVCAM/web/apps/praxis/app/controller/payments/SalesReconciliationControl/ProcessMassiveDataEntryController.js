Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ProcessMassiveDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessMassiveDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',

    afterRender: function () {
        const me = this;
        const view = me.view;

        const freglasData = view.freglasForProcessMasiveTransactional || [];
        const programData = view.dataProcessMassiveProgram || [];
        const processors  = view.processors || [];
        const statusData  = view.dataProcessMassiveStatus || [];

        // Execute: Program sin opcion "All" (seleccion obligatoria)
        const programCmp = Ext.getCmp(prototype.idPM + '-cmbProgram');
        global.setComboStoreWithoutAll(programCmp, programData, 'PROGRAM', 'DESCRIPTION', '');
        if (programData.length > 0) {
            programCmp.setValue(programData[0]['PROGRAM']);
        }

        // Execute: Rule Priority y Processor con "All"
        global.setComboStore(Ext.getCmp(prototype.idPM + '-cmbPriority'),  freglasData, 'A4451KEY3', 'A4451DESC1', '');
        global.setComboStore(Ext.getCmp(prototype.idPM + '-cmbProcessor'), processors,  'A4451KEY2', 'A4451DESC1', '');

        // Search: combos con "All"
        global.setComboStore(Ext.getCmp(prototype.idPM + '-searchCmbProgram'), programData, 'PROGRAM', 'DESCRIPTION', '');
        global.setComboStore(Ext.getCmp(prototype.idPM + '-searchCmbStatus'),  statusData,  'CODE',    'DESCRIPTION', '');
    },

    onChangeProgramCombo: function (combo, newValue) {
        const me = this;

        // Ocultar y resetear TODOS los campos dinamicos primero
        const dynamicFields = [
            { id: prototype.idPM + '-executeFrom',  isDate: true  },
            { id: prototype.idPM + '-executedTo',   isDate: true  },
            { id: prototype.idPM + '-cmbProcessor', isDate: false },
            { id: prototype.idPM + '-cmbPriority',  isDate: false }
        ];
        dynamicFields.forEach(function (item) {
            const cmp = Ext.getCmp(item.id);
            if (!cmp) return;
            cmp.setVisible(false);
            item.isDate ? cmp.setValue(new Date()) : cmp.setValue('');
        });

        if (!newValue) return;

        const parameters = me.view.dataProcessMassiveParameter || [];
        const paramNames = parameters
            .filter(p => (p.PROGRAM || '').trim() === newValue.trim() && p.PARAMETER_MODE === 'IN')
            .map(p => (p.PARAMETER_NAME || '').trim());

        if (paramNames.includes('VP_FPROC_INI') || paramNames.includes('IN_FROM')) {
            Ext.getCmp(prototype.idPM + '-executeFrom').setVisible(true);
        }
        if (paramNames.includes('VP_FPROC_FIN') || paramNames.includes('IN_TO')) {
            Ext.getCmp(prototype.idPM + '-executeTo').setVisible(true);
        }
        if (paramNames.includes('VP_PROCESADOR') || paramNames.includes('IN_PROCESSOR')) {
            const processorCmp = Ext.getCmp(prototype.idPM + '-cmbProcessor');
            processorCmp.setVisible(true);
            const found = (me.view.dataProcessMassiveProgram || [])
                .find(p => (p.PROGRAM || '').trim() === newValue.trim());
            processorCmp.setValue((found && found.PROCESSOR_DEFAULT) ? found.PROCESSOR_DEFAULT : '');
        }
        if (paramNames.includes('VP_PRIORIDAD') || paramNames.includes('IN_PRIORITY')) {
            Ext.getCmp(prototype.idPM + '-cmbPriority').setVisible(true);
        }
    },

    onExecuteClick: function (btn) {
        const me = this;
        const program = Ext.getCmp(prototype.idPM + '-cmbProgram').getValue();

        if (!program) {
            Ext.Msg.alert('Validation', 'Please select a program before executing.');
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to execute the process?',
            buttons: Ext.MessageBox.YESNO,
            scope: me,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (response) {
                if (response === 'yes') {
                    me.executeProcess();
                }
            }
        });
    },

    executeProcess: async function () {
        const me = this;
        const view = me.view;
        let notifier = new AWN();

        try {
            const program   = Ext.getCmp(prototype.idPM + '-cmbProgram').getValue()   || '';
            const priority  = Ext.getCmp(prototype.idPM + '-cmbPriority').getValue()  || '';
            const cmbProc   = Ext.getCmp(prototype.idPM + '-cmbProcessor');
            const fieldFrom = Ext.getCmp(prototype.idPM + '-executeFrom');
            const fieldTo   = Ext.getCmp(prototype.idPM + '-executeTo');

            const processor = cmbProc.isVisible()  ? (cmbProc.getValue() || '')  : '';
            const from      = fieldFrom.isVisible() && fieldFrom.getValue()
                ? Ext.Date.format(fieldFrom.getValue(), 'Ymd') : '';
            const to        = fieldTo.isVisible()   && fieldTo.getValue()
                ? Ext.Date.format(fieldTo.getValue(), 'Ymd')   : '';

            const params = {
                IN_CCUST:     '139',
                IN_PROGRAM:   program,
                IN_FROM:      from,
                IN_TO:        to,
                IN_PROCESSOR: processor,
                IN_PRIORITY:  priority,
                IO_RESPONSE:  0,
                IO_MESSAGE:   ''
            };

            const res = await global.callStorePostAsync('PRAXISMP', 'SQP05720', params);

            if (res === 201) {
                notifier.success('Starting Process');
            }

        } catch (e) {
            notifier.alert('Error in process');
            console.error(e);
        } finally {
            view.unmask && view.unmask();
            if (me.view.setLoading) me.view.setLoading(false);
        }
    },
    onSearchClick: async function () {
        const me = this;
        const view = me.view;
        const mainGrid    = Ext.getCmp(prototype.idPM + '-gridProcessMassive');
        const detailPanel = Ext.getCmp(prototype.idPM + '-detailPanel');
        const pagingBar   = Ext.getCmp(prototype.idPM + '-gridPagingBar');

        // Regresar a la grilla principal si esta en la vista de detalle
        if (detailPanel && detailPanel.isVisible()) {
            detailPanel.setVisible(false);
            mainGrid.setVisible(true);
        }

        const program    = (Ext.getCmp(prototype.idPM + '-searchCmbProgram').getValue() || '').trim();
        const searchFrom = Ext.getCmp(prototype.idPM + '-searchFrom');
        const searchTo   = Ext.getCmp(prototype.idPM + '-searchTo');

        const fromVal = searchFrom.getValue() ? Ext.Date.format(searchFrom.getValue(), 'Ymd') : '';
        const toVal   = searchTo.getValue()   ? Ext.Date.format(searchTo.getValue(),   'Ymd') : '';

        const params = {
            IN_CCUST:   '139',
            IN_FROM:    fromVal,
            IN_TO:      toVal,
            IN_USCR:    '',
            IN_PROGRAM: program
        };

        // Use Paging in view
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05310', params);
            const data = res?.lstRs?.[0] || [];

            const grid = Ext.getCmp(prototype.idPM + '-gridProcessMassive');
            if (grid && grid.setStore) {
                const store = Ext.create('Ext.data.Store', {
                    pageSize: 20,
                    data: data,
                    proxy: { type: 'memory', enablePaging: true },
                    autoLoad: true
                });
                grid.setStore(store);
            } else {
                // Si no hay grid, lanza un mensaje de error
                global.Msg({msg: 'No se encontró el grid para mostrar los datos.'});
            }

        } catch (e) {
            global.Msg({msg: 'Error cargando los datos.'});
            console.error(e);
        } finally {
            view.unmask && view.unmask();
        }
    },

    // Detecta click en columnas Total / Success / Errors de la grilla principal
    onGridCellClick: function (tableView, _td, cellIndex, record, _tr, _rowIndex, _e) {
        const me  = this;
        const col = tableView.getHeaderCt().getGridColumns()[cellIndex];
        if (!col) return;

        const dataIndex = col.dataIndex;
        if (!['TOTAL', 'SUCCESS', 'ERRORS'].includes(dataIndex)) return;

        const value = parseInt(record.get(dataIndex), 10);
        if (!value || value <= 0) return;

        const uuid = (  record.get('UUID') || '').toString().trim();

        const optionMap = { TOTAL: 'T', SUCCESS: 'S', ERRORS: 'E' };
        me.showDetailGrid(uuid, '139', optionMap[dataIndex], record);
    },

    // Llama SQP05311 y muestra el panel de detalle
    showDetailGrid: async function (uuid, ccust, option, record) {
        const me          = this;
        const mainGrid    = Ext.getCmp(prototype.idPM + '-gridProcessMassive');
        const detailPanel = Ext.getCmp(prototype.idPM + '-detailPanel');
        const detailGrid  = Ext.getCmp(prototype.idPM + '-gridDetail');
        const detailPB    = Ext.getCmp(prototype.idPM + '-gridDetailPagingBar');
        const downloadDetailExcelBtn = Ext.getCmp(prototype.idPM + '-downloadDetailExcel');
        
        me.view.setLoading(true);

        try {
            const params = {
                IN_UUID:   uuid,
                IN_CCUST:  ccust,
                IN_OPTION: option
            };

            const res  = await global.callStoreGet('PRAXISMP', 'SQP05311', params);
            const data = res?.lstRs?.[0] || [];

            
            // Store con paginado client-side (SQP05311 no soporta paginado server-side)
            const store = Ext.create('Ext.data.Store', {
                pageSize: 20,
                data: data,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: { type: 'json' }
                },
                autoLoad: false
            });

            detailGrid.setStore(store);
            if (detailPB) detailPB.setStore(store);
            store.loadPage(1);

            // Excel
            if (data && data.length > 0) {
                downloadDetailExcelBtn.setDisabled(false);
            } else {
                downloadDetailExcelBtn.setDisabled(true);
            }
            
            // visibilidad
            mainGrid.setVisible(false);
            detailPanel.setVisible(true);

        } catch (e) {
            global.Msg({ msg: 'Error loading detail data.' });
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },

    // Regresar a la grilla de busqueda principal
    onClickBack: function () {
        const mainGrid    = Ext.getCmp(prototype.idPM + '-gridProcessMassive');
        const detailPanel = Ext.getCmp(prototype.idPM + '-detailPanel');
        detailPanel.setVisible(false);
        mainGrid.setVisible(true);
    },

    // Open By Payment
    onClickOpenByPayment: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
            standByComment: me.standByComment,
            users: me.users,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },

    // download excel detail
    onClickdownloadDetailExcel: async function () {
        const detailGrid = Ext.getCmp(prototype.idPM + '-gridDetail');
        if (!detailGrid) {
            global.Msg({ msg: 'No grid found for export' });
            return;
        }

        const store = detailGrid.getStore();
        let allRows = [];
        if (store) {
            const proxy = store.getProxy ? store.getProxy() : null;
            const proxyData = proxy ? (proxy.getData ? proxy.getData() : proxy.data) : null;

            // When using memory + enablePaging, proxy.data keeps the full dataset.
            if (Array.isArray(proxyData)) {
                allRows = proxyData;
            } else if (Array.isArray(store.getRange && store.getRange())) {
                allRows = store.getRange();
            } else if (store.getData && Array.isArray(store.getData().items)) {
                allRows = store.getData().items;
            }
        }

        const records = allRows.map(item => item && item.data ? item.data : item);
        if (!records.length) {
            global.Msg({ msg: 'No data to export' });
            return;
        }

        let columns = [
            { title: 'Processing\nDate', field: 'PRDA' },
            { title: 'Ref. Number', field: 'AREFNBR' },
            { title: 'Doc.\nType', field: 'TRANSTYPE' },
            { title: 'Card Number', field: 'SCARDN' },
            { title: 'Auth.\nCode', field: 'SAUTHOC' },
            { title: 'Sale\nDate', field: 'SDATE' },
            { title: 'Currency', field: 'SCURRENCY' },
            { title: 'Amount', field: 'TGROSAMOUN',  dataAlign: 'right' },
            { title: 'ARN', field: 'ARN' },
            { title: 'Processor', field: 'PROCESSOR_DESCRIPTION' },
            { 
                title: 'Success', 
                field: '', // El valor va calculado en valueGetter
                valueGetter: function(row) {
                    return (row.ISSUCCESS === 1 || row.ISSUCCESS === '1') ? 'Yes' : '';
                }
            },
            { 
                title: 'Error', 
                field: 'ISERROR',
                valueGetter: function(row) {
                    return (row.ISERROR === 1 || row.ISERROR === '1') ? 'Yes' : '';
                }
            },
            { title: 'Created User', field: 'USCR' },
            { title: 'Created Date', field: 'FECR' },
            { title: 'Created Hour', field: 'HOCR' }
        ];

        const nameFile = 'ProcessMassiveDetail_' + (new Date().toISOString().slice(0,10));

        await global.writeExcelFromJsonWithStyle({
            data: records,
            name: nameFile,
            columns: columns
            // purposely NO defaultHeaderBgColor, etc. so default will be used
        });
    },
 
    onChangeDate: function (obj) {
        let option = obj.id.split('-').at(-1);
        
        const fromSearch = Ext.getCmp(prototype.idPM + '-searchFrom');
        const toSearch = Ext.getCmp(prototype.idPM + '-searchTo');
        const fromExecute = Ext.getCmp(prototype.idPM + '-executeFrom');
        const toExecute = Ext.getCmp(prototype.idPM + '-executeTo');
        
        const opts = {
            'searchFrom': () => {
                toSearch.setValue(fromSearch.getValue());
            },
            'searchTo': () => {
                if (toSearch.getValue() < fromSearch.getValue()) {
                    fromSearch.setValue(toSearch.getValue());
                }
            },
            
            'executeFrom': () => {
                toExecute.setValue(fromExecute.getValue());
            },
            'executeTo': () => {
                if (toExecute.getValue() < fromExecute.getValue()) {
                    fromExecute.setValue(toExecute.getValue());
                }
            },
        };
        opts[option]();
    },

    onCancelClick: function () {
        this.view.close();
    }
});
