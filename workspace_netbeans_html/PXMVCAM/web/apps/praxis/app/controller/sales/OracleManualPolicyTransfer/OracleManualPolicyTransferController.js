Ext.define('Ext.Praxis.controller.sales.OracleManualPolicyTransfer.OracleManualPolicyTransferController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleManualPolicyTransferController',
    url: CONTEXTPATH + '/OracleManualPolicyTransfer',

    init: function (view) {
        const me = this;
    },

    afterRender: async function () {
        const me = this;
        // Precarga JSZip en segundo plano (lazy load) para que ya esté en cache
        // cuando el usuario abra la ventana de carga y de click en Procesar.
        global.loadScriptOnce(CONTEXTPATH + '/resources/js/JSZip/jszip.min.js').catch(function (e) {
            console.error('Error precargando JSZip', e);
        });
        await me.fillFilters();
    },

    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');

        filterPanel.mask('Loading Filters...');
        try {
            const response = await global.callStoreGet('PRAXIS', 'SQP06142', {});
            const {lstRs} = response;

            const dataModules = lstRs[0] || [];
            const dataStatuses = lstRs[1] || [];

            me.dataModules = dataModules;
            me.dataStatuses = dataStatuses;

            await global.setComboStore(Ext.getCmp(prototype.id + '-cmbModule'), dataModules, 'CODE', 'NAME', '', true);
            await global.setComboStore(Ext.getCmp(prototype.id + '-cmbStatus'), dataStatuses, 'CODE', 'NAME', '', true);

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

        mainPanel.removeAll();
        mainPanel.mask('Loading data...');

        try {
            const newGrid = Ext.create('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Grids.MainGrid', {
                id: prototype.id + '-MainGrid',
                searchParams: params
            });

            mainPanel.add(newGrid);

            me.loadMainGridData(newGrid, params);
        } catch (e) {
            console.error('Error creating grid:', e);
            global.Msg({msg: 'Error creating grid'});
        } finally {
            mainPanel.unmask();
        }
    },

    onClickClearBtn: function () {
        const me = this;
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        if (!filtro1) {
            return;
        }
        filtro1.getForm().reset();
    },

    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },

    onChangeFechaBtn: function (field, newValue, oldValue) {
        const fieldId = field.id;
        const option = fieldId.split('-').pop();

        const dateFrom = Ext.getCmp(prototype.id + '-dateFprocFrom');
        const dateTo = Ext.getCmp(prototype.id + '-dateFprocTo');

        const opts = {
            'dateFprocFrom': function () {
                if (newValue) {
                    dateTo.setValue(newValue);
                }
            },
            'dateFprocTo': function () {
                const fromValue = dateFrom.getValue();
                if (newValue && fromValue && newValue < fromValue) {
                    dateFrom.setValue(newValue);
                }
            }
        };

        if (opts[option]) {
            opts[option]();
        }
    },

    loadMainGridData: function (grid, params) {
        if (!grid) {
            return;
        }

        const spParams = {
            IN_CCUST: params.IN_CCUST || '139',
            IN_FPROC_FROM: params.IN_FPROC_FROM || '',
            IN_FPROC_TO: params.IN_FPROC_TO || '',
            IN_MODULE: params.IN_MODULE || '',
            IN_STATUS: params.IN_STATUS || ''
        };

        const store = global.callStorePaggin('PRAXIS', 'SQP06143', spParams);

        grid.bindStore(store);
        grid.setStore(store);
    },

    onClickUploadBtn: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDataEntry', {
            id: prototype.id + '-PolicyLoadDataEntry-1',
            dataModules: me.dataModules || []
        });
        dataEntry.show();
    },

});
