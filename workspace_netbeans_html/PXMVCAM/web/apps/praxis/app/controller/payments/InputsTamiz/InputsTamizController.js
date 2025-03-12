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
                Ext.getCmp(prototype.id + '-cmbFUENTE').show();
                Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC').hide();
                me.setCalendarParameters();
            },
            'D': () => {
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
                Ext.getCmp(prototype.id + '-cmbDateToYear').show();
                Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateToDay').show();
                Ext.getCmp(prototype.id + '-cmbFileType').show();
                Ext.getCmp(prototype.id + '-cmbFUENTE').hide();
                Ext.getCmp(prototype.id + '-cmbFUENTE-det-PROC').show();
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
        //console.log(me.procesadores);
        cmbProc.bindStore(null);
        const opts = {
            'P': () => {
                return Ext.create('Ext.data.Store', {
                    data: me.procesadores.filter(x => x.a4451FECH1.trim() === 'P')
                });
            },
            'C': () => {
                return Ext.create('Ext.data.Store', {
                    data: me.procesadores.filter(x => x.a4451FECH1.trim() === 'C')
                });
            }
        };
        if (opts[ft]) {
            const store = opts[ft]();
            store.insert(0, {a051KEY2: '', a051DESCR1: 'All'});
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
        //console.log(PROCESADOR.trim());
        searchParamsDetail = {
            FECHA_FROM: IN_FECHA_FROM,
            FECHA_TO: IN_FECHA_TO,
            TIPO: TIPO.trim(),
            NPROCESADOR: PROCESADOR.trim()
        };
    },
    setCalendarParameters: function () {
        let CCUST = '139';
        let PROCESADOR = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();
        let ANIO = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        searchParamsCalendar = {
            CCUST: CCUST,
            TIPO: PROCESADOR,
            FROM_YEAR: ANIO
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
        await fetch(prototype.url + '/getInfoCombos?' + new URLSearchParams({TIPO: 'PR', STATUS: '1'}))
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        //console.log(data);
                        Ext.getCmp(prototype.id + '-cmbFUENTE').bindStore(
                                Ext.create('Ext.data.Store',
                                        {data: data.lstFuentes, autoLoad: true}));
                        me.procesadores = data.lstFuentes;
                        cmbVISTA.setValue("D");
                        me.onChangeFileType(Ext.getCmp(prototype.id + '-cmbFileType'));
                        filters.unmask();
                    }
                });

    },
    renderCalendarControl: async function () {
        if (!searchParamsCalendar.TIPO) {
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
        //console.log(searchParamsCalendar);
        const data = await fetch(prototype.url + '/getCalendarInfo?' + new URLSearchParams(searchParamsCalendar))
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        //console.log(data);
                        return data;
                    }
                });
        let calendario = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.CalendarTmz', {
            id: prototype.id + '-calendarForm-01',
            anio: searchParamsCalendar.FROM_YEAR,
            dataFechas: data,
            clickCallback: me.onClickFecha
        });
        panel.add(calendario);
        panel.unmask();
    },
    renderSummaryDetail: function () {
        let curl = prototype.url + '/getDetailSummaryInfo';
        //console.log(curl);
        let panel = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let TIPO = Ext.getCmp(prototype.id + '-cmbFileType').getValue();
        panel.mask('Loading...');
        panel.removeAll();
        let summary = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridData', {
            id: prototype.id + '-summaryForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            clickCallback: null,
            gridtype: TIPO
        });
        panel.add(summary);
        panel.unmask();
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
    onClickReceived: function (obj) {
        //console.log(obj.lastFocused.record.data);
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let curl = prototype.url + '/getDataGridInfo';
        let procesador = data.procesador.trim().substring(0, 4) === 'AMEX'
                ? data.proseq.trim() : data.procesador.trim();
        let searchParamsDetail = {
            PROCESADOR: procesador,
            FECHA_FROM: data.prda,
            TIPO: '0',
            total: 0
                    //excel:false,
                    //total:0
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetail', {
            id: prototype.id + '-detailForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            titleGrid: `${data.nombreproc.trim()} ${data.prda}`,
            tipoGrid: '0',
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
    },
    onClickReceivedC: function (obj) {
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let curl = prototype.url + '/getDataGridCInfo';
        //console.log(data);
        let searchParamsDetail = {
            COMPLEMENTO: data.procesador,
            FECHA_FROM: data.prda,
            TIPO: 'R'
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetailC', {
            id: prototype.id + '-detailCForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
    },
    onClickLoaded: function (obj) {
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let curl = prototype.url + '/getDataGridInfo';
        let procesador = data.procesador.trim().substring(0, 4) === 'AMEX'
                ? data.proseq.trim() : data.procesador.trim();
        let searchParamsDetail = {
            PROCESADOR: procesador,
            FECHA_FROM: data.prda,
            TIPO: '1'
                    //excel:false,
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetail', {
            id: prototype.id + '-detailForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            titleGrid: `${data.nombreproc.trim()} ${data.prda}`,
            tipoGrid: '1',
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
    },
    onClickLoadedC: function (obj) {
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let curl = prototype.url + '/getDataGridCInfo';
        //console.log(data);
        let searchParamsDetail = {
            COMPLEMENTO: data.procesador,
            FECHA_FROM: data.prda,
            TIPO: 'L'
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetailC', {
            id: prototype.id + '-detailCForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
    },
    onClickExonerados: function (obj) {
        let data = obj.lastFocused.record.data;
        let panelPrincipal = Ext.getCmp(prototype.id + '-regionCenterForm01');
        let curl = prototype.url + '/getDataGridInfo';
        let procesador = data.procesador.trim().substring(0, 4) === 'AMEX'
                ? data.proseq.trim() : data.procesador.trim();
        let searchParamsDetail = {
            PROCESADOR: procesador,
            FECHA_FROM: data.prda,
            TIPO: '2'
                    //excel:false,
        };
        const volverSummary = (id) => {
            Ext.getCmp(id).destroy();
            Ext.getCmp(prototype.id + '-regionCenterForm01').items
                    .items.at(-1).show();
        };
        panelPrincipal.items.items.at(-1).hide();
        let nuevoPanel = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetail', {
            id: prototype.id + '-detailForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            titleGrid: `${data.nombreproc.trim()} ${data.prda}`,
            tipoGrid: '2',
            volverCallback: volverSummary
        });
        panelPrincipal.add(nuevoPanel);
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
    //<editor-fold defaultstate="collapsed" desc="Descarga Exceles">
    downloadProcessor: function (obj) {
        let parameters = Object.assign({},obj.up().up().up().searchParams);
        parameters.excel = true;
        console.log('Descargando');
        console.log(parameters);
//        fetch(prototype.url + '/getDataGridInfo?' + new URLSearchParams(parameters))
//                .then(async res => {console.log(await res.json())});
        global.getFile(prototype.url + '/downloadProcessorsInfo?' + new URLSearchParams(parameters));
    },
    downloadComplement:function(obj){
        let parameters = Object.assign({},obj.up().up().up().searchParams);
        parameters.excel = true;
        console.log('Descargando');
        console.log(parameters);
        global.getFile(prototype.url + '/downloadComplementInfo?' + new URLSearchParams(parameters));
    },
    downloadDetailSummaryInfo:function(){
        console.log(searchParamsDetail);
        global.getFile(prototype.url + '/downloadDetailSummaryInfo?' + new URLSearchParams(searchParamsDetail));
    }
    //</editor-fold>

});