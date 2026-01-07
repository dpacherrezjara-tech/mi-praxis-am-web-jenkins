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

        this.onGetRules();
        this.onGetData();
        this.onGetAction();
    },

    reloadMainGrid: function () {
        let callback = this.view.callback;
        if (callback) {
            callback();
        }
    },


    onGetAction: function () {
        let action = this.getView().params.action || 'C';
        // console.log('action get action', action)
        let win = this.getView();

        let me = this;
        let param = me.view.params.rec.data
        console.log('params action get', param)


        if (action === 'C') {
            win.setTitle('Create');
            Ext.getCmp(prototype.id01 + '-btn-update').hide();
            Ext.getCmp(prototype.id01 + '-btn-save').show();
            Ext.getCmp(prototype.id01 + '-btn-disable').hide();
            Ext.getCmp(prototype.id01 + '-btn-vacation').hide();

        } else if (action === 'U') {
            win.setTitle('Edit');
            Ext.getCmp(prototype.id01 + '-btn-update').show();
            Ext.getCmp(prototype.id01 + '-btn-save').hide();
            Ext.getCmp(prototype.id01 + '-btn-disable').show();
            Ext.getCmp(prototype.id01 + '-btn-vacation').show();

            console.log('status', param.A4886FLAG);

            if (param.A4886FLAG === 'ACTIVE') {
                Ext.getCmp(prototype.id01 + '-btn-disable').show();
                Ext.getCmp(prototype.id01 + '-btn-vacation').show();
            } else if (param.A4886FLAG === 'DISABLED') {
                Ext.getCmp(prototype.id01 + '-btn-disable').hide();
                Ext.getCmp(prototype.id01 + '-btn-vacation').show();
            } else if (param.A4886FLAG === 'ON VACTION') {
                Ext.getCmp(prototype.id01 + '-btn-disable').show();
                Ext.getCmp(prototype.id01 + '-btn-vacation').hide();
            }

        }
    },


    onGetRules: async function () {
        let me = this;
        let param = me.view.params.rec;
        // console.log('param get rules', param)
        let action = this.getView().params.action || 'C';

        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();

        if (action === 'U') {
            // console.log('param.data.A4886USER', param.data.A4886USER)
            const user = param.data.A4886USER.trim();

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
        // console.log('param get data', param)

        let form = Ext.getCmp(prototype.id01 + '-form').getForm();

        if (param && param.data) {
            form.setValues(param.data);
        } else {
            form.reset();
        }

    },




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

        Ext.Msg.confirm('Confirm', 'Delete this rule?', async function (btn) {
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

                try {
                    await global.callStorePost('PXSAUDIT', 'SQP05873', paramsRuleUser);
                    store.remove(rec);
                    Ext.Msg.alert('Success', 'Rule deleted');
                } catch (error) {
                    Ext.Msg.alert('Error', 'Error deleting rule');

                }
                // this.onGetData();
            }
        });
    },

    onSaveClick: async function () {
        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let values = form.getValues();
        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();

        console.log('rules', store);

        if (!values.A4886USER || values.A4886USER.trim() === '') {
            Ext.Msg.alert('Validation', 'The Auditor field is required.');
            return;
        }

        if (!values.A4886DESCR || values.A4886DESCR.trim() === '') {
            Ext.Msg.alert('Validation', 'The Name field is required.');
            return;
        }

        if (store.getCount() === 0) {
            Ext.Msg.alert('Validation', 'You must add at least one rule.');
            return;
        }


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
                IN_USER: values.A4886USER.trim() || '',
                IN_USERNEW: values.A4886USERNEW.trim() || '',
                IN_NOMBRE: values.A4886DESCR.trim() || '',
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

            try {
                await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
                // store.sync();
                Ext.Msg.alert('Success', 'User saved');

                this.onGetRules();
                this.reloadMainGrid();

            } catch (error) {
                Ext.Msg.alert('Error', 'Error saving user');
                return;
            }

            //  Actualizacion usuaeio 
        } else if (action === 'U') {

            let userOld = values.A4886USER || ''

            let paramsUser = {
                IN_CCUST: '139',
                IN_OPCION: 'U',
                IN_USER: values.A4886USER.trim() || '',
                IN_USERNEW: userOld,
                IN_NOMBRE: values.A4886DESCR.trim() || '',
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

            try {
                await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
                // store.sync();
                Ext.Msg.alert('Success', 'User Updated');

                this.onGetRules();
                // this.onCloseClick();
                this.reloadMainGrid();

            } catch (error) {
                Ext.Msg.alert('Error', 'Error updated user');
                return;
            }

        }


    },


    // Desactivar usuario
    onDisableAuditorClick: async function () {
        console.log('desactivar');
        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let values = form.getValues();

        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'D',
            IN_USER: values.A4886USER.trim() || '',
            IN_USERNEW: '',
            IN_NOMBRE: values.A4886DESCR.trim() || '',
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

        try {
            await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
            // store.sync();
            Ext.Msg.alert('Success', 'User Disabled');

            // this.onGetRules();
            this.onCloseClick();
            this.reloadMainGrid();

        } catch (error) {
            Ext.Msg.alert('Error', 'Error disabled user');
            return;
        }

    },

    // vacaciones click
    onVacationClick: async function () {
        console.log('vacaciones');
        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let values = form.getValues();

        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        let horaSistema = Ext.Date.format(new Date(), 'His');

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: 'V',
            IN_USER: values.A4886USER.trim() || '',
            IN_USERNEW: '',
            IN_NOMBRE: values.A4886DESCR.trim() || '',
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

        try {
            await global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser);
            // store.sync();
            Ext.Msg.alert('Success', 'User Disabled');

            // this.onGetRules();
            this.onCloseClick();
            this.reloadMainGrid();

        } catch (error) {
            Ext.Msg.alert('Error', 'Error disabled user');
            return;
        }

    },

});