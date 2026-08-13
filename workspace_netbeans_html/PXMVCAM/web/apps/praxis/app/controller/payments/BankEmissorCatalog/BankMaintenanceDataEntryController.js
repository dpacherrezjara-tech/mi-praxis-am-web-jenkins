Ext.define('Ext.Praxis.controller.payments.BankEmissorCatalog.BankMaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankMaintenanceDataEntryController',
    url: CONTEXTPATH + '/BankEmissorCatalog',
    paises: {},
    tarjetas: {},
    monedas: {},
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        obj.mask('Loading...');
        await this.fillFilters();
        await this.getData(obj);
        obj.unmask();
    },
    fillFilters: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbPaises = Ext.getCmp(prototype.idDE + '-cmbPaises');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});
            //</editor-fold>
        }
    },
    getData: async function (obj) {
        const me = this;
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().reset();
        const btnSave = Ext.getCmp(prototype.idDE + '-btn-save');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        if (obj.option === 'U') {
            btnSave.hide();
            btnUpdate.show();
            await me.getBankInfo(obj.searchParams);
        } else {
            btnSave.show();
            btnUpdate.hide();
            Ext.getCmp(prototype.idDE + '-mainForm').getForm().reset();
        }
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();

    },
    getBankInfo: async function (params) {
        const me = this;
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const res = await fetch(`${me.url}/loadBankInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            const obj = data.response;
            console.log('Response: ', obj);
            mainForm.setValues(data.response);
        }
    },
    onSaveClick: async function () {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Insert?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenanceBank('C');
                        }
                    }
                });
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
                            this.maintenanceBank('U');
                        }
                    }
                });

    },
    onCancelClick: function () {
        this.view.close();
    },
    maintenanceBank: async function (option) {
        const me = this;
        me.view.mask('Loading...');
        let params = me.formatParameters(option);
        let valid = Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
        if (!valid) {
            global.Msg({msg: 'Invalid Parameters'});
            me.view.unmask();
            return;
        }
        const res = await fetch(`${me.url}/maintenanceBank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            global.Msg({msg: 'Change Successfull'});
            Ext.getCmp(prototype.id + '-BanksGrid-1').getStore().load();
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
            me.view.unmask();
        }
    },
    formatParameters: function (option) {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        //console.log(iatas);
        let params = {
            ...me.requestObjectSP(form),
            IN_OPTION: option,
            IN_A4559CCUST: '139'
        };
        console.log(params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
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
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
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
    }
    //</editor-fold>

});

