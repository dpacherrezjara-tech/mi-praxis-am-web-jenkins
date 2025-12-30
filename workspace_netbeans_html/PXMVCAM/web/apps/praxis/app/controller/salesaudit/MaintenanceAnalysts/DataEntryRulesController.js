Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRulesController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MaintenanceAnalysts',
    A3406FALTA: '',

    init: function (view) {
        var me = this;
        console.log('DataEntryRulesController initialized');
    },


    afterRender: function () {
        console.log('render data entry rules');
        this.onGetRules();
        this.onGetData();

        let me = this;
        let param = me.view.params;
        console.log('param', param);

        if (param.action === 'U') {
            console.log('param.dataUserRules', param.dataUserRules);
            me.dataUserRules = param.dataUserRules;
            me.codeRuleOld = param.dataUserRules[0].A4420COD;
        }
    },

    onCloseClick: function (obj) {
        let win = Ext.getCmp(prototype.id02 + '-winRules');
        if (win) {
            win.close();
        }
    },

    onSaveClick: function () {

        let sourceGrid = Ext.getCmp(prototype.id02 + '-gridDetails');
        let targetGrid = Ext.getCmp(prototype.id01 + '-gridDetails');

        let selected = sourceGrid.getSelection();
        let targetStore = targetGrid.getStore();

        Ext.each(selected, function (rec) {
            let newRec = targetStore.add(rec.data)[0];
            newRec.set('__isNew', true);
        });

        this.getView().close();
    },



    generateNextCode: function (store) {
        let maxCode = 0;

        store.each(function (record) {
            let code = record.get('A4420COD');

            // Remover ceros a la izquierda antes de convertir
            let numericCode = parseInt(code, 10);

            if (!isNaN(numericCode) && numericCode > maxCode) {
                maxCode = numericCode;
            }
        });

        let nextCode = maxCode + 1;

        return String(nextCode).padStart(4, '0');
    },

    // onGetRules: async function () {
    //     let grid = Ext.getCmp(prototype.id02 + '-gridDetails');
    //     let store = grid.getStore();

    //     grid.setLoading(true);

    //     const params = {
    //         IN_CCUST: '139',
    //         IN_OPTION: '3',
    //         IN_VAR1: '',
    //         IN_VAR2: ''
    //     };

    //     let res = await global.callStoreGet('PXSAUDIT', 'SQP05872', params);

    //     let data = (res.lstRs && res.lstRs.length)
    //         ? res.lstRs[0]
    //         : [];

    //     data.forEach(r => r.__isNew = false);
    //     console.log('data --', data);

    //     store.loadData(data);

    //     grid.setLoading(false);
    // },

    onGetRules: async function () {
        let grid = Ext.getCmp(prototype.id02 + '-gridDetails');
        let store = grid.getStore();

        grid.setLoading(true);

        const params = {
            IN_CCUST: '139',
            IN_OPTION: '3',
            IN_VAR1: '',
            IN_VAR2: ''
        };

        let res = await global.callStoreGet('PXSAUDIT', 'SQP05872', params);

        let data = (res.lstRs && res.lstRs.length)
            ? res.lstRs[0]
            : [];

        data.forEach(r => r.__isNew = false);

        // Filtrar reglas que ya existen en dataUserRules (solo si viene en modo 'U')
        if (this.dataUserRules && this.dataUserRules.length) {
            const existingCodes = this.dataUserRules.map(r => r.A4420COD);
            data = data.filter(r => !existingCodes.includes(r.A4420COD));
        }

        console.log('data filtrada --', data);

        store.loadData(data);

        grid.setLoading(false);
    },

    onSourceChange: function (combo, newValue) {
        let cmbChannel = Ext.getCmp(prototype.id02 + '-cmbChannel');

        if (newValue === 'ASR') {
            cmbChannel.show();
            cmbChannel.allowBlank = false;
        } else {
            cmbChannel.reset();
            cmbChannel.hide();
            cmbChannel.allowBlank = true;
        }
    },

    onGetData: async function () {
        let param = this.getView().params.rec;

        let cmbSource = Ext.getCmp(prototype.id02 + '-cmbSource');
        let cmbChannel = Ext.getCmp(prototype.id02 + '-cmbChannel');
        let cmbTrans = Ext.getCmp(prototype.id02 + '-cmbTrans');



        cmbChannel.hide(); // oculto por defecto

        // stores
        cmbSource.setStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: 'ARC', name: 'ARC' },
                { code: 'BSP', name: 'BSP' },
                { code: 'ASR', name: 'ASR' }
            ]
        }));

        cmbChannel.setStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: '', name: 'All' },
                { code: 'ATO', name: 'ATO' },
                { code: 'CCT', name: 'CCT' },
                { code: 'CTO', name: 'CTO' },
                { code: 'WEB', name: 'WEB' },
                { code: 'FRA', name: 'FRA' }
            ]
        }));

        cmbTrans.setStore(Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data: [
                { code: '', name: 'All' },
                { code: 'EXCH', name: 'EXCH' },
                { code: 'SALE', name: 'SALE' }
            ]
        }));

        cmbSource.setValue("");
        cmbTrans.setValue("");
        cmbChannel.setValue("");

    },


});