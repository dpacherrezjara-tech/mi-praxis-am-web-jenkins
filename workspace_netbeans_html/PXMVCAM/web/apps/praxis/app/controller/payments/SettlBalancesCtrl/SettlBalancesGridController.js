Ext.define('Ext.Praxis.controller.payments.SettlBalancesCtrl.SettlBalancesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlBalancesGridController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
        this.getData(view);
    },
    getData: async function (view) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05644', view.searchParams);
//        console.log('stores', store)
        view.bindStore(store);
        this.view.setStore(store);
    },

//    copySPNR: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//        navigator.clipboard.writeText(rowData.data.PNR.trim());
//        global.Msg({
//            msg: 'SPNR Copied to clipboard!: ' + rowData.data.pnr.trim()
//        });
//    },

    downloadExcelSetrlBalancesCntl: function () {  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null
                );
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05644', view.searchParams);  //trae toda la data completa

        const data = (res?.length > 0)
                ? res.map(x => ({
                        Ticket: x.TICKET,
                        Seq: x.SEQ,
                        Corrl: x.CORRL,
                        Rolling: x.SEQROLL,
                        Transaction: x.TRNCU,
                        'Credit Card Code': x.SCARDCOD,
                        'Credit Card Number': x.SCARDN,
                        'Credit Card Auth': x.SAUTHOC,
                        'Processing Date': x.SDATE,
                        'Ref. Number': x.AREFNBR,
                        Processor: x.ADESC_PRO,
                        'Settl. Amount': x.TGROSAMOUN,
                        Moneda: x.MONEDA,
                        'Error Code': x.CERROR,
                        'Balance Amount': x.SALDO,
                        Status: x.DESC_STVAL,
                        'Diff. Type': x.DESC_AJUSTE,
                    }))
                : [{
                        Ticket: "",
                        Seq: "",
                        Corrl: "",
                        Rolling: "",
                        Transaction: "",
                        'Credit Card Code': "",
                        'Credit Card Number': "",
                        'Credit Card Auth': "",
                        'Processing Date': "",
                        'Ref. Number': "",
                        Processor: "",
                        'Settl. Amount': "",
                        Moneda: "",
                        'Error Code': "",
                        'Balance Amount': "",
                        Status: "",
                        'Diff. Type': "",
                    }];


        await global.writeExcelFromJson(data, 'SettlBalances Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

    // detalle
//    onAddMerchantBtn: function () {
//        const dataEntry = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
//            id: prototype.id + '-MerchantMaintenanceDataEntry-1',
//            option: 'C'
//                    //searchParams: me.formatByTicketInfoParams(obj),
//                    //obj: obj
//        });
//        dataEntry.show();
//    },

    detailSettlBalancesCtrl: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
//        console.log('click detalle')
        //const obj = record.data;


        const  {CCUST, CCIA, FORMA, SERIE, SEQ, CORRL, SEQROLL, TDOCVTA,STVAL} = record.data;



        let params = {
            "IN_CCUST": CCUST,
            "IN_CCIA": CCIA,
            "IN_FORMA": FORMA,
            "IN_SERIE": SERIE,
            "IN_SEQ": SEQ,
            "IN_CORRL": CORRL,
            "IN_SEQROLL": SEQROLL,
            "IN_TDOCVTA": TDOCVTA,
            "IN_STVAL":STVAL
        };


        const dataEntry = Ext.create('Ext.Praxis.view.payments.SettlBalancesCtrlForm.DataEntrys.DataEntrySettlBalances', {
            id: prototype.id + '-DataEntrySettlBalances',
            searchParams: params,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },
});


