Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByTicketDetailGridController',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButtonDetail-2').hide();
        }
    },
    afterRender: function () {
        this.getData(this.view);
    },
    getData: function (view) {
        const expectedParams = [
            'IN_CCUST', 'IN_DATE', 'IN_DATEFROM', 'IN_DATETO',
            'IN_PROCTYPE', 'IN_TRNCU', 'IN_SCOUNTRY', 'IN_FVOID',
            'IN_TICKET', 'IN_SCARDN', 'IN_SAUTHOC', 'IN_SPNR',
            'IN_TYPE', 'IN_STVAL', 'IN_SAGENT', 'IN_FUENT',
            'IN_SFUEN', 'IN_TCARD', 'IN_CCARD', 'IN_SCURRENCY',
            'IN_AMOUNT', 'IN_PAX', 'IN_TIPOD', 'IN_TFOP', 'IN_GCARD'
        ];
        expectedParams.forEach(param => {
            if (!(param in view.searchParams)) {
                view.searchParams[param] = '';
            }
        });
        const store = global.callStorePaggin('PRAXISMP', 'SQP05089', view.searchParams);
        store.on('load', function (_s, records, successful) {
            if (!successful) {
                global.Msg({msg: 'Data not Found'});
            } else {
                if (records.length === 0) {
                    global.Msg({msg: 'Data not Found'});
                }
            }
        });
        view.setStore(store);
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


