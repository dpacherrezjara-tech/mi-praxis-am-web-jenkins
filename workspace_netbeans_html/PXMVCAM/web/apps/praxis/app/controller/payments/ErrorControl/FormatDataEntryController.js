Ext.define('Ext.Praxis.controller.payments.ErrorControl.FormatDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormatDataEntryController',
    fecha: new Date(),
    url: CONTEXTPATH + '/ErrorControl',
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        //console.log(me.view);
        me.view.mask('Loading Info...');
        if (me.view.searchParams && me.view.searchUrl) {
            const procesador = me.view.searchParams.IN_PROCTYPE;
            if (procesador === 'ADYEN00') {
                const bin1 = Ext.getCmp(prototype.id + '-de-cardBin-1');
                const bin2 = Ext.getCmp(prototype.id + '-de-cardBin-2');
                const auth = Ext.getCmp(prototype.id + '-de-cardAuth');
                bin1.allowBlank = true;
                bin2.allowBlank = true;
                auth.allowBlank = true;
            }
            const res = await fetch(`${me.view.searchUrl}?${new URLSearchParams(me.view.searchParams)}`);
            if (res.ok) {
                const data = await res.json();
                //console.log(data);
                me.setInfoData(data);
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
        //console.log(form.getValues());
        //console.log(form.isValid());
        if (form.isValid()) {
            let params = {
                ...me.view.searchParams,
                ...form.getValues()
            };
            //console.log(params);
            const res = await fetch(`${me.url}/updateVN0002PG`, {
                method: 'PATCH',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.status === 1) {
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
        let creditcard = data.scardn.trimEnd();
        let info = {
            auth: data.sauthoc.trimEnd(),
            ccard1: creditcard.substring(0, 6),
            ccard2: creditcard.substring(creditcard.length - 4),
            mda: data.curoffer,
            qtypax: data.nbrofpax || 0,
            qtytk: data.qtytkt || 0,
            totamount: data.svfop || 0.00,
            totamounto: data.amountoff || 0.00,
            useru: data.usup,
            dateu: data.feup
        };
        form.getForm().setValues(info);
        form.isValid();
        //console.log(form.getForm().getValues());
    },
    reloadGrid: function () {
        const store = Ext.getStore(prototype.id + `-detail-store`);
        // Verificar si el store fue encontrado
        if (store) {
            store.load();
        }
    }

});


