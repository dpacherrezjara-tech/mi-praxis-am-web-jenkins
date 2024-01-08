Ext.define('Ext.Praxis.controller.payments.ErrorControl.ErrorControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorControlController',
    fecha: new Date(),
    url: CONTEXTPATH + '/ErrorControl',
    searchParams: null,
    searchUrl: null,
    gridType: 'P',
    init: function (view) {
        prototype.id = 'ErrorControlForm';
        prototype.url = CONTEXTPATH + '/ErrorControl';
    },
    afterRender: async function (obj, e) {
        await this.fillStoreCombos();
        //await this.loadSummaryData();
        this.onClickSearchBtn();
    },
    fillStoreCombos: async function () {
        const me = this;
        const panel = me.getCmp({id: '-panelFilters'});
        panel.mask('Loading Filters...');

        const res = await fetch(`${me.url}/loadFilters`);
        const data = await res.json();
        //console.log(data);
        me.getCmp({id: '-cmbError'}).bindStore(me.createComboStore({data: data.lstError, valueField: 'code', displayField: 'name'}));
        me.getCmp({id: '-cmbProcessor'})
                .bindStore(me.createComboStore({
                    data: data.lstProcs,
                    valueField: 'a4451key2',
                    displayField: 'a4451desc1'
                }));
        panel.unmask();
    },
    onClickSearchBtn: function () {
        const me = this;
        const tabPanel = me.getCmp({id:'-tabMain'});
        me.onChangeTab(tabPanel,tabPanel.getActiveTab(),null);
        //this.loadSummaryData();
    },
    onChangeTab:function(obj, current, before){
        const me = this;
        const opts = {
          'F': async () => {
              await me.loadFormatSummary(current);
          },
          'C': async () => {
              await me.loadChargeSummary(current);
          }
        };
        opts[current.itemId]();
        //console.log(current.itemId);
    },
    loadFormatSummary: async function (panel) {
        const me = this;
        //console.log(panel.id);
        const panelFormat = Ext.create('Ext.Praxis.view.payments.ErrorControlForm.FormatSummary',{
            id:prototype.id + '-formatSummary',
            searchParams:me.formatParameters(),
            searchUrl:me.url
        });
        panel.removeAll();
        panel.add(panelFormat);
    },
    loadChargeSummary: async function (panel) {
        const me = this;
        //console.log(panel.id);
        const panelFormat = Ext.create('Ext.Praxis.view.payments.ErrorControlForm.ChargeSummary',{
            id:prototype.id + '-chargeSummary',
            searchParams:me.formatParameters(),
            searchUrl:me.url
        });
        panel.removeAll();
        panel.add(panelFormat);
    },
    formatParameters: function () {
        const me = this;
        const tdate = me.getCmp({id: '-cmbDate'}).getValue();
        const from = me.getCmp({id: '-dateFrom'});
        const to = me.getCmp({id: '-dateTo'});
        if (!from.isValid() && !to.isValid()) {
            global.Msg({msg: 'Ingrese Fecha Valida'});
        }
        const procesador = me.getCmp({id: '-cmbProcessor'}).getValue();
        const error = me.getCmp({id: '-cmbError'}).getValue();
        let params = {
            TDATE: tdate,
            DATE_FROM: Ext.Date.format(from.getValue(), 'Ymd'),
            DATE_TO: Ext.Date.format(to.getValue(), 'Ymd'),
            TBL_PROC: procesador,
            CERROR: error
        };
        console.log(params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Exceles">
    downloadFormatSummary:function(obj){
        const me = this;
        let params = Object.assign({},me.formatParameters());
        params.excel = true;
        console.log(params);
        global.getFile(`${me.url}/downloadErrorSummary?${new URLSearchParams(params)}`);
    },
    downloadLoadSummary:function(obj){
        const me = this;
        let params = Object.assign({},me.formatParameters());
        params.excel = true;
        console.log(params);
        global.getFile(`${me.url}/downloadErrorArchSummary?${new URLSearchParams(params)}`);
    },
    //</editor-fold>

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


