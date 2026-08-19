Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingExecuteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingExecuteController',
    
    init: function (view) {
        const me = this;
        me.view = view;
        
        // Recibir datos del controlador principal si están disponibles
        if (view.dataAccountingProcessor) {
            me.dataAccountingProcessor = view.dataAccountingProcessor;
        }
        if (view.nextDatetAccounting) {
            me.nextDatetAccounting = view.nextDatetAccounting;
        }
    },

    afterRender: async function () {
        const me = this;
        
        // Establecer valores por defecto de fechas usando nextDatetAccounting
        if (me.nextDatetAccounting) {
            const dateField = Ext.getCmp(prototype.idEX + '-filterDate');
            
            if (dateField ) {
                try {
                    // Parsear el string YYYYMMDD a objeto Date
                    const accountingDate = Ext.Date.parse(me.nextDatetAccounting, 'Ymd');
                    if (accountingDate) {
                        // Establecer el valor en ambos campos
                        dateField.setValue(accountingDate);
                        console.log('Fechas establecidas correctamente:', me.nextDatetAccounting);
                    } else {
                        console.warn('No se pudo parsear la fecha:', me.nextDatetAccounting);
                    }
                } catch (e) {
                    console.error('Error estableciendo fechas:', e);
                }
            }
        }
        
        // Cargar módulos de contabilidad en el combo si están disponibles
        if (me.dataAccountingProcessor && me.dataAccountingProcessor.length > 0) {
            me.loadAccountingModuleCombo();
        }
    },
    
    loadAccountingModuleCombo: function () {
        const me = this;
        const accountingModuleCombo = Ext.getCmp(prototype.idEX + '-filterAccountingModule');
        if (accountingModuleCombo && me.dataAccountingProcessor) {
            me.setComboStore({
                cmp: accountingModuleCombo,
                data: me.dataAccountingProcessor,
                valueField: 'CODE',
                displayField: 'DESCRIPTION',
                value: 'PPAYMENT',
                addValueAll: false
            });
        }
    },
    
    
    onClickExecute: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.idEX + '-filtersForm').getForm();
        
        if (!form.isValid()) {
            global.Msg({msg: 'Please fill all required fields'});
            return;
        }
        
        const formData = form.getValues();
        
        // Validar fecha
        if (!formData.IN_DATE) {
            global.Msg({msg: 'Please select a date'});
            return;
        }
        
        // Confirmar ejecución
        Ext.Msg.show({
            title: 'Confirm',
            message: 'Are you sure you want to execute the accounting process?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: me,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.executeProcess(formData);
                }
            }
        });
    },
    
    executeProcess: async function (formData) {
        const me = this;
        me.view.setLoading(true);
        
        try {
            // Formatear fechas a YYYYMMDD
            let dateFrom = '';
            let dateTo = '';
            
            dateTo = formData.IN_DATE
            dateFrom = dateTo;

            // Preparar parámetros para el stored procedure
            // Si IN_MODULE es 'ALL' o vacío, usar 'PPAYMENT' como valor por defecto
            let moduleValue = formData.IN_MODULE || 'PPAYMENT';
            if (moduleValue === 'ALL' || moduleValue === '') {
                moduleValue = 'PPAYMENT';
            }
            
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_DATE_FROM: dateFrom,
                IN_DATE_TO: dateTo,
                IN_MODULE: moduleValue,
                IO_RESPONSE: 0,
                IO_MESSAGE: ''
            };
            
            // Llamar al stored procedure
            const res = await global.callStoreGet('PRAXISMP', 'SQP05760', params);
            
            // Verificar el status de la respuesta
            const status = res.lstVals?.IO_RESPONSE || 0;
            const message = res.lstVals?.IO_MESSAGE || '';
            
            if (status === 0) {
                // Error en el proceso
                Ext.MessageBox.show({
                    title: 'Error',
                    message: message || 'An error occurred during the accounting process execution.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            } else {
                // Proceso exitoso
                Ext.MessageBox.show({
                    title: 'Success',
                    message: message || 'Accounting process executed successfully.',
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.MessageBox.OK,
                    fn: function () {
                        // Cerrar la ventana después de mostrar el mensaje
                        me.view.close();
                    }
                });
            }
            
        } catch (error) {
            console.error('Error executing process:', error);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'An error occurred while executing the process: ' + (error.message || 'Unknown error'),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        } finally {
            me.view.setLoading(false);
        }
    },
    
    onClickCancel: function () {
        const me = this;
        me.view.close();
    },
    
    // Funciones auxiliares para manejo de combos
    setComboStore: function ({cmp, data, valueField, displayField, value, addValueAll = true}) {
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data, valueField: valueField, displayField: displayField, addValueAll: addValueAll}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    
    createComboStore: function ({data, valueField, displayField, addValueAll = true}) {
        // Limpiar strings de los datos
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        // Crear Store
        let store = this.createStore({data: data});
        // Insertar record "All" solo si addValueAll es true
        if (addValueAll === true) {
            let allRecord = {};
            allRecord[displayField] = 'All';
            allRecord[valueField] = '';
            store.insert(0, allRecord);
        }
        return store;
    },
    
    createStore: function ({data}) {
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    }
});
