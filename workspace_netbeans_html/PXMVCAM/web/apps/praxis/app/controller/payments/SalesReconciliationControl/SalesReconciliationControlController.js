Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SalesReconciliationControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationControlController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
        me.onClickSearchBtn();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            const storeProc = me.createComboStore({data: data.procesadores.filter(x => x.a4451fech1.trim() === 'P')
                , valueField: 'a4451key2', displayField: 'a4451desc1'});

            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbProctype');
            cmbProcesadores.suspendEvents(false);
            cmbProcesadores.bindStore(storeProc);
            cmbProcesadores.setValue('');
            cmbProcesadores.resumeEvents();
            //console.log(cmbProcesadores.getStore());

            const cmbProcesadoresf = Ext.getCmp(prototype.id + '-cmbProctypef');
            cmbProcesadoresf.suspendEvents(false);
            cmbProcesadoresf.bindStore(storeProc);
            cmbProcesadoresf.setValue('');
            cmbProcesadoresf.resumeEvents();

            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            cmbPaises.suspendEvents(false);
            cmbPaises.bindStore(me.createComboStore({data: data.paises
                , valueField: 'code', displayField: 'name'}));
            cmbPaises.setValue('');
            cmbPaises.resumeEvents();

            const cmbPaisesf = Ext.getCmp(prototype.id + '-cmbPaisesf');
            cmbPaisesf.suspendEvents(false);
            cmbPaisesf.bindStore(me.createComboStore({data: data.paises
                , valueField: 'code', displayField: 'name'}));
            cmbPaisesf.setValue('');
            cmbPaisesf.resumeEvents();

            const cmbCerror = Ext.getCmp(prototype.id + '-cmbCerror');
            cmbCerror.suspendEvents(false);
            cmbCerror.bindStore(me.createComboStore({data: data.cerror
                , valueField: 'a4451key3', displayField: 'a4451desc1'}));
            cmbCerror.setValue('');
            cmbCerror.resumeEvents();

            const cmbCodadju = Ext.getCmp(prototype.id + '-cmbCodadju');
            cmbCodadju.suspendEvents(false);
            cmbCodadju.bindStore(me.createComboStore({data: data.codadju
                , valueField: 'a4451key3', displayField: 'a4451desc1'}));
            cmbCodadju.setValue('');
            cmbCodadju.resumeEvents();
        }
        filterPanel.unmask();
    },
    formatByPaymentSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            IN_DATEFROM: obj.month.at(0) + '01',
            IN_DATETO: obj.month.at(1) + '31',
            ...obj
        };
        return params;
    },
    formatByPaymentDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters-2').getForm();
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
    onClickSearchBtn: function () {
        const me = this;
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        if (rb === 'P') {
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersBp').getValue();
            if (tfilter === 'S') {
                let params = me.formatByPaymentSummaryParams();
                const panelTree = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentSummaryTree', {
                    id: prototype.id + '-ByPaymentSummaryTree-1',
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
            global.Msg({msg: 'Funcion en construccion'});
        }
    },
    onChangeFiltersBp: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-formFilters-1');
        const filtroFil = Ext.getCmp(prototype.id + '-formFilters-2');
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
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        Ext.getCmp(prototype.id + '-formFilters-1').getForm().reset();
        Ext.getCmp(prototype.id + '-formFilters-2').getForm().reset();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
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
    }
    //</editor-fold>

});


