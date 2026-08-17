Ext.define('Ext.Praxis.controller.payments.ErrorControl.FormatDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormatDataEntryController',
    fecha: new Date(),
    url: CONTEXTPATH + '/ErrorControl',
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.mask('Loading Info...');
        if (me.view.searchParams) {
            const procesador = me.view.searchParams.IN_PROCTYPE;
            if (procesador === 'ADYEN00') {
                const bin1 = Ext.getCmp(prototype.id + '-de-cardBin-1');
                const bin2 = Ext.getCmp(prototype.id + '-de-cardBin-2');
                const auth = Ext.getCmp(prototype.id + '-de-cardAuth');
                bin1.allowBlank = true;
                bin2.allowBlank = true;
                auth.allowBlank = true;
            }
            const res = await global.callStoreGet('PRAXISMP', 'SQP05027', me.view.searchParams);
            if (res.lstRs && res.lstRs.at(0) && res.lstRs.at(0).length > 0) {
                me.setInfoData(res.lstRs.at(0)[0]);
            } else {
                global.Msg({
                    msg: 'Data not Found'
                });
                me.view.close();
            }
        } else {
            global.Msg({
                msg: 'Error in information'
            });
            me.view.close();
        }
        me.view.unmask();
    },
    onUpdateClick: function () {
        this.updateVN0002PG();
    },
    onCancelClick: function () {
        this.view.close();
    },
    updateVN0002PG: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.id + '-formatDataEntryForm');
        if (form.isValid()) {
            const formValues = form.getValues();
            let params = {
                IN_CCUST: me.view.searchParams.IN_CCUST,
                IN_TKT: me.view.searchParams.IN_TKT,
                IN_IDREF: me.view.searchParams.IN_IDREF,
                IN_PROCTYPE: me.view.searchParams.IN_PROCTYPE,
                UP_CC1: formValues.CCARD1,
                UP_CC2: formValues.CCARD2,
                UP_AUTH: formValues.AUTH,
                UP_QTYPAX: formValues.QTYPAX,
                UP_QTYTKT: formValues.QTYTK,
                UP_CURR: formValues.MDA,
                UP_SVFOP: formValues.TOTAMOUNT,
                UP_AMTOFF: formValues.TOTAMOUNTO
            };
            const res = await global.callStorePost('PRAXISMP', 'SQP05028', params);
            if (res) {
                const { lstVals, lstRs } = res.data;
                if (lstVals.SQLRES === 1) {
                    global.Msg({
                        msg: 'Updated Successfull'
                    });
                    me.afterRender();
                    me.reloadGrid();
                } else {
                    global.Msg({
                        msg: 'Error in SQL'
                    });
                }
            }
        } else {
            global.Msg({
                msg: 'Errors found, check again.'
            });
        }
    },
    setInfoData: function (data) {
        const form = Ext.getCmp(prototype.id + '-formatDataEntryForm');
        let creditcard = data.SCARDN.trimEnd();
        let info = {
            AUTH: data.SAUTHOC.trimEnd(),
            CCARD1: creditcard.substring(0, 6),
            CCARD2: creditcard.substring(creditcard.length - 4),
            MDA: data.CUROFFER,
            QTYPAX: data.NBROFPAX || 0,
            QTYTK: data.QTYTKT || 0,
            TOTAMOUNT: data.SVFOP || 0.00,
            TOTAMOUNTO: data.AMOUNTOFF || 0.00,
            USERU: data.USUP,
            DATEU: data.FEUP
        };
        form.getForm().setValues(info);
        form.isValid();
    },
    reloadGrid: function () {
        const store = Ext.getStore(prototype.id + `-detail-store`);
        // Verificar si el store fue encontrado
        if (store) {
            store.load();
        }
    }

});


