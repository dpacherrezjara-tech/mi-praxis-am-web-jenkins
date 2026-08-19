Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.AddTicketDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AddTicketDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    paises: {},
    tarjetas: {},
    monedas: {},
    init: function (view) {
        prototype.idTicket = prototype.id + '-AddTicketDataEntry';
    },
    afterRender: function (obj, e) {
        this.fillFilters();
    },
    onClickSearchBtn: async function () {
        const me = this;
        const txtForma = Ext.getCmp(prototype.idTicket + '-forma');
        const txtSerie = Ext.getCmp(prototype.idTicket + '-serie');
        if (!txtForma.validate() || !txtSerie.validate()) {
            global.Msg({
                msg: 'Invalid Ticket'
            });
            return;
        }
        const searchTicket = Ext.getCmp(prototype.idTicket + '-mainForm').getForm().getValues();
        const params = {
            IN_A4496CCUST: searchTicket.IN_A4496CCUST,
            IN_A4496CIA: searchTicket.IN_A4496CIA,
            IN_A4496FORMA: searchTicket.IN_A4496FORMA,
            IN_A4496SERIE: searchTicket.IN_A4496SERIE
        };
        const res = await global.callStoreGet('PRAXISMP', 'SQP05217', params);
        const { SQLRES, SQLMSG } = res?.lstVals || {};
        const txtResult = Ext.getCmp(prototype.idTicket + '-resultSearch');
        const panelInfo = Ext.getCmp(prototype.idTicket + '-ticketInfo');
        const saveBtn = Ext.getCmp(prototype.idTicket + '-saveTicketBtn');
        const cancelBtn = Ext.getCmp(prototype.idTicket + '-btnCancel');
        if (SQLRES > 0) {
            txtResult.setValue(SQLMSG);
            txtResult.setFieldStyle('text-align: center;background-color: #FA1717;');
            me.onCancelBtn();
        } else {
            txtResult.setValue(SQLMSG);
            txtResult.setFieldStyle('text-align: center;background-color: #80EC75;');
            panelInfo.show();
            cancelBtn.show();
            saveBtn.show();
            txtForma.setReadOnly(true);
            txtSerie.setReadOnly(true);
        }
    },
    addFormOfPayment: function () {
        const grid = Ext.getCmp(prototype.idTicket + '-gridFops');
        const store = grid.getStore();
        const mda = Ext.getCmp(prototype.idTicket + '-cmbMoneda').getValue();
        const obj = {
            IN_A4501CFOP: 'CC',
            IN_A4501TFOP: 'CC',
            IN_A4501TTARJ: 'AX',
            IN_A4501NREF: '',
            IN_A4501CAPL: '',
            IN_A4501VFOP: 0,
            IN_A4501MFOP: mda
        };
        store.add(obj);
        grid.setStore(store);
        grid.bindStore(store);
    },
    fillFilters: function () {
        const me = this;
        me.paises = me.view.countries || [];
        me.tarjetas = me.view.creditcards || [];
        me.monedas = me.view.currencies || [];
        me.paises.forEach(x => me.limpiaObjetoPX(x));
        me.tarjetas.forEach(x => me.limpiaObjetoPX(x));
        me.monedas.forEach(x => me.limpiaObjetoPX(x));
        Ext.getCmp(prototype.idTicket + '-cmbPaises').setStore(
                Ext.create('Ext.data.Store', {
                    data: me.paises
                }));
        Ext.getCmp(prototype.idTicket + '-cmbMoneda').setStore(
                Ext.create('Ext.data.Store', {
                    data: me.monedas
                }));
        Ext.getCmp(prototype.idTicket + '-mainForm').getForm().isValid();
    },
    onBeforeEdit: function (editor, context) {
        const me = this;
        let record = context.record;
        let fieldName = context.field;
        let comboEditor = context.column.getEditor(record);
        if (fieldName === 'IN_A4501TTARJ') {
            const store = Ext.create('Ext.data.Store', {
                data: me.tarjetas
            });
            comboEditor.setStore(store);
        }
    },
    onDeleteFOP: function (grid, rowIndex, colIndex) {
        let registro = grid.getStore().getAt(rowIndex);
        if (registro) {
            grid.getStore().remove(registro);
        }
    },
    onCancelBtn: function () {
        const grid = Ext.getCmp(prototype.idTicket + '-gridFops');
        const panelInfo = Ext.getCmp(prototype.idTicket + '-ticketInfo');
        const saveBtn = Ext.getCmp(prototype.idTicket + '-saveTicketBtn');
        const cancelBtn = Ext.getCmp(prototype.idTicket + '-btnCancel');
        const txtForma = Ext.getCmp(prototype.idTicket + '-forma');
        const txtSerie = Ext.getCmp(prototype.idTicket + '-serie');
        panelInfo.hide();
        saveBtn.hide();
        cancelBtn.hide();
        txtForma.setReadOnly(false);
        txtSerie.setReadOnly(false);
        grid.getStore().removeAll();
        Ext.getCmp(prototype.idTicket + '-mainForm').getForm().reset();
    },
    onSaveTicket: async function () {
        const me = this;
        me.view.mask('Loading...');
        const mainForm = Ext.getCmp(prototype.idTicket + '-mainForm').getForm();
        if (!mainForm.isValid()) {
            global.Msg({
                msg: 'Invalid Parameters'
            });
            me.view.unmask();
            return;
        }
        const fopStore = Ext.getCmp(prototype.idTicket + '-gridFops').getStore();
        if (fopStore.getCount() === 0) {
            global.Msg({
                msg: 'Invalid FOP'
            });
            me.view.unmask();
            return;
        } else {
            let isValid = true;
            fopStore.data.items.forEach(x => {
                const {IN_A4501NREF, IN_A4501CAPL, IN_A4501VFOP} = x.data;
                if (IN_A4501NREF.length < 10 || IN_A4501CAPL.length < 6 || IN_A4501VFOP === 0) {
                    isValid = false;
                    return;
                }
            });
            if (!isValid) {
                global.Msg({
                    msg: 'Invalid parameters'
                });
                me.view.unmask();
                return;
            }
        }
        if (mainForm.getValues().IN_A4496TARIF > fopStore.sum('IN_A4501VFOP')) {
            global.Msg({
                msg: 'Invalid Amounts'
            });
            me.view.unmask();
            return;
        }
        let params = me.formatParameters(mainForm, fopStore);
        const res = await fetch(`${me.url}/insertTicketRecord`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if(res.ok){
            global.Msg({
                msg: 'Ticket added<br>Successfully'
            });
            me.view.close();
        }else{
            global.Msg({
                msg: 'Error inserting Ticket'
            });
        }
        me.view.unmask();
    },
    formatParameters: function (form, store) {
        const me = this;
        let params = me.requestObjectSP(form.getValues());
        if (params.IN_A4496TRNCU === 'SALE') {
            params.IN_A4496TDOC = 'S';
        } else {
            params.IN_A4496TDOC = 'R';
        }
        let fops = [];
        fops = store.data.items.map(x => ({...params, ...me.requestObjectSP(x.data)}));
        params.fops = fops;
        console.log('Parametros: ', params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
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
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    }
    //</editor-fold>

});

