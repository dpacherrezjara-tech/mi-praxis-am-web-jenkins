Ext.define('Ext.Praxis.controller.payments.SalesComplement.DeUnaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeUnaController',
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },

    getData: async function (view) {
        console.log('detDta', view)
        let store = global.callStorePaggin('PRAXISMP', 'SQP05697', view.searchParams);
        console.log(' data entry', store)

//        view.bindStore(store);
        this.view.setStore(store);

    },

    downloadExcelMit: function () {  //modal confirmar descarga
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
        let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05697', view.searchParams);  //trae toda la data completa

        let data = res.map(x => ({
                'Order ID': x.A4791ORDER,
                'Process Date': x.A4791PRDA,
                'Ticket': x.A4791TKT,
                'PNR': x.A4791PNR,
                'Transaction Id': x.A4791TRANS,
                'Credit Card Number': x.A4791CARDN,
                'Auth.': x.A4791AUTH,
                'Issue.': x.A4791ISSBK,
                'Method Type': x.A4791MTYPE,
                'Card Brand': x.A4791CARDB,
                'Currency': x.A4791CURRE,
                'Total': x.A4791TOTAL,
                'Sub Total': x.A4791SUBTO,
                'Ship Amount Total': x.A4791SHIPT,
                'Discount Amount Total': x.A4791DISCO,
                'Tax Amount Total': x.A4791TAX,
                'Total Amount With Taxes': x.A4791TOTWT,
                'Total Order Amount': x.A4791TORDE,
                'Status Complement': x.A4791STATU,
                'Reconciliation Status': x.STVAL_DESCRIPTION,
                'Proceesor': x.PROSQ_DESCRIPTION,
                'Proccessing Date': x.A4791PRDAL,
                'Ref. Number': x.A4791AREFN,
                'Merchand ID': x.A4791MERID,
                'Country': x.A4791MERPS,
                'Interest Rater': x.A4791RATE,
                'MSI': x.A4791MSI,
                'Installments': x.A4791INSTA,
                'Installments Amount': x.A4791INSTM,
                'Date Create': x.A4791FECPG,
                'Updated User': x.A4791REVIS,
                'Date Updated': x.A4791FREVI,
            }));
        await global.writeExcelFromJson(data, 'DEUNA Information');
        view.setLoading(false);
    }
});


