Ext.define('Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Compensation0425FormController',
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
    onCmbSearchChange: function (obj, records, eOpts) {
        if (obj.getValue() === "TICKET" ) {
             Ext.getCmp( prototype.id + '-IN_TICKET').show();
             Ext.getCmp(prototype.id + '-IN_DATEF').hide();
             Ext.getCmp(prototype.id + '-IN_DATET').hide();
             Ext.getCmp(prototype.id + '-IN_TRNCU').hide();
             Ext.getCmp(prototype.id + '-cmbPaises').hide();
             Ext.getCmp(prototype.id + '-IN_CIATA').hide();
             Ext.getCmp(prototype.id + '-IN_SPNR').hide();
             Ext.getCmp(prototype.id + '-IN_STATUS').hide();
             Ext.getCmp(prototype.id + '-pagination').hide(); 
        }else{
            Ext.getCmp( prototype.id + '-IN_TICKET').hide();
             Ext.getCmp(prototype.id + '-IN_DATEF').show();
             Ext.getCmp(prototype.id + '-IN_DATET').show();
             Ext.getCmp(prototype.id + '-IN_TRNCU').show();
             Ext.getCmp(prototype.id + '-cmbPaises').show();
             Ext.getCmp(prototype.id + '-IN_CIATA').show();
             Ext.getCmp(prototype.id + '-IN_SPNR').show();
             Ext.getCmp(prototype.id + '-IN_STATUS').show();
             Ext.getCmp(prototype.id + '-pagination').show(); 
        }
    },
    loadTickets: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.id + '-gridExceptionTickets');
        let params = me.formatParams();
        console.log("params", params);
        let storeGrid = global.callStorePaggin('PXSAUDIT', 'SQP06086', params);
        grid.setStore(storeGrid);
    },
    // Paleta categorica fija validada (8 huesos, orden fijo - nunca ciclar/reordenar)
    STATUS_PALETTE: ['#2a78d6', '#1baf7a', '#eda100', '#008300', '#4a3aa7', '#e34948', '#e87ba4', '#eb6834'],
    CHART_SURFACE: '#fcfcfb',
    buildStatusColorMap: function (statusCodes) {
        const me = this;
        const ordered = Array.from(new Set(statusCodes)).sort();
        const map = {};
        ordered.forEach(function (code, idx) {
            map[code] = me.STATUS_PALETTE[idx % me.STATUS_PALETTE.length];
        });
        return map;
    },
    loadCharts: async function () {
        const me = this;
        const chartPie = Ext.getCmp(prototype.id + '-chartCompensation0425');
        const chartLineal = Ext.getCmp(prototype.id + '-chartLinealchartCompensation');
        //
        let params = me.formatParams();
        const res = await global.callStoreGet('PXSAUDIT', 'SQP06090', params);
        let storeChartPie = res.lstRs.at(0);
        let rawLineal = res.lstRs.at(1);

        // Sin resultados: limpiar por completo ambos graficos (no dejar datos previos) y ocultarlos
        if (!storeChartPie.length || !rawLineal.length) {
            me.clearCharts(chartPie, chartLineal);
            return;
        }

        chartPie.show();
        chartLineal.show();

        // Un mismo estatus siempre usa el mismo color en ambos graficos
        const colorMap = me.buildStatusColorMap(
                storeChartPie.map(r => r.A4961FLADM).concat(rawLineal.map(r => r.ESTATUS))
                );

        chartPie.setStore(new Ext.data.Store({
            fields: ['A4961FLADM', 'PERCENT'],
            data: storeChartPie
        }));
        chartPie.getSeries()[0].setColors(storeChartPie.map(r => colorMap[r.A4961FLADM] || '#898781'));

        me.renderLinealChart(chartLineal, rawLineal, colorMap);

    },
    clearCharts: function (chartPie, chartLineal) {
        chartPie.setStore(new Ext.data.Store({
            fields: ['A4961FLADM', 'PERCENT'],
            data: []
        }));
        chartLineal.setSeries([]);
        chartLineal.setStore(new Ext.data.Store({
            fields: ['PERIOD'],
            data: []
        }));
        chartPie.hide();
        chartLineal.hide();
    },
    renderLinealChart: function (chart, rawData, colorMap) {
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Estatus distintos presentes en los datos -> una serie/linea por cada uno
        const statuses = Array.from(new Set(rawData.map(r => r.ESTATUS))).sort();

        // Pivot: de "una fila por mes+estatus" a "una fila por mes/año, una columna por estatus"
        const periodsMap = new Map();
        rawData.forEach(function (row) {
            const key = row.ANIO + '-' + row.MES;
            if (!periodsMap.has(key)) {
                const periodRow = {
                    PERIOD: (MONTHS[row.MES - 1] || row.MES) + ' ' + row.ANIO,
                    ANIO: row.ANIO,
                    MES: row.MES
                };
                statuses.forEach(function (st) {
                    periodRow[st] = 0;
                });
                periodsMap.set(key, periodRow);
            }
            periodsMap.get(key)[row.ESTATUS] = row.CANTIDAD;
        });

        const pivoted = Array.from(periodsMap.values()).sort(function (a, b) {
            return (a.ANIO - b.ANIO) || (a.MES - b.MES);
        });

        const series = statuses.map(function (st) {
            const color = (colorMap && colorMap[st]) || '#898781';
            return {
                type: 'line',
                title: st,
                xField: 'PERIOD',
                yField: st,
                style: {
                    stroke: color,
                    lineWidth: 2,
                    lineJoin: 'round',
                    lineCap: 'round'
                },
                marker: {
                    type: 'circle',
                    radius: 4,
                    lineWidth: 2,
                    fill: color,
                    stroke: '#fcfcfb'
                },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        tooltip.setHtml(st + ' - ' + record.get('PERIOD') + ': ' + record.get(st));
                    }
                }
            };
        });

        chart.setAxes([
            {
                type: 'numeric',
                position: 'left',
                fields: statuses,
                title: {
                    text: 'Quantity',
                    fontWeight: 'bold',
                    color: '#52514e'
                },
                grid: {
                    stroke: '#e1e0d9',
                    lineWidth: 1
                },
                style: {
                    strokeStyle: '#c3c2b7'
                },
                label: {
                    color: '#898781'
                },
                minimum: 0,
                renderer: function (axis, label) {
                    return Ext.util.Format.number(label, '0,000');
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: ['PERIOD'],
                title: {
                    text: 'Month / Year',
                    fontWeight: 'bold',
                    color: '#52514e'
                },
                style: {
                    strokeStyle: '#c3c2b7'
                },
                label: {
                    color: '#898781',
                    rotate: {
                        degrees: -45
                    }
                }
            }
        ]);

        chart.setSeries(series);

        chart.setStore(new Ext.data.Store({
            fields: ['PERIOD', 'ANIO', 'MES'].concat(statuses),
            data: pivoted
        }));
    },
    formatParams: function () {
        const form = Ext.getCmp(prototype.id + '-panelFilters').getForm();
        return form.getValues();
    },
    onClickAddBtn: function () {
        const me = this;

        const newWin = Ext.create('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425Reglas', {
            id: prototype.id + '-Compensation0425Reglas-1',
            reloadGrid: me.reloadGrid
        });
        newWin.show();
    },
    loadTaxDetails: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const winId = prototype.id + '-Compensation0425DataEntry';
        const existingWin = Ext.getCmp(winId);
        if (existingWin) {
            existingWin.destroy();
        }
        var win = new Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425DataEntry({
            id: winId,
            params: {
                obj: record.data,
                reloadGrid: me.reloadGrid
            }
        });
        win.show();
    },
    loadHistoryLogDetails: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425Log', {
            id: prototype.id + '-Compensation0425Log-1',
            obj: record.data
        });
        newWin.show();
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    downloadMainGrid: async function () {
        let notifier = new AWN();
        let params = this.formatParams();
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PXSAUDIT', 'SQP06086', params);
            if (res) {
                let data = res.map(x => ({
                        'Ticket': x.A4961TICKET,
                        'SEQ': x.A4961SEQ,
                        'Currency': x.MDA,
                        'Amount': x.A4961NETOR,
                        'Agent': x.A4961AGENT,
                        'Agent Name': x.NIATA,
                        'Sale Country': x.A4961PAIS,
                        'Sale Date': x.A4961FVENT,
                        'Processing Date': x.A4961FPROC,
                        'Notices Date': x.A4961FANOT,
                        'Transaction': x.A4961TRNCU,
                        'Doc. Type': x.A4961TDOC,
                        'PNR': x.A4961PNR,
                        'Pax Name': x.A4961PAX,
                        'Itinerary': x.A4961ITIN,
                        'RFIC': x.A4961VRIC,
                        'EPR': x.A4961EPR,
                        'Associated ticket': x.A4961TKCNX,
                        'Status': x.A4961FLADMDES
                    }));
                global.writeExcelFromJson(data, 'Compensation 0425');
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

