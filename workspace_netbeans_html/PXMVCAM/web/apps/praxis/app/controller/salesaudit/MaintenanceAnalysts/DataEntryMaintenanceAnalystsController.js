Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryMaintenanceAnalystsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMaintenanceAnalystsController',

    beanTMP: {},
    // urlWin01: CONTEXTPATH + '/MaintenanceAnalysts',

    init: function (view) {
    },

    afterRender: async function () {
        this.onGetRules();
        this.onGetData();
        this.onGetAction();
    },

    onGetAction: function () {
        let action = this.getView().params.action || 'C';
        let win = this.getView();

        if (action === 'C') {
            win.setTitle('Crear Nuevo Registro');
            Ext.getCmp(prototype.id01 + '-cmbSource').show();
            Ext.getCmp(prototype.id01 + '-cmbChannel').show();
            Ext.getCmp(prototype.id01 + '-panelControlData').hide();
        } else if (action === 'U') {
            win.setTitle('Editar Registro');
            Ext.getCmp(prototype.id01 + '-cmbSource').hide();
            Ext.getCmp(prototype.id01 + '-cmbChannel').hide();
            Ext.getCmp(prototype.id01 + '-panelControlData').show();
        }
    },


    onGetRules: async function () {
        let me = this;
        let param = me.view.params.rec;

        console.log('on get rules', param);

        let action = this.getView().params.action || 'C';

        if (action === 'U') {
            const user = param.data.A4886USER;

            let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
            let store = grid.getStore();

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
            console.log('data --', data);

            me.dataUserRules = data;

            store.loadData(data);
            grid.setLoading(false);
            return;
        }




    },


    onGetData: async function () {
        let param = this.getView().params.rec;

        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let cmbSource = Ext.getCmp(prototype.id01 + '-cmbSource');
        let cmbChannel = Ext.getCmp(prototype.id01 + '-cmbChannel');
        let cmbTrans = Ext.getCmp(prototype.id01 + '-cmbTrans');

        if (param && param.data) {
            form.setValues(param.data);
        } else {
            form.reset();
        }

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

        // EDIT
        if (param && param.data) {
            cmbSource.setValue(param.data.FUENTES);
            cmbTrans.setValue(param.data.A4420TRAS);

            if (param.data.FUENTES === 'ASR') {
                cmbChannel.show();
                cmbChannel.setValue(param.data.A4420CANAL);
            }
        }
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






    onCloseClick: function () {
        this.getView().close();
    },

    onAddDetailClick: function () {
        Ext.create('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryRules', {
            id: prototype.id02 + '-winRules',
            params: {
                action: 'U',
                dataUserRules: this.dataUserRules
            }
        }).show();
    },

    onDeleteDetailClick: function (grid, rowIndex) {
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

                let paramsUser = {
                    IN_CCUST: '139',
                    IN_OPCION: 'EC',
                    IN_USER: values.A4886USER || '',
                    IN_USERNEW: values.A4886USERNEW || '',
                    IN_NOMBRE: values.A4886DESCR || '',
                    IN_COD: rec.get('A4420COD') || '',
                    IN_FUENT: rec.get('A4420FUENT') || '',
                    IN_CANAL: rec.get('A4420CANAL') || '',
                    IN_QUEQ: rec.get('A4420QUEQ') || '',
                    IN_TRAS: rec.get('A4420TRAS') || '',
                    IN_IATA: rec.get('A4420IATA') || '',
                    IN_FCMI: rec.get('A4420FCMI') || '',
                    IN_REGI: values.A3406REGIS || values.A3406REVIS || '',
                    IN_FREGI: values.A3406FREGI || values.A3406FREVI || '',
                    IN_HORA: values.A3406HREGI || values.A3406HREVI || ''
                };

                global.callStorePost('PXSAUDIT', 'SQP05873', paramsUser)
                    .then(function () {
                        store.remove(rec);
                        Ext.Msg.alert('Success', 'Rule deleted');
                    })
                    .catch(function () {
                        Ext.Msg.alert('Error', 'Error deleting rule');
                    });
            }
        });
    },


    onSaveClick: function () {
        let form = Ext.getCmp(prototype.id01 + '-form').getForm();
        let values = form.getValues();
        let grid = Ext.getCmp(prototype.id01 + '-gridDetails');
        let store = grid.getStore();
        // if (!form.isValid()) {
        //     Ext.Msg.alert('Error', 'Please fill all required fields');
        //     return;
        // }

        /**  CRUD USUARIO
         * IN_OPCION =
            'I' -> I: Insertar
            'U'-> U: Actualizar
            'D' -> D: Desactivar
            'V' -> V: vacaciones
) 
         */

        let paramsUser = {
            IN_CCUST: '139',
            IN_OPCION: '2',
            IN_USER: values.A4886USER || '',
            IN_USERNEW: values.A4886USERNEW || '',
            IN_NOMBRE: values.A4886DESCR || '',
            IN_COD: values.txtcod || '',
            IN_FUENT: values.FUENTES || '',
            IN_CANAL: values.A4420CANAL || '',
            IN_QUEQ: values.A4420QUEQ || '',
            IN_TRAS: values.A4420TRAS || '',
            IN_IATA: values.A4420IATA || '',
            IN_FCMI: values.A4420FCMI || '',
            IN_REGI: values.A3406REGIS || values.A3406REVIS || '',
            IN_FREGI: values.A3406FREGI || values.A3406FREVI || '',
            IN_HORA: values.A3406HREGI || values.A3406HREVI || ''
        };

        console.log('paramsUser', paramsUser)

        // global.callStorePost('PXSAUDIT', 'SQP05872', params)
        //     .then(function () {
        //         store.sync();
        //         Ext.Msg.alert('Success', 'Rules saved');
        //     })
        //     .catch(function () {
        //         Ext.Msg.alert('Error', 'Error saving rules');
        //     });


        /** MANTENIMIENTO REGLAS
         * IN_OPCION =
         * 'EC' -> EC: Eliminar Cola
         * 
         */




    },



});