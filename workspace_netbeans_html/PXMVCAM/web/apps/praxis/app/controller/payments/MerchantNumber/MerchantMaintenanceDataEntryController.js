Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantMaintenanceDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantMaintenanceDataEntryController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    init: function (view) {
        Ext.getCmp(prototype.idDE + '-gridIATA').getStore().removeAll();
    },
    afterRender: async function (obj, e) {
        obj.mask('Loading...');
        this.fillFilters();
        await this.getData(obj);
        obj.unmask();
    },
    fillFilters: function () {
        const cmbPaises = Ext.getCmp(prototype.idDE + '-cmbPaises');
        global.setComboStore(cmbPaises, prototype.filterPaises || [], 'CODE', 'NAME', '');
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
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05255', params);
            const rows = (res && res.lstRs && res.lstRs.length > 0) ? res.lstRs[0] : [];
            const iatas = (res && res.lstRs && res.lstRs.length > 1) ? res.lstRs[1] : [];
            if (rows.length > 0) {
                const obj = rows[0];
                me.limpiaObjetoPX(obj);
                if (obj.CODAGRUP && obj.CODAGRUP.trim() !== '') {
                    obj.CODAGRUPA = obj.CODAGRUP.trim().slice(0, 2);
                    if (obj.CODAGRUPA === 'GR') {
                        obj.NBRAGRUPA = obj.CODAGRUP.trim().slice(2);
                    }
                }
                console.log('Response: ', obj);
                mainForm.setValues(obj);
                gridIatas.setStore(Ext.create('Ext.data.Store', {
                    data: iatas
                }));
            }
        } catch (e) {
            console.error('Error getMerchantInfo', e);
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
        const grid = Ext.getCmp(prototype.idDE + '-gridIATA');
        grid.view.mask('Loading...');
        const store = grid.getStore();
        const codeIata = Ext.getCmp(prototype.idDE + '-codeIataAdd');
        let found = store.query('CIATA', codeIata.getValue());
        if (found.items.length > 0) {
            global.Msg({msg: 'No duplicates allowed'});
            grid.view.unmask();
            return;
        }
        let param = {
            IN_IATA: codeIata.getValue()
        };
        codeIata.setValue('');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05258', param);
            const rows = (res && res.lstRs && res.lstRs.length > 0) ? res.lstRs[0] : [];
            if (rows.length === 0) {
                global.Msg({msg: 'IATA Not found'});
            } else {
                const obj = rows[0];
                let iata = {
                    CIATA: obj.A003KEY,
                    NIATA: obj.A003KEY3,
                    CANAL: obj.A003CANAL,
                    SCOUNTRY: obj.A003PSALF
                };
                store.add(iata);
                grid.bindStore(store);
            }
        } catch (e) {
            console.error('Error onAddCodeIata', e);
            global.Msg({msg: 'Error loading IATA info'});
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
        Ext.Msg.show({
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
        Ext.Msg.show({
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
        let valid = Ext.getCmp(prototype.idDE + '-mainForm').getForm().isValid();
        if (!valid) {
            global.Msg({msg: 'Invalid Parameters'});
            me.view.unmask();
            return;
        }
        const merchantParams = me.formatMerchantParams(option);
        const iataParamsList = me.formatIataParams(merchantParams.IN_MERCHN);
        const expectedParams = [
            'IN_CHOPTION', 'IN_CCUST', 'IN_MERCHN', 'IN_DESCR', 'IN_RSOCIAL',
            'IN_CIATA', 'IN_CANAL', 'IN_SCOUNTRY', 'IN_UNIOPE', 'IN_CODCLIT1',
            'IN_DIRCLIT1', 'IN_CODCLIT2', 'IN_DIRCLIT2', 'IN_MERCHP', 'IN_STATUS',
            'IN_CODAGRUP', 'IN_DESCAGRUP', 'IN_FECHAINI', 'IN_FECHAFIN'
        ];
        expectedParams.forEach(param => {
            if (!(param in merchantParams)) {
                merchantParams[param] = '';
            }
        });
        try {
            const res = await global.callStorePost('PRAXISMP', 'SQP05256', merchantParams);
            const {INOUT_STATUS, INOUT_MESSAGE} = res.data.lstVals;
            if (INOUT_STATUS === 1) {
                for (const iataParams of iataParamsList) {
                    await global.callStorePost('PRAXISMP', 'SQP05257', iataParams);
                }
                global.Msg({msg: 'Change Successfull'});
                me.view.option = 'U';
                me.view.searchParams = {
                    IN_CCUST: '139',
                    IN_MERCHN: merchantParams.IN_MERCHN
                };
                await this.getData(me.view);
                Ext.getCmp(prototype.id + '-MerchantsGrid-1').getStore().load();
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    message: INOUT_MESSAGE || 'Error!<br>Check Console for more<br>Information.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
        } catch (e) {
            console.error('Error maintenanceMerchant', e);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'Error!<br>Check Console for more<br>Information.',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
        me.view.unmask();
    },
    formatMerchantParams: function (option) {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        const codgrupo = Ext.getCmp(prototype.idDE + '-de-cmbCODAGRUP').getValue();
        const nrbgrupo = Ext.getCmp(prototype.idDE + '-cmbNBRAGRUP').getValue();
        const nomgrupo = codgrupo === 'GR' ? 'Grupo ' + nrbgrupo :
                Ext.getCmp(prototype.idDE + '-de-cmbCODAGRUP').getRawValue();
        const iatas = Ext.getCmp(prototype.idDE + '-gridIATA').getStore();
        const nomiata = iatas.data.items.length > 0 ? iatas.getAt(0).data.CIATA : '';
        let params = {
            ...me.requestObjectSP(form),
            IN_CODAGRUP: codgrupo === 'GR' ? codgrupo + nrbgrupo : codgrupo,
            IN_DESCAGRUP: nomgrupo,
            IN_CHOPTION: option,
            IN_CCUST: '139',
            IN_CIATA: nomiata
        };
        console.log('merchantParams', params);
        return params;
    },
    formatIataParams: function (merchn) {
        const iatas = Ext.getCmp(prototype.idDE + '-gridIATA').getStore();
        return iatas.getData().items.map(x => ({
            IN_CCUST: '139',
            IN_MERCHN: merchn,
            IN_IATA: x.data.CIATA,
            IN_SCOUNTRY: x.data.SCOUNTRY,
            IN_CANAL: x.data.CANAL
        }));
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({id}) {
        return Ext.getCmp(prototype.id + id);
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                return false;
            }
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
                const nuevaClave = `IN_${clave.toUpperCase()}`;
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    }
    //</editor-fold>

});
