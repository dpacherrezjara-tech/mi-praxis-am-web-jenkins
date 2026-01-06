Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRulesController',
    modal: true,
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
        let sourceGrid = Ext.getCmp(prototype.id02 + '-gridDetails'); // LAS REGLAS
        let targetGrid = Ext.getCmp(prototype.id01 + '-gridDetails'); // LISTA DE REGLAS DEL AUDITOR
        var regs = targetGrid.getStore().getCount();

        let selected = sourceGrid.getSelection();
        let targetStore = targetGrid.getStore();


        console.log('selected', selected);
        //console.log('targetStore', targetStore);

        // Obtener el controlador padre
        let parentWin = Ext.getCmp(prototype.id01 + '-winMaintenance');
        let parentController = parentWin ? parentWin.getController() : null;

        Ext.each(selected, function (rec) {
            // console.log(rec.data.A4420COD);
            for (var i = 0; i < regs; i++) {
                console.log(targetStore.getAt(i).get('A4420COD'));
                if (targetStore.getAt(i).get('A4420COD') === rec.data.A4420COD) {
                    global.Msg({
                        msg: "EXISTS RECORD !", icon: 2, fn: function () {
                        }
                    });
                    return;
                }
            };

            let newRec = targetStore.add(rec.data)[0];
            //console.log('newrec', newRec);
            newRec.set('__isNew', true);

            // Actualizar dataUserRules en el controlador padre
            if (parentController) {
                if (!parentController.dataUserRules) {
                    parentController.dataUserRules = [];
                }
                parentController.dataUserRules.push(rec.data);
            }
        });

        if (regs == targetGrid.getStore().getCount()) {
            this.getView().close();
        }
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


    onAddNewRulesClick: function () {
        console.log('ADD NEW RULE');

        let source = Ext.getCmp(prototype.id02 + '-cmbSource').getValue();
        let channel = Ext.getCmp(prototype.id02 + '-cmbChannel').getValue();
        let trans = Ext.getCmp(prototype.id02 + '-cmbTrans').getValue();
        let fcmi = Ext.getCmp(prototype.id02 + '-cmbFcmi').getValue();
        let queq = Ext.getCmp(prototype.id02 + '-cmbQueq').getValue();
        let iata = Ext.getCmp(prototype.id02 + '-cmbIata').getValue();
        let menuUser = document.getElementById('menuUser').innerText;

        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'AG',
            IN_USER: '',
            IN_USERNEW: '',
            IN_NOMBRE: '',
            IN_COD: '',
            IN_FUENT: source,
            IN_CANAL: channel,
            IN_QUEQ: queq,
            IN_TRAS: trans,
            IN_IATA: iata,
            IN_FCMI: fcmi,
            IN_REGI: menuUser,
            IN_FREGI: actualdate,
            IN_HORA: horaSistema
        };

        console.log('paramsUser', paramsUser);

        global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser)
            .then(function () {
                store.sync();
                Ext.Msg.alert('Success', 'Add rules succesfull');
            })
            .catch(function () {
                Ext.Msg.alert('Error', 'Error add rules');
            });

        // this.onCloseClick();

        this.onGetRules();
    },



    onDeleteRuleClick: function (grid, rowIndex, colIndex, item, e, record) {
        let code = record.data.A4420COD;

        let menuUser = document.getElementById('menuUser').innerText;
        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'H:i:s');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'EG',
            IN_USER: '',
            IN_USERNEW: '',
            IN_NOMBRE: '',
            IN_COD: code,
            IN_FUENT: '',
            IN_CANAL: '',
            IN_QUEQ: '',
            IN_TRAS: '',
            IN_IATA: '',
            IN_FCMI: '',
            IN_REGI: menuUser,
            IN_FREGI: actualdate,
            IN_HORA: horaSistema
        };

        console.log('paramsUser', paramsUser)

        global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser)
            .then(function () {
                store.sync();
                Ext.Msg.alert('Success', 'Rule Deleted');
            })
            .catch(function () {
                Ext.Msg.alert('Error', 'Error deleted rule');
            });
        this.onCloseClick();

    },



});