Ext.define('Ext.Praxis.controller.payments.SalesComplement.AnalyzeReconciliationErrorsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AnalyzeReconciliationErrorsController',
    
    init: function (view) {
        const me = this;
        me.view = view;
    },

    afterRender: function () {
        const me = this;
        // Configurar visibilidad inicial de campos de fecha
        me.updateDateFieldsVisibility();
        // Cargar datos iniciales
        me.loadData();
    },

    loadData: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.idAnalyze + '-filtersForm').getForm();
        const grid = Ext.getCmp(prototype.idAnalyze + '-grid');
        
        me.view.setLoading(true);
        
        try {
            const formData = form.getValues();
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_TYPE_DATE: formData.IN_TYPE_DATE || '',
                IN_PRDA_FROM: formData.IN_DATE_FROM || '',
                IN_PRDA_TO: formData.IN_DATE_TO || '',
                IN_PNR: formData.IN_PNR || '',
                IN_TRANSACTID: formData.IN_PLUSGRAID || '',
                IN_STATUS: formData.IN_STATUS || '',
                IN_PROCTYPESQ: 'PLUSG00'
            };
 
            const store = await global.callStorePaggin('PRAXISMP', 'SQP05756', params);
            
            console.log("store", store); 

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
        const form = Ext.getCmp(prototype.idAnalyze + '-filtersForm').getForm();
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
        const filterTypeDate = Ext.getCmp(prototype.idAnalyze + '-filterTypeDate');
        const filterDateFrom = Ext.getCmp(prototype.idAnalyze + '-filterDateFrom');
        const filterDateTo = Ext.getCmp(prototype.idAnalyze + '-filterDateTo');
        
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
        // const filterDateFrom = Ext.getCmp(prototype.idAnalyze + '-filterDateFrom');
        // const filterDateTo = Ext.getCmp(prototype.idAnalyze + '-filterDateTo');
        
        // if (newValue === '' || newValue === null) {
        //     // Si se selecciona "All", ocultar los campos de fecha
        //     if (filterDateFrom) filterDateFrom.hide();
        //     if (filterDateTo) filterDateTo.hide();
        // } else {
        //     // Si se selecciona un tipo de fecha específico, mostrar los campos
        //     if (filterDateFrom) filterDateFrom.show();
        //     if (filterDateTo) filterDateTo.show();
        // }
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
        const form = Ext.getCmp(prototype.idAnalyze + '-filtersForm').getForm();
        const grid = Ext.getCmp(prototype.idAnalyze + '-grid');
        
        // Limpiar formulario
        form.reset();
        
        // Establecer valores por defecto
        form.setValues({
            IN_CCUST: '139',
            IN_DATE_FROM: new Date(),
            IN_DATE_TO: new Date(),
            IN_PLUSGRAID: '',
            IN_STATUS: ''
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
        const form = Ext.getCmp(prototype.idAnalyze + '-filtersForm').getForm();
        
        view.setLoading(true);
        
        try {
            const formData = form.getValues();
            
            // Usar los mismos parámetros que en loadData
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_TYPE_DATE: formData.IN_TYPE_DATE || '',
                IN_PRDA_FROM: formData.IN_DATE_FROM || '',
                IN_PRDA_TO: formData.IN_DATE_TO || '',
                IN_PNR: formData.IN_PNR || '',
                IN_TRANSACTID: formData.IN_PLUSGRAID || '',
                IN_STATUS: formData.IN_STATUS || '',
                IN_PROCTYPESQ: 'PLUSG00'
            };

            // Obtener todos los datos sin paginación
            const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05756', params);
            
            let excelData = res.map((item, index) => ({
                 'RN': index + 1,
                 'Plusgrade ID': item.TRANSACTID || '',
                 'Processing Date': item.PRDA || '',
                 'PNR': item.PNR || '',
                 'Amount': item.AMOUNT || 0,
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
