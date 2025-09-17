Ext.define('Ext.Praxis.controller.salesaudit.Msi.MsiFormGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MsiFormGridController',
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: async function (view) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05716', view.searchParams);
        console.log('stores', store)
        view.bindStore(store);
        this.view.setStore(store);
    },

    downloadExcelSetrlBalancesCntl: function () {
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
        let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05716', view.searchParams);  //trae toda la data completa

        if (res?.length === 0) {
            global.Msg({msg: 'No Data'});
            view.setLoading(false);
            return;
        }
        const data = (res?.length > 0)
                ? res.map(x => ({
                        'Processor': x.PROCESADOR,
                        'Processing Date': x.FPROC,
                        'Sale Date': x.FVTA,
                        'Ticket': x.TKT,
                        'Channel': x.CANAL,
                        'Number': x.TARJETA,
                        'Auth': x.AUTH,
                        'INSTANBR': x.INSTANBR,
                        'NBRINSTA': x.NBRINSTA,
                        'MDABOL': x.MDABOL,
                        'MDALIQ': x.MDALIQ,
                        'Liquidation': x.MONTOLIQ,
                        'RFIC': x.RFIC,
                        'RFIS': x.RFIS,
                        'TARIFBOL': x.TARIFBOL,
                        'BANK': x.BANCO,

                    }))
                : [{
                        'Processor': "",
                        'Processing Date': "",
                        'Sale Date': "",
                        'Ticket': "",
                        'Channel': "",
                        'Number': "",
                        'Auth': "",
                        'INSTANBR': "",
                        'NBRINSTA': "",
                        'MDABOL': "",
                        'MDALIQ': "",
                        'Liquidation': "",
                        'RFIC': "",
                        'RFIS': "",
                        'TARIFBOL': "",
                        'BANK': ""

                    }];


        await global.writeExcelFromJson(data, 'MSI Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

});

