Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ConsistencyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConsistencyController',
    
    init: function (view) {
        const me = this;
        me.view = view;
        
        // Recibir datos del controlador principal si están disponibles
        if (view.dataAccountingProcessor) {
            me.dataAccountingProcessor = view.dataAccountingProcessor;
        }
        if (view.dataProcessors) {
            me.dataProcessors = view.dataProcessors;
        }
        if (view.dataComplements) {
            me.dataComplements = view.dataComplements;
        }
        if (view.dataErrors) {
            me.dataErrors = view.dataErrors;
        }

        me.nexDatetAccounting = view.nexDatetAccounting;
    },

    afterRender: async function () {
        const me = this;
        // Inicializar la visibilidad de los campos según el valor por defecto
        const typeDateField = Ext.getCmp(prototype.idCN + '-filterTypeDate');
        if (typeDateField) {
            const currentValue = typeDateField.getValue() || 'PD';
            me.onFilterTypeDateChange(typeDateField, currentValue, null);
        }
        
        // Establecer valores por defecto de fechas usando nexDatetAccounting
        if (me.nexDatetAccounting) {
        
            const dateFromField = Ext.getCmp(prototype.idCN + '-filterDateFrom');
            const dateToField = Ext.getCmp(prototype.idCN + '-filterDateTo');
            
            // Parsear el string YYYYMMDD a objeto Date
            const accountingDate = Ext.Date.parse(me.nexDatetAccounting, 'Ymd');
            if (accountingDate) {
                // Establecer el valor en ambos campos
                dateToField.setValue(accountingDate);
                
                // Si el tipo de fecha es RD (Range Date), también establecer en From
                const typeDateValue = typeDateField ? typeDateField.getValue() : 'PD';
                if (typeDateValue === 'RD') {
                    dateFromField.setValue(accountingDate);
                }
                
                console.log('Fechas establecidas correctamente:', me.nexDatetAccounting);
            } else {
                console.warn('No se pudo parsear la fecha:', me.nexDatetAccounting);
            }
        }
        
        // Cargar procesadores en el combo si están disponibles
        // Obtener el valor actual del combo Type
        const typeInsumCombo = Ext.getCmp(prototype.idCN + '-filterType');
        const currentTypeValue = typeInsumCombo ? typeInsumCombo.getValue() : 'ALL';
        
        if (me.dataProcessors || me.dataComplements) {
            console.log("me.loadProcessorsCombo loaddd " , currentTypeValue);
            me.loadProcessorsCombo(currentTypeValue);
        }
        
    },
    
    loadProcessorsCombo: function (typeInsum) {
        const me = this;
        const processorCombo = Ext.getCmp(prototype.idCN + '-filterProcessor');
        if (!processorCombo) {
            return;
        }
        
        // Determinar qué datos mostrar según el tipo seleccionado
        let dataToShow = [];
        const typeInsumValue = typeInsum || 'ALL';
        
        if (typeInsumValue === 'ALL') {
            // Combinar processors y complements
            const processors = me.dataProcessors || [];
            const complements = me.dataComplements || [];
            dataToShow = [...processors, ...complements];
        } else if (typeInsumValue === 'SETTLEMENT') {
            // Solo processors
            dataToShow = me.dataProcessors || [];
        } else if (typeInsumValue === 'COMPLEMENT') {
            // Solo complements
            dataToShow = me.dataComplements || [];
        }
        console.log("dataToShow -> ", dataToShow);
        if (dataToShow.length > 0) {
            me.setComboStore({
                cmp: processorCombo,
                data: dataToShow,
                valueField: 'CODE',
                displayField: 'DESCRIPTION',
                value: 'ALL',
                addValueAll: true
            });
        } else {
            // Si no hay datos, crear un store vacío con solo "All"
            const emptyStore = Ext.create('Ext.data.Store', {
                fields: ['CODE', 'DESCRIPTION'],
                data: [{CODE: 'ALL', DESCRIPTION: 'All'}]
            });
            processorCombo.bindStore(emptyStore);
            processorCombo.setValueField('CODE');
            processorCombo.setDisplayField('DESCRIPTION');
            processorCombo.setValue('ALL');
        }
    },
    
    onFilterTypeInsumChange: function (field, newValue, oldValue) {
        const me = this;
        // Recargar el combo Processor según el tipo seleccionado
        me.loadProcessorsCombo(newValue);
    },

    loadData: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.idCN + '-filtersForm').getForm();
        const gridSettlements = Ext.getCmp(prototype.idCN + '-gridSettlements');
        const gridComplements = Ext.getCmp(prototype.idCN + '-gridComplements');
        
        me.view.setLoading(true);
        
        try {
            const formData = form.getValues();
            
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_TYPE_DATE: formData.IN_TYPE_DATE || 'PD',
                IN_DATE_FROM: formData.IN_DATE_FROM || '',
                IN_DATE_TO: formData.IN_DATE_TO || '',
                IN_TYPE_INSUME: formData.IN_TYPE_INSUME || 'ALL',
                IN_PROCESSOR: formData.IN_PROCESSOR || 'ALL',
                IO_RESPONSE: 0,
                IO_MESSAGE: ''
            };

            // Llamar al stored procedure
            const res = await global.callStoreGet('PRAXISMP', 'SQP05759', params);
            
            // Verificar el status de la respuesta
            const status = res.lstVals?.IO_RESPONSE || 0;
            const message = res.lstVals?.IO_MESSAGE || '';
            
            if (status === 0) {
                // Error en el proceso
                Ext.MessageBox.show({
                    title: 'Error',
                    message: message || 'An error occurred during the consistency analysis process.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
                me.view.setLoading(false);
                return;
            }
            
            // Proceso exitoso - cargar datos en las grillas
            // El primer resultado es para Settlements
            // El segundo resultado es para Complements
            const tabSettlements = Ext.getCmp(prototype.idCN + '-tabSettlements');
            const tabComplements = Ext.getCmp(prototype.idCN + '-tabComplements');
            
            if (res.lstRs && res.lstRs.length > 0) {
                // Cargar Settlements (primer resultado)
                if (res.lstRs.length > 0 && res.lstRs[0]) {
                    const settlementsData = res.lstRs[0];
                    const settlementsCount = settlementsData.length || 0;
                    const settlementsStore = Ext.create('Ext.data.Store', {
                        fields: [
                            'RN',
                            'AREFNBR',
                            'PRDA',
                            'TDOC',
                            'AMOUNT',
                            'PROCESSOR',
                            'STATUS',
                            'ERROR_CODE',
                            'ERROR_DESC'
                        ],
                        data: settlementsData
                    });
                    gridSettlements.setStore(settlementsStore);
                    
                    // Actualizar título del tab con el conteo
                    if (tabSettlements) {
                        tabSettlements.setTitle('Settlements (' + settlementsCount + ')');
                    }
                } else {
                    gridSettlements.getStore().removeAll();
                    if (tabSettlements) {
                        tabSettlements.setTitle('Settlements (0)');
                    }
                }
                
                // Cargar Complements (segundo resultado)
                if (res.lstRs.length > 1 && res.lstRs[1]) {
                    const complementsData = res.lstRs[1];
                    const complementsCount = complementsData.length || 0;
                    const complementsStore = Ext.create('Ext.data.Store', {
                        fields: [
                            'RN',
                            'AREFNBR',
                            'PRDA',
                            'TDOC',
                            'AMOUNT',
                            'PROCESSOR',
                            'STATUS',
                            'ERROR_CODE',
                            'ERROR_DESC'
                        ],
                        data: complementsData
                    });
                    gridComplements.setStore(complementsStore);
                    
                    // Actualizar título del tab con el conteo
                    if (tabComplements) {
                        tabComplements.setTitle('Complements (' + complementsCount + ')');
                    }
                } else {
                    gridComplements.getStore().removeAll();
                    if (tabComplements) {
                        tabComplements.setTitle('Complements (0)');
                    }
                }
                
                // Mostrar mensaje de éxito si hay
                if (message && message.trim() !== '') {
                    Ext.toast({
                        html: `<b>${message}</b>`,
                        title: 'Success',
                        align: 't',
                        closable: true,
                        width: 300,
                        timeout: 5000
                    });
                }
            } else {
                // No hay resultados
                gridSettlements.getStore().removeAll();
                gridComplements.getStore().removeAll();
                
                // Actualizar títulos de tabs a 0
                const tabSettlements = Ext.getCmp(prototype.idCN + '-tabSettlements');
                const tabComplements = Ext.getCmp(prototype.idCN + '-tabComplements');
                if (tabSettlements) {
                    tabSettlements.setTitle('Settlements (0)');
                }
                if (tabComplements) {
                    tabComplements.setTitle('Complements (0)');
                }
                
                global.Msg({msg: 'No data found'});
            }
             
        } catch (error) {
            console.error('Error loading data:', error);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'An error occurred while loading data: ' + (error.message || 'Unknown error'),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        } finally {
            me.view.setLoading(false);
        }
    },

    onChangeDate: function (field, newValue, oldValue) {
        const me = this;
        // Validar que la fecha "to" sea mayor o igual a la fecha "from" solo cuando está activo Range Date
        const form = Ext.getCmp(prototype.idCN + '-filtersForm').getForm();
        const formData = form.getValues();
        const typeDate = formData.IN_TYPE_DATE || 'PD';
        
        // Solo validar cuando está en modo Range Date (RD)
        if (typeDate === 'RD' && formData.IN_DATE_FROM && formData.IN_DATE_TO) {
            const fromDate = new Date(formData.IN_DATE_FROM);
            const toDate = new Date(formData.IN_DATE_TO);
            
            if (toDate < fromDate) {
                global.Msg({msg: 'Date To must be greater than or equal to Date From'});
                field.setValue(oldValue);
                return false;
            }
        }
    },

    
    onClickDetailSettlements: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const data = record.data;
        console.log('data -> ', data);
        
        // const obj = {
        //     IN_CCUST: data.CCUST,
        //     IN_PRDA: data.PRDA,
        //     IN_TDOC: data.TDOC,
        //     IN_AREFNBR: data.AREFNBR
        // };
        // console.log('obj -> ', obj);

        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: data,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();

        // const obj = record.data;
        // const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
        //     id: prototype.id + '-TransacErrorBPODataEntry-1',
        //     obj: obj,
        //     callback: () => {
        //         grid.getStore().load();
        //     }
        // });
        // dataEntry.show();
    },

    onClickDetailComplements: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const data = record.data;
        console.log('data -> ', data);
        const obj = {
            CCUST: data.CCUST,
            PRDA: data.PRDA,
            PLUSGRAID: data.PLUSGRADEID,
            EMDNUMBER: data.CCIA + data.FORMA + data.SERIE || ' ',
            PNR: data.PNR || ' ',
            SDATE: data.SDATE || ' '
        };

        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.PlusgradeReconciliationDataEntry', {
            id: prototype.id + '-PlusgradeReconciliationDataEntry-1',
            obj: obj
        });
        dataEntry.show();
    },
    onFilterChange: function (field, newValue, oldValue) {
        // Se puede agregar lógica adicional si es necesario
    },

    onFilterTypeDateChange: function (field, newValue, oldValue) {
        const me = this;
        const dateFromField = Ext.getCmp(prototype.idCN + '-filterDateFrom');
        const dateToField = Ext.getCmp(prototype.idCN + '-filterDateTo');
        
        if (!dateFromField || !dateToField) {
            return;
        }
        
        if (newValue === 'PD') {
            // Date Execute: ocultar Date From y cambiar label de Date To a "Date"
            dateFromField.hide();
            dateFromField.setValue(null);
            dateToField.setFieldLabel('Date');
            dateToField.show();
        } else if (newValue === 'RD') {
            // Range Date: mostrar Date From con la misma fecha de Date To
            const dateToValue = dateToField.getValue();
            dateFromField.setValue(dateToValue);
            dateFromField.setFieldLabel('Date From');
            dateFromField.show();
            dateToField.setFieldLabel('Date To');
            dateToField.show();
        }
    },

    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearch();
        }
    },

    onClickSearch: function () {
        const me = this;
        me.loadData();
    },

    onClickClear: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idCN + '-filtersForm').getForm();
        const gridSettlements = Ext.getCmp(prototype.idCN + '-gridSettlements');
        const gridComplements = Ext.getCmp(prototype.idCN + '-gridComplements');
        
        // Limpiar formulario
        form.reset();
        
        // Establecer valores por defecto
        form.setValues({
            IN_CCUST: '139',
            IN_TYPE_DATE: 'PD',
            IN_DATE_FROM: null,
            IN_DATE_TO: new Date(),
            IN_TYPE_INSUME: 'ALL',
            IN_PROCESSOR: 'ALL'
        });
        
        // Actualizar visibilidad de campos según el tipo de fecha
        const typeDateField = Ext.getCmp(prototype.idCN + '-filterTypeDate');
        if (typeDateField) {
            me.onFilterTypeDateChange(typeDateField, 'PD', null);
        }
        
        // Recargar combo Processor con el valor por defecto
        me.loadProcessorsCombo('ALL');
        
        // Limpiar grillas
        gridSettlements.getStore().removeAll();
        gridComplements.getStore().removeAll();
        
        // Restablecer títulos de tabs sin conteo
        const tabSettlements = Ext.getCmp(prototype.idCN + '-tabSettlements');
        const tabComplements = Ext.getCmp(prototype.idCN + '-tabComplements');
        if (tabSettlements) {
            tabSettlements.setTitle('Settlements');
        }
        if (tabComplements) {
            tabComplements.setTitle('Complements');
        }
    },
    
    // Funciones auxiliares para manejo de combos (similar a AccountingMasterProcessController)
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
    },

    onDownloadSettlements: function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idCN + '-gridSettlements');

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

        // const data = records.map(function (rec) {
        //     return rec.getData();
        // });
        const data = records.map(function(rec, index) {
            return {
                'RN': index + 1,
                'Customer': rec.get('CCUST') || '',
                'Processing Date': rec.get('PRDA') || '',
                'Type Document': rec.get('TDOC') || '',
                'Ref. Number': rec.get('AREFNBR') || '',
                'Ticket': rec.get('CCIA') + rec.get('FORMA') + rec.get('SERIE')	|| '',
                'Seq': rec.get('SEQ') || '',
                'Currency': rec.get('SCURRENCY') || '',
                'Amount': rec.get('AMOUNT') || '',
                'Sale Amount': rec.get('SALE_AMOUNT') || '',
                'Processor': rec.get('PROCESSOR') || '',
                'Status': rec.get('STATUS_DESCRIPTION') || '',
                'Error Code': rec.get('CERROR') || '',
                'Error Description': rec.get('DERROR') || ''
            };
        });

        const fileName = 'Consistency_Settlements_' + Ext.Date.format(new Date(), 'Ymd_His');
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

    onDownloadComplements: function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idCN + '-gridComplements');

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

        // const data = records.map(function (rec) {
        //     return rec.getData();
        // });
        const data = records.map(function(rec, index) {
            return {
                'RN': index + 1,
                'Customer': rec.get('CCUST') || '',
                'Processing Date': rec.get('PRDA') || '',
                'Plusgrade ID': rec.get('PLUSGRADEID') || '',
                'Ref. Number': rec.get('AREFNBR') || '',
                'Ticket': rec.get('CCIA') + rec.get('FORMA') + rec.get('SERIE')	|| '',
                'Seq': rec.get('SEQ') || '',
                'Currency': rec.get('SCURRENCY') || '',
                'Amount': rec.get('AMOUNT') || '',
                'Sale Amount': rec.get('SALE_AMOUNT') || '',
                'Complement': rec.get('COMPLEMENT') || '',
                'Status': rec.get('STATUS_DESCRIPTION') || '',
                'Error Code': rec.get('CERROR') || '',
                'Error Description': rec.get('DERROR') || ''
            };
        });

        const fileName = 'Consistency_Complements_' + Ext.Date.format(new Date(), 'Ymd_His');
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
