Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.SummaryTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATSummaryTreeController',
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
        const res = await fetch(`${view.url}/loadSummaryTree?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            const tdate = view.tdate;
            const keyDate = 'fecha';
            console.log(data.response.at(0));
            let firstObj = data.response.at((0));
            view.setTitle(`${view.title} - ${firstObj.proc_DESC} (${view.searchParams.IN_MDA})`);
            //<editor-fold defaultstate="collapsed" desc="Tree Store">
            const tree = Object.entries(me.groupBy({data: data.response, key: keyDate})).map(obj => {
                let procdesc = obj.at(1)[0].proc_DESC || '';
                let childs = obj.at(1).map(x => {
                    return {
                        type: 'detail',
                        fecha: x[keyDate],
                        leaf: true,
                        tdate: tdate,
                        scurrency: view.searchParams.IN_MDA,
                        ...x
                    };
                });
                return {
                    fecha: obj.at(0),
                    type: 'header',
                    scurrency: view.searchParams.IN_MDA,
                    proc_DESC: procdesc,
                    accounted: me.sumBy({data: obj.at(1), key: 'accounted'}),
                    qty_ACCOUNTED: me.sumBy({data: obj.at(1), key: 'qty_ACCOUNTED'}),
                    pending: me.sumBy({data: obj.at(1), key: 'pending'}),
                    qty_PENDING: me.sumBy({data: obj.at(1), key: 'qty_PENDING'}),
                    total: me.sumBy({data: obj.at(1), key: 'total'}),
                    qty_TOTAL: me.sumBy({data: obj.at(1), key: 'qty_TOTAL'}),
                    children: childs,
                    expanded: false,
                    tdate: tdate
                };
            });
            console.log(tree);
            const storeTree = Ext.create('Ext.data.TreeStore', {
                root: {text: '.', expanded: false, children: tree}
            });
            //</editor-fold>
            const fechap = Ext.getCmp(prototype.idTree + '-colFechaP');
            const fechah = Ext.getCmp(prototype.idTree + '-colFechaH');
            const fechan = Ext.getCmp(prototype.idTree + '-colFechaN');
            if (tdate === 'P') {
                fechap.setText('Processing Date');
//                fechah.setText('ID FLEX');
//                fechah.dataIndex = 'idflex';
//                fechan.setText('PRAXIS ID');
//                fechan.dataIndex = 'praxisid';
            } else {
                fechap.setText('Sale Date');
//                fechah.setText('PRAXIS ID');
//                fechah.dataIndex = 'praxisid';
//                fechan.setText('ID FLEX');
//                fechan.dataIndex = 'idflex';
            }
            fechah.setText('ID FLEX');
            fechah.dataIndex = 'idflex';
            fechan.setText('PRAXIS ID');
            fechan.dataIndex = 'praxisid';
            //Ext.getCmp(prototype.idTree + '-colFechaP').setText(tdate === 'P' ? 'Processing Date' : ' Date');
            //Ext.getCmp(prototype.idTree + '-colFechaH').setText(tdate === 'P' ? 'FLEX ID' : 'PRAXIS ID');
            me.view.setStore(storeTree);
        }
        mainPanel.unmask();
    },
    onClickAccounted: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        if (record.data.qty_ACCOUNTED === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        me.showGridDetail(me.formatParameters({type: 'C', obj: record.data}));
    },
    onClickPending: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        if (record.data.qty_PENDING === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        me.showGridDetail(me.formatParameters({type: 'P', obj: record.data}));
    },
    onClickTotal: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        if (record.data.type === 'header') {
            if (cellIndex === 1) {
                return;
            }
        }
        if (record.data.qty_TOTAL === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        me.showGridDetail(me.formatParameters({type: 'A', obj: record.data}));
    },
    showGridDetail: function (params) {
        const me = this;
        const view = me.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailGrid', {
            id: prototype.id + '-detailGrid01',
            searchParams: params,
            url: view.url
        });
        mainPanel.add(panelDetail);
    },
    formatParameters: function ( {type, obj}) {
        const me = this;
        const view = me.view;
        let params = {
            IN_STCONL: type,
            ...view.searchParams
        };
        params.IN_PRAXISID = obj.praxisid || '';
        params.IN_IDFLEX = obj.idflex || '';
        params.FECHA_FROM = obj.fecha;
        console.log('Detail Params: ', params);
        return params;
    },
    downloadExcelTree: function () {
        const view = this.view;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${view.url}/downloadSummaryTree?${new URLSearchParams(view.searchParams)}`);
                        }
                    }
                });

    },
    copyID: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        const view = this.view;
        const tdate = view.tdate;
        if (tdate === 'P') {
            navigator.clipboard.writeText(rowData.data.praxisid.trim());
        } else {
            navigator.clipboard.writeText(rowData.data.idflex.trim());
        }
        global.Msg({
            msg: 'Copied to clipboard!'
        });
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
    }
    //</editor-fold>
});


