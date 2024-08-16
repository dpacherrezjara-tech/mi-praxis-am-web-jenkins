Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentMonthSummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByPaymentMonthSummaryGridController',
    init: function (view) {
        if (!view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
            tbar.items.items[1].hide();
        }
    },
    afterRender: async function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        console.log(view.searchParams);
        //const tdate = view.searchParams.IN_DATE === 'PRDA' ? 'Processing<br>Date' : 'Payment<br>Date';
        let tdate = ''; 
        if (view.searchParams.IN_DATE === 'PRDA'){
            tdate = 'Processing<br>Date';   
        }
        else if (view.searchParams.IN_DATE === 'PAYDATE'){
            tdate = 'Payment<br>Date';
        }
        else {
            tdate = 'Update<br>Date';
        }
        me.view.columns[0].setText(tdate);
        if (me.view.backButton) {
            me.view.columns[1].hide();
        }
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            proxy: {
                type: 'ajax',
                url: `${view.url}/loadByPaymentSummary`,
                extraParams: view.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        me.view.setStore(store);
    },
    onClickTotal: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        //console.log (record.data);
        if (record.data.total === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        let tdate = '';
        if (record.data.paydate){
            tdate = record.data.paydate;
        }
        else if (record.data.prda){
            tdate = record.data.prda;
        }
        else {
            tdate = record.data.feup;
        }
        me.openDaysSummary(tdate);
    },
    onClickDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        console.log('Total Find: ', valorCelda);
        //<editor-fold defaultstate="collapsed" desc="Opciones">
        const opts = {
            2: () => {
                me.openDetail(me.formatParameters({type: 'M', obj: record.data}));
            },
            3: () => {
                me.openDetail(me.formatParameters({type: 'P', obj: record.data}));
            },
            5: () => {
                me.openDetail(me.formatParameters({type: 'XM', obj: record.data}));
            },
            6: () => {
                me.openDetail(me.formatParameters({type: 'XP', obj: record.data}));
            },
            7: () => {
                me.openDetail(me.formatParameters({type: 'PM', obj: record.data}));
            },
            8: () => {
                me.openDetail(me.formatParameters({type: 'PP', obj: record.data}));
            },
            9: () => {
                me.openDetail(me.formatParameters({type: 'LM', obj: record.data}));
            },
            10: () => {
                me.openDetail(me.formatParameters({type: 'LP', obj: record.data}));
            },
            11: () => {
                me.openDetail(me.formatParameters({type: 'TM', obj: record.data}));
            },
            12: () => {
                me.openDetail(me.formatParameters({type: 'TP', obj: record.data}));
            }
        };
        //</editor-fold>
        if (opts[cellIndex]) {
            opts[cellIndex]();
        }
    },
    formatParameters: function ( {type, obj}) {
        const me = this;
        let params = {
            IN_CCUST: '139',
            ...me.view.searchParams
        };
        let tdate = '';
        if (obj.paydate){
            tdate = obj.paydate;
        }
        else if (obj.prda){
            tdate = obj.prda;
        }
        else {
            tdate = obj.feup;
        }
        if (me.view.searchParams.IN_TDATE === 'M') {
            params.IN_MONTH = tdate;
            params.IN_DATEFROM = '';
            params.IN_DATETO = '';
        } else {
            params.IN_DATEFROM = tdate;
            params.IN_DATETO = tdate;
            params.IN_MONTH = '';
        }
        //<editor-fold defaultstate="collapsed" desc="Opciones">
        const opts = {
            'M': () => {
                params.IN_TYPE = 'M';
            },
            'P': () => {
                params.IN_TYPE = 'P';
            },
            'XM': () => {
                params.IN_TYPE = 'XM';
            },
            'XP': () => {
                params.IN_TYPE = 'XP';
            },
            'PM': () => {
                params.IN_TYPE = 'PM';
            },
            'PP': () => {
                params.IN_TYPE = 'PP';
            },
            'LM': () => {
                params.IN_TYPE = 'LM';
            },
            'LP': () => {
                params.IN_TYPE = 'LP';
            },
            'TM': () => {
                params.IN_TYPE = 'TM';
            },
            'TP': () => {
                params.IN_TYPE = 'TP';
            }
        };
        //</editor-fold>
        if (opts[type]) {
            opts[type]();
        }
        me.trimObject(params);
        console.log(params);
        return params;
    },
    openDaysSummary: function (month) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        let params = Object.assign({},me.view.searchParams);
        params.IN_TDATE = 'D';
        params.IN_DATEFROM = month + '01';
        params.IN_DATETO = month + '31';
        drillDown.at(-1).hide();
        const panelDays = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid', {
            id: prototype.id + '-ByPaymentDaySummaryGrid-1',
            url: prototype.url,
            searchParams: params,
            backButton: true
        });
        mainPanel.add(panelDays);
    },
    openDetail: function (searchParams) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const paneles = mainPanel.items.items;
        const detailPanel = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
            id: prototype.id + '-ByPaymentDetailGrid-1',
            searchParams: searchParams,
            url: me.view.url,
            backButton: true
        });
        paneles.at(-1).hide();
        mainPanel.add(detailPanel);

    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    groupBy: function ( {data, key}){
        let grouped = data.reduce((groups, item) => {
            let obj = item[key];
            if (!groups[obj]) {
                groups[obj] = [];
            }
            groups[obj].push(item);
            return groups;
        }, {});
        return grouped;
    },
    sumBy: function ( {data, key}){
        let sum = data.reduce(function (total, item) {
            return total + item[key];
        }, 0);
        return sum;
    },
    trimObject: function (obj) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'string') {
                obj[prop] = obj[prop].trimEnd();
            }
        }
    }
    //</editor-fold>
});


