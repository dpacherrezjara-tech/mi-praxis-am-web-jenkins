Ext.define('Ext.Praxis.controller.payments.InputsTamiz.InputsTamizController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsTamizController',
    fecha: new Date(),
    searchParamsCalendar: null,
    searchParamsDetail: null,
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
//            '#InputsTamizForm-btnClear': {
//                click: this.btnClear_click
//            },
//            '#InputsTamizForm-btnExcel': {
//                click: this.btnExcel_click
//            },
//            '#InputsTamizForm-btnFilter': {
//                click: this.btnFilter_click
//            },
//            '#InputsTamizForm-btnAdd': {
//                click: this.btnAdd_click
//            },
//            '#InputsTamizForm-btnBack': {
//                click: this.btnBack_click
//            },
//            '#InputsTamizForm-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#InputsTamizForm-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#InputsTamizForm-btn-pag-next': {
//                click: this.pagNext
//            },
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
            }
        });
    },
    xpanel_afterrender: async function (obj, e) {
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
                me.setCalendarParameters();
            },
            'D': () => {
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
                Ext.getCmp(prototype.id + '-cmbDateToYear').show();
                Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateToDay').show();
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
    onClickSearchBtn:function(){
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
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()||'01');

        let IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()||'31');
        let PROCESADOR = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue()||'';
        searchParamsDetail = {
            FECHA_FROM: IN_FECHA_FROM,
            FECHA_TO: IN_FECHA_TO,
            TIPO: PROCESADOR
        };
    },
    setCalendarParameters: function () {
        let CCUST = '139';
        let PROCESADOR = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();
        let ANIO = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        searchParamsCalendar = {
            CCUST: CCUST,
            TIPO: PROCESADOR ? PROCESADOR.trim() : null,
            FROM_YEAR: ANIO
        };
    },
    fillFiltersStores: async function () {
        //const me = this;
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
                        Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                                Ext.create('Ext.data.Store',
                                        {data: res.lstPaises, autoLoad: true}));
                        cmbVISTA.setValue("D");
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
    renderSummaryDetail:function(){
//        if (!searchParamsDetail.TIPO) {
//            global.Msg({msg: 'Choose your Processor'});
//            return;
//        }
        let curl = prototype.url + '/getDetailSummaryInfo';
        console.log(curl);
        let panel = Ext.getCmp(prototype.id + '-regionCenterForm01');
        panel.mask('Loading...');
        panel.removeAll();
        let summary = Ext.create('Ext.Praxis.view.payments.InputsTamizForm.GridData', {
            id: prototype.id + '-summaryForm-01',
            searchParams: searchParamsDetail,
            searchUrl: curl,
            clickCallback: null
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
        alert(obj.id);
    }
});