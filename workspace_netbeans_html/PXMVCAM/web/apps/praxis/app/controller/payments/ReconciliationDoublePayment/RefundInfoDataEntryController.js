Ext.define('Ext.Praxis.controller.payments.ReconciliationDoublePayment.RefundInfoDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RefundInfoDataEntryController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationDoublePay',
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        const view = me.view;
        view.mask('Loading...');
        await me.getData(view);
        view.unmask();
    },
    getData: async function (view) {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const res = await fetch(`${me.url}/loadTrnxInfo?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
            console.log('bean',me.bean);
            form.reset();
            form.setValues(me.bean);
            form.isValid();
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
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        let params = me.formatUpdateParams(me.bean, me.requestObjectSP(form.getValues()));
        console.log(params);
        if (form.isValid()) {
            const res = await fetch(`${me.url}/maintenanceRefundInfo`, {
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                const {sqlres, sqlmsg} = data;
                if (sqlres) {
                    Ext.toast({
                        html: `<b>${sqlmsg}</b>`,
                        iconCls: 'prx-icon-image-log',
                        title: 'Notification',
                        align: 't',
                        slideInDuration: 300,
                        minWidth: 250
                    });
                    me.afterRender();
                    Ext.getCmp(prototype.id + '-MainGrid-1').getStore().load();
                }
            } else {
                Ext.toast({
                    html: '<b>Error on update.</b>',
                    iconCls: 'prx-icon-incomplete',
                    title: 'Error',
                    align: 't',
                    slideInDuration: 300,
                    minWidth: 250
                });
            }
        } else {
            Ext.toast({
                html: '<b>Invalid Parameters.</b>',
                iconCls: 'prx-icon-incomplete',
                title: 'Error',
                align: 't',
                slideInDuration: 300,
                minWidth: 250
            });
        }
        me.view.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    },
    formatUpdateParams: function (bean, formValues) {
        let params = {
            IN_CCUST: '139',
            IN_TDOC: bean.tdoc,
            IN_AREFNBR: bean.arefnbr,
            ...formValues
        };
        return params;
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
        allRecord[displayField] = 'All';
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


