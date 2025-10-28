Ext.define('Ext.Praxis.controller.sales.OdvCitys.DataEntryOdvCitysController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryOdvCitysController',
    url: CONTEXTPATH + '/DataEntryOdvCitys',

    init: function (view) {
        const me = this;
        const destinationCode = Ext.getCmp(prototype.idDE + '-txtCATTO');
        const cityCode = Ext.getCmp(prototype.idDE + '-txtCCITY');
        const countryCode = Ext.getCmp(prototype.idDE + '-txtCPAIS');

//        console.log('destinationCode',destinationCode)

        if (destinationCode) {
            if (me.view.option === 'C') {
                Ext.getCmp(prototype.idDE + '-btn-update').hide();
                Ext.getCmp(prototype.idDE + '-btn-delete').hide();
                destinationCode.setReadOnly(false);
                cityCode.setReadOnly(false);
                countryCode.setReadOnly(false);
            } else if (me.view.option === 'U') {
                Ext.getCmp(prototype.idDE + '-btn-create').hide();
                destinationCode.setReadOnly(true);
                cityCode.setReadOnly(true);
                countryCode.setReadOnly(true);
            }
        }
    },

    afterRender: async function () {
        const me = this;
//        console.log('record', me);

        me.view.setLoading(true);
        await me.getData(me.view);
        me.view.setLoading(false);
    },

    getData: async function (view) {
        try {

            if (view.option === 'U') {
                Ext.getCmp(prototype.idDE + '-DataEntryFormOdv').getForm().setValues(view.record);
            }

        } catch (e) {
            console.error(e);
        }
    },

    onUpdateClick: async function () {
        const me = this;

        try {

            const form = Ext.getCmp(prototype.idDE + '-DataEntryFormOdv').getForm();

            if (!form.isValid()) {
                global.Msg({msg: 'Please fill all mandatory fields before saving.'});
                return;
            }


            me.view.setLoading(true);
            const data = form.getValues();
            console.log('data', data);
            const params = {
                IN_OPTION: 'U',
                IN_CCUST: '139',
                IN_CATTO: data.A2936CATTO,
                IN_CCITY: data.A2936CCITY,
                IN_NCITY: data.A2936NCITY,
                IN_NATTO: data.A2936NATTO,
                IN_CPAIS: data.A2936CPAIS,
                IN_NPAIS: data.A2936NPAIS,
                IN_IDZON: data.A2936IDZON,
                IN_NZONE: data.A2936NZONE,
                IN_CREGI: data.A2936CREGI,
                IN_NREGI: data.A2936NREGI,
                IN_CSREG: data.A2936CSREG,
                IN_NCSRG: data.A2936NCSRG,
                IN_IDHUB: data.A2936IDHUB,
                IN_GATTO: data.A2936GATTO,
                IN_INGRE: data.A2936INGRE,
                IN_FINGR: data.A2936FINGR,
                IN_HINGR: data.A2936HINGR,
                IN_MODIF: data.A2936MODIF,
                IN_FMODI: data.A2936FMODI,
                IN_HMODI: data.A2936HMODI

            };
            console.log('params', params)

            const res = await global.callStorePost('PRAXISBI', 'SQP05815', params);
            console.log('res', res);
            me.view.setLoading(false);
            const {lstVals} = res.data;
            global.Msg({
                msg: lstVals.OUT_MESSAGE
            });

            this.view.close();

        } catch (e) {
            global.Msg({ msg: 'An unexpected error occurred.' });
        } finally {
            me.reloadGrid();
        }
    },

    onCreateClick: async function () {
        console.log('onCreateBankNitCatalog');
        const me = this;


        try {
            const form = Ext.getCmp(prototype.idDE + '-DataEntryFormOdv').getForm();

            if (!form.isValid()) {
                global.Msg({msg: 'Please fill all mandatory fields before saving.'});
                return;
            }

            const data = form.getValues();
            console.log('data', data);

            me.view.setLoading(true);

            const params = {
                IN_OPTION: 'C',
                IN_CCUST: '139',
                IN_CATTO: data.A2936CATTO,
                IN_CCITY: data.A2936CCITY,
                IN_NCITY: data.A2936NCITY,
                IN_NATTO: data.A2936NATTO,
                IN_CPAIS: data.A2936CPAIS,
                IN_NPAIS: data.A2936NPAIS,
                IN_IDZON: data.A2936IDZON,
                IN_NZONE: data.A2936NZONE,
                IN_CREGI: data.A2936CREGI,
                IN_NREGI: data.A2936NREGI,
                IN_CSREG: data.A2936CSREG,
                IN_NCSRG: data.A2936NCSRG,
                IN_IDHUB: data.A2936IDHUB,
                IN_GATTO: data.A2936GATTO,
                IN_INGRE: data.A2936INGRE,
                IN_FINGR: data.A2936FINGR,
                IN_HINGR: data.A2936HINGR,
                IN_MODIF: data.A2936MODIF,
                IN_FMODI: data.A2936FMODI,
                IN_HMODI: data.A2936HMODI
            }

            console.log('params', params);


            const res = await global.callStorePost('PRAXISBI', 'SQP05815', params);
            console.log('res', res);
            me.view.setLoading(false);
            const {lstVals} = res.data;
            global.Msg({
                msg: lstVals.OUT_MESSAGE
            });

            this.view.close();

        } catch (e) {
            global.Msg({ msg: 'An unexpected error occurred.' });
        } finally {
            me.reloadGrid();
        }
    },


    onDeleteClick: async function () {
        console.log('onDeleteClick');
        const me = this;


        try {
            const form = Ext.getCmp(prototype.idDE + '-DataEntryFormOdv').getForm();

            const data = form.getValues();
            console.log('data', data);

            me.view.setLoading(true);

            const params = {
                IN_OPTION: 'D',
                IN_CCUST: '139',
                IN_CATTO: data.A2936CATTO,
                IN_CCITY: data.A2936CCITY,
                IN_NCITY: data.A2936NCITY,
                IN_NATTO: data.A2936NATTO,
                IN_CPAIS: data.A2936CPAIS,
                IN_NPAIS: data.A2936NPAIS,
                IN_IDZON: data.A2936IDZON,
                IN_NZONE: data.A2936NZONE,
                IN_CREGI: data.A2936CREGI,
                IN_NREGI: data.A2936NREGI,
                IN_CSREG: data.A2936CSREG,
                IN_NCSRG: data.A2936NCSRG,
                IN_IDHUB: data.A2936IDHUB,
                IN_GATTO: data.A2936GATTO,
                IN_INGRE: data.A2936INGRE,
                IN_FINGR: data.A2936FINGR,
                IN_HINGR: data.A2936HINGR,
                IN_MODIF: data.A2936MODIF,
                IN_FMODI: data.A2936FMODI,
                IN_HMODI: data.A2936HMODI
            }

            console.log('params', params);


            const res = await global.callStorePost('PRAXISBI', 'SQP05815', params);
            console.log('res', res);
            me.view.setLoading(false);
            const {lstVals} = res.data;
            global.Msg({
                msg: lstVals.OUT_MESSAGE
            });

            this.view.close();

        } catch (e) {
            global.Msg({ msg: 'An unexpected error occurred.' });
        } finally {
            me.reloadGrid();
        }
    },
    
    onCancelClick: function () {
        this.view.close();
    },

    reloadGrid: function () {
//        Ext.getCmp(prototype.id + '-gridOdvCitys').getStore().removeAll();
//        Ext.getCmp(prototype.id + '-gridOdvCitys').getStore().load();
        const grid = Ext.ComponentQuery.query('grid')[0];
        grid.getStore().removeAll();
        grid.getStore().load();

    },

});
