Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.CatalogMaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CatalogMaintenanceDataEntryController',
    url: CONTEXTPATH + '/ReservationBrowser',
    paises: {},
    tarjetas: {},
    monedas: {},
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        obj.mask('Loading...');
        console.log("dp: CatalogMaintenanceDataEntryController obj = " , obj);
        await this.getData(obj);
        obj.unmask();
    },
    getData: async function (obj) {
        const me = this;
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().reset();
        const btnSave = Ext.getCmp(prototype.idDE + '-btn-save');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        if (obj.option === 'U') {
            btnSave.hide();
            btnUpdate.show();
            console.log("dp: CatalogMaintenanceDataEntryController obj.searchParams = " , obj.searchParams);
            await me.getCatalogInfo(obj.searchParams);
        } else {
            btnSave.show();
            btnUpdate.hide();
            Ext.getCmp(prototype.idDE + '-mainForm').getForm().reset();
        }
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
    },
    getCatalogInfo: async function (params) {
        const me = this;
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const res = await fetch(`${me.url}/loadKeys?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const obj = data.response[0];
            console.log("dp: CatalogMaintenanceDataEntryController data.response = " , data.response[0]);
            console.log("dp: CatalogMaintenanceDataEntryController mainForm = " , mainForm);
            me.limpiaObjetoPX(obj);
            mainForm.setValues(obj);
        } else {
            global.Msg({msg: 'Data not Found'});
        }
    },

    onUpdateClick: async function () {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenanceCatalog('U');
                        }
                    }
                });
    },
    onCancelClick: function () {
        this.view.close();
    },
    maintenanceCatalog: async function (option) {
        const me = this;
        let params = me.formatParameters(option);
        let valid = Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
        if (!valid) {
            global.Msg({msg: 'Invalid Parameters'});
            return;
        }
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/updateKeys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        me.view.unmask();
        if (res.ok) {
            global.Msg({msg: 'Change Successfull'});
            Ext.getCmp(prototype.id + '-CatalogGrid-1').getStore().load();
            me.view.close();
        } else {
            const msg = await res.text();
            console.error('Error: ' + msg);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'Error!<br>Check Console for more<br>Information.',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
    },
    formatParameters: function (option) {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        let params = {
            ...me.requestObjectSP(form),
            IN_OPTION: option,
            IN_A4593CCUST: '139'
        };
        console.log("dp: CatalogMaintenanceDataEntryController params = " , params);
        return params;
    },

    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    requestObjectSP: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    }

});

