Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketMonthSummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByTicketMonthSummaryGridController',
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
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        console.log(view.searchParams);
        const tdate = view.searchParams.IN_DATE === 'FECVT' ? 'Sale<br>Date' : 'Processing<br>Date';
        me.view.columns[0].setText(tdate);
        if (me.view.backButton) {
            me.view.columns[1].hide();
        }
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            proxy: {
                type: 'ajax',
                url: `${view.url}/loadByTicketSummary`,
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
                        console.log(records);
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
        if (record.data.total === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        me.openDaysSummary(record.data.a4496FPROC ? record.data.a4496FPROC : record.data.a4496FECVT);
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
        let month = obj.a4496FECVT ? obj.a4496FECVT : obj.a4496FPROC;
        if (me.view.searchParams.IN_TDATE === 'M') {
            params.IN_DATEFROM = month + '01';
            params.IN_DATETO = month + '31';
        } else {
            params.IN_DATEFROM = month;
            params.IN_DATETO = month;
        }
        //<editor-fold defaultstate="collapsed" desc="Opciones">
        const opts = {
            'M': () => {
                params.IN_TYPE = 'M';
            },
            'P': () => {
                params.IN_TYPE = 'P';
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
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        const drillDown = mainPanel.items.items;
        let params = Object.assign({},me.view.searchParams);
        params.IN_TDATE = 'D';
        params.IN_DATEFROM = month + '01';
        params.IN_DATETO = month + '31';
        drillDown.at(-1).hide();
        const panelDays = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid', {
            id: prototype.id + '-ByTicketDaySummaryGrid-1',
            url: prototype.url,
            searchParams: params,
            backButton: true
        });
        mainPanel.add(panelDays);
    },
    openDetail: function (searchParams) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        const paneles = mainPanel.items.items;
        const detailPanel = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketDetailGrid', {
            id: prototype.id + '-ByTicketDetailGrid-1',
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


