Ext.define('Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425ReglasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Compensation0425ReglasController',
    taxes: [],
    exTaxes: [],
    activeChanges: false,
    isNewTicket: false,
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function () {
        const me = this;

        var gridReglas = Ext.getCmp(prototype.idDE + '-gridReglas');
        var storeReglas = Ext.create('Ext.data.Store', {
            storeId: prototype.idDE + '-store-gridReglas'
        });
        gridReglas.setStore(storeReglas);
        me.loadCompensation0425Reglas();
        me.isNewTicket = false;
    },
    loadCompensation0425Reglas: async function () {
        const me = this;
        const gridReglas = Ext.getCmp(prototype.idDE + '-gridReglas');
        gridReglas.setLoading(true);
        let params = {
            IN_CCUST: "139",
            IN_OPTION: "4",
            IN_CCIA: "",
            IN_FORMA: "",
            IN_SERIE: "",
            IN_SEQ: "",
            IN_TRNCU: "",
            IN_PNR: "",
            IN_COUNTRY: ''
        };
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP06087', params);
            if (res.lstRs.length > 0) {
                let store = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });
                gridReglas.setStore(store);

            }
        } catch (e) {
            console.error(e);
        } finally {
            gridReglas.setLoading(false);
        }
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idDE + '-currency').setValue(data.A4963MDA);
        Ext.getCmp(prototype.idDE + '-Amount').setValue(data.A4963NETOL);
        Ext.getCmp(prototype.idDE + '-Filter').setValue(data.A4963REGLA);
        Ext.getCmp(prototype.idDE + '-Rule1').setValue(data.A4963DESCC);
        Ext.getCmp(prototype.idDE + '-Rule2').setValue(data.A4961DESCR);
        Ext.getCmp(prototype.idDE + '-code').setValue(data.A4963CODI);
    },
    onClickClearOptionsBtn: function () {
        Ext.getCmp(prototype.idDE + '-currency').setValue("");
        Ext.getCmp(prototype.idDE + '-Amount').setValue(0);
        Ext.getCmp(prototype.idDE + '-Filter').setValue("");
        Ext.getCmp(prototype.idDE + '-Rule1').setValue("");
        Ext.getCmp(prototype.idDE + '-Rule2').setValue("");
        Ext.getCmp(prototype.idDE + '-code').setValue("");
    },
    onFilterDescripChange: function (field, newValue) {
        const grid = Ext.getCmp(prototype.idDE + '-gridBoletos');
        const store = grid.getStore();
        store.clearFilter(true);
        const value = Ext.String.trim(newValue || '');
        if (value !== '') {
            store.filter({
                property: 'DESCRIP',
                value: value,
                anyMatch: true,
                caseSensitive: false
            });
        }
    },
    onExportBoletosExcel: function () {
        const grid = Ext.getCmp(prototype.idDE + '-gridReglas');
        const store = grid.getStore();
        if (!store || store.getCount() === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'No data to export.');
            return;
        }
        let data = [];
        store.each(function (rec) {
            data.push({
                'Code': rec.get('A4963CODI'),
                'Currency': rec.get('A4963MDA'),
                'Amount': rec.get('A4963NETOL'),
                'Filter': rec.get('A4963REGLA'),
                'Rule 1': rec.get('A4963DESCC'),
                'Rule 2': rec.get('A4961DESCR'),
                'User Crt': rec.get('A4963REGIS'),
                'Date Crt.': rec.get('A4963FREGI'),
                'Hour Crt.': rec.get('Rules 0425')
            });
        });
        global.writeExcelFromJson(data, 'Rules 0425');
    },
    onSaveClick: async function () {
        const me = this;
        var currency = Ext.getCmp(prototype.idDE + '-currency').getValue();
        var Amount = Ext.getCmp(prototype.idDE + '-Amount').getValue();
        var Filter = Ext.getCmp(prototype.idDE + '-Filter').getValue();
        var Rule1 = Ext.getCmp(prototype.idDE + '-Rule1').getValue();
        var Rule2 = Ext.getCmp(prototype.idDE + '-Rule2').getValue();
        var code = Ext.getCmp(prototype.idDE + '-code').getValue();
        //
        let params = {
            IN_CCUST: '139',
            IN_CURRENCY: currency,
            IN_AMOUNT: Amount,
            IN_FILTER: Filter,
            IN_RULE: Rule1,
            IN_RULE2: Rule2,
            IN_CODE: code
        };
        let notifier = new AWN();
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PXSAUDIT', 'SQP06089', params);
            const data = res && res.data;
            const result = data && data.lstRs && data.lstRs[0] && data.lstRs[0][0];
            if (!result) {
                throw new Error('Invalid response format');
            }

            const success = result.VL_SQLCODE === 0;

            global.Msg({
                msg: result.VL_MESSAGE,
                icon: success ? 1 : 0,
                fn: function () {
                    if (success) {
                        notifier.warning('Update Successfully');
                            me.loadCompensation0425Reglas();
                            me.onClickClearOptionsBtn();
                    } else {
                        notifier.alert('Error on Update');
                    }
                }
            });
        } catch (e) {
            console.error(e);
            notifier.alert('Error on Update');
        } finally {
            me.view.setLoading(false);
        }
    },
    onCancelClick: function () {
        this.view.close();
    }
});

