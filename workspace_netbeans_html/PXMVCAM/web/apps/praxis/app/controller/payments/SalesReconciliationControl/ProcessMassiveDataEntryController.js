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
        // Autoseleccionar el primer elemento si existe
        if (programData.length > 0) {
            programCmp.setValue(programData[0]['PROGRAM']);
        }

        // Execute: Rule Priority y Processor con "All"
        global.setComboStore(Ext.getCmp(prototype.idPM + '-cmbPriority'),   freglasData, 'A4451KEY3', 'A4451DESC1', '');
        global.setComboStore(Ext.getCmp(prototype.idPM + '-cmbProcessor'),  processors,  'A4451KEY2', 'A4451DESC1', '');

        // Search: combos con "All"
        global.setComboStore(Ext.getCmp(prototype.idPM + '-searchCmbProgram'), programData, 'PROGRAM',      'DESCRIPTION', '');
        global.setComboStore(Ext.getCmp(prototype.idPM + '-searchCmbStatus'),  statusData,  'CODE',         'DESCRIPTION', '');

    },

    onChangeProgramCombo: function (combo, newValue) {
        const me = this;

        // Ocultar y resetear TODOS los campos dinamicos primero
        const dynamicFields = [
            { id: prototype.idPM + '-fieldFrom',   isDate: true  },
            { id: prototype.idPM + '-fieldTo',     isDate: true  },
            { id: prototype.idPM + '-cmbProcessor',isDate: false },
            { id: prototype.idPM + '-cmbPriority', isDate: false }
        ];
        dynamicFields.forEach(function (item) {
            const cmp = Ext.getCmp(item.id);
            if (!cmp) return;
            cmp.setVisible(false);
            item.isDate ? cmp.setValue(new Date()) : cmp.setValue('');
        });

        if (!newValue) return;

        // Filtrar parametros IN del programa seleccionado
        const parameters = me.view.dataProcessMassiveParameter || [];
        const paramNames = parameters
            .filter(p => (p.PROGRAM || '').trim() === newValue.trim() && p.PARAMETER_MODE === 'IN')
            .map(p => (p.PARAMETER_NAME || '').trim());

        if (paramNames.includes('VP_FPROC_INI') || paramNames.includes('IN_FROM')) {
            Ext.getCmp(prototype.idPM + '-fieldFrom').setVisible(true);
        }
        if (paramNames.includes('VP_FPROC_FIN') || paramNames.includes('IN_TO')) {
            Ext.getCmp(prototype.idPM + '-fieldTo').setVisible(true);
        }
        // Al mostrar el combo Processor, buscar si hay un processor default para el programa
        if (paramNames.includes('VP_PROCESADOR') || paramNames.includes('IN_PROCESSOR')) {
            const processorCmp = Ext.getCmp(prototype.idPM + '-cmbProcessor');
            processorCmp.setVisible(true);

            const programData = me.view.dataProcessMassiveProgram || [];
            // Buscar el registro del programa seleccionado en programData
            let processorDefault = '';
            const selectedProgram = (newValue || '').trim();
            const foundProgram = programData.find(p => (p.PROGRAM || '').trim() === selectedProgram);
            if (foundProgram && foundProgram.PROCESSOR_DEFAULT) {
                processorDefault = foundProgram.PROCESSOR_DEFAULT;
            }
            processorCmp.setValue(processorDefault || '');
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
        me.view.setLoading(true);

        try {
            const program   = Ext.getCmp(prototype.idPM + '-cmbProgram').getValue()   || '';
            const priority  = Ext.getCmp(prototype.idPM + '-cmbPriority').getValue()  || '';
            const cmbProc   = Ext.getCmp(prototype.idPM + '-cmbProcessor');
            const fieldFrom = Ext.getCmp(prototype.idPM + '-fieldFrom');
            const fieldTo   = Ext.getCmp(prototype.idPM + '-fieldTo');

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

            if (res === '201') {
                global.Msg({ msg: 'Starting Process' });
            } else {
                global.Msg({ msg: 'Process is already running' });
            }

        } catch (e) {
            Ext.Msg.show({
                title: 'Error',
                msg: 'An unexpected error occurred during execution.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        } finally {
            me.view.setLoading(false);
        }
    },

    onSearchClick: async function () {
        const me = this;
        const view = me.view;
        const program   = (Ext.getCmp(prototype.idPM + '-searchCmbProgram').getValue() || '').trim();
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

    onCancelClick: function () {
        this.view.close();
    }
});
