Ext.define('Ext.Praxis.controller.payments.EMDControlForm.EMDControlFormGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EMDControlFormGridController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
        this.getData(view);
    },
    getData: async function (view) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05717', view.searchParams);
//        console.log('stores', store)
        view.bindStore(store);
        this.view.setStore(store);
    },

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
                    }))
                : [{
                        Ticket: "",
                    }];


        await global.writeExcelFromJson(data, 'SettlBalances Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

   
});


