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
//        await me.onClickSearchBtn();
    },
    fillFilters: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilters.mask('Loading Filters...');
        
        if (res.ok) {
            const data = await res.json();
            
            const procesadores = data.lstProcs.filter(x=>x.a4451fech1.trim()==='P');
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbProcs = Ext.getCmp(prototype.id + '-cmbProcessor');
            me.setComboStore({cmp: cmbProcs, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});
            
            const cmbMdas = Ext.getCmp(prototype.id + '-cmbMoneda');
            me.setComboStore({cmp: cmbMdas, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});
            //</editor-fold>
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
        let formFilterts = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
        console.log('Summary Grid Filters: ',formFilterts);
        return formFilterts;
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
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    downloadAllDetailAccountingExcel: async function(){
        const me = this;
        const view = me.view;
        
        let notifier = new AWN();

        let params = me.formatParameters();
        console.table(params);
        
        
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05724', params);
            if (res) {
                let data = res.map(x=>({
                       'Ticket': x.TICKET,
                       'File Type': x.FILETYPE,
                       'Mode': x.A4183MODO,
                       'SRC': x.A4183FUENT,
                       'Sub SRC': x.A4183SUBFU,
                       'FOP': x.A4183FP,
                       'CPN': x.A4183CUPON,
                       'SEQ': x.A4183SEQ,
                       'Settlement Date': x.A4183FFILE,
                       'Accounting Date': x.A4183FCONT,
                       'Account Number': x.A4183CUENT,
                       'Currency': x.A4183CUR,
                       'Debit': x.A4183ACTIV,
                       'Credit': x.A4183PASIV,
                       'Code Concept': x.A4183ORIG,
                       'Description Concept': x.A4183TITU,
                       'Client': x.A4183CLIEN,
                       'PNR': x.A4183COPE,
                       'Provider': x.A4183PROV,
                       'Praxis ID': x.A4183IDCON,
                       'Flex ID': x.A4183IDFLE,
                       'Reference Number': x.A4183AREFN,
                       'Processor': x.PROCESSOR_DESCRIPTION
                    }));
                global.writeExcelFromJson(data, 'Detail Accounting');
            }
        };
        notifier.async(dwl(),'Successfully Download', 'Error on Download', 'Downloading File');
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
        } catch (err){
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
    }
    //</editor-fold>

});


