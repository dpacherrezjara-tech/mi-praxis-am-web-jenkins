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
            'IN_AMOUNT', 'IN_PAX', 'IN_TIPOD', 'IN_TFOP', 'IN_GCARD',
            'IN_PROCESSOR', 'IN_PMERCHID'
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
    downloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            const excelFields = [
                { title: 'Sale Date',                field: 'A4496FECVT',            order: 1  },
                { title: 'IATA',                     field: 'A4496AGENT',            order: 2  },
                { title: 'Source',                   field: 'A4496FUENT',            order: 3  },
                { title: 'Channel',                  field: 'A4496SFUEN',            order: 4  },
                { title: 'Country',                  field: 'A4496PAIS',             order: 5  },
                { title: 'Agent',                    field: 'A4496CODAG',            order: 6  },
                { title: 'Trnx',                     field: 'A4496TRNCU',            order: 7  },
                { title: 'Doc. Type',                field: 'A4496TIPOD',            order: 8  },
                { title: 'Void',                     field: 'A4496TKVOI',            order: 9  },
                { title: 'RFIC',                     field: 'A4496RFIC',             order: 10 },
                { title: 'RFIS',                     field: 'A4496RFIS1',            order: 11 },
                { title: 'Pax Name',                 field: 'A4496PAX',              order: 12 },
                { title: 'Ticket',                   field: 'TICKET',                order: 13 },
                { title: 'PNR',                      field: 'A4496PNR',              order: 16 },
                { title: 'Card Type',                field: 'CARDTYPE',              order: 17 },
                { title: 'Card Code',                field: 'A4501TTARJ',            order: 18 },
                { title: 'Card Number',              field: 'A4501NREF',             order: 19 },
                { title: 'Auth Code',                field: 'A4501CAPL',             order: 20 },
                { title: 'Amount',                   field: 'A4501VFOP',             order: 21 },
                { title: 'Currency',                 field: 'A4501MFOP',             order: 22 },
                { title: 'Reconciliation Amount',    field: 'RECONCILIATION_AMOUNT', order: 23 },
                { title: 'Difference Amount',        field: 'DIFFERENCE_AMOUNT',     order: 24 },
                { title: 'Expected Date',            field: 'PROCDATE',              order: 25 },
                { title: 'Payment Date',             field: 'PAYDATE',               order: 26 },
                { title: 'Difference Days',          field: 'DIFFERENCE_DAYS',       order: 27 },
                { title: 'Processing Date',          field: 'A4501PRDA',             order: 28 },
                { title: 'Status',                   field: 'STVAL_DESCRIPTION',     order: 29 },
                { title: 'Processor',                field: 'DESC_PROCTYPE',         order: 30 },
                { title: 'Chargeback Status',        field: 'CHARGEBACK',            order: 31 },
                { title: 'ADM Status',               field: 'A4501STADM',            order: 32 },
                { title: 'User Update',              field: 'A4501USUP',             order: 33 },
                { title: 'Date Update',              field: 'A4501FEUP',             order: 34 }
            ];
            // • DESCARGA DE REPORTES
            // o Al descargar el archivo de consulta éste deberá respetar la nomenclatura siguiente:
            // PaymentsReconciliation ByTicket_FECHA_HORA-DESCARGA DATE-FILTER
            // Ejemplo: PaymentsReconciliation ByTicket_260518_150030 260511
            // ▪ FECHA_HORA-DESCARGA hace referencia al momento de descarga del archivo.
            // ▪ DATE-FILTER hace referencia a la fecha de consulta, independientemente de si
            // se ha seleccionado la opción Sale, Processing o Update.
            // o El nuevo campo “Payment Merchant” deberá estar integrado en el reporte
            
            await global.callStoreDownloadExcel('PRAXISMP', 'SQP05089', view.searchParams, 'PaymentsReconciliation ByTicket', excelFields);
        } catch (e) {
            console.log(e);
            global.Msg({ msg: 'Error descargando archivo' });
        } finally {
            view.setLoading(false);
        }
    }
    // downloadExcel: function (btn) {
    //     const me = this;
    //     let params = Object.assign({}, me.view.searchParams);
    //     params.excel = true;
    //     console.log(params);
    //     Ext.Msg.show(
    //             {
    //                 title: '.:PRAXIS:.',
    //                 msg: 'Download Excel?',
    //                 buttons: Ext.MessageBox.YESNO,
    //                 scope: this,
    //                 animateTarget: btn,
    //                 icon: Ext.MessageBox.QUESTION,
    //                 modal: true,
    //                 fn: function (btn) {
    //                     if (btn === 'yes') {
    //                         // todo ! cambiar por microservicio de descarga excel o en su defecto una descarga por proceso en cola
    //                         global.getFile(`${me.view.url}/downloadByTicketDetail?${new URLSearchParams(params)}`);
    //                     }
    //                 }
    //             });
    // }
});


