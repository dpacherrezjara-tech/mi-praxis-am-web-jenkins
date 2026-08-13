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
        console.log('onsaveclick')
        let sourceGrid = Ext.getCmp(prototype.id02 + '-gridDetails'); // LAS REGLAS
        let targetGrid = Ext.getCmp(prototype.id01 + '-gridDetails'); // LISTA DE REGLAS DEL AUDITOR
        var regs = targetGrid.getStore().getCount();

        let selected = sourceGrid.getSelection();
        let targetStore = targetGrid.getStore();


        console.log('selected', selected);
        console.log('targetStore', targetStore);

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
            cmbChannel.setValue('');
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
                { code: '', name: 'Select' },
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


    onAddNewRulesClick: async function (btn, e) {
        console.log('=== ADD NEW RULE ===');

        if (e) {
            e.stopPropagation();
        }

        let source = Ext.getCmp(prototype.id02 + '-cmbSource').getValue();
        let channel = Ext.getCmp(prototype.id02 + '-cmbChannel').getValue();
        let trans = Ext.getCmp(prototype.id02 + '-cmbTrans').getValue();
        let fcmi = Ext.getCmp(prototype.id02 + '-cmbFcmi').getValue();
        let queq = Ext.getCmp(prototype.id02 + '-cmbQueq').getValue();
        let iata = Ext.getCmp(prototype.id02 + '-cmbIata').getValue();

        console.log('Valores:', { source, channel, trans, fcmi, queq, iata });

        if (!source) {
            Ext.Msg.alert('Validation', 'Please select a Source');
            return;
        }

        if (iata && iata.trim() !== '' && iata.trim().length !== 10) {
            Ext.Msg.alert('Validation', 'Iata must be exactly 10 characters or empty');
            return;
        }

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
            IN_FUENT: (source || '').trim(),
            IN_CANAL: (channel || '').trim(),
            IN_QUEQ: (queq || '').trim(),
            IN_TRAS: (trans || '').trim(),
            IN_IATA: (iata || '').trim(),
            IN_FCMI: (fcmi || '').trim(),
            IN_REGI: menuUser,
            IN_FREGI: actualdate,
            IN_HORA: horaSistema
        };

        console.log('Params:', paramsUser);

        try {
            let result = await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
            console.log('Resultado:', result);

            // Extraer los datos
            let data = result.data || result; // Por si acaso viene directo o dentro de .data

            // Verificar si fue exitoso
            if (data && data.lstRs && data.lstRs[0] && data.lstRs[0][0]) {
                let response = data.lstRs[0][0];
                if (response.VSQLCODE === 0) {
                    // Éxito - recargar el grid
                    await this.onGetRules();

                    // Limpiar los campos
                    Ext.getCmp(prototype.id02 + '-cmbSource').reset();
                    Ext.getCmp(prototype.id02 + '-cmbChannel').reset();
                    Ext.getCmp(prototype.id02 + '-cmbTrans').reset();
                    Ext.getCmp(prototype.id02 + '-cmbFcmi').reset();
                    Ext.getCmp(prototype.id02 + '-cmbQueq').reset();
                    Ext.getCmp(prototype.id02 + '-cmbIata').reset();

                    Ext.Msg.alert('Success', 'Rule added successfully');
                } else {
                    // Error del servidor
                    Ext.Msg.alert('Error', 'Error adding rule');
                }
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('Error:', error);
            Ext.Msg.alert('Error', 'Error adding rule: ' + (error.message || error));
        }
    },



    onDeleteRuleClick: async function (grid, rowIndex, colIndex, item, e, record) {
        let me = this;
        let code = record.data.A4420COD;

        // Preguntar antes de eliminar
        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this rule?', async function (btn) {
            if (btn === 'yes') {
                let menuUser = document.getElementById('menuUser').innerText;
                const actualdate = Ext.Date.format(new Date(), 'Ymd');
                let horaSistema = Ext.Date.format(new Date(), 'His');

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

                console.log('paramsUser', paramsUser);

                try {
                    await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
                    Ext.Msg.alert('Success', 'Rule Deleted');
                    await me.onGetRules();
                } catch (error) {
                    Ext.Msg.alert('Error', 'Error deleted rule');
                }
            }
        });
    },



});