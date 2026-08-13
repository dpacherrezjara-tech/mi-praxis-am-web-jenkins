Ext.define('Ext.Praxis.controller.payments.ChargebackSabreStatus.ChargebackSabreStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChargebackSabreStatusController',
    fecha: new Date(),
    url: CONTEXTPATH + '/ChargebackSabreStatus',
    searchParams: null,
    searchUrl: null,
    init: function (view) {
        prototype.id = 'ChargebackSabreStatusForm';
        prototype.url = CONTEXTPATH + '/ChargebackSabreStatus';
        prototype.width = 1800;
        prototype.height = 630;
    },
    afterRender: async function (obj, e) {
        //const me = this;
        this.onClickSearchBtn();
    },
    onClickSearchBtn: function () {
        const btnAlert = Ext.getCmp(prototype.id + '-btnAlerts');
        btnAlert.hide();
        btnAlert.setPressed(false);
        this.loadSabreGrid();
        //this.formatParameters();
    },
    loadSabreGrid: function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const sabreGrid = Ext.create('Ext.Praxis.view.payments.ChargebackSabreStatusForm.Grids.SabreGrid', {
            id: prototype.id + '-sabreGrid01',
            url: me.url,
            searchParams: me.formatParameters()
        });
        mainPanel.add(sabreGrid);
    },
    formatParameters: function () {
        let form = Ext.getCmp(prototype.id + '-formFilters');
        let cc1 = Ext.getCmp(prototype.id + '-txtCC1').getValue();
        let cc2 = Ext.getCmp(prototype.id + '-txtCC2').getValue();
        let scard = cc2.length > 0 ? `${cc1}%${cc2}%` : `${cc1}%`;
        let params = {
            IN_SCARDN: scard,
            ...form.getValues()
        };
        console.log(params);
        return params;
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        //prototype.id = 'AccountingTransactionForm';
        //prototype.url = CONTEXTPATH + '/AccountingTransaction';
        let form = Ext.getCmp(prototype.id + '-formFilters');
        //console.log(form.getForm());
        form.getForm().reset();
        Ext.getCmp(prototype.id + '-txtCC1').setValue('');
        Ext.getCmp(prototype.id + '-txtCC2').setValue('');
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    toggleAlertRfnd: function (button, pressed) {
        const me = this;
        const form = button.up('form');
        if (form) {
            const formValues = form.getForm().getValues();
            if (pressed) {
                // Agregar un valor adicional al formulario cuando el botón se activa
                formValues.IN_STATSBRE = 'R';
                //console.log(formValues);
            } else {
                // Eliminar el valor adicional si el botón se desactiva
                formValues.IN_STATSBRE = '';
            }
            form.getForm().setValues(formValues);
            me.loadSabreGrid();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeDateBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-dateFrom');
        const to = Ext.getCmp(prototype.id + '-dateTo');
        const opts = {
            'dateFrom': () => {
                to.setValue(from.getValue());
            },
            'dateTo': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }}
        };
        opts[option]();
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
        let store = me.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
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


