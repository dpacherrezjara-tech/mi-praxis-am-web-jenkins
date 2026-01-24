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
            const dataProcessors = lstRs[2] || [];          // PROCESSORS - Result Set 1
            const dataComplements = lstRs[3] || [];         // COMPLEMENTS - Result Set 2
            const dataErrors = lstRs[4] || [];              // ERRORS - Result Set 3

            const nexDatetAccounting = lstVals.IO_NEXT_DATE_ACCOUNTING;
            const dateCalendarExist = lstVals.IO_DATE_CALENDAR_EXISTS;

            // Guardar datos en variables me. para uso en DataEntry y otros componentes
            me.dataAccountingProcessor = dataAccountingProcessor;
            me.dataProcessors = dataProcessors;
            me.dataComplements = dataComplements;
            me.dataErrors = dataErrors;
            me.nexDatetAccounting = nexDatetAccounting;
            me.dateCalendarExist = dateCalendarExist;

            // Actualizar combos
            me.setComboStore({ 
                cmp: Ext.getCmp(prototype.id + '-cmbAccountingModule'),
                data: dataAccountingProcessor,   
                valueField: 'CODE', 
                displayField: 'DESCRIPTION',   
                value: '', 
                addValueAll: true });
            
            // Parsear el string YYYYMMDD a objeto Date
            const accountingDate = Ext.Date.parse(nexDatetAccounting, 'Ymd');
            if (accountingDate) {
                dateAccountingFrom.setValue(accountingDate);
                dateAccountingTo.setValue(accountingDate);
            } else {
                console.warn('No se pudo parsear la fecha:', nexDatetAccounting);
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
            nexDatetAccounting: me.nexDatetAccounting || '',
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
            nexDatetAccounting: me.nexDatetAccounting || ''
        });
        dataEntry.show();
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