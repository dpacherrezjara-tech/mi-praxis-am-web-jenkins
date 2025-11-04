Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.AnalyzeReconciliationErrorsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AnalyzeReconciliationErrorsControlController',
    
    init: function (view) {
        const me = this;
        me.view = view;
        me.processors = [];

    },

    afterRender: async function () {
        const me = this;
        me.processors = this.view.processors;
        // Cargar procesadores desde SQP05276
        await me.loadProcessors();
        // Configurar visibilidad inicial de campos de fecha
        me.updateDateFieldsVisibility();
        // Cargar datos iniciales
        me.loadData();
    },

    loadProcessors: async function () {
        const me = this;
        try {
            
            const dataProcesadores = me.processors || [];
            
            const processorCombo = Ext.getCmp(prototype.idDE + '-filterProcessor');
            if (processorCombo) {
                processorCombo.suspendEvents(false);
                const store = me.createComboStore({
                    data: dataProcesadores, 
                    valueField: 'A4451KEY2', 
                    displayField: 'A4451DESC1'
                });
                processorCombo.bindStore(store);
                processorCombo.setValue('');
                processorCombo.resumeEvents();
            }
        } catch (error) {
            console.error('Error loading processors:', error);
        }
    },

    createComboStore: function ({data, valueField, displayField}) {
        // Crea record vacío para "All"
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        
        // Limpia records de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        
        // Crea Store
        let store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
        
        // Inserta record vacío
        store.insert(0, allRecord);
        return store;
    },

    loadData: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-filtersForm').getForm();
        const grid = Ext.getCmp(prototype.idDE + '-grid');
        
        me.view.setLoading(true);
        
        try {
            const formData = form.getValues();
            
            // Formatear fechas si existen
            let dateFrom = '';
            let dateTo = '';
            if (formData.IN_DATE_FROM) {
                dateFrom = Ext.Date.format(formData.IN_DATE_FROM, 'Ymd');
            }
            if (formData.IN_DATE_TO) {
                dateTo = Ext.Date.format(formData.IN_DATE_TO, 'Ymd');
            }
            
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_TYPE_DATE: formData.IN_TYPE_DATE || '',
                IN_PRDA_FROM: dateFrom,
                IN_PRDA_TO: dateTo,
                IN_PNR: formData.IN_PNR || '',
                IN_AREFNBR: formData.IN_AREFNBR || '',
                IN_STATUS: formData.IN_STATUS || '',
                IN_PROCTYPESQ: formData.IN_PROCTYPESQ || ''
            };
 
            const store = await global.callStorePaggin('PRAXISMP', 'SQP05758', params);
            
            grid.setStore(store);
             
        } catch (error) {
            console.error('Error loading data:', error);
            global.Msg({msg: 'Error loading data'});
        } finally {
            me.view.setLoading(false);
        }
    },

    onChangeDate: function (field, newValue, oldValue) {
        // Validar que la fecha "to" sea mayor o igual a la fecha "from"
        const form = Ext.getCmp(prototype.idDE + '-filtersForm').getForm();
        const formData = form.getValues();
        
        if (formData.IN_DATE_FROM && formData.IN_DATE_TO) {
            const fromDate = new Date(formData.IN_DATE_FROM);
            const toDate = new Date(formData.IN_DATE_TO);
            
            if (toDate < fromDate) {
                global.Msg({msg: 'Date To must be greater than or equal to Date From'});
                field.setValue(oldValue);
                return false;
            }
        }
    },

    onFilterChange: function (field, newValue, oldValue) {
        // Se puede agregar lógica adicional si es necesario
    },

    updateDateFieldsVisibility: function () {
        const filterTypeDate = Ext.getCmp(prototype.idDE + '-filterTypeDate');
        const filterDateFrom = Ext.getCmp(prototype.idDE + '-filterDateFrom');
        const filterDateTo = Ext.getCmp(prototype.idDE + '-filterDateTo');
        
        if (filterTypeDate && filterDateFrom && filterDateTo) {
            const currentValue = filterTypeDate.getValue();
            if (currentValue === '' || currentValue === null) {
                // Si el valor inicial es "All", ocultar los campos
                filterDateFrom.hide();
                filterDateTo.hide();
            } else {
                // Si tiene un valor, mostrar los campos
                filterDateFrom.show();
                filterDateTo.show();
            }
        }
    },

    onFilterTypeDateChange: function (field, newValue, oldValue) {
        this.updateDateFieldsVisibility();
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
        const form = Ext.getCmp(prototype.idDE + '-filtersForm').getForm();
        
        // Limpiar formulario
        form.reset();
        
        // Establecer valores por defecto
        form.setValues({
            IN_CCUST: '139',
            IN_TYPE_DATE: '',
            IN_DATE_FROM: new Date(),
            IN_DATE_TO: new Date(),
            IN_AREFNBR: '',
            IN_PNR: '',
            IN_STATUS: 'P',
            IN_PROCTYPESQ: ''
        });
        
        // Actualizar visibilidad de campos de fecha después de limpiar
        this.updateDateFieldsVisibility();
    },

    onClickExportExcel: function () {
        const me = this;
        const notifier = new AWN();
        
        notifier.confirm(
            'Download Excel',
            () => {
                me.downloadExcel();
            },
            null
        );
    },

    downloadExcel: async function () {
        const me = this;
        const view = me.view;
        const form = Ext.getCmp(prototype.idDE + '-filtersForm').getForm();
        
        view.setLoading(true);
        
        try {
            const formData = form.getValues();
            
            // Formatear fechas si existen
            let dateFrom = '';
            let dateTo = '';
            if (formData.IN_DATE_FROM) {
                dateFrom = Ext.Date.format(formData.IN_DATE_FROM, 'Ymd');
            }
            if (formData.IN_DATE_TO) {
                dateTo = Ext.Date.format(formData.IN_DATE_TO, 'Ymd');
            }
            
            // Usar los mismos parámetros que en loadData
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_TYPE_DATE: formData.IN_TYPE_DATE || '',
                IN_PRDA_FROM: dateFrom,
                IN_PRDA_TO: dateTo,
                IN_PNR: formData.IN_PNR || '',
                IN_AREFNBR: formData.IN_AREFNBR || '',
                IN_STATUS: formData.IN_STATUS || '',
                IN_PROCTYPESQ: formData.IN_PROCTYPESQ || ''
            };

            // Obtener todos los datos sin paginación
            const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05758', params);
            
            let excelData = res.map((item, index) => ({
                'RN': index + 1,
                'Ref. Number': item.AREFNBR || '',
                'Processing Date': item.PRDA || '',
                'PNR': item.PNR || '',
                'Amount': item.AMOUNT || 0,
                'Processor': item.PROSQ_DESCRIPTION || '',
                'Status': item.STATUS_DESCRIPTION || '',
                'Error Code': item.ACERROR || '',
                'Error Description': item.ERROR_DESCRIPTION || '',
                'Created Date': item.FEAN || '',
                'Solved By': item.SOLVED_BY || '',
                'Solved Date': item.FEUP || '',
                'User Solved': item.USUP || ''
            }));

            await global.writeExcelFromJson(excelData, 'Analyze Reconciliation Errors');
            
        } catch (error) {
            console.error('Error exporting Excel:', error);
            global.Msg({msg: 'Error exporting data'});
        } finally {
            view.setLoading(false);
        }
    }
});
