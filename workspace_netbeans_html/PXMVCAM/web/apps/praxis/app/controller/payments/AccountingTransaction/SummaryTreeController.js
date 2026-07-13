Ext.define('Ext.Praxis.controller.payments.AccountingTransaction.SummaryTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ATSummaryTreeController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        await this.getData();
    },
    getData: async function () {
        const me = this;
        const view = this.view;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.mask('Loading...');

        let params = Object.assign({}, view.searchParams);
        const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'FECHA_TO', 'IN_PROCTYPE',
            'IN_PROCTYPESQ', 'IN_MDA', 'IN_TDOC', 'IN_PNR',
            'IN_PRAXISID', 'IN_FLEXID', 'IN_AREFNBR', 'IN_TICKET'];
        expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

        const res = await global.callStoreGet('PRAXISMP', 'SQP05037', params);
        const data = res.lstRs[0];
        const tdate = view.tdate;
        const keyDate = 'FECHA';

        console.log(data.at(0));
        let firstObj = data.at(0);
        view.setTitle(`${view.title} - ${firstObj.PROC_DESC} (${view.searchParams.IN_MDA})`);

        //<editor-fold defaultstate="collapsed" desc="Tree Store">
        const tree = Object.entries(me.groupBy({data: data, key: keyDate})).map(obj => {
            let procdesc = obj.at(1)[0].PROC_DESC || '';
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
                FECHA: obj.at(0),
                type: 'header',
                scurrency: view.searchParams.IN_MDA,
                PROC_DESC:     procdesc,
                ACCOUNTED:     me.sumBy({data: obj.at(1), key: 'ACCOUNTED'}),
                QTY_ACCOUNTED: me.sumBy({data: obj.at(1), key: 'QTY_ACCOUNTED'}),
                PENDING:       me.sumBy({data: obj.at(1), key: 'PENDING'}),
                QTY_PENDING:   me.sumBy({data: obj.at(1), key: 'QTY_PENDING'}),
                TOTAL:         me.sumBy({data: obj.at(1), key: 'TOTAL'}),
                QTY_TOTAL:     me.sumBy({data: obj.at(1), key: 'QTY_TOTAL'}),
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
        } else {
            fechap.setText('Sale Date');
        }
        fechah.setText('ID FLEX');
        fechah.dataIndex = 'IDFLEX';
        fechan.setText('PRAXIS ID');
        fechan.dataIndex = 'PRAXISID';

        me.view.setStore(storeTree);
        mainPanel.unmask();
    },
    onClickAccounted: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        if (record.data.QTY_ACCOUNTED === 0) {
            global.Msg({msg: 'No data'});
            return;
        }
        me.showGridDetail(me.formatParameters({type: 'C', obj: record.data}));
    },
    onClickPending: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        if (record.data.QTY_PENDING === 0) {
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
        if (record.data.QTY_TOTAL === 0) {
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
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    formatParameters: function ({type, obj}) {
        const me = this;
        const view = me.view;
        let params = {
            IN_STCONL: type,
            ...view.searchParams
        };
        params.IN_PRAXISID = obj.PRAXISID || '';
        params.IN_IDFLEX   = obj.IDFLEX || '';
        params.FECHA_FROM  = obj.FECHA;
        console.log('Detail Params: ', params);
        return params;
    },
    downloadExcelTree: function () {
        const view = this.view;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: async function (btn) {
                if (btn === 'yes') {
                    const tdate = view.searchParams.IN_TFECHA;
                    const col2 = tdate === 'P'
                        ? { title: 'FLEX ID',   field: 'IDFLEX',   order: 2 }
                        : { title: 'PRAXIS ID', field: 'PRAXISID', order: 2 };
                    const col3 = tdate === 'P'
                        ? { title: 'PRAXIS ID', field: 'PRAXISID', order: 3 }
                        : { title: 'FLEX ID',   field: 'IDFLEX',   order: 3 };
                    const excelFields = [
                        { title: tdate === 'P' ? 'Processing Date' : 'Sale Date',
                          field: 'FECHA', order: 1 },
                        col2, col3,
                        { title: 'Processor',   field: 'PROC_DESC',     order: 4 },
                        { title: 'Currency',    field: 'SCURRENCY',     order: 5 },
                        { title: 'Match',       field: 'ACCOUNTED',     order: 6 },
                        { title: 'Qty Match',   field: 'QTY_ACCOUNTED', order: 7 },
                        { title: 'Pending',     field: 'PENDING',       order: 8 },
                        { title: 'Qty Pending', field: 'QTY_PENDING',   order: 9 },
                        { title: 'Total',       field: 'TOTAL',         order: 10 },
                        { title: 'Qty Total',   field: 'QTY_TOTAL',     order: 11 }
                    ];
                    let params = Object.assign({}, view.searchParams);
                    const expectedParams = ['IN_TFECHA', 'FECHA_FROM', 'FECHA_TO', 'IN_PROCTYPE',
                        'IN_PROCTYPESQ', 'IN_MDA', 'IN_TDOC', 'IN_PNR',
                        'IN_PRAXISID', 'IN_FLEXID', 'IN_AREFNBR', 'IN_TICKET'];
                    expectedParams.forEach(p => { if (!(p in params)) params[p] = ''; });

                    await global.callStoreDownloadExcel('PRAXISMP', 'SQP05037', params,
                        'Accounting Transaction - SummaryTree ' + params.FECHA_FROM,
                        excelFields);
                }
            }
        });
    },
    copyID: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        const view = this.view;
        const tdate = view.tdate;
        if (tdate === 'P') {
            navigator.clipboard.writeText(rowData.data.PRAXISID.trim());
        } else {
            navigator.clipboard.writeText(rowData.data.IDFLEX.trim());
        }
        global.Msg({
            msg: 'Copied to clipboard!'
        });
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    groupBy: function ({data, key}) {
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
    sumBy: function ({data, key}) {
        let sum = data.reduce(function (total, item) {
            return total + item[key];
        }, 0);
        return sum;
    }
    //</editor-fold>
});


