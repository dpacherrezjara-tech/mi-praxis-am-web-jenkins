Ext.define('Ext.Praxis.controller.payments.SalesComplement.AnalyzeReconciliationErrorsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AnalyzeReconciliationErrorsController',
    
    init: function (view) {
        const me = this;
        me.view = view;
    },

    afterRender: function () {
        const me = this;
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
                IN_TYPE_DATE: 'PRDA',
                IN_PRDA_FROM: formData.IN_DATE_FROM,
                IN_PRDA_TO: formData.IN_DATE_TO,
                IN_PNR: '',
                TRANSACTID: formData.IN_PLUSGRAID || '',
                IN_STATUS: formData.IN_STATUS || '',
                IN_PROCTYPESQ: 'PLUSG00'
            };

            console.log('Params for SQP05756:', params);
            
            const store = await global.callStorePaggin('PRAXISMP', 'SQP05756', params);
            
            console.log("store", store); 

            grid.setStore(store);
            
            
            // if (res.lstRs && res.lstRs.length > 0) {

            //     const data = res.lstRs.at(0);
            //     console.table(data);
            //     grid.setStore(data);
                
            //     // Actualizar paging toolbar
            //     const pagingToolbar = Ext.getCmp(prototype.idAnalyze + '-pagingToolbar');
            //     if (pagingToolbar) {
            //         pagingToolbar.bindStore(store);
            //     }
                
            // } else {
            //     global.Msg({msg: 'No data found'});
            // }
            
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
        
        // Limpiar grilla
        grid.setStore(Ext.create('Ext.data.Store', {
            fields: [
                'PLUSGRAID', 'PRDA', 'MERCHID', 'COUNTRY', 'SDATE', 'PNR', 'EMDNUMBER',
                'SVFOP', 'STATUS', 'ERROR_CODE', 'ERROR_DESCRIPTION', 'RESOLUTION_DATE',
                'USER_RESOLVED', 'DAYS_PENDING', 'CREATED_DATE', 'UPDATED_DATE'
            ]
        }));
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
            const params = {
                IN_CCUST: formData.IN_CCUST || '139',
                IN_DATE_FROM: formData.IN_DATE_FROM,
                IN_DATE_TO: formData.IN_DATE_TO,
                IN_PLUSGRAID: formData.IN_PLUSGRAID || '',
                IN_STATUS: formData.IN_STATUS || ''
            };

            const res = await global.callStoreGet('PRAXISMP', 'SQP05755', params);
            
            if (res.lstRs && res.lstRs.length > 0) {
                const data = res.lstRs.at(0);
                
                const statusMap = {
                    'R': 'Resolved',
                    'P': 'Pending'
                };
                
                const excelData = data.map(item => ({
                    'Plusgrade ID': item.PLUSGRAID,
                    'Processing Date': item.PRDA,
                    'Merchant ID': item.MERCHID,
                    'Country': item.COUNTRY,
                    'Sale Date': item.SDATE,
                    'PNR': item.PNR,
                    'EMD Number': item.EMDNUMBER,
                    'Amount': item.SVFOP,
                    'Status': statusMap[item.STATUS] || item.STATUS,
                    'Error Code': item.ERROR_CODE,
                    'Error Description': item.ERROR_DESCRIPTION,
                    'Resolution Date': item.RESOLUTION_DATE,
                    'User Resolved': item.USER_RESOLVED,
                    'Days Pending': item.DAYS_PENDING,
                    'Created Date': item.CREATED_DATE,
                    'Updated Date': item.UPDATED_DATE
                }));
                
                await global.writeExcelFromJson(excelData, 'Analyze Reconciliation Errors');
                
            } else {
                global.Msg({msg: 'No data to export'});
            }
            
        } catch (error) {
            console.error('Error exporting Excel:', error);
            global.Msg({msg: 'Error exporting data'});
        } finally {
            view.setLoading(false);
        }
    }
});
