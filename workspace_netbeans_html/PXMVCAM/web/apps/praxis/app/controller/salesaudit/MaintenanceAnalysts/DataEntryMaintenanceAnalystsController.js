Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryMaintenanceAnalystsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMaintenanceAnalystsController',
    closeAction: 'destroy',
    beanTMP: {},
    // urlWin01: CONTEXTPATH + '/MaintenanceAnalysts',

    init: function (view) {
    },

    afterRender: async function () {
        let action = this.getView().params.action || 'C';

        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        if (action === 'C' && grid) {
            grid.getStore().removeAll(true);
            grid.getStore().commitChanges();
            this.dataUserRules = [];
        }

        // usuario logueado
        let menuUser = document.getElementById('menuUser').innerText;

        this.onGetRules();
        this.onGetData();
        this.onGetAction();
    },


    onGetAction: function () {
        let action = this.getView().params.action || 'C';
        console.log('action get action', action)
        let win = this.getView();

        if (action === 'C') {
            win.setTitle('Create');
            // this.resetCreateView();
            // Ext.getCmp(prototype.id01 + '-cmbSource').show();
            // Ext.getCmp(prototype.id01 + '-cmbChannel').show();
            Ext.getCmp(prototype.id01 + '-panelControlData').hide();

            Ext.getCmp(prototype.id01 + '-btn-update').hide();
            Ext.getCmp(prototype.id01 + '-btn-save').show();
            Ext.getCmp(prototype.id01 + '-btn-disable').hide();
            Ext.getCmp(prototype.id01 + '-btn-vacation').hide();

        } else if (action === 'U') {
            win.setTitle('Edit');
            // Ext.getCmp(prototype.id01 + '-cmbSource').hide();
            // Ext.getCmp(prototype.id01 + '-cmbChannel').hide();
            Ext.getCmp(prototype.id01 + '-panelControlData').show();

            Ext.getCmp(prototype.id01 + '-btn-update').show();
            Ext.getCmp(prototype.id01 + '-btn-save').hide();
            Ext.getCmp(prototype.id01 + '-btn-disable').show();
            Ext.getCmp(prototype.id01 + '-btn-vacation').show();

        }
    },


    onGetRules: async function () {
        let me = this;
        let param = me.view.params.rec;
        let action = this.getView().params.action || 'C';

        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();

        if (action === 'U') {
            const user = param.data.A4886USER;

            grid.setLoading(true);

            const params = {
                IN_CCUST: '139',
                IN_OPTION: '4',
                IN_VAR1: user,
                IN_VAR2: ''
            };

            let res = await global.callStoreGet('PXSAUDIT', 'SQP05872', params);

            let data = (res.lstRs && res.lstRs.length)
                ? res.lstRs[0]
                : [];

            data.forEach(r => r.__isNew = false);

            me.dataUserRules = data;
            store.loadData(data);

            grid.setLoading(false);
            return;
        }

        store.removeAll(true);
        store.commitChanges();
        this.dataUserRules = [];
    },


    onGetData: async function () {
        let param = this.getView().params.rec;

        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let cmbSource = Ext.getCmp(prototype.id01 + '-cmbSource');
        // let cmbChannel = Ext.getCmp(prototype.id01 + '-cmbChannel');
        // let cmbTrans = Ext.getCmp(prototype.id01 + '-cmbTrans');

        if (param && param.data) {
            form.setValues(param.data);
        } else {
            form.reset();
        }

        // cmbChannel.hide(); // oculto por defecto

        // stores
        // cmbSource.setStore(Ext.create('Ext.data.Store', {
        //     fields: ['code', 'name'],
        //     data: [
        //         { code: 'ARC', name: 'ARC' },
        //         { code: 'BSP', name: 'BSP' },
        //         { code: 'ASR', name: 'ASR' }
        //     ]
        // }));

        // cmbChannel.setStore(Ext.create('Ext.data.Store', {
        //     fields: ['code', 'name'],
        //     data: [
        //         { code: '', name: 'All' },
        //         { code: 'ATO', name: 'ATO' },
        //         { code: 'CCT', name: 'CCT' },
        //         { code: 'CTO', name: 'CTO' },
        //         { code: 'WEB', name: 'WEB' },
        //         { code: 'FRA', name: 'FRA' }
        //     ]
        // }));

        // cmbTrans.setStore(Ext.create('Ext.data.Store', {
        //     fields: ['code', 'name'],
        //     data: [
        //         { code: '', name: 'All' },
        //         { code: 'EXCH', name: 'EXCH' },
        //         { code: 'SALE', name: 'SALE' }
        //     ]
        // }));

        // if (param && param.data) {

        //     // SOURCE
        //     cmbSource.setValue(param.data.FUENTES);

        //     // TRANSACTION
        //     let transValue = param.data.A4420TRAS;
        //     cmbTrans.setValue(transValue !== null && transValue !== undefined ? transValue : '');

        //     // CHANNEL
        //     if (param.data.FUENTES === 'ASR') {
        //         cmbChannel.show();

        //         let channelValue = param.data.A4420CANAL;
        //         cmbChannel.setValue(channelValue !== null && channelValue !== undefined ? channelValue : '');
        //     }
        // }
    },


    // onSourceChange: function (combo, newValue) {
    //     let cmbChannel = Ext.getCmp(prototype.id01 + '-cmbChannel');

    //     if (newValue === 'ASR') {
    //         cmbChannel.show();
    //         cmbChannel.allowBlank = false;
    //     } else {
    //         cmbChannel.reset();
    //         cmbChannel.hide();
    //         cmbChannel.allowBlank = true;
    //     }
    // },



    onCloseClick: function () {
        this.getView().close();
    },

    onAddDetailClick: function () {
        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();

        this.dataUserRules = [];
        store.each(function (record) {
            this.dataUserRules.push(record.data);
        }, this);

        Ext.create('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryRules', {
            params: {
                action: 'C',
                dataUserRules: this.dataUserRules || []
            }
        }).show();

    },

    onDeleteRuleAuditorClick: function (grid, rowIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        if (rec.get('__isNew')) {
            store.remove(rec);
            return;
        }

        Ext.Msg.confirm('Confirm', 'Delete this rule?', function (btn) {
            if (btn === 'yes') {
                let form = Ext.getCmp(prototype.id01 + '-form').getForm();
                let values = form.getValues();

                let menuUser = document.getElementById('menuUser').innerText;

                const actualdate = Ext.Date.format(new Date(), 'Ymd');
                let horaSistema = Ext.Date.format(new Date(), 'His');

                let paramsRuleUser = {
                    IN_CCUST: '139',
                    IN_OPCION: 'EC',
                    IN_USER: '',
                    IN_USERNEW: '',
                    IN_NOMBRE: '',
                    IN_COD: rec.get('A4420COD') || '',
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
                console.log('paramsRuleUser', paramsRuleUser)

                global.callStorePost('PXSAUDIT', 'SQP05873', paramsRuleUser)
                    .then(function () {
                        store.remove(rec);
                        Ext.Msg.alert('Success', 'Rule deleted');
                    })
                    .catch(function () {
                        Ext.Msg.alert('Error', 'Error deleting rule');
                    });

                // this.onGetData();
            }
        });
    },

    onSaveClick: function () {
        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let values = form.getValues();
        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();

        console.log('rules', store);
        let rulesList = [];

        store.each(function (record) {
            let cod = record.get('A4420COD');
            if (cod !== null && cod !== undefined && cod !== '') {
                rulesList.push(cod);
            }
        });

        console.log('rulesList', rulesList);

        let codesString = rulesList.join('|');
        console.log('codesString', codesString);

        let action = this.getView().params.action || 'C';
        let win = this.getView();

        console.log('save', action)
        let menuUser = document.getElementById('menuUser').innerText;

        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');


        // creacion usuario
        if (action === 'C') {
            let paramsUser = {
                IN_CCUST: '139',
                IN_OPCION: 'I',
                IN_USER: values.A4886USER || '',
                IN_USERNEW: values.A4886USERNEW || '',
                IN_NOMBRE: values.A4886DESCR || '',
                IN_COD: codesString || '',
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
                    Ext.Msg.alert('Success', 'User saved');
                })
                .catch(function () {
                    Ext.Msg.alert('Error', 'Error saving user');
                });
            // this.onCloseClick();

            //  Actualizacion usuaeio 
        } else if (action === 'U') {

            let userOld = values.A4886USER || ''

            let paramsUser = {
                IN_CCUST: '139',
                IN_OPCION: 'U',
                IN_USER: values.A4886USER || '',
                IN_USERNEW: userOld,
                IN_NOMBRE: values.A4886DESCR || '',
                IN_COD: codesString || '',
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
                    Ext.Msg.alert('Success', 'User Updated');
                })
                .catch(function () {
                    Ext.Msg.alert('Error', 'Error updated user');
                });

            this.onGetData();
            // this.onCloseClick();

        }


    },


    // Desactivar usuario
    onDisableAuditorClick: function () {
        console.log('desactivar');
        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'D',
            IN_USER: values.A4886USER || '',
            IN_USERNEW: userOld,
            IN_NOMBRE: values.A4886DESCR || '',
            IN_COD: '',
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
                Ext.Msg.alert('Success', 'User Disabled');
            })
            .catch(function () {
                Ext.Msg.alert('Error', 'Error disabled user');
            });
        this.onCloseClick();

    },

    // vacaciones click
    onVacationClick: function () {
        console.log('vacaciones');
        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'V',
            IN_USER: values.A4886USER || '',
            IN_USERNEW: userOld,
            IN_NOMBRE: values.A4886DESCR || '',
            IN_COD: '',
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
                Ext.Msg.alert('Success', 'User Disabled');
            })
            .catch(function () {
                Ext.Msg.alert('Error', 'Error disabled user');
            });
        this.onCloseClick();

    },

});