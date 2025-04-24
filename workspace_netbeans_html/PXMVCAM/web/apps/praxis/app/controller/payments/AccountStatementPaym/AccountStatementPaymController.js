Ext.define('Ext.Praxis.controller.payments.AccountStatementPaym.AccountStatementPaymController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountStatementPaymController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
        this.loadSummary();
    },
    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', {IN_STATUS: '1'});
        const cmbPais = Ext.getCmp(prototype.id + '-cmbPaises');
        const cmbMda = Ext.getCmp(prototype.id + '-cmbMoneda');
        const cmbProcs = Ext.getCmp(prototype.id + '-cmbProcessor');
        global.setComboStore(cmbPais, res.lstRs.at(4), 'CODE', 'NAME', '');
        global.setComboStore(cmbMda, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcs, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        filters.setLoading(false);
    },
    onSearchClickBtn: function () {
        const grid = Ext.getCmp(prototype.id + '-summaryGrid');
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        const gridSale = Ext.getCmp(prototype.id + '-saleGrid');
        grid.hide();
        gridDet.hide();
        gridSale.hide();
        this.loadSummary();
    },
    loadSummary: async function () {
        const grid = Ext.getCmp(prototype.id + '-summaryGrid');
        grid.show();
        grid.setLoading(true);
        let params = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();

        const res = await global.callStoreGet('PRAXISMP', 'SQP05561', params);
        if (res.lstRs) {
            let data = res.lstRs.at(0);
            if (data.length === 0) {
                global.Msg({msg: 'No data'});
            }
            let store = new Ext.data.Store({
                data: data,
                pageSize: 20,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            grid.setStore(store);
        }
        grid.setLoading(false);
    },
    loadDetailLiqMatch: async function (obj, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const grid = Ext.getCmp(prototype.id + '-summaryGrid');
        grid.hide();
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        gridDet.show();
        let params = {
            IN_PRDA: record.data.PRDA,
            IN_FCONTL: record.data.FCONTL,
            IN_PROCE: record.data.PROCTYPE,
            IN_PROSQ: record.data.PROCTYPESQ,
            IN_CUR: record.data.SCURRENCY,
            IN_PAIS: record.data.SCOUNTRY,
            IN_STATUS: 'M'
        };
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05562', params);
        gridDet.setStore(store);
    },
    loadDetailLiqPend: async function (obj, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const grid = Ext.getCmp(prototype.id + '-summaryGrid');
        grid.hide();
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        gridDet.show();
        let params = {
            IN_PRDA: record.data.PRDA,
            IN_FCONTL: record.data.FCONTL,
            IN_PROCE: record.data.PROCTYPE,
            IN_PROSQ: record.data.PROCTYPESQ,
            IN_CUR: record.data.SCURRENCY,
            IN_PAIS: record.data.SCOUNTRY,
            IN_STATUS: 'P'
        };
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05562', params);
        gridDet.setStore(store);
    },
    onLoadTicketConcil: async function (obj, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        gridDet.hide();
        const gridSale = Ext.getCmp(prototype.id + '-saleGrid');
        gridSale.show();
        gridSale.setLoading(true);
        let params = {
            IN_CCUST: record.data.CCUST,
            IN_PRDA: record.data.PRDA,
            IN_AREFNBR: record.data.AREFNBR
        };
        const res = await global.callStoreGet('PRAXISMP', 'SQP05563', params);
        if (res.lstRs) {
            let data = res.lstRs.at(0);
            if (data.length === 0) {
                global.Msg({msg: 'No data'});
            }
            let store = new Ext.data.Store({
                data: data,
                pageSize: 20,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            gridSale.setStore(store);
        }
        gridSale.setLoading(false);
    },
    backDetailSummary: function () {
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        gridDet.hide();
        gridDet.getStore().removeAll();
        const grid = Ext.getCmp(prototype.id + '-summaryGrid');
        grid.show();

    },
    backDetailLiq: function () {
        const gridSale = Ext.getCmp(prototype.id + '-saleGrid');
        gridSale.getStore().removeAll();
        gridSale.hide();
        const gridDet = Ext.getCmp(prototype.id + '-detailGrid');
        gridDet.show();

    },

    downloadSummaryDetail: async function () {
        let params = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
        const res = await global.callStoreGet('PRAXISMP', 'SQP05561', params);
        if (res.lstRs) {
            let data = res.lstRs.at(0);
            if (data.length === 0) {
                global.Msg({msg: 'No data'});
            }
            let excel = data.map(x =>
                ({
                    'Processing Date': x.PRDA,
                    'Accounting Date': x.FCONTL,
                    'Processor': x.DESC_PRO,
                    'Country': x.SCOUNTRY,
                    'Currency': x.SCURRENCY,
                    'Qty': x.TOTAL,
                    'Amount': x.VTOTAL,
                    'Qty Match': x.TMATCH,
                    'Amount Match': x.VMATCH,
                    'Qty Pending': x.TPEND,
                    'Amount Pending': x.VPEND
                }));
            global.writeExcelFromJson(excel,'EECC By Payment Summary');
        }
    }

});


