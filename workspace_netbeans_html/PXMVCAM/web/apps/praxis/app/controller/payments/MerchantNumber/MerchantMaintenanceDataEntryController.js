Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantMaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantMaintenanceDataEntryController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    paises: {},
    tarjetas: {},
    monedas: {},
    init: function (view) {
        Ext.getCmp(prototype.idDE + '-gridIATA').getStore().removeAll();
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
        const merchantNbr = Ext.getCmp(prototype.idDE + '-txtMerchant');
        const btnSave = Ext.getCmp(prototype.idDE + '-btn-save');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        if (obj.option === 'U') {
            merchantNbr.allowBlank = false;
            merchantNbr.minLength = 0;
            merchantNbr.setReadOnly(true);
            btnSave.hide();
            btnUpdate.show();
            await me.getMerchantInfo(obj.searchParams);
        } else {
            btnSave.show();
            btnUpdate.hide();
            merchantNbr.setReadOnly(false);
            Ext.getCmp(prototype.idDE + '-mainForm').getForm().reset();
        }
        Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();

    },
    getMerchantInfo: async function (params) {
        const me = this;
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const gridIatas = Ext.getCmp(prototype.idDE + '-gridIATA');
        const res = await fetch(`${me.url}/loadMerchantInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            const obj = data.response;
            if (obj.codagrup !== '') {
                obj.codagrupa = obj.codagrup.slice(0, 2);
                if (obj.codagrupa === 'GR') {
                    obj.nbragrupa = obj.codagrup.slice(2);
                }
            }
            console.log('Response: ', obj);
            mainForm.setValues(data.response);
            gridIatas.setStore(Ext.create('Ext.data.Store', {
                data: data.iatas
            }));
        }
    },
    onChangeStatusCmb: function (obj) {
        const cmbStatus = Ext.getCmp(prototype.idDE + '-cmbStatus');
        if (obj.value !== '') {
            cmbStatus.setReadOnly(false);
        } else {
            cmbStatus.setReadOnly(true);
            cmbStatus.setValue('0');
        }
    },
    onChangeCodAgrup: function (obj) {
        const cmbGrupos = Ext.getCmp(prototype.idDE + '-cmbNBRAGRUP');
        if (obj.value === 'GR') {
            cmbGrupos.show();
        } else {
            cmbGrupos.hide();
        }
    },
    onAddCodeIata: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idDE + '-gridIATA');
        grid.view.mask('Loading...');
        const store = grid.getStore();
        const codeIata = Ext.getCmp(prototype.idDE + '-codeIataAdd');
        let found = store.query('ciata', codeIata);
        //console.log(found);
        if (found.items.length > 0) {
            global.Msg({msg: 'No duplicates allowed'});
            return;
        }
        let param = {
            IN_IATA: codeIata.getValue()
        };
        codeIata.setValue('');
        const res = await fetch(`${me.url}/loadIataInfo?${new URLSearchParams(param)}`);
        if (res.ok) {
            const data = await res.json();
            if (data.sqlcod === 1) {
                global.Msg({msg: data.sqlmsg});
            } else {
                const obj = data.response;
                if (obj) {
                    let iata = {
                        ciata: obj.a003KEY,
                        niata: obj.a003KEY3,
                        canal: obj.a003CANAL,
                        scountry: obj.a003PSALF
                    };
                    store.add(iata);
                    grid.bindStore(store);
                } else {
                    global.Msg({msg: 'IATA Not found'});
                }
            }

        }
        grid.view.unmask();
    },
    onDeleteIata: function (grid, rowIndex, colIndex) {
        let registro = grid.getStore().getAt(rowIndex);
        if (registro) {
            grid.getStore().remove(registro);
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
                            this.maintenanceMerchant('C');
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
                            this.maintenanceMerchant('U');
                        }
                    }
                });

    },
    onCancelClick: function () {
        this.view.close();
    },
    maintenanceMerchant: async function (option) {
        const me = this;
        me.view.mask('Loading...');
        let params = me.formatParameters(option);
        let valid = Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
        if (!valid) {
            global.Msg({msg: 'Invalid Parameters'});
            me.view.unmask();
            return;
        }
        const res = await fetch(`${me.url}/maintenanceMerchant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            global.Msg({msg: 'Change Successfull'});
            me.view.option = 'U';
            me.view.searchParams = {
                IN_CCUST: '139',
                IN_MERCHN: params.IN_MERCHN
            };
            await this.getData(me.view);
            Ext.getCmp(prototype.id + '-MerchantsGrid-1').getStore().load();
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
        me.view.unmask();
    },
    formatParameters: function (option) {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        const iatas = Ext.getCmp(prototype.idDE + '-gridIATA').getStore();
        const codgrupo = Ext.getCmp(prototype.idDE + '-de-cmbCODAGRUP').getValue();
        const nrbgrupo = Ext.getCmp(prototype.idDE + '-cmbNBRAGRUP').getValue();
        const nomgrupo = codgrupo === 'GR' ? 'Grupo ' + nrbgrupo :
                Ext.getCmp(prototype.idDE + '-de-cmbCODAGRUP').getRawValue();
        const nomiata = iatas.data.items.length > 0 ? iatas.getAt(0).data.ciata : '';
        //console.log(iatas);
        let params = {
            ...me.requestObjectSP(form),
            iatas: iatas.getData().items.map(x =>
                ({CCUST: '139',
                    MERCHN: form.merchn,
                    ...me.requestObjectPX(x.data)})),
            IN_CODAGRUP: codgrupo === 'GR' ? codgrupo + nrbgrupo : codgrupo,
            IN_DESCAGRUP: nomgrupo,
            IN_CHOPTION: option,
            IN_CCUST: '139',
            IN_CIATA: nomiata
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

