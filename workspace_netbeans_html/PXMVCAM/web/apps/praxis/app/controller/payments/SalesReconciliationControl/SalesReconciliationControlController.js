Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SalesReconciliationControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationControlController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        win.lblUser_toolTip('Estructura: A4331');
        const me = this;
        await me.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            const procesadores = data.procesadores;
            const errores = data.cerror.map(x => ({name: `${x.a4451key3.trim()} - ${x.a4451desc1}`, code: x.a4451key3}));
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbProctype');
            me.setComboStore({cmp: cmbProcesadores, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbProcesadoresf = Ext.getCmp(prototype.id + '-cmbProctypef');
            me.setComboStore({cmp: cmbProcesadoresf, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaisesBP');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesf = Ext.getCmp(prototype.id + '-cmbPaisesfBP');
            me.setComboStore({cmp: cmbPaisesf, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesBT = Ext.getCmp(prototype.id + '-cmbPaisesBT');
            me.setComboStore({cmp: cmbPaisesBT, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesfBT = Ext.getCmp(prototype.id + '-cmbPaisesfBT');
            me.setComboStore({cmp: cmbPaisesfBT, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCerror = Ext.getCmp(prototype.id + '-cmbCerror');
            me.setComboStore({cmp: cmbCerror, data: errores,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCodadju = Ext.getCmp(prototype.id + '-cmbCodadju');
            me.setComboStore({cmp: cmbCodadju, data: data.codadju,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});

            const cmbCerrorSum = Ext.getCmp(prototype.id + '-cmbCerrorSum');
            me.setComboStore({cmp: cmbCerrorSum, data: errores,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCodadjuSum = Ext.getCmp(prototype.id + '-cmbCodadjuSum');
            me.setComboStore({cmp: cmbCodadjuSum, data: data.codadju,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});
            //</editor-fold>
        }
        filterPanel.unmask();
    },
    //<editor-fold defaultstate="collapsed" desc="Format Params">
    formatByPaymentSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBP-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            IN_TDATE: 'M',
            IN_DATEFROM: obj.month.at(0),
            IN_DATETO: obj.month.at(1),
            ...obj
        };
        return params;
    },
    formatByPaymentDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard.at(0) !== '' && obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0)}%${obj.creditcard.at(1)}%`;
        }
        return params;
    },
    formatByTicketSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBT-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            IN_TDATE: 'M',
            IN_DATEFROM: obj.month.at(0),
            IN_DATETO: obj.month.at(1),
            ...obj
        };
        return params;
    },
    formatByTicketDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBT-2').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard.at(0) !== '' && obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0)}%${obj.creditcard.at(1)}%`;
        }
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const me = this;
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;
        if (rb === 'P') {
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersBP').getValue();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
            mainPanel.removeAll();
            if (tfilter === 'S') {
                let params = me.formatByPaymentSummaryParams();
                console.log(params);
                const panelTree = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid', {
                    id: prototype.id + '-ByPaymentMonthSummaryGrid-1',
                    url: prototype.url,
                    searchParams: params
                });
                mainPanel.add(panelTree);
            } else {
                let params = me.formatByPaymentDetailParams();
                console.log(params);
                const panelDetail = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
                    id: prototype.id + '-ByPaymentDetailGrid-1',
                    url: prototype.url,
                    searchParams: params
                });
                mainPanel.add(panelDetail);
            }
        } else {
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersBT').getValue();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
            mainPanel.removeAll();
            if (tfilter === 'S') {
                let params = me.formatByTicketSummaryParams();
                const panelTree = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid', {
                    id: prototype.id + '-ByTicketMonthSummaryGrid-1',
                    url: prototype.url,
                    searchParams: params
                });
                mainPanel.add(panelTree);
            } else {
                let params = me.formatByTicketDetailParams();
                console.log(params);
                const panelDetail = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketDetailGrid', {
                    id: prototype.id + '-ByTicketDetailGrid-1',
                    url: prototype.url,
                    searchParams: params
                });
                mainPanel.add(panelDetail);
            }
        }
    },
    onChangeModule: function (radiogroup, newValue, oldValue) {
        const opt = newValue.opcion;
        if (opt === 'P') {
            Ext.getCmp(prototype.id + '-filtersByPayment-1').show();
            Ext.getCmp(prototype.id + '-filtersByTicket-1').hide();
            Ext.getCmp(prototype.id + '-mainContent').show();
            Ext.getCmp(prototype.id + '-mainContent2').hide();
        } else {
            Ext.getCmp(prototype.id + '-filtersByTicket-1').show();
            Ext.getCmp(prototype.id + '-filtersByPayment-1').hide();
            Ext.getCmp(prototype.id + '-mainContent2').show();
            Ext.getCmp(prototype.id + '-mainContent').hide();
        }
    },
    onChangeFiltersBP: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-formFiltersBP-1');
        const filtroFil = Ext.getCmp(prototype.id + '-formFiltersBP-2');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        if (obj.getValue() === 'S') {
            filtroSumm.show();
            filtroFil.hide();
            this.onClickSearchBtn();
        } else {
            filtroFil.show();
            filtroSumm.hide();
        }
    },
    onChangeFiltersBT: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-formFiltersBT-1');
        const filtroFil = Ext.getCmp(prototype.id + '-formFiltersBT-2');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        mainPanel.removeAll();
        if (obj.getValue() === 'S') {
            filtroSumm.show();
            filtroFil.hide();
            this.onClickSearchBtn();
        } else {
            filtroFil.show();
            filtroSumm.hide();
        }
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        const activeFilter = Ext.getCmp(prototype.id + '-filtersByPayment-1');
        if (activeFilter.isVisible()) {
            Ext.getCmp(prototype.id + '-formFiltersBP-1').getForm().reset();
            Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm().reset();
        } else {
            Ext.getCmp(prototype.id + '-formFiltersBT-1').getForm().reset();
            Ext.getCmp(prototype.id + '-formFiltersBT-2').getForm().reset();
        }
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeFechaBtn: function (obj) {

    },
    validaFecha: function (value) {
        // Validar la fecha aquí
        // Devolver true si es válida, o un mensaje de error si no lo es
        if (value === null || value === '') {
            return 'Debe ingresar una fecha.';
        }
        try {
            const selectedDate = Ext.Date.format(value, 'Ymd');
            return true;
        } catch (err) {
            return 'Fecha no válida.';
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    }
    //</editor-fold>

});


