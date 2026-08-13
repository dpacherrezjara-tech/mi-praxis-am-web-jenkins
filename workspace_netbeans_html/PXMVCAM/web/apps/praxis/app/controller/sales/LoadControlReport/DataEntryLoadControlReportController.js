Ext.define('Ext.Praxis.controller.sales.LoadControlReport.DataEntryLoadControlReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLoadControlReportController',
    url: CONTEXTPATH + '/LoadControlReport',
    listeners: {
        afterrender: 'afterRender'
    },

    init: function (view) {
    },

    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        this.getData();
        me.view.setLoading(false);
    },

    getData: async function () {
        console.log('getData');
        const me = this;
        const txtReason = Ext.getCmp(prototype.idDE + '-txt-reason');

        txtReason.setReadOnly(false);
        txtReason.resetOriginalValue();
        txtReason.setValue('');


        const comentario = me.view.comentario;


        const titulo = `Comment - ${me.view.dia} ${me.view.fecha}`;
        me.view.setTitle(titulo);

        if (comentario) {
            txtReason.setValue(comentario.trim());
            Ext.getCmp(prototype.idDE + '-btn-create').hide();
            Ext.getCmp(prototype.idDE + '-btn-update').show();
        } else {
            Ext.getCmp(prototype.idDE + '-btn-create').show();
            Ext.getCmp(prototype.idDE + '-btn-update').hide();
        }
    },

    onUpdateClick: async function () {
        console.log('onUpdateClick');

        const me = this;
//        console.log('view.dayNum', me.view.dayNum)

        const row = me.view.rowData;

        const comment = Ext.getCmp(prototype.idDE + '-txt-reason').getValue();
//        console.log('Comentario ingresado:', comment);
        me.view.setLoading(true);


        const params = {
            IN_OPTION: 'U',
            IN_CCUST: '139',
            IN_FUENT: row.VP_FUEN,
            IN_PAIS: row.COUNTRY_CODE,
            IN_MDA: row.CURR,
            IN_FECHA: me.view.fecha,
            IN_STATUS: me.view.status,
            IN_DIA: me.view.dayNum,
            IN_DIAT: me.view.dia.trim(),
            IN_COMENT: comment,
        };

        console.log('params', params);

        try {
            let store = await global.callStoreGet('PRAXIS', 'SQP05804', params);
//            console.log(' data entry', store);

            const lstVals = store.lstVals;

            global.Msg({
                msg: lstVals.OUT_MESSAGE
            });

            this.view.close();

        } catch (e) {
            console.error(e);
        } finally {
            me.reloadGrid();
        }

    },
    reloadGrid: function () {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridData').getStore().load();

    },
    onCreateClick: async function () {
        console.log('onCreateClick');

        const me = this;
//        console.log('view.dayNum', me.view.dayNum)

        const row = me.view.rowData;

        const comment = Ext.getCmp(prototype.idDE + '-txt-reason').getValue();
//        console.log('Comentario ingresado:', comment);


        const params = {
            IN_OPTION: 'C',
            IN_CCUST: '139',
            IN_FUENT: row.VP_FUEN,
            IN_PAIS: row.COUNTRY_CODE,
            IN_MDA: row.CURR,
            IN_FECHA: me.view.fecha,
            IN_STATUS: me.view.status,
            IN_DIA: me.view.dayNum,
            IN_DIAT: me.view.dia.trim(),
            IN_COMENT: comment,
        };

        console.log('params', params);

        try {
            let store = await global.callStoreGet('PRAXIS', 'SQP05804', params);
            console.log(' data entry', store);

            const lstVals = store.lstVals;

            global.Msg({
                msg: lstVals.OUT_MESSAGE
            });

            this.view.close();

        } catch (e) {
            console.error(e);
        } finally {
            me.reloadGrid();
        }
    },

    onCancelClick: function () {
        this.view.close();
    },

});
