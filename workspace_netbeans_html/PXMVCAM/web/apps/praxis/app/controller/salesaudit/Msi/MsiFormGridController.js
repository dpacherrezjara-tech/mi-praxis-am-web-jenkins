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
                        'ProcessingDate': x.FPROC,
                        'SaleDate': x.FVTA,
                        'Ticket': x.TKT,
                        'Channel': x.CANAL,
                        'CardNumber': x.TARJETA,
                        'AuthCode': x.AUTH,
                        'InstallmentNumber': x.INSTANBR,
                        'LocalCurrency': x.MDABOL,
                        'SettlementCurrency': x.MDALIQ,
                        'SettlementAmount': x.MONTOLIQ,
                        'ReasonCode': x.RFIC,
                        'SubReasonCode': x.RFIS,
                        'FareLocal': x.TARIFBOL,
                        'Bank': x.BANCO
                    }))
                : [{
                        'Processor': "",
                        'ProcessingDate': "",
                        'SaleDate': "",
                        'Ticket': "",
                        'Channel': "",
                        'CardNumber': "",
                        'AuthCode': "",
                        'InstallmentNumber': "",
                        'LocalCurrency': "",
                        'SettlementCurrency': "",
                        'SettlementAmount': "",
                        'ReasonCode': "",
                        'SubReasonCode': "",
                        'FareLocal': "",
                        'Bank': ""
                    }];


        await global.writeExcelFromJson(data, 'MSI Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

});

