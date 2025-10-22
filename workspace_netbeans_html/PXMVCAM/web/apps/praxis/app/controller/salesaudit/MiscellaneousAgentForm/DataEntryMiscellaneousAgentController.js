Ext.define('Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.DataEntryMiscellaneousAgentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMiscellaneousAgentController',
    url: CONTEXTPATH + '/DataEntryMiscellaneousAgent',
    listeners: {
        afterrender: 'afterRender'
    },

    init: function (view) {
        // Por ahora vacío
    },

    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);

        console.log('me.view RENDER', me.view)
        console.log('view.option', me.view.option)

        const isUpdate = me.view.option === 'U';
        const isCreate = me.view.option === 'C';
        const title = me.view.title


        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        const btnCreate = Ext.getCmp(prototype.idDE + '-btn-create');


        if (isUpdate) {
            me.view.setTitle('Edit');
            btnUpdate.setText('Update');
            btnUpdate.setVisible(true);
            btnCreate.setVisible(false);
            Ext.getCmp(prototype.idDE + '-key1')?.setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-key2')?.setReadOnly(true);
            Ext.getCmp(prototype.idDE + '-key3')?.setReadOnly(true);
            await me.getData(me.view);
        } else if (isCreate) {
            me.view.setTitle('Create');
            btnUpdate.setText('Create');
            btnCreate.setVisible(true);
            btnUpdate.setVisible(false);
            Ext.getCmp(prototype.idDE + '-key1')?.setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-key2')?.setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-key3')?.setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-Status')?.setValue('1');
        } else {
            await me.getData(me.view);
        }


        me.view.setLoading(false);
    },

    getData: async function (view) {
        try {
            console.log('getData', view)



            const res = await global.callStoreGet('PXSAUDIT', 'SQP05648', view.searchParams);
            console.log('res data entry', res)

            const data = res.lstRs?.at(0)?.at(0) || {};
            console.log('data getData DATA ENTRY', data);
//        

            // Guarda para el update
            this.ticketData = data;

//            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
//            console.log('entry form', form)
//            form.setValues(data);
            const form = Ext.getCmp(prototype.idDE + '-informationForm')
            form.getForm().setValues(
                    Object.fromEntries(
                            Object.entries(data).map(([k, v]) => [k, typeof v === 'string' ? v.trimEnd() : v])
                            )
                    );

            const statusField = Ext.getCmp(prototype.idDE + '-Status');
            if (statusField) {
                statusField.setValue(data.A4593STS?.trim());
                statusField.setFieldStyle('background-color: #EEF3F9; text-align:center; font-weight:bold;');
            }

        } catch (e) {
            console.log(e);
        }
    },

    onUpdateClick: async function () {
        const me = this;
        const view = me.getView();

        console.log('update view', view)
        if (view)
            view.setLoading(true);

        view.setLoading(true);

        const option = view.option;

        try {
            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            const values = form.getValues();

            const {
                A4593KEY1, A4593KEY2, A4593KEY3,
                A4593DESC1, A4593DESC2, A4593STS,
                A4593COMEN, A4593USCR, A4593TSCR,
                A4593USUP, A4593TSUP
            } = values;

            const params = {
                IN_A4593KEY1: A4593KEY1,
                IN_A4593KEY2: A4593KEY2,
                IN_A4593KEY3: A4593KEY3,
                IN_A4593DESC1: A4593DESC1,
                IN_A4593DESC2: A4593DESC2,
                IN_A4593STS: A4593STS,
                IN_A4593COMEN: A4593COMEN,
                IN_A4593USCR: A4593USCR,
                IN_A4593TSCR: A4593TSCR,
                IN_A4593USUP: A4593USUP,
                IN_A4593TSUP: A4593TSUP,
                IN_A4593CCUST: '139',
                IN_OPTION: option
            };

            console.log('Params para guardar:', params);
            const res = await global.callStorePost('PXSAUDIT', 'SQP05402', params);
            const {lstVals} = res.data;

            new AWN().success(lstVals.OUT_MSG);
            view.close();

        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {

            console.log('view.callback', view.callback)
            view.setLoading(false);
            if (typeof view.callback === 'function') {
                view.callback();
            }
//            if (typeof view.callback === 'function') {
//                view.callback();
//            }
        }

    },

    onCreateClick: async function () {
        const me = this;
        const view = me.getView();

        console.log('onCreateClick')
//        me.view.setLoading(true);

        console.log('view.setLoading', view?.loading);

        if (view)
            view.setLoading(true);

        const option = me.view.option


        try {
            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            console.log('form', form);
            console.log('VALUES', form.getValues())

//            const fechaActual = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
//            console.log('fecha Actual', fechaActual)

            const values = form.getValues()
//            const form = this.lookupReference('informationForm').getForm();
//            const selectedStatus = form.getValues().proceedStatus;
//            
            const {
                A4593KEY1,
                A4593KEY2,
                A4593KEY3,
                A4593DESC1,
                A4593DESC2,
                A4593STS,
                A4593COMEN,
                A4593USCR,
                A4593TSCR,
                A4593USUP,
                A4593TSUP
            } = values;

//
            const params = {
                IN_A4593KEY1: A4593KEY1,
                IN_A4593KEY2: A4593KEY2,
                IN_A4593KEY3: A4593KEY3,
                IN_A4593DESC1: A4593DESC1,
                IN_A4593DESC2: A4593DESC2,
                IN_A4593STS: A4593STS,
                IN_A4593COMEN: A4593COMEN,
                IN_A4593USCR: A4593USCR,
                IN_A4593TSCR: A4593TSCR,
                IN_A4593USUP: A4593USUP,
                IN_A4593TSUP: A4593TSUP,
                IN_A4593CCUST: '139',
                IN_OPTION: option
            };
//
            console.log('Params para guardar:', params);
            const res = await global.callStorePost('PXSAUDIT', 'SQP05402', params);
            const {lstVals} = res.data;
            new AWN().success(lstVals.OUT_MSG);
//            this.view.close();
            if (view)
                view.close();

        } catch (e) {
            console.log(e);
            new AWN().alert('Error');
        } finally {
            view.setLoading(false);
            if (typeof view.callback === 'function') {
                view.callback();
            }

//            if (view && !view.destroyed) {
//                view.setLoading(false);
//                if (typeof view.callback === 'function') {
//                    view.callback();
//                }
//            }
        }

    },

    onCancelClick: function () {
        this.view.close();
    },

    onDeleteClick: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        console.log('onDeleteClick', record.data)
//        const k1 = record.data.a4451key1;
//        const k2 = record.data.a4451key2;
//        const k3 = record.data.a4451key3;

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.deleteIATA(record.data);
                        }
                    }
                });

    },

    deleteIATA: async function (e) {
        const me = this;
        let params = {
            IN_A4593CCUST: e.A4593CCUST,
            IN_A4593KEY1: e.A4593KEY1,
            IN_A4593KEY2: e.A4593KEY2,
            IN_A4593KEY3: e.A4593KEY3,
            IN_A4593DESC1: e.A4593DESC1,
            IN_A4593DESC2: e.A4593DESC2,
            IN_A4593COMEN: e.A4593COMEN,
            IN_A4593STS: e.A4593STS,
            IN_OPTION: 'D'
        };

        const res = await global.callStorePost('PXSAUDIT', 'SQP05402', params);

        const {lstVals} = res.data;
        new AWN().success(lstVals.OUT_MSG);
//
//        if (res.ok) {
//            global.Msg({msg: 'Deleted Successfull'});
//            Ext.getCmp(prototype.id + '-MiscellaneousAgent').getStore().load();
//        } else {
//            global.Msg({
//                msg: 'Error'
//            });
//        }
    },

});
