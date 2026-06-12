Ext.define('Ext.Praxis.controller.payments.InputsTamiz.InputsTamizController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsTamizController',
    fecha: new Date(),
    searchParamsCalendar: null,
    searchParamsDetail: null,
    procesadores: null,
    init: function (view) {
        me = this;
        prototype.id = 'InputsTamizForm';
        prototype.url = CONTEXTPATH + '/InputsTmz';

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#InputsTamizForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InputsTamizForm-btnSearch': {
                click: this.onClickSearchBtn
            },
            '#InputsTamizForm-cmbVISTA': {
                change: this.onChangeComboTipo
            },
            '#InputsTamizForm-cmbFUENTE': {
                change: this.onChangeComboProcesador
            },
            '#InputsTamizForm-cmbSourceCalendar': {
                change: this.onChangeComboProcesador
            },
            '#InputsTamizForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsTamizForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsTamizForm-cmbYear': {
                afterrender: this.afterRenderYear
            },
            '#InputsTamizForm-btnClear': {
                click: this.onClearClick
            },
            '#InputsTamizForm-btnFilter': {
                click: this.onFilterClick
            }
        });
    },
    xpanel_afterrender: async function (obj, e) {
        win.lblUser_toolTip("Estructura: A4305 | A4344");
        await this.fillFiltersStores();
        this.renderSummaryDetail();
        //this.pruebaEndpoints();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    cbxDateFromMonth_Change: function () {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromMonth_Day: function () {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    onChangeComboTipo: function (obj) {
        const me = this;
        Ext.getCmp(prototype.id + '-regionCenterForm01').removeAll();

        const opciones = {
            'C': () => {
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();
                Ext.getCmp(prototype.id + '-cmbDateFromDay').hide();
                Ext.getCmp(prototype.id + '-cmbDateToYear').hide();
                Ext.getCmp(prototype.id + '-cmbDateToMonth').hide();
                Ext.getCmp(prototype.id + '-cmbDateToDay').hide();
                Ext.getCmp(prototype.id + '-cmbFileType').hide();
                Ext.getCmp(prototype.id + '-cmbSourceCalendar').show();
                Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC').hide();
                Ext.getCmp(prototype.id + '-btnDaysReceiptSettlement').show();
                me.setCalendarParameters();
            },
            'D': () => {
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
                Ext.getCmp(prototype.id + '-cmbDateToYear').show();
                Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateToDay').show();
                Ext.getCmp(prototype.id + '-cmbFileType').show();
                Ext.getCmp(prototype.id + '-cmbSourceCalendar').hide();
                Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC').show();
                Ext.getCmp(prototype.id + '-btnDaysReceiptSettlement').hide();
                me.setDetailParameters();
            }
        };
        //console.log(obj.getValue());
        opciones[obj.getValue()]();
    },
    onChangeComboProcesador: function () {
        const comboTipo = Ext.getCmp(prototype.id + '-cmbVISTA').getValue();
        const opciones = {
            'C': () => {
                this.setCalendarParameters();
                this.renderCalendarControl();
            },
            'D': () => {
                this.setDetailParameters();
                this.renderSummaryDetail();
            }
        };
        opciones[comboTipo]();
    },
    onChangeFileType: function (obj) {
        const me = this;
        const ft = obj.getValue();
        const cmbProc = Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC');
        console.log("me.procesadores in onChangeFileType ", me.procesadores);
        cmbProc.bindStore(null);
        const opts = {
            'P': () => {
                return Ext.create('Ext.data.Store', {
                    data: me.procesadores.filter(x => x.A4451FECH1.trim() === 'P')
                });
            },
            'C': () => {
                return Ext.create('Ext.data.Store', {
                    data: me.procesadores.filter(x => x.A4451FECH1.trim() === 'C')
                });
            }
        };
        if (opts[ft]) {
            const store = opts[ft]();
            store.insert(0, {A051KEY2: '', A051DESCR1: 'All'});
            cmbProc.bindStore(store);
            cmbProc.setValue('');
        }
    },
    onClickSearchBtn: function () {
        const comboTipo = Ext.getCmp(prototype.id + '-cmbVISTA').getValue();
        const opciones = {
            'C': () => {
                this.setCalendarParameters();
                this.renderCalendarControl();
            },
            'D': () => {
                this.setDetailParameters();
                this.renderSummaryDetail();
            }
        };
        opciones[comboTipo]();
    },
    setDetailParameters: function () {
        let IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '01') +
                (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '01');

        let IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '12') +
                (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '31');

        let TIPO = Ext.getCmp(prototype.id + '-cmbFileType').getValue();

        let PROCESADOR = Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC').getValue() || '';
        
        searchParamsDetail = {
            FECHA_FROM: IN_FECHA_FROM,
            FECHA_TO: IN_FECHA_TO,
            TIPO: TIPO.trim(),
            NPROCESADOR: PROCESADOR.trim()
        };

        console.log('procesador',PROCESADOR.trim());
        console.log("ssearchParamsDetail",searchParamsDetail) ;

    },
    setCalendarParameters: function () {
        let CCUST = '139';
        let PROCESADOR = Ext.getCmp(prototype.id + '-cmbSourceCalendar').getValue();
        let ANIO = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        searchParamsCalendar = {
            IN_CCUST: CCUST,
            IN_PROCESSOR: PROCESADOR,
            IN_YEAR: ANIO
        };
    },
    fillFiltersStores: async function () {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.mask('Loading Filters...');
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbVISTA = Ext.getCmp(prototype.id + '-cmbVISTA');
        cmbVISTA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [ 
                ["D", "Detail"],
                ["C", "Calendar"]
            ]
        }));

        const res = await global.callStoreGet('PRAXISMP', 'SQP04971', {TIPO: 'PR', STATUS: '1'});
        const processors = res?.lstRs?.[0] || [];
        console.log("lstFuentes ", processors);

        global.setComboStore(Ext.getCmp(prototype.id + '-cmbSourceCalendar'),  processors, 'A051KEY2', 'A051DESCR1', '');

        me.procesadores = processors;
        cmbVISTA.setValue("D");
        me.onChangeFileType(Ext.getCmp(prototype.id + '-cmbFileType'));
        filters.unmask();

    },
    renderCalendarControl: async function () {
        if (!searchParamsCalendar.IN_PROCESSOR) {
            global.Msg({msg: 'Choose your Processor'});
            return;
        }
        let me = this;
        let panel = Ext.getCmp(prototype.id + '-regionCenterForm01');
        panel.mask('Loading...');
        var component = Ext.getCmp(prototype.id + '-calendarForm-01'); //obtener el componente por su ID
        if (component) {
            component.destroy(); //destruir el componente
        }
        const res = await global.callStoreGet('PRAXISMP', 'SQP05723', {...searchParamsCalendar });
        const data = res?.lstRs?.[0] || [];
        console.log("data",data);
        let calendario = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.CalendarTmz', {
            id: prototype.id + '-calendarForm-01',
            anio: searchParamsCalendar.IN_YEAR,
            dataFechas: data,
            clickCallback: me.onClickFecha
        });
        panel.add(calendario);
        panel.unmask();
    },
    renderSummaryDetail: async function () {
        let panel = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let TIPO = Ext.getCmp(prototype.id + '-cmbFileType').getValue();
        panel.mask('Loading...');
        panel.removeAll();

        let params = {
            FECHA_FROM: searchParamsDetail.FECHA_FROM,
            FECHA_TO: searchParamsDetail.FECHA_TO,
            NPROCESADOR: searchParamsDetail.NPROCESADOR
        };

        console.log('params',params);

        let program = TIPO === 'P' ? 'SQP04974' : 'SQP05030';

        try {
            const res = await global.callStoreGet('PRAXISMP', program, params);
            const data = res?.lstRs?.[0] || [];

            let summary = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataSummary', {
                id: prototype.id + '-summaryForm-01',
                searchParams: searchParamsDetail,
                searchUrl: '', // Not used anymore as we inject data directly
                clickCallback: null,
                gridtype: TIPO
            });

            panel.add(summary);

            // Esperar a que el grid esté disponible en el DOM principal para setear el store
            setTimeout(function () {
                const grid = Ext.getCmp(prototype.id + '-grid-summary01');
                if (grid && grid.setStore) {
                    const store = Ext.create('Ext.data.Store', {
                        pageSize: 20,
                        data: data,
                        proxy: { type: 'memory', enablePaging: true },
                        autoLoad: true
                    });
                    grid.setStore(store);
                } else {
                    global.Msg({msg: 'No se encontró el grid para mostrar los datos.'});
                }
            }, 50);

        } catch (e) {
            global.Msg({msg: 'Error cargando los datos.'});
            console.error(e);
        } finally {
            if (panel.unmask) panel.unmask();
        }
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onClickFecha: function (obj) {
        let searchParamsCalendarDE = {
            CCUST: '139',
            TIPO: obj.procesador || '',
            FECHA_FROM: obj.fecha || ''
        };
        //console.log(searchParamsCalendarDE);
        let dataEntry = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.CalendarTmzDataEntry', {
            id: prototype.id + '-calendarDataEntry-01',
            searchParams: searchParamsCalendarDE
        });
        dataEntry.show();
    },
    onClickReceivedProcessor: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.RECEIVED > 0) {
            this.getDataDetailProcessor(obj, '0');
        }
    },
    onClickReceivedComplement: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.RECEIVED > 0) {
            this.getDataDetailComplement(obj, 'R');
        }
    },
    onClickLoadedProcessor: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.LOADED > 0) {
            this.getDataDetailProcessor(obj, '1');
        }
    },
    onClickLoadedComplement: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.RECEIVED > 0) {
            this.getDataDetailComplement(obj, 'L');
        }
    },
    onClickExoneradosProcessor: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.EXONERATED > 0) {
            this.getDataDetailProcessor(obj, '2');
        }
    },
    onClickByPaymentProcessor: function (obj) {
        const data = obj.lastFocused.record.data;
        if (data && data.BY_PAYMENT > 0) {
            this.getDataDetailProcessor(obj, '3');
        }
    },
    getDataDetailProcessor: function (obj, typeDetail) {
        const tipoLabels = {
            '0': 'Received',
            '1': 'Loaded',
            '2': 'Exonerated',
            '3': 'ByPayment'
        };
        const estructuras = {
            '0': 'Estructura: A4305',
            '1': 'Estructura: A4344',
            '2': 'Estructura: A4305',
            '3': 'Estructura: A4331'
        };
        const tipoLabel = tipoLabels[typeDetail] || 'Unknown';
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let procesador = data.PROCESADOR.trim().substring(0, 4) === 'AMEX'
                ? data.PROSEQ.trim() : data.PROCESADOR.trim();
        let params = {
            PROCESADOR: procesador,
            FECHA_FROM: data.PRDA,
            TIPO: typeDetail
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailProcessor', {
            id: prototype.id + '-detailProcessorForm-01',
            titleGrid: `${data.NOMBREPROC.trim()} ${data.PRDA}`,
            tipoGrid: typeDetail,
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
        setTimeout(function () {
            const store = global.callStorePaggin('PRAXISMP', 'SQP04976', params);
            const grid = Ext.getCmp(prototype.id + `-grid-${tipoLabel}01`);
            const paging = Ext.getCmp(prototype.id + `-${tipoLabel}-paggin01`);
            if (grid) {
                grid.bindStore(store);
                grid.downloadParams = Ext.apply({}, params);
            }
            if (paging) paging.bindStore(store);
        }, 50);
    },
    getDataDetailComplement: function (obj, tipo) {
        const tipoLabel = tipo === 'R' ? 'Received' : 'Loaded';
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let params = {
            TIPO: tipo,
            COMPLEMENTO: data.PROCESADOR,
            FECHA_FROM: data.PRDA
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailComplement', {
            id: prototype.id + '-detailComplementForm-01',
            titleGrid: `${data.NOMBREPROC.trim()} ${data.PRDA}`,
            searchParams: params,
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
        setTimeout(function () {
            const store = global.callStorePaggin('PRAXISMP', 'SQP05033', params);
            const grid = Ext.getCmp(prototype.id + `-grid-${tipoLabel}01`);
            const paging = Ext.getCmp(prototype.id + `-${tipoLabel}-paggin01`);
            nuevoPanel.configurarCols(grid, store);
            if (paging) paging.bindStore(store);
        }, 50);
    },
    onClearClick: function () {
        this.fillFiltersStores();
    },
    onFilterClick: function () {
        const opts = Ext.getCmp(prototype.id + '-contentFilter');
        if (opts.isVisible()) { 
            opts.hide();
        } else {
            opts.show();
        }
    },
    onClickViewDaysReceiptSettlement: function () {
        let dataEntry = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.DataEntrys.DaysReceiptSettlementDataEntry', {
            id: prototype.id + '-DaysReceiptSettlementDataEntry-01'
        });
        dataEntry.show();
    },
    //<editor-fold defaultstate="collapsed" desc="Descarga Exceles">
    downloadProcessor: async function (obj) {
        const grid = obj.up('gridpanel');
        if (!grid) {
            global.Msg({msg: 'No se encontró el grid'});
            return;
        }
        const params = Object.assign({}, grid.downloadParams || {});
        const tipoGrid = params.TIPO;

        const records = await global.callStorePagginExcel('PRAXISMP', 'SQP04976', params);
        if (!records || !records.length) {
            global.Msg({msg: 'No data to export'});
            return;
        }

        const colsA4305 = [
            {title: 'Seq',                  field: 'RN'},
            {title: 'Grupo',                field: 'A4305GRUPO'},
            {title: 'Procesador',           field: 'A4305PROCE'},
            {title: 'Fecha de Proceso',     field: 'A4305PRDA'},
            {title: 'Territorio',           field: 'A4305TERRI'},
            {title: 'Pais',                 field: 'A4305PAIS'},
            {title: 'Merchant ID',          field: 'A4305MERID'},
            {title: 'Merchant Liq Pago',    field: 'A4305MERPG'},
            {title: 'Merchant ID Party',    field: 'A4305MERPI'},
            {title: 'Merchant Pago Party',  field: 'A4305MERPP'},
            {title: 'Fecha Transaccion',    field: 'A4305FECTR'},
            {title: 'Num. Tarjeta',         field: 'A4305NUMTJ'},
            {title: 'Num. Autorizacion',    field: 'A4305NUMAT'},
            {title: 'Num. Cuotas',          field: 'A4305NUMCU'},
            {title: 'Total Cuotas',         field: 'A4305TOTCU'},
            {title: 'Plan de Pagos',        field: 'A4305PLANP',
                valueGetter: function (row) {
                    const opts = {'R': 'REGULAR', 'C': 'CUOTAS', '': ''};
                    const val = (row.A4305PLANP || '').trim();
                    return val in opts ? opts[val] : row.A4305PLANP;
                }
            },
            {title: 'Cia',                  field: 'A4305CIA'},
            {title: 'Documento',            field: '',
                valueGetter: function (row) {
                    return (row.A4305FORMA || '') + (row.A4305SERIE || '');
                }
            },
            {title: 'Dig. Chequeo',         field: 'A4305DCHEQ'},
            {title: 'PNR',                  field: 'A4305PNR'},
            {title: 'Cod. Razon',           field: 'A4305RFIC'},
            {title: 'Subc. Razon',          field: 'A4305RFIS'},
            {title: 'Agente',               field: 'A4305IATA'},
            {title: 'Pais Venta',           field: 'A4305PSVTA'}
        ];

        const colsMap = {
            '0': colsA4305,
            '1': [
                {title: 'RN',            field: 'RN'},
                {title: 'Procesador',    field: 'PROCESADOR'},
                {title: 'Carrier',       field: 'CXRRNUM'},
                {title: 'Max Long',      field: 'TAMMAXLONG'},
                {title: 'Fecha Proceso', field: 'TRADM'}
            ],
            '2': colsA4305,
            '3': [
                {title: 'Seq',                    field: 'RN'},
                {title: 'Processing Date',         field: 'PRDA'},
                {title: 'Payment Date',            field: 'PAYDATE'},
                {title: 'Procesador',              field: 'PROCESSOR_DESCRIPTION'},
                {title: 'Pais',                    field: 'SCOUNTRY'},
                {title: 'Payment Merchant ID',     field: 'PMERCHID'},
                {title: 'Status Settl. VS Sales',  field: 'STVAL_DESCRIPTION'},
                {title: 'Doc. Type',               field: 'TRANSTYPE'},
                {title: 'Num. Tarjeta',            field: 'SCARDN'},
                {title: 'Num. Autorizacion',       field: 'SAUTHOC'},
                {title: 'PNR',                     field: 'SPNR'},
                {title: 'ARN',                     field: 'ARN'},
                {title: 'Ref. Number',             field: 'AREFNBR'},
                {title: 'Curr',                    field: 'SCURRENCY'},
                {title: 'Transaction Amount',      field: 'TGROSAMOUN', dataAlign: 'right'},
                {title: 'Sale Amount',             field: 'SVFOPS',     dataAlign: 'right'},
                {title: 'Diff. Amount',            field: 'DIFFERENCE', dataAlign: 'right'},
                {title: 'Qty Tkts',                field: 'QTYTKT'}
            ]
        };

        const columns = colsMap[tipoGrid];

        const tipoLabels = {'0': 'Received', '1': 'Loaded', '2': 'Exonerated', '3': 'ByPayment'};
        const nameFile = 'ProcessorDetail_' + (tipoLabels[tipoGrid] || tipoGrid) + '_' + (new Date().toISOString().slice(0, 10));

        await global.writeExcelFromJsonWithStyle({
            data: records,
            name: nameFile,
            columns: columns
        });
    },
    downloadComplement: async function (obj) {
        const panel = obj.up().up().up();
        const params = Object.assign({}, panel.searchParams);
        const tipo = params.TIPO;
        const complemento = params.COMPLEMENTO;

        const records = await global.callStorePagginExcel('PRAXISMP', 'SQP05033', params);
        if (!records || !records.length) { global.Msg({msg: 'No data to export'}); return; }

        const colsReceived = [
            {title: 'RN',               field: 'RN'},
            {title: 'Processing Date',  field: 'PRDA'},
            {title: 'Complement Type',  field: 'CMPLTYPE'},
            {title: 'ID File',          field: 'IDFIL'},
            {title: 'SQNR',             field: 'SQNR'},
            {title: 'Record Type',      field: 'RECTYPE'},
            {title: 'Max Long',         field: 'MAXLONG'}
        ];

        const colsPLUSG00 = [
            {title: 'RN',          field: 'RN'},
            {title: 'AMOUNTOFF',   field: 'AMOUNTOFF'},
            {title: 'AMOUNTOTP',   field: 'AMOUNTOTP'},
            {title: 'AMOUNTPAX',   field: 'AMOUNTPAX'},
            {title: 'AREFNBR',     field: 'AREFNBR'},
            {title: 'AUXDAT',      field: 'AUXDAT'},
            {title: 'CCUST',       field: 'CCUST'},
            {title: 'CERROR',      field: 'CERROR'},
            {title: 'COUNTRY',     field: 'COUNTRY'},
            {title: 'CUROFFER',    field: 'CUROFFER'},
            {title: 'CURRPARTN',   field: 'CURRPARTN'},
            {title: 'DATEUPUTC',   field: 'DATEUPUTC'},
            {title: 'DEPDATE',     field: 'DEPDATE'},
            {title: 'DEPTIME',     field: 'DEPTIME'},
            {title: 'DEST',        field: 'DEST'},
            {title: 'EMDNUMBER',   field: 'EMDNUMBER'},
            {title: 'FARECLASS',   field: 'FARECLASS'},
            {title: 'INSUPGRAD',   field: 'INSUPGRAD'},
            {title: 'LIVEAOPEN',   field: 'LIVEAOPEN'},
            {title: 'MERCHID',     field: 'MERCHID'},
            {title: 'NEWTKTNBR',   field: 'NEWTKTNBR'},
            {title: 'ORIBOOKCL',   field: 'ORIBOOKCL'},
            {title: 'ORIG',        field: 'ORIG'},
            {title: 'PAYTOKEN',    field: 'PAYTOKEN'},
            {title: 'PAYTRANID',   field: 'PAYTRANID'},
            {title: 'PLUSGRAID',   field: 'PLUSGRAID'},
            {title: 'PNR',         field: 'PNR'},
            {title: 'PRDA',        field: 'PRDA'},
            {title: 'QTYTKT',      field: 'QTYTKT'},
            {title: 'SAGENT',      field: 'SAGENT'},
            {title: 'SCARCOD',     field: 'SCARCOD'},
            {title: 'SCARDBIN',    field: 'SCARDBIN'},
            {title: 'SDATE',       field: 'SDATE'},
            {title: 'SDATES',      field: 'SDATES'},
            {title: 'TRVFIRSNA',   field: 'TRVFIRSNA'},
            {title: 'TRVLASTNA',   field: 'TRVLASTNA'},
            {title: 'UPGRATYPE',   field: 'UPGRATYPE'},
            {title: 'USERTICKE',   field: 'USERTICKE'},
            {title: 'USERUPGRA',   field: 'USERUPGRA'}
        ];

        const colsLIGTAB00 = [
            {title: 'RN',          field: 'RN'},
            {title: 'AREFNBR',     field: 'AREFNBR'},
            {title: 'BANCOEMI',    field: 'BANCOEMI'},
            {title: 'CCUST',       field: 'CCUST'},
            {title: 'CERROR',      field: 'CERROR'},
            {title: 'CHADJNBR',    field: 'CHADJNBR'},
            {title: 'COUNTRY',     field: 'COUNTRY'},
            {title: 'ESTATUS',     field: 'ESTATUS'},
            {title: 'MERCHID',     field: 'MERCHID'},
            {title: 'NAMECARD',    field: 'NAMECARD'},
            {title: 'NAMECLIEN',   field: 'NAMECLIEN'},
            {title: 'NAMEMERCH',   field: 'NAMEMERCH'},
            {title: 'OPERATNBR',   field: 'OPERATNBR'},
            {title: 'PNR',         field: 'PNR'},
            {title: 'PRDA',        field: 'PRDA'},
            {title: 'SAUTHOC',     field: 'SAUTHOC'},
            {title: 'SCARDN',      field: 'SCARDN'},
            {title: 'SDATE',       field: 'SDATE'},
            {title: 'SUCURNAME',   field: 'SUCURNAME'},
            {title: 'SVFOP',       field: 'SVFOP'},
            {title: 'TICKET1',     field: 'TICKET1'},
            {title: 'TICKET2',     field: 'TICKET2'},
            {title: 'TICKET3',     field: 'TICKET3'},
            {title: 'TICKET4',     field: 'TICKET4'},
            {title: 'TICKET5',     field: 'TICKET5'},
            {title: 'TICKET6',     field: 'TICKET6'},
            {title: 'TICKET7',     field: 'TICKET7'},
            {title: 'TICKET8',     field: 'TICKET8'},
            {title: 'TICKET9',     field: 'TICKET9'},
            {title: 'TICKET10',    field: 'TICKET10'},
            {title: 'TIPOCARD',    field: 'TIPOCARD'},
            {title: 'TIPOPAGO',    field: 'TIPOPAGO'},
            {title: 'TIPOVENTA',   field: 'TIPOVENTA'},
            {title: 'USERCOBRO',   field: 'USERCOBRO'}
        ];

        const colsMIT00 = [
            {title: 'RN',                   field: 'RN'},
            {title: 'Processor',            field: 'A4775PROCE'},
            {title: 'Processing Date',      field: 'A4775PRDA'},
            {title: 'Merchant',             field: 'A4775MERID'},
            {title: 'Iata',                 field: 'A4775MERPG'},
            {title: 'Transaction Date',     field: 'A4775FECTR'},
            {title: 'Transaction Time',     field: 'A4775HORTR'},
            {title: 'Card Number',          field: 'A4775NUMTJ'},
            {title: 'Auth.',                field: 'A4775NUMAT'},
            {title: 'Card Type',            field: 'A4775PRICD'},
            {title: 'Payment Type',         field: 'A4775PLANP'},
            {title: 'Issuer',               field: 'A4775EMISO'},
            {title: 'PNR',                  field: 'A4775PNR'},
            {title: 'Currency',             field: 'A4775MONED'},
            {title: 'Amount',               field: 'A4775IMPOR', valueGetter: (r) => parseFloat(r.A4775IMPOR) || 0},
            {title: 'Type Transaction',     field: 'A4775TRXTP'},
            {title: 'Issuing Bank',         field: 'A4775BANCO'},
            {title: 'Number Operation',     field: 'A4775NROOP'},
            {title: 'Status',               field: 'A4775STATU'},
            {title: 'Status Transaction',   field: 'A4775STVAL'},
            {title: 'User',                 field: 'A4775USUAR'},
            {title: 'User Transaction',     field: 'A4775USUAT'}
        ];

        const colsDEUNA00 = [
            {title: 'RN',                       field: 'RN'},
            {title: 'Order ID',                 field: 'A4791ORDER'},
            {title: 'Processing Date',          field: 'A4791PRDA'},
            {title: 'Ticket',                   field: 'A4791TKT'},
            {title: 'PNR',                      field: 'A4791PNR'},
            {title: 'Transaction Id',           field: 'A4791TRANS'},
            {title: 'Card Number',              field: 'SCARDN'},
            {title: 'Auth.',                    field: 'A4791AUTH'},
            {title: 'Issue.',                   field: 'A4791ISSBK'},
            {title: 'Method Type',              field: 'A4791MTYPE'},
            {title: 'Card Brand',               field: 'A4791CARDB'},
            {title: 'Currency',                 field: 'A4791CURRE'},
            {title: 'Total',                    field: 'A4791TOTAL',  valueGetter: (r) => parseFloat(r.A4791TOTAL)  || 0},
            {title: 'Sub Total',                field: 'A4791SUBTO',  valueGetter: (r) => parseFloat(r.A4791SUBTO)  || 0},
            {title: 'Ship Amount Total',        field: 'A4791SHIPT',  valueGetter: (r) => parseFloat(r.A4791SHIPT)  || 0},
            {title: 'Discount Amount Total',    field: 'A4791DISCO',  valueGetter: (r) => parseFloat(r.A4791DISCO)  || 0},
            {title: 'Tax Amount Total',         field: 'A4791TAX',    valueGetter: (r) => parseFloat(r.A4791TAX)    || 0},
            {title: 'Total Amount With Taxes',  field: 'A4791TOTWT',  valueGetter: (r) => parseFloat(r.A4791TOTWT)  || 0},
            {title: 'Total Order Amount',       field: 'A4791TORDE',  valueGetter: (r) => parseFloat(r.A4791TORDE)  || 0},
            {title: 'Status Complement',        field: 'A4791STATU'},
            {title: 'DEUNA Processor',          field: 'A4791PROCE'},
            {title: 'Reconciliation Status',    field: 'STVAL_DESCRIPTION'},
            {title: 'Reconciliation Processor', field: 'PROSQ_DESCRIPTION'},
            {title: 'Processing Date (Load)',   field: 'A4791PRDAL'},
            {title: 'Ref. Number',              field: 'A4791AREFN'},
            {title: 'Merchant Id',              field: 'A4791MERID'},
            {title: 'Merchant Country',         field: 'A4791MERPS'},
            {title: 'Interest Rate',            field: 'A4791RATE'},
            {title: 'MSI',                      field: 'A4791MSI'},
            {title: 'Installments',             field: 'A4791INSTA'},
            {title: 'Installments Amount',      field: 'A4791INSTM',  valueGetter: (r) => parseFloat(r.A4791INSTM)  || 0},
            {title: 'Date Create',              field: 'A4791FECPG'},
            {title: 'Updated User',             field: 'A4791REVIS'},
            {title: 'Updated Date',             field: 'A4791FREVI'}
        ];

        const colsMap = {
            'PLUSG00':  colsPLUSG00,
            'LIGTAB00': colsLIGTAB00,
            'MIT00':    colsMIT00,
            'DEUNA00':  colsDEUNA00
        };

        const columns = tipo === 'R' ? colsReceived : (colsMap[complemento] || colsReceived);
        const nameFile = 'Complement_' + (complemento || tipo) + '_' + params.FECHA_FROM;
        await global.writeExcelFromJsonWithStyle({ data: records, name: nameFile, columns: columns });
    },
    downloadDetailSummaryInfo: async function () {
        const grid = Ext.getCmp(prototype.id + '-grid-summary01');
        if (!grid) {
            global.Msg({ msg: 'No grid found for export' });
            return;
        }

        const store = grid.getStore();
        let allRows = [];
        if (store) {
            const proxy = store.getProxy ? store.getProxy() : null;
            const proxyData = proxy ? (proxy.getData ? proxy.getData() : proxy.data) : null;

            if (Array.isArray(proxyData)) {
                allRows = proxyData;
            } else if (store.getRange && Array.isArray(store.getRange())) {
                allRows = store.getRange();
            } else if (store.getData && Array.isArray(store.getData().items)) {
                allRows = store.getData().items;
            }
        }

        const records = allRows.map(item => item && item.data ? item.data : item);
        if (!records.length) {
            global.Msg({ msg: 'No data to export' });
            return;
        }

        const TIPO = Ext.getCmp(prototype.id + '-cmbFileType').getValue();
        let columns;

        if (TIPO === 'P') {
            columns = [
                { title: 'SEQ',              field: 'RN' },
                { title: 'Processing\nDate', field: 'PRDA' },
                { title: 'Load\nDate',       field: 'FREGIS' },
                { title: 'Source',           field: 'NOMBREPROC' },
                { title: 'Received',         field: 'RECEIVED' },
                { title: 'Loaded',           field: 'LOADED' },
                { title: 'Exonerated',       field: 'EXONERATED' },
                { title: 'By Payment',       field: 'BY_PAYMENT' },
                { title: 'Loaded vs By Payment', field: 'LOADED_VS_BY_PAYMENT' }, 
            ];
        } else {
            columns = [
                { title: 'SEQ',              field: 'RN' },
                { title: 'Processing\nDate', field: 'PRDA' },
                { title: 'Complement',       field: 'NOMBREPROC' },
                { title: 'Received',         field: 'RECEIVED' },
                { title: 'Loaded',           field: 'LOADED' },
                { title: 'Difference',       field: 'DIFFERENCE' }
            ];
        }
        
        const nameFile = 'DetailSummary_' + (new Date().toISOString().slice(0, 10));

        await global.writeExcelFromJsonWithStyle({
            data: records,
            name: nameFile,
            columns: columns
        });
    }
    //</editor-fold>

});