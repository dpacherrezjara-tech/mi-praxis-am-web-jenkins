Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.AccountingTransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingTransactionController',
    fecha: new Date(),
    searchParams: null,
    searchUrl: null,
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
//        await me.onClickSearchBtn();
    },
    fillFilters: async function () {
        const me = this;
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilters.mask('Loading Filters...');

        const res = await global.callStoreGet('PRAXISMP', 'SQP05934', {});

        prototype.filter = prototype.filter || {};
        prototype.filter.procesadores = res.lstRs[0];
        prototype.filter.monedas = res.lstRs[1];

        global.setComboStore(
            Ext.getCmp(prototype.id + '-cmbProcessor'),
            res.lstRs[0], 'CODE', 'NAME', ''
        );
        global.setComboStore(
            Ext.getCmp(prototype.id + '-cmbMoneda'),
            res.lstRs[1], 'CODE', 'NAME', ''
        );

        panelFilters.unmask();
    },
    onClickSearchBtn: async function () {
        await this.loadSummary();
    },
    loadSummary: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        let params = me.formatParameters();
        console.log('Summary Grid Params: ', params);

        const summaryGrid = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryGrid', {
            id: prototype.id + '-gridSummary',
            searchParams: params
        });
        mainPanel.add(summaryGrid);
    },
    formatParameters: function () {
        let formFilterts = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
        console.log('Summary Grid Filters: ', formFilterts);
        return formFilterts;
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        prototype.id = 'AccountingTransactionForm';
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    downloadAllDetailAccountingExcel: async function () {
        const me = this;
        me.view.setLoading(true);
        let notifier = new AWN();

        try {
            const gridData = Ext.getCmp(prototype.id + '-gridSummary');

            if (!gridData) {
                global.Msg({ msg: 'Summary grid not found', icon: 2 });
                return;
            }

            const storeData = gridData.getStore().getData().items;

            let dataSelected = storeData
                .filter(x => x.data.CHECK === true || x.data.CHECK === 1)
                .map(x => ({ ...x.data }));

            if (dataSelected.length === 0) {
                global.Msg({ msg: 'Please select at least one record to download', icon: 1 });
                return;
            }

            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', dataSelected);

            if (!tmp.success) {
                global.Msg({ msg: 'Error saving selection to temporary table', icon: 2 });
                return;
            }

            let params = me.formatParameters();
            params.IN_CUUID = tmp.cuuid;
            params.IN_FUUID = tmp.fuuid;

            const expectedParams = ['IN_CCUST', 'IN_TFECHA', 'FECHA_FROM', 'FECHA_TO',
                'IN_PROCESADOR', 'IN_TDOC', 'IN_MDA', 'IN_PNR',
                'IN_AREFNBR', 'IN_TICKET', 'IN_PRAXISID', 'IN_FLEXID',
                'IN_CUUID', 'IN_FUUID'];
            expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

            const excelFields = [
                { title: 'Ticket',               field: 'TICKET',                order: 1  },
                { title: 'File Type',            field: 'FILETYPE',              order: 2  },
                { title: 'Mode',                 field: 'A4183MODO',             order: 3  },
                { title: 'SRC',                  field: 'A4183FUENT',            order: 4  },
                { title: 'Sub SRC',              field: 'A4183SUBFU',            order: 5  },
                { title: 'FOP',                  field: 'A4183FP',               order: 6  },
                { title: 'CPN',                  field: 'A4183CUPON',            order: 7  },
                { title: 'SEQ',                  field: 'A4183SEQ',              order: 8  },
                { title: 'Settlement Date',      field: 'A4183FFILE',            order: 9  },
                { title: 'Accounting Date',      field: 'A4183FCONT',            order: 10 },
                { title: 'Account Number',       field: 'A4183CUENT',            order: 11 },
                { title: 'Currency',             field: 'A4183CUR',              order: 12 },
                { title: 'Debit',                field: 'A4183ACTIV',            order: 13 },
                { title: 'Credit',               field: 'A4183PASIV',            order: 14 },
                { title: 'Code Concept',         field: 'A4183ORIG',             order: 15 },
                { title: 'Description Concept',  field: 'A4183TITU',             order: 16 },
                { title: 'Client',               field: 'A4183CLIEN',            order: 17 },
                { title: 'PNR',                  field: 'A4183COPE',             order: 18 },
                { title: 'Provider',             field: 'A4183PROV',             order: 19 },
                { title: 'Praxis ID',            field: 'A4183IDCON',            order: 20 },
                { title: 'Flex ID',              field: 'A4183IDFLE',            order: 21 },
                { title: 'Reference Number',     field: 'A4183AREFN',            order: 22 },
                { title: 'Processor',            field: 'PROCESSOR_DESCRIPTION', order: 23 }
            ];

            await global.callStoreDownloadExcel('PRAXISMP', 'SQP05724', params,
                'Accounting Transaction - All Detail Accounting - ' + win.getFechaFormat(),
                excelFields);

        } catch (e) {
            console.log(e);
            notifier.alert('System Error on Download');
        } finally {
            me.view.setLoading(false);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeFechaBtn: function (obj) {
        const me = this;
        let combo2 = null;
        try {
            let valor1 = Ext.Date.format(obj.getValue(), 'Ymd');
            const opts = {
                'dateTo': () => {
                    combo2 = me.getCmp({id: '-dateFrom'});
                    let valor2 = Ext.Date.format(combo2.getValue(), 'Ymd');
                    if (valor1 >= valor2 && valor2 !== '') {
                        return;
                    }
                    combo2.setValue(obj.getValue());
                },
                'dateFrom': () => {
                    combo2 = me.getCmp({id: '-dateTo'});
                    combo2.setValue(obj.getValue());
                }
            };
            opts[obj.id.split('-').at(-1)]();
        } catch (err) {
            return;
        }
    },
    validaFecha: function (value) {
        if (value === null || value === '') {
            return 'Debe ingresar una fecha.';
        }
        try {
            const selectedDate = Ext.Date.format(value, 'Ym');
            return true;
        } catch (err) {
            return 'Fecha no válida.';
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({id}) {
        return Ext.getCmp(prototype.id + id);
    }
    //</editor-fold>

});


