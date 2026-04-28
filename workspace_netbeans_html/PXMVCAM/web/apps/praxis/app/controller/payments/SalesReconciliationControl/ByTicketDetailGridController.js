Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByTicketDetailGridController',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButtonDetail-2').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        await this.getData({view: view});
    },
    getData: async function ({view, page}) {
        const me = this;
        const pageSize = 20;
        const currentPage = page || 1;
        let params = {
            ...view.searchParams,
            IO_PAGNUM: currentPage,
            IO_PAGROW: pageSize,
            IO_TOTPAG: 0,
            IO_TOTROW: 0
        };
        view.mask('Loading...');
        const res = await global.callStoreGet('PRAXISMP', 'SQP05089', params);
        const data = res?.lstRs?.[0] || [];
        const { IO_TOTROW } = res?.lstVals || {};
        const total = parseInt(IO_TOTROW) || 0;
        if (data.length === 0 && currentPage === 1) {
            global.Msg({msg: 'Data not Found'});
        }
        let store = Ext.create('Ext.data.Store', {
            pageSize: pageSize,
            data: data
        });
        store.totalCount = total;
        store.currentPage = currentPage;
        store.loadPage = function (pg) { me.getData({view, page: pg}); };
        store.load = function () { me.getData({view, page: 1}); };
        view.setStore(store);
        view.unmask();
    },
    onClickTicket: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
            id: prototype.id + '-TicketConciliationDataEntry-1',
            searchParams: me.formatByTicketInfoParams(obj),
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },
    formatByTicketInfoParams: function (obj) {
        let params = {
            IN_CCUST: obj.A4501CCUST,
            IN_CIA: obj.A4501CIA,
            IN_FORMA: obj.A4501FORMA,
            IN_SERIE: obj.A4501SERIE,
            IN_SEQ: obj.A4501SEQ,
            IN_TDOC: obj.A4501TDOC,
            IN_CORRL: obj.A4501CORRL
        };
        return params;
    },
    downloadExcel: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            // todo ! cambiar por microservicio de descarga excel o en su defecto una descarga por proceso en cola
                            global.getFile(`${me.view.url}/downloadByTicketDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


