Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.AccountingTransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingTransactionController',
    fecha: new Date(),
    url: CONTEXTPATH + '/AccountingTransaction',
    searchParams: null,
    searchUrl: null,
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
        await me.onClickSearchBtn();
    },
    fillFilters: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilters.mask('Loading Filters...');
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            const storeProcs = me.createComboStore({
                data: data.lstProcs.filter(x=>x.a4451fech1.trim()==='P'), 
                valueField: 'a4451key2', 
                displayField: 'a4451desc1'
            });
            Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeProcs);
            //Ext.getCmp(prototype.id + '-cmbTDOC').setValue('SALE');
            panelFilters.unmask();
        }
    },
    onClickSearchBtn: async function () {
        await this.loadSummary();
    },
    loadSummary: async function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        let params = me.formatParameters();
        console.log('Summary Grid Params: ',params);
        const summaryGrid = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryGrid', {
            id: prototype.id + '-gridSummary',
            searchParams: params,
            url: me.url
        });
        mainPanel.add(summaryGrid);
    },
    formatParameters: function () {
        let tfecha = Ext.getCmp(prototype.id + '-cmbDate');
        let from = Ext.getCmp(prototype.id + '-dateFrom');
        let to = Ext.getCmp(prototype.id + '-dateTo');
        let procesador = Ext.getCmp(prototype.id + '-cmbProcessor');
        let mda = Ext.getCmp(prototype.id + '-cmbMDA');
        let tdoc = Ext.getCmp(prototype.id + '-cmbTDOC');
        let pnr = Ext.getCmp(prototype.id + '-txtPNR');
        let idcon = Ext.getCmp(prototype.id + '-txtIDAC');
        return {
            IN_TFECHA: tfecha.getValue(),
            FECHA_FROM: Ext.Date.format(from.getValue(), 'Ym') + '01',
            FECHA_TO: Ext.Date.format(to.getValue(), 'Ym') + '31',
            IN_PROCESADOR: procesador.getValue(),
            IN_MDA: mda.getValue(),
            IN_TDOC: tdoc.getValue(),
            IN_PNR: pnr.getValue(),
            IN_IDCON: idcon.getValue()
        };
    },
    onClickFilterBtn:function(){
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn:function(){
        prototype.id = 'AccountingTransactionForm';
        prototype.url = CONTEXTPATH + '/AccountingTransaction';
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
        Ext.getCmp(prototype.id + '-txtIDAC').setValue('');
        Ext.getCmp(prototype.id + '-cmbMDA').setValue('');
        Ext.getCmp(prototype.id + '-cmbDate').setValue('P');
        
        Ext.getCmp(prototype.id + '-dateFrom').setValue(new Date(new Date().getFullYear(), 0, 1));
        Ext.getCmp(prototype.id + '-dateTo').setValue(new Date());
        
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue('SALE');
    },
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeFechaBtn: function (obj) {
        const me = this;
        let combo2 = null;
        try {
            let valor1 = Ext.Date.format(obj.getValue(), 'Ymd');
            //valor1 = parseInt(valor1);
            const opts = {
                'dateTo': () => {
                    combo2 = me.getCmp({id: '-dateFrom'});
                    let valor2 = Ext.Date.format(combo2.getValue(), 'Ymd');
                    //valor2 = parseInt(valor2);
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
        } catch {
            return;
        }
    },
    validaFecha: function (value) {
        // Validar la fecha aquí
        // Devolver true si es válida, o un mensaje de error si no lo es
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


