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
    // Load detail for Month in Summary By ticket
    getData: async function () {
        const me = this;
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        
        me.searchLastParams = view.searchParams ;
        console.log('me.searchLastParams', me.searchLastParams);
        
        
        let tdate = me.searchLastParams.IN_DATE;        
        if (tdate === 'FECVT') {
            me.view.columns[0].setText('Sale<br>Date');
        } else if (tdate === 'PRDA') {
            me.view.columns[0].setText('Processing<br>Date');
        } else if (tdate === 'FEUP') {
            me.view.columns[0].setText('Update<br>Date');
        } else {
            me.view.columns[0].setText('Date');
        }
        
        //me.view.columns[0].setText(tdate);
        if (me.view.backButton) {
            me.view.columns[1].hide();
        }
        
        me.view.summaryIsMonth = true;
        let params = view.searchParams ;
        params.IN_TDATE = me.view.summaryIsMonth ? 'M' : '',
        console.log(params);

        me.loadServiceSummaryByTicket(params);
//        let store = Ext.create('Ext.data.Store', {
//            loadMask: true,
//            proxy: {
//                type: 'ajax',
////                url: `${view.url}/loadByTicketSummary`,
//                url: `${view.url}/v2/loadByTicketSummary`,
//                extraParams: params,
//                timeout: 600000,
//                reader: {
//                    type: 'json',
//                    rootProperty: 'response'
//                }
//            },
//            autoLoad: true,
//            listeners: {
//                load: function (store, records, successful, operation) {
//                    if (!successful) {
//                        global.Msg({msg: 'Data not Found'});
//                    } else {
//                        console.log(records);
//                        if (records.length === 0) {
//                            global.Msg({msg: 'Data not Found'});
//                        }
//                    }
//                }
//            }
//        });
//        me.view.setStore(store);
    },
    onClickTotal: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        if (record.data.total === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        let fecha = '';
        if (record.data.a4496FPROC) {
            fecha = record.data.a4496FPROC;
        }
        else if (record.data.a4501PRDA) {
            fecha = record.data.a4501PRDA;
        }  
        else if (record.data.a4501FECVT) {
            fecha = record.data.a4501FECVT;
        } else {
            fecha = record.data.a4501FEUP;
        }
        me.openDaysSummary(fecha);
    },
    // Load detail for Day in Summary By ticket
    onClickDateSummaryCell (grid, td, cellIndex, record, tr, rowIndex, e) {
        const me = this;
        // Determinate of select to month of day
        if ( me.view.summaryIsMonth ) {
            const view = me.view;
            let dateMonth = td.textContent || td.innerText;
            let params = me.searchLastParams ;

            params.IN_TDATE = '' ;
            params.IN_DATEFROM = dateMonth;
            params.IN_DATETO = dateMonth;
            console.log("params", params);

            me.loadServiceSummaryByTicket(params);
            me.view.summaryIsMonth = false;
        }else {
            const view = me.view;
            let dateDay = td.textContent || td.innerText;
            let params = me.searchLastParams ;
            params.IN_DATEFROM = dateDay;
            params.IN_DATETO = dateDay;
            
            console.log("params", params);
            me.openDetail(params);
        }
    },
    onClickDetail: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        
        const column = view.getHeaderContainer().getHeaderAtIndex(cellIndex);
        
        const statusSummary = column.statusSummary;  // M , P , ''
        const typeCard = column.text;
                
        let params = me.searchLastParams ;
        
        // detalle desde mes
        if ( me.view.summaryIsMonth ) {
            console.log("**search detail for month**");
            let month = '';
            if (record.data.a4501FECVT) {
                month = record.data.a4501FECVT;
            } else if (record.data.a4501PRDA) {
                month = record.data.a4501PRDA;
            } else if (record.data.a4496FPROC) {
                month = record.data.a4496FPROC;
            } else {
                month = record.data.a4501FEUP;
            }
            params.IN_DATEFROM = month + '01';
            params.IN_DATETO = month + '31';
            params.IN_TYPE = statusSummary ; // M , P , ''
            params.IN_TFOP = typeCard === 'CA' ? 'CA' : 'CC' ;
            params.IN_GCARD = typeCard === 'CA' ? '' : typeCard ;
            
        }
        else {
            console.log("**search detail for day**");
            let day = '';
            if (record.data.a4501FECVT) {
                day = record.data.a4501FECVT;
            } else if (record.data.a4501PRDA) {
                day = record.data.a4501PRDA;
            } else if (record.data.a4496FPROC) {
                day = record.data.a4496FPROC;
            } else {
                day = record.data.a4501FEUP;
            }
            params.IN_DATEFROM = day;
            params.IN_DATETO = day;
            params.IN_TYPE = statusSummary ; // M , P , ''
            params.IN_TFOP = typeCard === 'CA' ? 'CA' : 'CC' ;
            params.IN_GCARD = typeCard === 'CA' ? '' : typeCard ;
            
        }
        
        // search all summary
        if ( typeCard === "Summary<br>Ticket" ){
            params.IN_TFOP = '' ;
            params.IN_GCARD = '' ;
        }
                
        console.log('detail for params: ', params);
        me.openDetail(params);
        
        //<editor-fold defaultstate="collapsed" desc="Opciones">
        
//        const opts = {
//            2: () => {
//                me.openDetail(me.formatParameters({type: 'M', obj: record.data}));
//            },
//            3: () => {
//                me.openDetail(me.formatParameters({type: 'P', obj: record.data}));
//            }
//        };
//        //</editor-fold>
//        if (opts[cellIndex]) {
//            opts[cellIndex]();
//        }
        
    },
    
    loadServiceSummaryByTicket: function(params){
        const me = this;
        
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            proxy: {
                type: 'ajax',
//                url: `${view.url}/loadByTicketSummary`,
                url: `${me.view.url}/v2/loadByTicketSummary`,
                extraParams: params,
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
    formatParameters: function ( {type, obj}) {
        const me = this;
        let params = {
            IN_CCUST: '139',
            ...me.view.searchParams
        };
        
        let month = '';
        if (obj.a4501FECVT) {
            month = obj.a4501FECVT;
        } else if (obj.a4501PRDA) {
            month = obj.a4501PRDA;
        } else if (obj.a4496FPROC) {
            month = obj.a4496FPROC;
        } else {
            month = obj.a4501FEUP;
        }

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
        let params = Object.assign({}, me.view.searchParams);
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


