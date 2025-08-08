Ext.define('Ext.Praxis.controller.payments.SalesComplement.DeUnaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeUnaController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
        this.getData(view);
    },

    getData: async function (view) {
        console.log('detDta', view)
        let store = global.callStorePaggin('PRAXISMP', 'SQP05697', view.searchParams);
        console.log(' data entry', store)
        view.bindStore(store);
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
                'Process Date': x.A4791PRDA,
                'Ticket': x.A4791TKT,
                'PNR': x.A4791PNR,
                'Order ID': x.A4791ORDER,
                'Transaction': x.A4791TRANS,
                'Credit Card Number': x.A4791CARDN,
                'Auth.': x.A4791AUTH,
                'Issue.': x.A4791ISSBK,
                'Method Type': x.A4791MTYPE,
                'Card Brand': x.A4791CARDB,
                'Merchand ID': x.A4791MERID,
                'Country': x.A4791MERPS,
                'Total': x.A4791TOTAL,
                'Sub Total': x.A4791SUBTO,
                'Ship Amount Total': x.A4791SHIPT,
                'Discount Amount Total': x.A4791DISCO,
                'Tax Amount Total': x.A4791TAX,
                'Total Amount With Taxes': x.A4791TOTWT,
                'Total Order Amount': x.A4791TORDE,
                'Date Create': x.A4791FECPG,
                'Status': x.A4791STATU,
                'Currency': x.A4791CURRE,
                'Concilitiaon Status': x.A4791STVAL,
                'Interest Rater': x.A4791RATE,
                'MSI': x.A4791MSI,
                'Installments': x.A4791INSTA,
                'Installments Amount': x.A4791INSTM,
            }));
        await global.writeExcelFromJson(data, 'DEUNA Information');
        view.setLoading(false);
    }
});


