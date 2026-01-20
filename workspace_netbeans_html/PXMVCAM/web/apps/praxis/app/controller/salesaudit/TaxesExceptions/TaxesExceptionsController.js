Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsController',
    taxes: [],
    paises: [],
    afterRender: async function () {
        await this.loadFilters();
        this.loadTickets();
        this.loadCharts();
    },
    loadFilters: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05586', {});
            me.paises = res.lstRs.at(0);
            me.taxes = res.lstRs.at(1);
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            global.setComboStore(cmbPaises, me.paises, 'CODE', 'NAME', '');
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },
    loadTickets: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.id + '-gridExceptionTickets');
        let params = me.formatParams();
        console.log("params", params);
        let storeGrid = global.callStorePaggin('PXSAUDIT', 'SQP05583', params);
        grid.setStore(storeGrid);
    },
    loadCharts: async function () {
        const me = this;
        const chartPie = Ext.getCmp(prototype.id + '-chartPieExceptionTickets');
        const chartLineal = Ext.getCmp(prototype.id + '-chartLinealExceptionTickets');
        console.log("chartPie", chartPie);
        console.log("chartLineal", chartLineal);
        let params = me.formatParams();
        const res = await global.callStoreGet('PXSAUDIT', 'SQP05647', params);
        let storeChartPie = res.lstRs.at(0);
        let storeChartLineal = res.lstRs.at(0);
        console.log("storeChartPie", storeChartPie);
        console.log("storeChartLineal", storeChartLineal);

        // ocultar si no hay resultados
        if (storeChartPie.length <= 0 || storeChartLineal.length <= 0) {
            chartPie.hide();
            chartLineal.hide();
            return;
        }

        chartPie.show();
        chartLineal.show();

        chartPie.setStore(storeChartPie);
        chartLineal.setStore(storeChartLineal);

    },
    formatParams: function () {
        const form = Ext.getCmp(prototype.id + '-panelFilters').getForm();
        return form.getValues();
    },
    onClickAddBtn: function () {
        const me = this;

        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsDataEntry', {
            id: prototype.id + '-TaxesExceptionsDataEntry-1',
            option: 'C',
            taxes: me.taxes,
            reloadGrid: me.reloadGrid
        });
        newWin.show();
    },
    loadTaxDetails: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;

        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsDataEntry', {
            id: prototype.id + '-TaxesExceptionsDataEntry-1',
            option: 'U',
            obj: record.data,
            taxes: me.taxes,
            reloadGrid: me.reloadGrid
        });
        newWin.show();
    },
    loadHistoryLogDetails: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        console.log("record.data", record.data);
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsLog', {
            id: prototype.id + '-TaxesExceptionsLog-1',
            obj: record.data
        });
        newWin.show();
    },
    downloadMainGrid: async function () {
        let notifier = new AWN();
        let params = this.formatParams();
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PXSAUDIT', 'SQP05583', params);
            if (res) {
                let data = res.map(x => ({
                    'Client': x.CCUST,
                    'Agent': x.CIATA,
                    'NMemo': x.A2548NMEMO,
                    'Status': x.ESTADO,
                    'Type': x.TYPE,
                    'Agent Name': x.NIATA,
                    'Sale Country': x.PAISV,
                    'Sale Date': x.SDATE,
                    'Transaction': x.TRNCU,
                    'Doc. Type': x.TDOC,
                    'Ticket': x.CCIA + x.FORMA + x.SERIE,
                    'SEQ': x.SEQ,
                    'TAX EXCEPTIONS': x.TAX_EXCEPTIONS,
                    'COMMENT EXCEPTIONS': x.COMMENT_EXCEPTIONS,
                    'PNR': x.SPNR,
                    'Pax Name': x.PAXNAME,
                    'Itinerary': x.RUTABOL,
                    'Type Load': x.TIPOING,
                    'User Created': x.USCR,
                    'Date Created': x.FECR,
                    'User Update': x.USUP,
                    'Date Update': x.FEUP
                }));
                global.writeExcelFromJson(data, 'Tax Exceptions');
            }
        };
        notifier.async(dwl(), 'Successfully Download', 'Error on Download', 'Downloading File');
    },
    onMassiveLoad: function () {
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsMassiveLoad', {
            id: prototype.id + '-TaxesExceptionsMassiveLoad-1',
            reloadGrid: this.reloadGrid
        });
        newWin.show();
    },
    reloadGrid: function () {
        const grid = Ext.getCmp(prototype.id + '-gridExceptionTickets');
        grid.getStore().load();
    },

    //<editor-fold defaultstate="collapsed" desc="Options">
    onClickSearchBtn: function () {
        this.loadTickets();
        this.loadCharts();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickToggleFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-panelFilters');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearOptionsBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-panelFilters');
        panelFilters.reset();
    }
    //</editor-fold>

});

