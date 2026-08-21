Ext.define('Ext.Praxis.controller.payments.PaymentsCommissions.CommissionDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CommissionDataEntryController',
    fecha: new Date(),
    url: CONTEXTPATH + '/PaymentsCommissions',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        view.mask('Loading...');
        await me.fillFilters();
        await me.openPerspective(view.mode);
        view.unmask();
    },
    fillFilters: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            const{procesq, paises} = data;
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            const cmbProcesadores = Ext.getCmp(prototype.idDE + '-cmbProctypesq');
            me.setComboStore({cmp: cmbProcesadores, data: procesq,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});
            const cmbPaises = Ext.getCmp(prototype.idDE + '-cmbPaises');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});
            const cmbMonedas = Ext.getCmp(prototype.idDE + '-cmbMonedas');
            me.setComboStore({cmp: cmbMonedas, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});
            const cmbBancos = Ext.getCmp(prototype.idDE + '-cmbBanks');
            me.setComboStore({cmp: cmbBancos, data: data.banks,
                valueField: 'a4559CODE', displayField: 'a4559DESC', value: ''});
        }
    },
    openPerspective: async function (mode) {
        const me = this;
        const opts = {
            'I': async () => {
                Ext.getCmp(prototype.idDE + '-btn-add').show();
            },
            'U': async () => {
                const form = Ext.getCmp(prototype.idDE + 'mainForm').getForm();
                form.reset();
                await me.getData(me.view.objID);
                //console.log(me.bean);
                form.setValues(me.bean);
                Ext.getCmp(prototype.idDE + '-btn-update').show();
            }
        };
        await opts[mode]();
    },
    onChangeType: function (obj) {
        const val = obj.getValue();
        if (val === 'BIN') {
            Ext.getCmp(prototype.idDE + '-bankInfo').show();
            Ext.getCmp(prototype.idDE + '-binInfo').show();
            Ext.getCmp(prototype.idDE + '-binAmtInfo').show();
        } else {
            Ext.getCmp(prototype.idDE + '-bankInfo').hide();
            Ext.getCmp(prototype.idDE + '-binInfo').hide();
            Ext.getCmp(prototype.idDE + '-binAmtInfo').hide();
        }
    },
    onAddClick: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to add record?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.addRecord();
                        }
                    }
                });
    },
    addRecord: async function () {
        const me = this;
        me.view.mask('Loading...');
        const form = Ext.getCmp(prototype.idDE + 'mainForm').getForm();
        if (form.isValid()) {
            let params = me.requestObjectSP(Object.assign({}, form.getValues()));
            params.IN_CCUST = '139';
            const res = await fetch(`${me.url}/addCommission`, {
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                const {sqlmsg} = data;
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.view.close();
            } else {
                global.Msg({msg: 'Error'});
                me.view.close();
            }
        } else {
            global.Msg({msg: 'Invalid Parameters'});
        }

    },
    onUpdateClick: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update record?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.updateRecord();
                        }
                    }
                });
    },
    updateRecord: async function () {
        const me = this;
        me.view.mask('Loading...');
        const form = Ext.getCmp(prototype.idDE + 'mainForm').getForm();
        if (form.isValid()) {
            let params = me.requestObjectSP(Object.assign({}, form.getValues()));
            params.IN_CCUST = '139';
            params.IN_ID = me.bean.id;
            const res = await fetch(`${me.url}/editCommission`, {
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                const {sqlmsg} = data;
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                Ext.getCmp(prototype.id + '-MainGrid-1').getStore().load();
                me.view.close();
            } else {
                global.Msg({msg: 'Error'});
                me.view.close();
            }
        } else {
            global.Msg({msg: 'Invalid Parameters'});
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
    getData: async function (id) {
        const me = this;
        let params = {
            IN_CCUST: '139',
            IN_ID: id
        };
        const res = await fetch(`${me.url}/loadCommission?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'None';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
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
    },
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    getFechaRango: function (fechaString) {
        // Convertir la cadena en un objeto Date
        const fecha = new Date(
                fechaString.substring(0, 4),
                fechaString.substring(4, 6) - 1,
                fechaString.substring(6, 8)
                );

        // Obtener la fecha +1 día
        const fechaMasUnDia = new Date(fecha);
        fechaMasUnDia.setDate(fecha.getDate() + 1);
        // Obtener la fecha -1 día
        const fechaMenosUnDia = new Date(fecha);
        fechaMenosUnDia.setDate(fecha.getDate() - 1);
        // Formatear las nuevas fechas como cadenas
        const fechaMasUnDiaString = fechaMasUnDia.toISOString().slice(0, 10).replace(/-/g, '');
        const fechaMenosUnDiaString = fechaMenosUnDia.toISOString().slice(0, 10).replace(/-/g, '');

        return [fechaMenosUnDiaString, fechaMasUnDiaString];
    },
    sumBy: function ( {data, key}){
        let sum = data.reduce(function (total, item) {
            return total + item[key];
        }, 0);
        return sum;
    }
    //</editor-fold>
});


