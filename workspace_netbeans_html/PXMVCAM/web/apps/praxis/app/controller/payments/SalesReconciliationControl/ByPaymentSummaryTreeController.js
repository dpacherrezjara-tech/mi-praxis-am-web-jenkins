Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentSummaryTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByPaymentSummaryTreeController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.mask('Loading...');
        console.log(view.searchParams);
        const res = await fetch(`${view.url}/loadByPaymentSummary?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            const tdate = view.searchParams.IN_DATE;
            if(data.response.length===0){
                global.Msg({msg:'Not found'});
                mainPanel.unmask();
                return;
            }
            let keyDate = tdate === 'PRDA' ? 'prda' : 'paydate';
            const formatData = data.response.map(x => {
                return {month: x[keyDate].substring(0, 6), ...x};
            });
            const groupedData = me.groupBy({data: formatData, key: 'month'});
            //<editor-fold defaultstate="collapsed" desc="Tree Store">
            const tree = Object.entries(groupedData).map(obj => {
                let gproc = me.groupBy({data: obj.at(1), key: 'desc_PROCTYPE'});

                let proc = Object.entries(gproc).map(x => {
                    let gtrncu = me.groupBy({data: x.at(1), key: 'transtype'});
                    let trcu = Object.entries(gtrncu).map(x => ({
                            type: 'trncu',
                            month: x.at(1)[0].month,
                            trncu: x.at(0),
                            leaf: true,
                            total: me.sumBy({data: x.at(1), key: 'total'}),
                            total_MATCH: me.sumBy({data: x.at(1), key: 'total_MATCH'}),
                            total_PENDING: me.sumBy({data: x.at(1), key: 'total_PENDING'}),
                            total_NC_MATCH: me.sumBy({data: x.at(1), key: 'total_NC_MATCH'}),
                            total_NC_PENDING: me.sumBy({data: x.at(1), key: 'total_NC_PENDING'}),
                            compl_PG_MATCH: me.sumBy({data: x.at(1), key: 'compl_PG_MATCH'}),
                            compl_PG_PENDING: me.sumBy({data: x.at(1), key: 'compl_PG_PENDING'}),
                            compl_LIG_MATCH: me.sumBy({data: x.at(1), key: 'compl_LIG_MATCH'}),
                            compl_LIG_PENDING: me.sumBy({data: x.at(1), key: 'compl_LIG_PENDING'}),
                            compl_TAB_MATCH: me.sumBy({data: x.at(1), key: 'compl_TAB_MATCH'}),
                            compl_TAB_PENDING: me.sumBy({data: x.at(1), key: 'compl_TAB_PENDING'}),
                            params: {
                                IN_DATE: tdate,
                                IN_MONTH: x.at(1)[0].month,
                                IN_PROCTYPE: x.at(1)[0].proctype,
                                IN_PROCTYPESQ: x.at(1)[0].proctypesq,
                                IN_TRANSTYPE: x.at(1)[0].transtype
                            }
                        }));
                    return {
                        type: 'processor',
                        month: x.at(1)[0].month,
                        proc: x.at(0),
                        children: trcu,
                        expanded: false,
                        total: me.sumBy({data: x.at(1), key: 'total'}),
                        total_MATCH: me.sumBy({data: x.at(1), key: 'total_MATCH'}),
                        total_PENDING: me.sumBy({data: x.at(1), key: 'total_PENDING'}),
                        total_NC_MATCH: me.sumBy({data: x.at(1), key: 'total_NC_MATCH'}),
                        total_NC_PENDING: me.sumBy({data: x.at(1), key: 'total_NC_PENDING'}),
                        compl_PG_MATCH: me.sumBy({data: x.at(1), key: 'compl_PG_MATCH'}),
                        compl_PG_PENDING: me.sumBy({data: x.at(1), key: 'compl_PG_PENDING'}),
                        compl_LIG_MATCH: me.sumBy({data: x.at(1), key: 'compl_LIG_MATCH'}),
                        compl_LIG_PENDING: me.sumBy({data: x.at(1), key: 'compl_LIG_PENDING'}),
                        compl_TAB_MATCH: me.sumBy({data: x.at(1), key: 'compl_TAB_MATCH'}),
                        compl_TAB_PENDING: me.sumBy({data: x.at(1), key: 'compl_TAB_PENDING'}),
                        params: {
                            IN_DATE: tdate,
                            IN_MONTH: x.at(1)[0].month,
                            IN_PROCTYPE: x.at(1)[0].proctype,
                            IN_PROCTYPESQ: x.at(1)[0].proctypesq
                        }
                    };
                });


                let mes = {
                    type: 'month',
                    month: obj.at(0),
                    children: proc,
                    expanded: true,
                    total: me.sumBy({data: obj.at(1), key: 'total'}),
                    total_MATCH: me.sumBy({data: obj.at(1), key: 'total_MATCH'}),
                    total_PENDING: me.sumBy({data: obj.at(1), key: 'total_PENDING'}),
                    total_NC_MATCH: me.sumBy({data: obj.at(1), key: 'total_NC_MATCH'}),
                    total_NC_PENDING: me.sumBy({data: obj.at(1), key: 'total_NC_PENDING'}),
                    compl_PG_MATCH: me.sumBy({data: obj.at(1), key: 'compl_PG_MATCH'}),
                    compl_PG_PENDING: me.sumBy({data: obj.at(1), key: 'compl_PG_PENDING'}),
                    compl_LIG_MATCH: me.sumBy({data: obj.at(1), key: 'compl_LIG_MATCH'}),
                    compl_LIG_PENDING: me.sumBy({data: obj.at(1), key: 'compl_LIG_PENDING'}),
                    compl_TAB_MATCH: me.sumBy({data: obj.at(1), key: 'compl_TAB_MATCH'}),
                    compl_TAB_PENDING: me.sumBy({data: obj.at(1), key: 'compl_TAB_PENDING'}),
                    params: {
                        IN_DATE: tdate,
                        IN_MONTH: obj.at(0)
                    }
                };
                return mes;
            });
            console.log(tree);
            const storeTree = Ext.create('Ext.data.TreeStore', {
                root: {text: '.', expanded: false, children: tree}
            });
            //</editor-fold>
            Ext.getCmp(prototype.idTree + '-colFechaP').setText(tdate === 'PRDA' ? 'Processing Date' : 'Payment Date');
            //Ext.getCmp(prototype.idTree + '-colFechaH').setText(tdate === 'PRDA' ? 'Payment Date' : 'Processing Date');
            me.view.setStore(storeTree);
        }
        mainPanel.unmask();
    },
    onClickTotal: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        if (record.data.total === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        console.log(me.formatParameters({type: 'T', obj: record.data.params}));
        me.openDetail(me.formatParameters({type: 'T', obj: record.data.params}));
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
            1: () => {
                me.openDetail(me.formatParameters({type: 'T', obj: record.data.params}));
            },
            2: () => {
                me.openDetail(me.formatParameters({type: 'M', obj: record.data.params}));
            },
            3: () => {
                me.openDetail(me.formatParameters({type: 'P', obj: record.data.params}));
            },
            4: () => {
                me.openDetail(me.formatParameters({type: 'XM', obj: record.data.params}));
            },
            5: () => {
                me.openDetail(me.formatParameters({type: 'XP', obj: record.data.params}));
            },
            6: () => {
                me.openDetail(me.formatParameters({type: 'PM', obj: record.data.params}));
            },
            7: () => {
                me.openDetail(me.formatParameters({type: 'PP', obj: record.data.params}));
            },
            8: () => {
                me.openDetail(me.formatParameters({type: 'LM', obj: record.data.params}));
            },
            9: () => {
                me.openDetail(me.formatParameters({type: 'LP', obj: record.data.params}));
            },
            10: () => {
                me.openDetail(me.formatParameters({type: 'TM', obj: record.data.params}));
            },
            11: () => {
                me.openDetail(me.formatParameters({type: 'TP', obj: record.data.params}));
            }
        };
        //</editor-fold>
        if(opts[cellIndex]){
            opts[cellIndex]();
        }
    },
    formatParameters: function ( {type, obj}) {
        const me = this;
        let params = {
            IN_CCUST: '139',
            ...obj
        };
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
        return params;
    },
    openDetail: function (searchParams) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const paneles = mainPanel.items.items;
        const detailPanel = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
            id: prototype.id + '-ByPaymentDetailGrid-1',
            searchParams: searchParams,
            url: me.view.url,
            backButton:true
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


